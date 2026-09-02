import {
  buildReferenceUsage,
  DEEP_CLEANING_TIERS,
  getDeepCleaningTier,
  getTimeSlot,
  NORMAL_CLEANING,
  TIME_SLOTS,
  WORKFORCE_CAP
} from "@/lib/tidyhomes";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function formatDateLabel(value) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function createResponseSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      slotStatus: {
        type: "array",
        minItems: TIME_SLOTS.length,
        maxItems: TIME_SLOTS.length,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            timeSlotId: { type: "string", enum: TIME_SLOTS.map((slot) => slot.id) },
            label: { type: "string" },
            staffUsed: { type: "integer", minimum: 0 },
            staffRemaining: { type: "integer", minimum: 0 },
            fullyBooked: { type: "boolean" }
          },
          required: ["timeSlotId", "label", "staffUsed", "staffRemaining", "fullyBooked"]
        }
      },
      additionalCapacity: {
        type: "array",
        minItems: TIME_SLOTS.length,
        maxItems: TIME_SLOTS.length,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            timeSlotId: { type: "string", enum: TIME_SLOTS.map((slot) => slot.id) },
            normalCleaningCount: { type: "integer", minimum: 0 },
            deepCleaningOptions: {
              type: "array",
              minItems: DEEP_CLEANING_TIERS.length,
              maxItems: DEEP_CLEANING_TIERS.length,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  sizeTierId: { type: "string", enum: DEEP_CLEANING_TIERS.map((tier) => tier.id) },
                  label: { type: "string" },
                  maxAdditionalBookings: { type: "integer", minimum: 0 }
                },
                required: ["sizeTierId", "label", "maxAdditionalBookings"]
              }
            }
          },
          required: ["timeSlotId", "normalCleaningCount", "deepCleaningOptions"]
        }
      },
      bookingVerdict: { type: "string" },
      naturalLanguageSummary: { type: "string" }
    },
    required: ["slotStatus", "additionalCapacity", "bookingVerdict", "naturalLanguageSummary"]
  };
}

function buildPrompt({ bookingDate, bookingDateLabel, deepAppointments, normalAppointments, referenceUsage }) {
  const deepDetails = deepAppointments.map((appointment, index) => {
    const tier = getDeepCleaningTier(appointment.sizeTierId);
    const slot = getTimeSlot(appointment.timeSlotId);

    return {
      bookingNumber: index + 1,
      service: "deep_cleaning",
      timeSlotId: appointment.timeSlotId,
      timeSlotLabel: slot.label,
      timeGroup: slot.group,
      sizeTierId: tier.id,
      sizeTierLabel: tier.label,
      furnitureIncluded: appointment.furnitureIncluded,
      staffRequired: tier.staffRequired,
      priceSgd: appointment.furnitureIncluded ? tier.withFurniturePrice : tier.withoutFurniturePrice
    };
  });

  const normalDetails = normalAppointments.map((appointment, index) => {
    const slot = getTimeSlot(appointment.timeSlotId);

    return {
      bookingNumber: index + 1,
      service: "normal_cleaning",
      timeSlotId: appointment.timeSlotId,
      timeSlotLabel: slot.label,
      timeGroup: slot.group,
      staffRequired: NORMAL_CLEANING.staffRequired,
      priceSgd: NORMAL_CLEANING.price
    };
  });

  return [
    {
      role: "system",
      content: [
        {
          type: "input_text",
          text: [
            "You are the booking availability engine for TidyHomes, a cleaning services company in Singapore.",
            "Your job is to decide manpower availability for one working day and return only schema-valid JSON.",
            `The selected booking date is ${bookingDateLabel} (${bookingDate}).`,
            `TidyHomes has exactly ${WORKFORCE_CAP} workers available in each slot group.`,
            "Time slot overlap rules:",
            "- 8:00 AM - 11:00 AM overlaps with 8:00 AM - 12:00 PM and they share the same pool of workers.",
            "- 2:00 PM - 5:00 PM overlaps with 2:00 PM - 6:00 PM and they share the same pool of workers.",
            "- Morning and afternoon groups do not share workers with each other.",
            "A slot is fully booked when the shared group reaches or exceeds 15 workers used.",
            "Additional capacity per slot must be based on remaining workers in that slot's shared group.",
            "Deep cleaning capacity must be listed for all defined house-size tiers.",
            "Normal cleaning capacity equals remaining workers because each booking consumes 1 worker.",
            "Use the provided reference usage as authoritative arithmetic context, but produce the final decision yourself.",
            "Do not include markdown or commentary outside the JSON schema."
          ].join("\n")
        }
      ]
    },
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: JSON.stringify(
            {
              workforceCap: WORKFORCE_CAP,
              bookingDate,
              bookingDateLabel,
              deepCleaningTiers: DEEP_CLEANING_TIERS,
              normalCleaning: NORMAL_CLEANING,
              timeSlots: TIME_SLOTS,
              existingBookings: {
                deepAppointments: deepDetails,
                normalAppointments: normalDetails
              },
              referenceUsage,
              instructions: {
                slotStatus: "Return one entry for every time slot. Morning slots should reflect the same shared-group manpower result. Afternoon slots should reflect the same shared-group manpower result.",
                additionalCapacity:
                  "For each slot, return normalCleaningCount and deepCleaningOptions. For each deep-cleaning tier, maxAdditionalBookings should be floor(staffRemaining / staffRequired).",
                bookingVerdict:
                  "Provide a short operational conclusion summarizing where TidyHomes can still accept bookings and where capacity is exhausted.",
                naturalLanguageSummary:
                  "Provide a concise explanation for staff, mentioning manpower pressure and what booking types still fit."
              }
            },
            null,
            2
          )
        }
      ]
    }
  ];
}

