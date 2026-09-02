export const WORKFORCE_CAP = 15;

export const TIME_SLOTS = [
  {
    id: "morning-short",
    label: "8:00 AM - 11:00 AM",
    group: "morning"
  },
  {
    id: "morning-long",
    label: "8:00 AM - 12:00 PM",
    group: "morning"
  },
  {
    id: "afternoon-short",
    label: "2:00 PM - 5:00 PM",
    group: "afternoon"
  },
  {
    id: "afternoon-long",
    label: "2:00 PM - 6:00 PM",
    group: "afternoon"
  }
];

export const DEEP_CLEANING_TIERS = [
  {
    id: "lt-500",
    label: "Less than 500 sq ft",
    withoutFurniturePrice: 303,
    withFurniturePrice: 353,
    staffRequired: 2
  },
  {
    id: "500-750",
    label: "500 - 750 sq ft",
    withoutFurniturePrice: 358,
    withFurniturePrice: 408,
    staffRequired: 3
  },
  {
    id: "751-1000",
    label: "751 - 1000 sq ft",
    withoutFurniturePrice: 424,
    withFurniturePrice: 474,
    staffRequired: 3
  },
  {
    id: "1001-1300",
    label: "1001 - 1300 sq ft",
    withoutFurniturePrice: 523,
    withFurniturePrice: 573,
    staffRequired: 4
  },
  {
    id: "1301-1600",
    label: "1301 - 1600 sq ft",
    withoutFurniturePrice: 595,
    withFurniturePrice: 645,
    staffRequired: 5
  },
  {
    id: "1601-2000",
    label: "1601 - 2000 sq ft",
    withoutFurniturePrice: 685,
    withFurniturePrice: 735,
    staffRequired: 6
  }
];

export const NORMAL_CLEANING = {
  price: 100,
  staffRequired: 1
};

export function getDeepCleaningTier(id) {
  return DEEP_CLEANING_TIERS.find((tier) => tier.id === id);
}

export function getTimeSlot(id) {
  return TIME_SLOTS.find((slot) => slot.id === id);
}

export function buildReferenceUsage(deepAppointments, normalAppointments) {
  const groupUsage = {
    morning: 0,
    afternoon: 0
  };

  for (const appointment of deepAppointments) {
    const tier = getDeepCleaningTier(appointment.sizeTierId);
    const slot = getTimeSlot(appointment.timeSlotId);
    if (!tier || !slot) continue;
    groupUsage[slot.group] += tier.staffRequired;
  }

  for (const appointment of normalAppointments) {
    const slot = getTimeSlot(appointment.timeSlotId);
    if (!slot) continue;
    groupUsage[slot.group] += NORMAL_CLEANING.staffRequired;
  }

  return TIME_SLOTS.map((slot) => ({
    timeSlotId: slot.id,
    label: slot.label,
    group: slot.group,
    staffUsed: groupUsage[slot.group],
    staffRemaining: Math.max(WORKFORCE_CAP - groupUsage[slot.group], 0),
    fullyBooked: groupUsage[slot.group] >= WORKFORCE_CAP
  }));
}
