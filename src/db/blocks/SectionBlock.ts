import { Block } from "payload";
import { CallToActionBlock } from "../blocks/CallToActionBlock";
import { TextBlock } from "../blocks/TextBlock";

export const SectionBlock: Block = {
  slug: "section",
  interfaceName: "Section",
  labels: {
    singular: {
      nl: "Sectie",
      en: "Section",
    },
    plural: {
      nl: "Secties",
      en: "Sections",
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
      options: [
        {
          label: {
            nl: "Tekst",
            en: "Text",
          },
          value: "section-text",
        },
        {
          label: {
            nl: "Partners",
            en: "Partners",
          },
          value: "section-partners",
        },
        {
          label: {
            nl: "Services",
            en: "Services",
          },
          value: "section-services",
        },
        {
          label: {
            nl: "Cases",
            en: "Cases",
          },
          value: "section-cases",
        },
      ],
    },
    {
      name: "content",
      label: {
        nl: "Inhoud",
        en: "Content",
      },
      type: "blocks",
      blocks: [CallToActionBlock, TextBlock],
    },
  ],
};
