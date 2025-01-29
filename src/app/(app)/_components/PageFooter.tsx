import Link from "next/link";
import { isLexicalText } from "@/app/(app)/_helpers";
import { Triangle } from "@/app/(app)/_components/Triangle";
import { MainLogo } from "@/app/(app)/_components/MainLogo";
import { Lexical } from "@/app/(app)/_components/Lexical";
import { Button } from "@/app/(app)/_components/Button";
import { getCachedGlobal } from "@/db/utilities/getGlobals";
import { Home as HomeData, Footer as FooterData } from "@/payload-types";
import { getCachedPages } from "@/db/collections/Pages/utilities/getActivePages";
import { BackToTopButton } from "./BackToTopButton";

export default async function PageFooter() {
  const HomeData: HomeData = await getCachedGlobal("home", 4)();
  const footerData: FooterData = await getCachedGlobal("footer")();
  const pages = await getCachedPages()();

  const menuItems = HomeData.layout?.reduce(
    (acc, block) => {
      if (
        (block.blockType === "section" ||
          block.blockType === "serviceSection") &&
        block.title &&
        block.anchor
      ) {
        acc.push({
          label: block.title,
          link: `/#${block.anchor}`,
        });
      }
      return acc;
    },
    [] as { label: string; link: string }[],
  );

  const footerAnchors = [...(menuItems ?? [])];

  return (
    <footer className="mt-[-50%] w-full overflow-hidden pt-[50%] pb-12 md:pb-36">
      <div className="mx-auto flex max-w-5xl gap-x-12 p-4 pt-36 max-md:flex-col md:items-end md:justify-between">
        <div>
          <MainLogo
            position="footer"
            className="mb-12 h-auto w-120 max-w-full"
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
            wrapperClassName="absolute -bottom-40 left-1/2 md:-left-36 z-[-1] w-[2000px] flex flex-col justify-end"
            className="bg-yellow"
          />
          <nav className="z-10 min-w-80">
            {/* main page anchors menu */}
            <ul className="border-foreground bg-background border">
              <li>
                <BackToTopButton />
              </li>
              {footerAnchors?.map((item, i) => {
                return (
                  <li key={i}>
                    <Button
                      asChild
                      variant="link"
                      className="flex w-full justify-start"
                    >
                      <Link href={item.link} className="block">
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
              <ul className="border-foreground bg-background border border-t-0">
                {pages?.map((item, i) => {
                  if (!item.slug || !item.title) {
                    console.error("missing slug or title", item);
                    return null;
                  }
                  return (
                    <li key={i}>
                      <Button
                        asChild
                        variant="link"
                        className="flex w-full justify-start"
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
              <ul className="border-foreground bg-background border border-t-0">
                {footerData?.socials?.map((item, i) => {
                  return (
                    <li key={i} className="">
                      <Button
                        asChild
                        variant="link"
                        className="flex w-full justify-start"
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
        <Lexical content={footerData?.copyright} className="px-4 md:hidden" />
      )}
    </footer>
  );
}
