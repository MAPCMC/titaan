import { Block } from "payload";

export const ClientsBlock: Block = {
  slug: "clients",
  interfaceName: "Clients",
  labels: {
    singular: {
      nl: "Clientenlijst",
      en: "Client list",
    },
    plural: {
      nl: "Clientenlijsten",
      en: "Client lists",
    },
  },
  fields: [
    {
      name: "list",
      type: "array",
      minRows: 1,
      label: {
        nl: "Clienten",
        en: "Clients",
      },
      labels: {
        singular: {
          nl: "Client",
          en: "Client",
        },
        plural: {
          nl: "Clienten",
          en: "Clients",
        },
      },
      fields: [
        {
          name: "logo",
          label: {
            nl: "Logo",
            en: "Logo",
          },
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "url",
          label: {
            nl: "Link",
            en: "Link",
          },
          type: "text",
        },
        {
          name: "companyName",
          label: {
            nl: "Bedrijfsnaam",
            en: "Company name",
          },
          type: "text",
        },
      ],
      admin: {
        components: {
          RowLabel:
            "@/db/blocks/SectionBlock/blocks/ClientsBlock/RowLabel#ArrayRowLabel",
        },
      },
    },
  ],
};
