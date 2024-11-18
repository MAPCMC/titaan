import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import PageHeader from "./_components/PageHeader";
import PageContent from "./_components/PageContent";
import PageFooter from "./_components/PageFooter";
import { getCachedGlobal } from "@/db/utilities/getGlobals";
import { Home as HomeData } from "@/payload-types";

export default async function Home() {
  const HomeData: HomeData = await getCachedGlobal(
    "home",
    4
  )();

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
