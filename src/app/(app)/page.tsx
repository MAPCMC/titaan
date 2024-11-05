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

  return (
    <>
      <PageHeader headerData={headerData} />
      <PageContent
        blocks={HomeData.layout}
        className="mt-44"
      />
      <PageFooter />
    </>
  );
}
