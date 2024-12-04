import { GlobalConfig } from "payload";
import { SectionBlock } from "@/db/blocks/SectionBlock";
import { HeaderBlock } from "@/db/blocks/HeaderBlock";
import { revalidateHome } from "./hooks/revalidateHome";
import { ServiceSectionBlock } from "@/db/blocks/ServiceSectionBlock";

export const Home: GlobalConfig = {
  slug: "home",
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
  hooks: {
    afterChange: [revalidateHome],
  },
};
