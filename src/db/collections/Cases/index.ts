import type { CollectionConfig } from "payload";

import { authenticated } from "@/db/access/authenticated";
import { authenticatedOrPublished } from "@/db/access/authenticatedOrPublished";
import { revalidateActiveCases } from "./hooks/revalidateActiveCases";

export const Cases: CollectionConfig = {
  slug: "cases",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "fullname"],
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
    {
      name: "fullname",
      type: "text",
      required: true,
      label: {
        en: "Full Name",
        nl: "Volledige Naam",
      },
    },
    {
      name: "position",
      type: "text",
      label: {
        en: "Position",
        nl: "Functie",
      },
    },
    {
      name: "commentary",
      type: "richText",
      label: {
        en: "Commentary",
        nl: "Commentaar",
      },
    },
  ],

  hooks: {
    afterChange: [revalidateActiveCases],
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
