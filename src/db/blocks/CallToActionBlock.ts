import { Block } from "payload";

export const CallToActionBlock: Block = {
  slug: "callToAction",
  interfaceName: "CallToAction",
  labels: {
    singular: {
      nl: "Actieknop",
      en: "Call to action",
    },
    plural: {
      nl: "Actieknoppen",
      en: "Call to actions",
    },
  },
  fields: [
    {
      name: "label",
      label: {
        nl: "Label",
        en: "Label",
      },
      type: "text",
      required: true,
    },
    {
      name: "link",
      label: {
        nl: "Link",
        en: "Link",
      },
      type: "text",
      required: true,
    },
  ],
};
