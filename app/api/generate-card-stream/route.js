function sseEvent(event, data) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createFallbackTexts(topic, count) {
  const prompts = [
    "someone says that was on my bingo card",
    "unexpected expert opinion",
    "dramatic pause before the main point",
    "a callback everyone understands",
    "someone asks the obvious question",
    "wildly specific example appears",
    "surprisingly strong reaction",
    "one person is way too prepared",
    "classic overused phrase",
    "someone promises a quick answer",
    "the room suddenly agrees",
    "tiny detail becomes important",
    "someone references a trend",
    "confident prediction out of nowhere",
    "the same joke comes back",
    "everyone starts nodding",
    "side conversation starts",
    "hot take appears",
    "awkward silence lands",
    "someone repeats the prompt",
    "crowd favorite moment",
    "question no one expected",
    "group starts laughing",
    "mild chaos begins",
    "someone says exactly"
  ];

  return Array.from({ length: count }, (_, index) => `${topic}: ${prompts[index % prompts.length]}`);
}

function buildPrompt(topic, size) {
  return [
    {
      role: "system",
      content: [
        {
          type: "input_text",
          text:
            "Create a single bingo card as strict JSON. The card should be randomized, concise, and tightly matched to the user's topic. Every bingo square must contain short text only, with no numbering."
        }
      ]
    },
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: [
            `Topic: ${topic}`,
            `Grid size: ${size}x${size}`,
            `Return one title and exactly ${size * size} unique bingo cell texts.`,
            "Make the text feel specific to the prompt, not generic.",
            "Keep each bingo item short enough to fit inside a square."
          ].join("\n")
        }
      ]
    }
  ];
}

function createSchema(size) {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      title: { type: "string" },
      items: {
        type: "array",
        minItems: size * size,
        maxItems: size * size,
        items: {
          type: "string"
        }
      }
    },
    required: ["title", "items"]
  };
}

async function fetchPexelsImages(topic, count) {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(topic)}&per_page=${Math.min(
        Math.max(count, 10),
        30
      )}&orientation=square`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    );

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Pexels request failed: ${response.status} ${details}`);
    }

    const data = await response.json();
    return Array.isArray(data?.photos)
      ? data.photos.map((photo) => ({
          imageUrl: photo?.src?.medium || photo?.src?.large || photo?.src?.original || "",
          photographer: photo?.photographer || "Pexels creator",
          photographerUrl: photo?.photographer_url || photo?.url || "https://www.pexels.com",
          photoUrl: photo?.url || "https://www.pexels.com"
        }))
      : [];
  } catch (error) {
    console.warn("Pexels image lookup failed:", error);
    return [];
  }
}

async function generateTexts(topic, size) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.CHATGPT_API_KEY;
  const count = size * size;
  let notice = "";

  if (!apiKey) {
    return {
      title: `${topic} Bingo`,
      items: createFallbackTexts(topic, count),
      notice: "No OpenAI API key was found, so this is a local fallback card."
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: buildPrompt(topic, size),
        text: {
          format: {
            type: "json_schema",
            name: "simple_bingo_card",
            strict: true,
            schema: createSchema(size)
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

    return {
      title: parsed?.title || `${topic} Bingo`,
      items: Array.isArray(parsed?.items) ? parsed.items.slice(0, count) : createFallbackTexts(topic, count),
      notice
    };
  } catch (error) {
    console.warn("Falling back to local bingo card:", error);
    notice =
      "OpenAI generation is unavailable right now, so this is a local fallback card. Check API billing or quota to restore live AI results.";

    return {
      title: `${topic} Bingo`,
      items: createFallbackTexts(topic, count),
      notice
    };
  }
}

export async function POST(request) {
  const encoder = new TextEncoder();

  try {
    const body = await request.json();
    const topic = String(body?.topic || "").trim();
    const size = Number(body?.size || 4);
    const mode = String(body?.mode || "text");

    if (!topic) {
      return Response.json({ error: "Topic is required." }, { status: 400 });
    }

    if (![3, 4, 5].includes(size)) {
      return Response.json({ error: "Grid size must be 3, 4, or 5." }, { status: 400 });
    }

    if (!["text", "image", "image-plus-text"].includes(mode)) {
      return Response.json({ error: "Card mode is invalid." }, { status: 400 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(sseEvent("stage", { message: "Understanding your prompt" })));
        await sleep(220);
        controller.enqueue(encoder.encode(sseEvent("stage", { message: "Generating randomized bingo ideas" })));

        const [textResult, pexelsImages] = await Promise.all([
          generateTexts(topic, size),
          mode === "text" ? Promise.resolve([]) : fetchPexelsImages(topic, size * size)
        ]);

        await sleep(220);
        controller.enqueue(
          encoder.encode(
            sseEvent("stage", {
              message: mode === "text" ? "Building your bingo board" : "Finding matching images and building your card"
            })
          )
        );

        controller.enqueue(
          encoder.encode(
            sseEvent("card", {
              title: textResult.title,
              size,
              mode
            })
          )
        );

        for (const [index, text] of textResult.items.entries()) {
          const image = pexelsImages.length ? pexelsImages[index % pexelsImages.length] : null;

          controller.enqueue(
            encoder.encode(
              sseEvent("item", {
                id: crypto.randomUUID(),
                text,
                index,
                imageUrl: image?.imageUrl || "",
                attribution: image
                  ? `Photo by ${image.photographer} on Pexels`
                  : "",
                attributionUrl: image?.photoUrl || "https://www.pexels.com"
              })
            )
          );
          await sleep(140);
        }

        let finalNotice = textResult.notice || "";
        if (mode !== "text") {
          finalNotice = [finalNotice, "Photos provided by Pexels."]
            .filter(Boolean)
            .join(" ");
        }

        controller.enqueue(encoder.encode(sseEvent("done", { notice: finalNotice })));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
      }
    });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to stream bingo card generation." },
      { status: 500 }
    );
  }
}
