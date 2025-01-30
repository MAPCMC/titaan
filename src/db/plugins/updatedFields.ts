import {
  lexicalEditor,
  FixedToolbarFeature,
  UnorderedListFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";

import type { Block } from "payload";

export const updatedFields = (fields: any[]) => {
  return fields.map((field) => ({
    ...field,
    fields: [
      ...((field as Block).fields || []),
      {
        name: "placeholder",
        type: "text",
        label: {
          en: "Placeholder",
          nl: "Placeholder",
        },
      },
      {
        name: "addDescription",
        type: "checkbox",
        label: {
          en: "Add description",
          nl: "Voeg omschrijving toe",
        },
      },
      {
        name: "description",
        type: "richText",
        label: {
          en: "Description",
          nl: "Omschrijving",
        },
        admin: {
          condition: (_: any, siblingData: any) => {
            return siblingData.addDescription;
          },
        },
        localized: true,
        editor: lexicalEditor({
          features: ({ rootFeatures }) => {
            return [
              ...rootFeatures,
              FixedToolbarFeature(),
              UnorderedListFeature(),
              InlineToolbarFeature(),
            ];
          },
        }),
      },
    ],
  }));
};
