export const sizeOptions = [
  { label: "3 x 3", value: 3 },
  { label: "4 x 4", value: 4 },
  { label: "5 x 5", value: 5 }
];

export const imageStyleOptions = [
  "clean editorial",
  "playful pop",
  "minimal corporate",
  "party poster",
  "storybook collage"
];

export const templateStyles = [
  {
    id: "editorial",
    name: "Editorial",
    description: "Warm neutrals, premium poster feel, polished typography.",
    stylePrompt: "clean editorial with premium lifestyle magazine energy",
    theme: {
      headerBg: "#284b44",
      cellAccent: "#f3b552",
      textColor: "#14202f",
      boardBg: "#fff9ef"
    }
  },
  {
    id: "playful",
    name: "Playful",
    description: "Bright, social, fun for parties, classrooms, and viral prompts.",
    stylePrompt: "playful pop poster with bright color blocking",
    theme: {
      headerBg: "#2647a5",
      cellAccent: "#ff8c42",
      textColor: "#1d1d1f",
      boardBg: "#f9fbff"
    }
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean workspace aesthetic for team games and branded events.",
    stylePrompt: "minimal corporate layout with refined shapes and subtle accents",
    theme: {
      headerBg: "#1e293b",
      cellAccent: "#6ee7b7",
      textColor: "#0f172a",
      boardBg: "#f8fafc"
    }
  }
];

export const defaultEditorTheme = templateStyles[0].theme;

export function createBlankItems(size, seedText = "Start editing") {
  return Array.from({ length: size * size }, (_, index) => ({
    id: `blank-${index + 1}`,
    text: `${seedText} ${index + 1}`,
    type: index % 4 === 0 ? "image" : "text",
    badge: index % 5 === 0 ? "AI" : "",
    imageLabel: index % 4 === 0 ? "Preview tile" : "",
    imagePrompt: index % 4 === 0 ? "simple editorial illustration" : "",
    imageUrl: ""
  }));
}

export function createCardShell({ topic, size, template }) {
  return {
    id: crypto.randomUUID(),
    title: `${capitalize(topic)} Bingo`,
    topic,
    size,
    templateId: template.id,
    templateName: template.name,
    templateDescription: template.description,
    style: template.stylePrompt,
    theme: template.theme,
    items: createBlankItems(size, capitalize(topic))
  };
}

export function buildFallbackCards(topic, size) {
  return templateStyles.map((template, templateIndex) => ({
    ...createCardShell({ topic, size, template }),
    items: Array.from({ length: size * size }, (_, index) => {
      const prompts = [
        "classic moment everyone expects",
        "someone says this changes everything",
        "surprise twist nobody predicted",
        "sudden applause or laughing fit",
        "someone asks for the link afterward",
        "wildly specific opinion appears",
        "the group instantly understands the reference",
        "that one line becomes the running joke",
        "suspiciously confident guess",
        "iconic callback lands perfectly",
        "the room reacts all at once",
        "someone screenshots it for later",
        "unexpectedly wholesome moment",
        "tiny detail becomes the main topic",
        "a bold prediction shows up",
        "awkward pause followed by chaos",
        "someone is way too prepared",
        "the vibe shifts immediately",
        "everybody starts nodding",
        "surprise cameo energy",
        "the audience quotes it back",
        "someone says let us circle back",
        "dramatic reveal lands hard",
        "chat or group thread explodes",
        "someone mentions budget"
      ];

      const useImage = (index + templateIndex) % 3 === 0;
      const phrase = prompts[index % prompts.length];

      return {
        id: crypto.randomUUID(),
        text: `${capitalize(topic)}: ${phrase}`,
        type: useImage ? "image" : "text",
        badge: index % 4 === 0 ? "AI" : "",
        imageLabel: useImage ? `${template.name} visual` : "",
        imagePrompt: useImage
          ? `Create a ${template.stylePrompt} icon-style illustration for "${topic}" representing: ${phrase}`
          : "",
        imageUrl: ""
      };
    })
  }));
}

export function buildCardOptionsPrompt({ topic, size }) {
  return [
    {
      role: "system",
      content: [
        {
          type: "input_text",
          text:
            "Generate three distinct bingo card options as JSON. Each option should feel product-ready, concise, playful, and easy to edit later. Mix text-only and image-ready cells."
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
            "Create exactly three bingo card concepts named Editorial, Playful, and Minimal.",
            "Each concept needs a short title, short templateDescription, a style string, and exactly the right number of cells.",
            "For every cell include: text, type, badge, imageLabel, imagePrompt.",
            "Only use imagePrompt for image cells. Keep cell text short enough to fit a bingo square."
          ].join("\n")
        }
      ]
    }
  ];
}

export function createCardOptionsSchema(size) {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      cards: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            templateName: {
              type: "string",
              enum: templateStyles.map((template) => template.name)
            },
            title: { type: "string" },
            templateDescription: { type: "string" },
            style: { type: "string" },
            items: {
              type: "array",
              minItems: size * size,
              maxItems: size * size,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  text: { type: "string" },
                  type: { type: "string", enum: ["text", "image"] },
                  badge: { type: "string" },
                  imageLabel: { type: "string" },
                  imagePrompt: { type: "string" }
                },
                required: ["text", "type", "badge", "imageLabel", "imagePrompt"]
              }
            }
          },
          required: ["templateName", "title", "templateDescription", "style", "items"]
        }
      }
    },
    required: ["cards"]
  };
}

export function normalizeCards(rawCards, topic, size) {
  const safeCards = Array.isArray(rawCards) ? rawCards.slice(0, 3) : [];

  if (!safeCards.length) {
    return buildFallbackCards(topic, size);
  }

  return templateStyles.map((template, index) => {
    const source = safeCards.find((card) => card?.templateName === template.name) || safeCards[index] || {};
    const normalizedItems = normalizeAIItems(source?.items, size, template, topic);

    return {
      id: crypto.randomUUID(),
      title: source?.title || `${capitalize(topic)} Bingo`,
      topic,
      size,
      templateId: template.id,
      templateName: template.name,
      templateDescription: source?.templateDescription || template.description,
      style: source?.style || template.stylePrompt,
      theme: template.theme,
      items: normalizedItems
    };
  });
}

export function normalizeAIItems(items, size, template, topic) {
  const safeItems = Array.isArray(items) ? items.slice(0, size * size) : [];
  const normalized = safeItems.map((item, index) => ({
    id: crypto.randomUUID(),
    text: item?.text || `${capitalize(topic)} moment ${index + 1}`,
    type: item?.type === "image" ? "image" : "text",
    badge: item?.badge || "",
    imageLabel: item?.imageLabel || "",
    imagePrompt:
      item?.type === "image"
        ? item?.imagePrompt ||
          `Create a ${template.stylePrompt} illustration for ${topic} based on: ${item?.text || `moment ${index + 1}`}`
        : "",
    imageUrl: ""
  }));

  if (normalized.length < size * size) {
    return [
      ...normalized,
      ...createBlankItems(size, "Add custom prompt").slice(normalized.length, size * size)
    ];
  }

  return normalized;
}

export function cloneCard(card) {
  return {
    ...card,
    theme: { ...card.theme },
    items: card.items.map((item) => ({ ...item }))
  };
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
