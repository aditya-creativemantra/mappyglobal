export async function POST(request) {
  try {
    const body = await request.json();
    const prompt = String(body?.prompt || "").trim();
    const apiKey = process.env.OPENAI_API_KEY || process.env.CHATGPT_API_KEY;

    if (!prompt) {
      return Response.json({ error: "Image prompt is required." }, { status: 400 });
    }

    if (!apiKey) {
      return Response.json(
        { error: "Add OPENAI_API_KEY or CHATGPT_API_KEY to enable image generation." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
        prompt,
        size: "1024x1024"
      })
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Image generation failed: ${response.status} ${details}`);
    }

    const data = await response.json();
    const base64Image = data?.data?.[0]?.b64_json;

    if (!base64Image) {
      throw new Error("OpenAI did not return an image payload.");
    }

    return Response.json({
      imageUrl: `data:image/png;base64,${base64Image}`
    });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to generate image." },
      { status: 500 }
    );
  }
}
