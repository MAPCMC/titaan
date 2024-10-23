import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "copyright",
      label: {
        nl: "Copyright",
        en: "Copyright",
      },
      type: "richText",
    },
  ],
};
