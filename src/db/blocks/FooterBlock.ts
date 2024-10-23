import { Block } from "payload";

export const FooterBlock: Block = {
  slug: "footer",
  interfaceName: "Footer",
  labels: {
    singular: {
      nl: "Paginavoettekst",
      en: "Footer",
    },
    plural: {
      nl: "Paginavoetteksten",
      en: "Footers",
    },
  },
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
