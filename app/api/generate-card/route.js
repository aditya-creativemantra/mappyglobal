import {
  buildCardOptionsPrompt,
  buildFallbackCards,
  createCardOptionsSchema,
  normalizeCards
} from "@/lib/bingo";

export async function POST(request) {
  try {
    const body = await request.json();
    const topic = String(body?.topic || "").trim();
    const size = Number(body?.size || 5);
    const apiKey = process.env.OPENAI_API_KEY || process.env.CHATGPT_API_KEY;

    if (!topic) {
      return Response.json({ error: "Topic is required." }, { status: 400 });
    }

    if (![3, 4, 5].includes(size)) {
      return Response.json({ error: "Grid size must be 3, 4, or 5." }, { status: 400 });
    }

    let cards = [];
    let notice = "";

    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            input: buildCardOptionsPrompt({ topic, size }),
            text: {
              format: {
                type: "json_schema",
                name: "bingo_card_options",
                strict: true,
                schema: createCardOptionsSchema(size)
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
        cards = normalizeCards(parsed?.cards, topic, size);
      } catch (error) {
        console.warn("Falling back to local bingo templates:", error);
        cards = buildFallbackCards(topic, size);
        notice =
          "OpenAI card generation is unavailable right now, so these are local fallback cards. Check API billing/quota to restore live AI results.";
      }
    } else {
      cards = buildFallbackCards(topic, size);
      notice =
        "No OpenAI API key was found, so these are local fallback cards. Add OPENAI_API_KEY in .env.local for live AI generation.";
    }

    return Response.json({ cards, notice });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to generate bingo card options." },
      { status: 500 }
    );
  }
}
