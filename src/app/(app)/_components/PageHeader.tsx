import Link from "next/link";
import { Triangle } from "@/app/(app)/_components/Triangle";
import { MainLogo } from "@/app/(app)/_components/MainLogo";
import { Button } from "@/app/(app)/_components/Button";
import { Home as HomeData } from "@/payload-types";
import { getCachedGlobal } from "@/db/utilities/getGlobals";

import { cn } from "@/app/(app)/_helpers";

export default async function PageHeader({
  children,
  logoLarge = true,
}: {
  logoLarge?: boolean;
  children: React.ReactNode;
}) {
  const HomeData: HomeData = await getCachedGlobal("home", 4)();

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

  return (
    <header className="-mb-[50%] w-full overflow-hidden pb-[50%]">
      <nav className="border-foreground bg-background z-10 grid w-full auto-cols-fr grid-flow-col border-b md:hidden">
        {menuItems?.map((item, i) => {
          return (
            <Button
              asChild
              key={i}
              variant="link"
              className="flex h-full w-full md:w-auto"
            >
              <Link href={item.link}>
                <span className="first-letter:uppercase">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="mx-auto flex max-w-5xl flex-col-reverse p-4 pt-12 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Triangle
            wrapperClassName="absolute -top-14 left-[-36rem] lg:left-[-34.3rem] z-[-1] -translate-x-1/2 w-[80rem]"
            className="bg-yellow"
            orientation="down"
          />
          <>
            <Link
              id="homeLink"
              href="/"
              className="ring-offset-foreground focus-visible:ring-blue block max-w-max hover:outline-2 hover:outline-offset-6 focus-visible:ring-8 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              <MainLogo
                position="header"
                className={cn("h-auto w-60 md:w-48", {
                  "lg:w-80": logoLarge,
                })}
              />
            </Link>
            <Triangle
              wrapperClassName={cn(
                "absolute w-[120rem] top-[1.8rem] left-[12rem] -translate-y-1/2 z-[-1] md:top-[1.5rem] md:left-[9.6rem]",
                {
                  "lg:top-[2.5rem] lg:left-[16rem]": logoLarge,
                },
              )}
              className="animate-light from-yellow-light ml-0! origin-left bg-linear-to-r from-50% to-transparent to-50% bg-[size:200%_100%] bg-[position:0%_0%] opacity-0"
              orientation="left"
            />
          </>
        </div>
        <nav className="z-10 flex w-auto max-md:hidden lg:-mr-6">
          {menuItems?.map((item, i) => {
            return (
              <Button
                asChild
                key={i}
                variant="link"
                className="w-full md:w-auto md:px-6"
              >
                <Link href={item.link}>
                  <span className="first-letter:uppercase">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>

      {children}
    </header>
  );
}
