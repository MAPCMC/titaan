import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { Triangle } from "./_components/Triangle";
import Image from "next/image";
import { MainLogo } from "./_components/MainLogo";
import { Media } from "@/payload-types";
import Link from "next/link";
import { Lexical } from "@/app/(app)/_components/Lexical";
// import { Button } from '@/app/(app)/_components/Button';

const payload = await getPayloadHMR({ config });

function isMedia(logo: any): logo is Media {
  return (logo as Media).url !== undefined;
}

export default async function Home() {
  const HomeData = await payload.findGlobal({
    slug: "home",
    depth: 4,
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
  return (
    <>
      <div className="w-full overflow-hidden pb-[50%]">
        <div className="navbar max-w-5xl mx-auto px-4 pt-12 flex items-center justify-between">
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
              return (
                <a
                  key={i}
                  href={item.link}
                  className="h-small"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="-mt-[50%]">
        {HomeData.layout?.map((block) => {
          return (() => {
            switch (block.blockType) {
              case "header":
                return (
                  <div
                    key={block.id}
                    className="relative overflow-hidden"
                  >
                    <header className="max-w-5xl mx-auto p-4">
                      {block.title && (
                        <h1 className="h-medium max-w-4xl">
                          {block.title}
                        </h1>
                      )}
                      {block.introduction && (
                        <p className="max-w-2xl h-small-light">
                          {block.introduction}
                        </p>
                      )}
                      {block.callToAction?.map((cta, i) => {
                        return (
                          <a
                            key={i}
                            href={cta.link}
                            className="btn"
                          >
                            {cta.label}
                          </a>
                        );
                      })}
                      {block.image &&
                        isMedia(block.image) && (
                          <div className="absolute bottom-0 z-[-1] -right-12 grid grid-cols-2">
                            <Image
                              src={block.image.url ?? ""}
                              alt={block.image.alt ?? ""}
                              width={
                                block.image.width ?? 200
                              }
                              height={
                                block.image.height ?? 200
                              }
                            />
                            <Triangle
                              wrapperClassName="rotate-90 -translate-x-[13.4%]"
                              className="bg-yellow-300/40"
                            />
                          </div>
                        )}
                    </header>
                  </div>
                );
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
                  </section>
                );
              default:
                console.error(`Unknown block type`);
                return null;
            }
          })();
        })}
      </div>
    </>
  );
}
