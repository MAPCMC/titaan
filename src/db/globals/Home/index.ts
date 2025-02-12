import { GlobalConfig } from "payload";
import { SectionBlock } from "@/db/blocks/SectionBlock";
import { HeaderBlock } from "@/db/blocks/HeaderBlock";
import { revalidateHome } from "./hooks/revalidateHome";
import { ServiceSectionBlock } from "@/db/blocks/ServiceSectionBlock";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const Home: GlobalConfig = {
  slug: "home",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "header",
              type: "blocks",
              minRows: 1,
              maxRows: 1,
              blocks: [HeaderBlock],
            },
            {
              name: "layout",
              type: "blocks",
              minRows: 1,
              maxRows: 10,
              blocks: [SectionBlock, ServiceSectionBlock],
            },
          ],
          label: {
            nl: "Inhoud",
            en: "Content",
          },
        },
        {
          name: "meta",
          label: {
            nl: "SEO",
            en: "SEO",
          },
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
};
