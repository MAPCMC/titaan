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
      label: "zoekwoord",
      admin: {
        description: "Dit zie je in de zoekbalk (1 woord, geen tekens)",
      },
    },
    {
      name: "multiple",
      type: "checkbox",
      required: true,
      defaultValue: false,
      label: "meerdere opties toestaan",
      admin: {
        description: "Selecteer wanneer meerdere opties aankruisen mogelijk is",
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
      label: "Keuzeopties",
      labels: {
        singular: "keuzeoptie",
        plural: "keuzeopties",
      },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "label",
          label: {
            nl: "Dit lees je in de filter",
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
          label: "Volgende filters in deze tak",
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
