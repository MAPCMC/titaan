import { Block } from "payload";
import { CallToActionBlock } from "../blocks/CallToActionBlock";

export const HeaderBlock: Block = {
  slug: "header",
  interfaceName: "Header",
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
