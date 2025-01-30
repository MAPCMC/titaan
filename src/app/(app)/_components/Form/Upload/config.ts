import type { Block } from "payload";

export const UploadField: Block = {
  slug: "upload",
  interfaceName: "UploadField",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: {
          en: "Name (lowercase, no special characters)",
          nl: "Naam (lowercase, geen speciale characters)",
        },
      },
    },
    {
      name: "label",
      label: {
        en: "Label",
        nl: "Label",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "required",
      type: "checkbox",
      label: {
        en: "Required",
        nl: "Verplicht",
      },
      defaultValue: false,
    },
    // {
    //   name: 'file',
    //   type: 'upload',
    //   relationTo: 'public-media',
    // },
  ],
  labels: {
    plural: {
      en: "Uploads",
      nl: "Uploads",
    },
    singular: {
      en: "Upload",
      nl: "Upload",
    },
  },
};
