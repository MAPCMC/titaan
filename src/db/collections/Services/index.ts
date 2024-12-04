import type { CollectionConfig } from "payload";

import { authenticated } from "@/db/access/authenticated";
import { authenticatedOrPublished } from "@/db/access/authenticatedOrPublished";
import { revalidateServices } from "./hooks/revalidateServices";

export const Services: CollectionConfig = {
  slug: "services",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    plural: {
      nl: "Diensten",
      en: "Services",
    },
    singular: {
      nl: "Dienst",
      en: "Service",
    },
  },
  admin: {
    defaultColumns: ["title", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        nl: "Titel",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: {
        en: "Content",
        nl: "Inhoud",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateServices],
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
