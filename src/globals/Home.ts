import { Block, GlobalConfig } from "payload";

const CallToActionBlock: Block = {
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

const TextBlock: Block = {
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

const SectionBlock: Block = {
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
      required: true,
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

const HeaderSectionBlock: Block = {
  slug: "header",
  interfaceName: "HeaderSection",
  labels: {
    singular: {
      nl: "Paginakop",
      en: "Header",
    },
    plural: {
      nl: "Paginakoppen",
      en: "Headers",
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
      required: true,
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
      name: "image",
      label: {
        nl: "Afbeelding",
        en: "Image",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "callToAction",
      label: {
        nl: "Actieknop",
        en: "Call to action",
      },
      type: "blocks",
      blocks: [CallToActionBlock],
    },
  ],
};

export const Home: GlobalConfig = {
  slug: "home",
  fields: [
    {
      name: "layout",
      type: "blocks",
      minRows: 1,
      maxRows: 10,
      blocks: [HeaderSectionBlock, SectionBlock],
    },
    {
      name: "footerCopyright",
      label: {
        nl: "Copyright footer",
        en: "Copyright footer",
      },
      type: "richText",
    },
  ],
};
