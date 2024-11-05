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
    {
      name: "socials",
      label: {
        nl: "Socials",
        en: "Socials",
      },
      type: "array",
      admin: {
        initCollapsed: true,
        isSortable: true,
        components: {
          RowLabel:
            "@/db/globals/Footer/SocialRowLabel#SocialRowLabel",
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
    },
  ],
};