function validateAppointments(payload) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const bookingDate = typeof payload.bookingDate === "string" ? payload.bookingDate : "";
  const deepAppointments = Array.isArray(payload.deepAppointments) ? payload.deepAppointments : null;
  const normalAppointments = Array.isArray(payload.normalAppointments) ? payload.normalAppointments : null;

  if (!DATE_PATTERN.test(bookingDate)) {
    return { ok: false, error: "bookingDate is required and must use YYYY-MM-DD format." };
  }

  if (!deepAppointments || !normalAppointments) {
    return { ok: false, error: "Both deepAppointments and normalAppointments arrays are required." };
  }

  for (const appointment of deepAppointments) {
    if (!appointment || typeof appointment !== "object") {
      return { ok: false, error: "Each deep cleaning appointment must be an object." };
    }

    if (!getDeepCleaningTier(appointment.sizeTierId) || !getTimeSlot(appointment.timeSlotId)) {
      return { ok: false, error: "A deep cleaning appointment contains an invalid size tier or time slot." };
    }

    if (typeof appointment.furnitureIncluded !== "boolean") {
      return { ok: false, error: "Deep cleaning appointments must include a boolean furnitureIncluded value." };
    }
  }

  for (const appointment of normalAppointments) {
    if (!appointment || typeof appointment !== "object") {
      return { ok: false, error: "Each normal cleaning appointment must be an object." };
    }

    if (!getTimeSlot(appointment.timeSlotId)) {
      return { ok: false, error: "A normal cleaning appointment contains an invalid time slot." };
    }
  }

  return { ok: true, bookingDate, deepAppointments, normalAppointments };
}

function sortByTimeSlots(entries, key = "timeSlotId") {
  const indexById = Object.fromEntries(TIME_SLOTS.map((slot, index) => [slot.id, index]));
  return [...entries].sort((a, b) => indexById[a[key]] - indexById[b[key]]);
}

function validateAnalysisShape(analysis) {
  if (!analysis || typeof analysis !== "object") {
    throw new Error("OpenAI returned an invalid analysis payload.");
  }

  if (!Array.isArray(analysis.slotStatus) || analysis.slotStatus.length !== TIME_SLOTS.length) {
    throw new Error("OpenAI response is missing complete slotStatus data.");
  }

  if (!Array.isArray(analysis.additionalCapacity) || analysis.additionalCapacity.length !== TIME_SLOTS.length) {
    throw new Error("OpenAI response is missing complete additionalCapacity data.");
  }

  const slotIds = new Set(TIME_SLOTS.map((slot) => slot.id));

  for (const slot of analysis.slotStatus) {
    if (!slotIds.has(slot.timeSlotId)) {
      throw new Error("OpenAI response contains an unknown timeSlotId.");
    }
    if (typeof slot.label !== "string" || typeof slot.staffUsed !== "number" || typeof slot.staffRemaining !== "number" || typeof slot.fullyBooked !== "boolean") {
      throw new Error("OpenAI response contains malformed slotStatus fields.");
    }
  }

  for (const capacity of analysis.additionalCapacity) {
    if (!slotIds.has(capacity.timeSlotId)) {
      throw new Error("OpenAI response contains an unknown capacity timeSlotId.");
    }
    if (typeof capacity.normalCleaningCount !== "number" || !Array.isArray(capacity.deepCleaningOptions)) {
      throw new Error("OpenAI response contains malformed capacity fields.");
    }

    if (capacity.deepCleaningOptions.length !== DEEP_CLEANING_TIERS.length) {
      throw new Error("OpenAI response is missing one or more deep cleaning tiers.");
    }
  }

  if (typeof analysis.bookingVerdict !== "string" || typeof analysis.naturalLanguageSummary !== "string") {
    throw new Error("OpenAI response is missing summary text.");
  }

  return {
    ...analysis,
    slotStatus: sortByTimeSlots(analysis.slotStatus),
    additionalCapacity: sortByTimeSlots(
      analysis.additionalCapacity.map((entry) => ({
        ...entry,
        deepCleaningOptions: DEEP_CLEANING_TIERS.map((tier) => {
          const match = entry.deepCleaningOptions.find((option) => option.sizeTierId === tier.id);
          if (!match) {
            throw new Error("OpenAI response omitted a deep cleaning tier capacity.");
          }

          return {
            ...match,
            label: typeof match.label === "string" && match.label ? match.label : tier.label
          };
        })
      }))
    )
  };
}

export async function POST(request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY is missing. Add it to .env.local before running booking analysis." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validation = validateAppointments(body);

    if (!validation.ok) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const referenceUsage = buildReferenceUsage(validation.deepAppointments, validation.normalAppointments);
    const bookingDateLabel = formatDateLabel(validation.bookingDate);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        input: buildPrompt({
          bookingDate: validation.bookingDate,
          bookingDateLabel,
          deepAppointments: validation.deepAppointments,
          normalAppointments: validation.normalAppointments,
          referenceUsage
        }),
        text: {
          format: {
            type: "json_schema",
            name: "tidyhomes_booking_analysis",
            strict: true,
            schema: createResponseSchema()
          }
        }
      })
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`OpenAI request failed: ${response.status} ${details}`);
    }

    const data = await response.json();
    const rawText = data?.output_text || data?.output?.[0]?.content?.[0]?.text || "{}";
    const parsed = JSON.parse(rawText);
    const analysis = validateAnalysisShape(parsed);

    return Response.json({
      ...analysis,
      bookingDate: validation.bookingDate,
      bookingDateLabel
    });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to analyze TidyHomes booking availability." },
      { status: 500 }
    );
  }
}
