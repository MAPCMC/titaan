import PageHeader from "./_components/PageHeader";
import PageContent from "./_components/PageContent";
import PageFooter from "./_components/PageFooter";
import Hero from "./_components/Hero";
import { getCachedGlobal } from "@/db/utilities/getGlobals";
import { Home as HomeData } from "@/payload-types";

export default async function Home() {
  const home: HomeData = await getCachedGlobal("home", 4)();

  const headerData = home.header?.[0];

  return (
    <>
      <PageHeader>{headerData && <Hero data={headerData} />}</PageHeader>
      {home.layout && (
        <PageContent blocks={home.layout} className="mt-32" variant="home" />
      )}
      <PageFooter />
    </>
  );
}
