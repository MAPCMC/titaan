import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { Triangle } from "@/app/(app)/_components/Triangle";
import Image from "next/image";
import { MainLogo } from "@/app/(app)/_components/MainLogo";
import Link from "next/link";
import { Button } from "@/app/(app)/_components/Button";
import { isMedia } from "@/app/(app)/_helpers";
import PageContent from "./_components/PageContent";
import PageFooter from "./_components/PageFooter";

const payload = await getPayloadHMR({ config });

export default async function Home() {
  const HomeData = await payload.findGlobal({
    slug: "home",
    depth: 4,
  });

  const headerData = HomeData.header?.[0];
  const footerData = await payload.findGlobal({
    slug: "footer",
  });

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

  // TODO add data pages & socials
  const dynamicPages = [] as {
    label: string;
    link: string;
  }[];
  const socials = [] as { label: string; link: string }[];

  return (
    <>
      <header className="w-full overflow-hidden pb-[50%] -mb-[50%]">
        <div className="w-full sm:max-w-5xl sm:mx-auto px-4 pt-12 flex items-center justify-between">
          <div className="relative">
            <Triangle
              wrapperClassName="absolute -top-[66px] left-[-1307px] z-[-1] -translate-x-1/2 w-[3000px]"
              className="bg-yellow-300 scale-y-[-1]"
            />
            <Link href="/">
              <MainLogo
                position="header"
                className="w-40 sm:w-80"
              />
            </Link>
            <Triangle
              wrapperClassName="absolute w-[5000px] top-[66px] z-[-1] left-[-81px] -translate-y-1/2"
              className="bg-yellow-300/[16%] scale-y-[-1] rotate-90"
            />
          </div>
          <nav className="flex">
            {menuItems?.map((item, i) => {
              return (
                <Button asChild key={i} variant="link">
                  <Link href={item.link}>
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
        {!!headerData && (
          <div className="max-w-5xl mx-auto p-4 grid gap-4 grid-cols-[auto_1fr]">
            {headerData.title && (
              <h1 className="h-medium max-w-4xl col-span-full">
                {headerData.title}
              </h1>
            )}
            {headerData.introduction && (
              <p className="max-w-2xl h-small-light">
                {headerData.introduction}
              </p>
            )}
            {headerData.callToAction?.map((cta, i) => {
              return (
                <Button asChild key={i} shape="skewed">
                  <Link href={cta.link}>
                    <span>{cta.label}</span>
                  </Link>
                </Button>
              );
            })}
            {headerData.image &&
              isMedia(headerData.image) && (
                <div className="col-start-2 row-start-2 row-span-2 flex">
                  <Image
                    src={headerData.image.url ?? ""}
                    alt={headerData.image.alt ?? ""}
                    width={headerData.image.width ?? 200}
                    height={headerData.image.height ?? 200}
                  />
                  <Triangle
                    wrapperClassName="rotate-90 -translate-x-[13.4%] w-[200px] shrink-0"
                    className="bg-yellow-300/40"
                  />
                </div>
              )}
          </div>
        )}
      </header>

      <PageContent blocks={HomeData.layout} />
      <PageFooter
        anchors={menuItems}
        pages={dynamicPages}
        socials={socials}
        content={footerData?.copyright}
      />
    </>
  );
}
