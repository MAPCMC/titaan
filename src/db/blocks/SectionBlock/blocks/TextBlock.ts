import { Block } from "payload";

export const TextBlock: Block = {
  slug: "text",
  interfaceName: "Text",
  labels: {
    singular: {
      nl: "Tekstblok",
      en: "Rich text",
    },
    plural: {
      nl: "Tekstblokken",
      en: "Rich text blocks",
    },
  },
  fields: [
    {
      name: "text",
      label: {
        nl: "Tekst",
        en: "Text",
      },
      type: "richText",
      required: true,
    },
  ],
};
