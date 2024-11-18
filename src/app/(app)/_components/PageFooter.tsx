import Link from "next/link";
import { isLexicalText } from "@/app/(app)/_helpers";
import { Triangle } from "@/app/(app)/_components/Triangle";
import { MainLogo } from "@/app/(app)/_components/MainLogo";
import { Lexical } from "@/app/(app)/_components/Lexical";
import { Button } from "@/app/(app)/_components/Button";
import { getCachedGlobal } from "@/db/utilities/getGlobals";
import {
  Home as HomeData,
  Footer as FooterData,
} from "@/payload-types";
import { getCachedPages } from "@/db/collections/Pages/utilities/getActivePages";

export default async function PageFooter() {
  const HomeData: HomeData = await getCachedGlobal(
    "home",
    4
  )();
  const footerData: FooterData =
    await getCachedGlobal("footer")();
  const pages = await getCachedPages()();

  const menuItems = HomeData.layout?.reduce(
    (acc, block) => {
      if (block.blockType === "section" && block.anchor) {
        acc.push({
          label: block.title,
          link: `/#${block.anchor}`,
        });
      }
      return acc;
    },
    [] as { label: string; link: string }[]
  );

  const footerAnchors = [
    {
      label: "terug naar boven",
      link: "#body",
    },
    ...(menuItems ?? []),
  ];

  return (
    <footer className="w-full overflow-hidden pt-[50%] mt-[-50%] pb-12 md:pb-36">
      <div className="max-w-5xl mx-auto p-4 gap-x-12 flex max-md:flex-col md:justify-between md:items-end pt-36">
        <div>
          <MainLogo
            position="footer"
            className="w-120 h-auto max-w-full mb-12"
          />
          {isLexicalText(footerData?.copyright) && (
            <Lexical
              content={footerData?.copyright}
              className="max-md:hidden"
            />
          )}
        </div>
        <div className="relative">
          <Triangle
            wrapperClassName="absolute -bottom-40 left-1/2 md:-left-36 z-[-1] origin-bottom-left w-[2000px]"
            className="bg-yellow scale-y-[-1] rotate-180"
          />
          <nav className="min-w-80 z-10">
            {/* main page anchors menu */}
            <ul className="border border-foreground bg-background">
              {footerAnchors?.map((item, i) => {
                return (
                  <li key={i}>
                    <Button
                      asChild
                      variant="link"
                      className="w-full flex justify-start"
                    >
                      <Link
                        href={item.link}
                        className="block"
                      >
                        <span className="first-letter:uppercase">
                          {item.label}
                        </span>
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
            {/* dynamic pages */}
            {(pages ?? []).length > 0 && (
              <ul className="border border-foreground bg-background border-t-0">
                {pages?.map((item, i) => {
                  if (!item.slug || !item.title) {
                    console.error(
                      "missing slug or title",
                      item
                    );
                    return null;
                  }
                  return (
                    <li key={i}>
                      <Button
                        asChild
                        variant="link"
                        className="w-full flex justify-start"
                      >
                        <Link href={`/${item.slug}`}>
                          <span className="first-letter:uppercase">
                            {item.title}
                          </span>
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
            {/* social links */}
            {(footerData?.socials || [])?.length > 0 && (
              <ul className="border border-foreground bg-background border-t-0">
                {footerData?.socials?.map((item, i) => {
                  return (
                    <li key={i} className="">
                      <Button
                        asChild
                        variant="link"
                        className="w-full flex justify-start"
                      >
                        <a target="_blank" href={item.link}>
                          <span className="first-letter:uppercase">
                            {item.label}
                          </span>
                        </a>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </div>
      </div>
      {isLexicalText(footerData?.copyright) && (
        <Lexical
          content={footerData?.copyright}
          className="px-4 md:hidden"
        />
      )}
    </footer>
  );
}
