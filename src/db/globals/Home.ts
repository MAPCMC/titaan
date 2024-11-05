import { GlobalConfig } from "payload";
import { SectionBlock } from "../blocks/SectionBlock";
import { HeaderBlock } from "../blocks/HeaderBlock";

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
      blocks: [SectionBlock],
    },
  ],
};
