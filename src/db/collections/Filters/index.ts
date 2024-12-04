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
      name: "key",
      type: "text",
      required: true,
    },
    {
      name: "level",
      type: "number",
      required: true,
    },
    {
      name: "multiple",
      type: "checkbox",
      required: true,
      defaultValue: false,
    },
    {
      name: "options",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "label",
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
          hasMany: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.level === _.level + 1;
            },
          },
        },
      ],
    },
  ],

  hooks: {
    afterChange: [revalidateFilter],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 600,
      },
    },
    maxPerDoc: 20,
  },
};
