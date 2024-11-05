import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import PageHeader from "./_components/PageHeader";
import PageContent from "./_components/PageContent";
import PageFooter from "./_components/PageFooter";

const payload = await getPayloadHMR({ config });

export default async function Home() {
  const HomeData = await payload.findGlobal({
    slug: "home",
    depth: 4,
  });

  const headerData = HomeData.header?.[0];

  const menuItems = HomeData.layout?.reduce(
    (acc, block) => {
      if (block.blockType === "section" && block.anchor) {
        acc.push({
          label: block.title,
          link: `#${block.anchor}`,
        });
      }
      return acc;
    },
    [] as { label: string; link: string }[]
  );

  return (
    <>
      <PageHeader
        menuItems={menuItems ?? []}
        headerData={headerData}
      />
      <PageContent blocks={HomeData.layout} />
      <PageFooter anchors={menuItems} />
    </>
  );
}
