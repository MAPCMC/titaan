import { Block } from "payload";

export const CasesBlock: Block = {
  slug: "cases",
  interfaceName: "Cases",
  labels: {
    singular: {
      nl: "Case-lijst",
      en: "Case list",
    },
    plural: {
      nl: "Case-lijsten",
      en: "Case lists",
    },
  },
  fields: [
    {
      name: "list",
      type: "relationship",
      relationTo: "cases",
      minRows: 1,
      hasMany: true,
      admin: {
        isSortable: true,
      },
      label: {
        nl: "Cases om te tonen",
        en: "Cases to show",
      },
    },
  ],
};
