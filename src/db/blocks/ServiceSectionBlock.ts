import { Block } from "payload";

export const ServiceSectionBlock: Block = {
  slug: "serviceSection",
  interfaceName: "ServiceSection",
  labels: {
    singular: {
      nl: "Dienstensectie",
      en: "Services Section",
    },
    plural: {
      nl: "Dienstensecties",
      en: "Services Sections",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        nl: "Titel",
        en: "Title",
      },
      type: "text",
    },
    {
      name: "anchor",
      label: {
        nl: "Titellink (geen spaties)",
        en: "Anchor text (no spaces)",
      },
      type: "text",
    },
    {
      name: "introduction",
      label: {
        nl: "Introductie",
        en: "Introduction",
      },
      type: "text",
    },
    {
      name: "type",
      label: {
        nl: "Type",
        en: "Type",
      },
      type: "select",
      defaultValue: "section-services",
      access: { read: () => true },
      options: [
        {
          label: {
            nl: "Diensten",
            en: "Services",
          },
          value: "section-services",
        },
      ],
    },
    {
      name: "resultsIntro",
      label: {
        nl: "Introductie resultaten",
        en: "Introduction results",
      },
      type: "richText",
    },
    {
      name: "resultsDisclaimer",
      label: {
        nl: "Disclaimer diensten (naast formulier)",
        en: "Disclaimer services",
      },
      type: "richText",
    },
    {
      name: "form",
      label: {
        nl: "Formulier",
        en: "Form",
      },
      type: "relationship",
      relationTo: "forms",
      // required: true,
    },
  ],
};
