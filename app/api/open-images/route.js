export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = String(searchParams.get("q") || "").trim();

    if (!query) {
      return Response.json({ error: "Search query is required." }, { status: 400 });
    }

    const response = await fetch(
      `https://api.openverse.engineering/v1/images/?q=${encodeURIComponent(query)}&page_size=8`,
      {
        headers: {
          "User-Agent": "AI Bingo Card Studio"
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Open image search failed: ${response.status} ${details}`);
    }

    const data = await response.json();
    const results = Array.isArray(data?.results)
      ? data.results.map((item) => ({
          id: item.id,
          title: item.title || "Open image",
          imageUrl: item.thumbnail || item.url,
          fullUrl: item.url,
          creator: item.creator || "Unknown creator",
          license: [item.license?.toUpperCase(), item.license_version].filter(Boolean).join(" "),
          provider: item.provider || item.source || "Openverse",
          attribution: item.attribution || "",
          sourceUrl: item.foreign_landing_url || item.url
        }))
      : [];

    return Response.json({ results });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to search open images." },
      { status: 500 }
    );
  }
}
