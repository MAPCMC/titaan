import Link from "next/link";
import { isLexicalText } from "@/app/(app)/_helpers";
import { Triangle } from "@/app/(app)/_components/Triangle";
import { MainLogo } from "@/app/(app)/_components/MainLogo";
import { Lexical } from "@/app/(app)/_components/Lexical";
import { Button } from "@/app/(app)/_components/Button";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

const payload = await getPayloadHMR({ config });

export default async function PageFooter({
  anchors,
}: {
  anchors?: { label: string; link: string }[];
}) {
  const { docs: pages } = await payload.find({
    collection: "pages",
    limit: 100,
    depth: 0,
    where: {
      slug: {
        not_equals: "home",
      },
    },
  });

  const footerAnchors = [
    {
      label: "terug naar boven",
      link: "#body",
    },
    ...(anchors ?? []),
  ];

  const footerData = await payload.findGlobal({
    slug: "footer",
  });

  return (
    <footer className="w-full overflow-hidden pt-[80%] mt-[-80%] pb-36">
      <div className="max-w-5xl mx-auto p-4 flex justify-between items-end pt-36">
        <div>
          <MainLogo
            position="footer"
            className="w-120 mb-16"
          />
          {isLexicalText(footerData?.copyright) && (
            <Lexical content={footerData?.copyright} />
          )}
        </div>
        <div className="relative">
          <Triangle
            wrapperClassName="absolute -bottom-40 -left-36 z-[-1] origin-bottom-left w-[2000px]"
            className="bg-yellow-300 scale-y-[-1] rotate-180"
          />
          <nav className="min-w-80">
            {/* main page anchors menu */}
            <ul className="border border-foreground bg-background">
              {footerAnchors?.map((item, i) => {
                return (
                  <li key={i}>
                    <Button
                      asChild
                      variant="link"
                      className="w-full justify-start"
                    >
                      <Link href={item.link}>
                        {item.label}
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
                        className="w-full justify-start"
                      >
                        <Link href={`/${item.slug}`}>
                          {item.title}
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
                        className="w-full justify-start"
                      >
                        <a
                          target="_blank"
                          href={item.link}
                          className="p-3 hover:bg-foreground hover:text-background"
                        >
                          {item.label}
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
    </footer>
  );
}