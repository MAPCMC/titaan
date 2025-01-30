import type { CollectionConfig } from "payload";

import { authenticated } from "@/db/access/authenticated";
import { authenticatedOrPublished } from "@/db/access/authenticatedOrPublished";
import { revalidateFilter } from "./hooks/revalidate";

export const Filters: CollectionConfig = {
  slug: "filters",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    plural: {
      nl: "Dienst filters",
      en: "Service filters",
    },
    singular: {
      nl: "Dienst filter",
      en: "Service filter",
    },
  },
  admin: {
    defaultColumns: ["key", "level", "updatedAt"],
    useAsTitle: "key",
  },
  fields: [
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "level",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "key",
      type: "text",
      required: true,
      label: { nl: "zoekwoord", en: "search term" },
      admin: {
        description: {
          nl: "Dit zie je in de zoekbalk (1 woord, geen tekens)",
          en: "This is shown in the search bar (1 word, no special characters)",
        },
      },
    },
    {
      name: "multiple",
      type: "checkbox",
      required: true,
      defaultValue: false,
      label: { nl: "meerdere opties toestaan", en: "multiple options allowed" },
      admin: {
        description: {
          nl: "Selecteer wanneer meerdere opties aankruisen mogelijk is",
          en: "Select when multiple options can be checked",
        },
      },
    },
    {
      name: "options",
      type: "array",
      admin: {
        components: {
          RowLabel: "@/db/_components/RowDataLabel#RowDataLabel",
        },
      },
      label: { nl: "Keuzeopties", en: "Choice options" },
      labels: {
        singular: { nl: "keuzeoptie", en: "choice option" },
        plural: { nl: "keuzeopties", en: "choice options" },
      },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          label: { nl: "Waarde", en: "Value" },
        },
        {
          name: "label",
          label: {
            nl: "Dit lees je in de filter",
            en: "This is shown in the filter",
          },
          type: "text",
          required: true,
        },
        {
          name: "services",
          type: "relationship",
          relationTo: "services",
          hasMany: true,
        },
        {
          name: "filters",
          type: "relationship",
          relationTo: "filters",
          label: {
            nl: "Volgende filters in deze tak",
            en: "Next filters in this level",
          },
          hasMany: true,
          filterOptions: ({ data }) => {
            // returns a Where query dynamically by the type of relationship
            return {
              level: {
                equals: data.level + 1,
              },
            };
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFilter],
  },
};
