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
      name: "type",
      label: {
        nl: "Actie",
        en: "Action",
      },
      type: "select",
      required: true,
      defaultValue: "link",
      options: [
        {
          label: {
            nl: "link intern",
            en: "link internal",
          },
          value: "link",
        },
        {
          label: {
            nl: "link extern",
            en: "link external",
          },
          value: "linkExternal",
        },
        {
          label: {
            nl: "Kopieer tekst",
            en: "Copy text",
          },
          value: "copy",
        },
      ],
    },
    {
      name: "action",
      label: {
        nl: "Actie inhoud (link/tekst)",
        en: "Action content (link/text)",
      },
      type: "text",
      required: true,
    },
  ],
};
