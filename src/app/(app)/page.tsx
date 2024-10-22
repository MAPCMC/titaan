import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { Triangle } from "@/app/(app)/_components/Triangle";
import Image from "next/image";
import { MainLogo } from "@/app/(app)/_components/MainLogo";
import { CallToAction, Media, Text } from "@/payload-types";
import Link from "next/link";
import { Lexical } from "@/app/(app)/_components/Lexical";
import { Button } from "@/app/(app)/_components/Button";

const payload = await getPayloadHMR({ config });

function isMedia(logo: any): logo is Media {
  return (logo as Media).url !== undefined;
}

function isText(item: CallToAction | Text): item is Text {
  return "text" in item;
}

export default async function Home() {
  const HomeData = await payload.findGlobal({
    slug: "home",
    depth: 4,
  });

  const headerBlock = HomeData.layout?.find(
    (block) => block.blockType === "header"
  );

  const defaultMenuItem = {
    label: "terug naar boven",
    link: "#body",
  };
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
    [defaultMenuItem] as { label: string; link: string }[]
  );

  // TODO add data pages & socials
  const dynamicPages = [] as {
    label: string;
    link: string;
  }[];
  const socials = [] as { label: string; link: string }[];

  return (
    <>
      <div className="w-full overflow-hidden pb-[50%]">
        <div className="max-w-5xl mx-auto px-4 pt-12 flex items-center justify-between">
          <div className="relative">
            <Triangle
              wrapperClassName="absolute -top-[66px] left-[-1307px] z-[-1] -translate-x-1/2 w-[3000px]"
              className="bg-yellow-300 scale-y-[-1]"
            />
            <Link href="/">
              <MainLogo
                position="header"
                className="w-80"
              />
            </Link>
            <Triangle
              wrapperClassName="absolute w-[5000px] top-[66px] z-[-1] left-[-81px] -translate-y-1/2"
              className="bg-yellow-300/[16%] scale-y-[-1] rotate-90"
            />
          </div>
          <nav className="flex gap-8">
            {menuItems?.map((item, i) => {
              // skip back to top default
              if (i === 0) return null;
              return (
                <Link
                  key={i}
                  href={item.link}
                  className="h-small"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="-mt-[50%]">
        {!!headerBlock && (
          <header
            key={headerBlock.id}
            className="overflow-hidden"
          >
            <div className="max-w-5xl mx-auto p-4 grid gap-4 grid-cols-[auto_1fr]">
              {headerBlock.title && (
                <h1 className="h-medium max-w-4xl col-span-full">
                  {headerBlock.title}
                </h1>
              )}
              {headerBlock.introduction && (
                <p className="max-w-2xl h-small-light">
                  {headerBlock.introduction}
                </p>
              )}
              {headerBlock.callToAction?.map((cta, i) => {
                return (
                  <Button asChild key={i}>
                    <Link
                      href={cta.link}
                      className="col-start-1"
                    >
                      {cta.label}
                    </Link>
                  </Button>
                );
              })}
              {headerBlock.image &&
                isMedia(headerBlock.image) && (
                  <div className="col-start-2 row-start-2 row-span-2 flex">
                    <Image
                      src={headerBlock.image.url ?? ""}
                      alt={headerBlock.image.alt ?? ""}
                      width={headerBlock.image.width ?? 200}
                      height={
                        headerBlock.image.height ?? 200
                      }
                    />
                    <Triangle
                      wrapperClassName="rotate-90 -translate-x-[13.4%] w-[200px] shrink-0"
                      className="bg-yellow-300/40"
                    />
                  </div>
                )}
            </div>
          </header>
        )}
        <main className="-mb-[80%] space-y-36">
          {HomeData.layout?.map((block) => {
            return (() => {
              switch (block.blockType) {
                case "header":
                  return null;
                case "section":
                  const idProp = block.anchor
                    ? { id: block.anchor }
                    : {};
                  return (
                    <section
                      {...idProp}
                      key={block.id}
                      className="max-w-5xl mx-auto p-4"
                    >
                      {block.title && (
                        <h2 className="h-large">
                          {block.title}
                        </h2>
                      )}
                      {block.introduction && (
                        <p className="h-small-light max-w-2xl">
                          {block.introduction}
                        </p>
                      )}
                      {!!block.content &&
                        block.content.length > 0 &&
                        block.content?.map(
                          (blockContent, i) => {
                            if (isText(blockContent))
                              return (
                                <Lexical
                                  key={i}
                                  content={
                                    blockContent.text
                                  }
                                />
                              );
                            return null;
                          }
                        )}
                    </section>
                  );
                default:
                  console.error(`Unknown block type`);
                  return null;
              }
            })();
          })}
        </main>
        <footer className="w-full overflow-hidden pt-[80%] pb-36">
          <div className="max-w-5xl mx-auto p-4 flex justify-between items-end pt-36">
            <div>
              <MainLogo
                position="footer"
                className="w-120 mb-16"
              />
              {HomeData.footerCopyright?.root !==
                undefined && (
                <Lexical
                  content={HomeData.footerCopyright}
                />
              )}
            </div>
            <div className="relative">
              <Triangle
                wrapperClassName="absolute -bottom-40 -left-36 z-[-1] origin-bottom-left w-[2000px]"
                className="bg-yellow-300 scale-y-[-1] rotate-180"
              />
              <nav className="min-w-80">
                {/* main menu */}
                <ul className="border border-foreground bg-background">
                  {menuItems?.map((item, i) => {
                    return (
                      <li key={i}>
                        <Link
                          className="block p-3 hover:bg-foreground hover:text-background first-letter:capitalize"
                          href={item.link}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {/* dynamic pages */}
                {dynamicPages.length > 0 && (
                  <ul className="border border-foreground bg-background">
                    {dynamicPages?.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="p-3 hover:bg-foreground hover:text-background"
                        >
                          <a href={item.link}>
                            {item.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {/* social links */}
                {socials?.length > 0 && (
                  <ul className="border border-foreground bg-background">
                    {socials?.map((item, i) => {
                      return (
                        <li key={i} className="">
                          <a
                            target="_blank"
                            href={item.link}
                            className="p-3 hover:bg-foreground hover:text-background"
                          >
                            {item.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
