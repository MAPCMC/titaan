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
      if (block.blockType === "section" && block.title && block.anchor) {
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
    <header className="w-full overflow-hidden pb-[50%] -mb-[50%]">
      <nav className="grid grid-flow-col auto-cols-fr w-full border-b border-foreground bg-background md:hidden z-10">
        {menuItems?.map((item, i) => {
          return (
            <Button
              asChild
              key={i}
              variant="link"
              className="w-full md:w-auto h-full flex"
            >
              <Link href={item.link}>
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="max-w-5xl p-4 pt-12 mx-auto flex flex-col-reverse md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Triangle
            wrapperClassName="absolute -top-14 left-[-36rem] lg:left-[-34.3rem] z-[-1] -translate-x-1/2 w-[80rem]"
            className="bg-yellow scale-y-[-1]"
          />
          <>
            <Link
              href="/"
              className="block max-w-max ring-offset-background focus-visible:outline-none focus-visible:ring-2 hover:outline hover:outline-offset-2 hover:outline-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <MainLogo
                position="header"
                className={cn("w-60 md:w-48 h-auto", {
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
              className="bg-yellow-light !ml-0"
              orientation="left"
            />
          </>
        </div>
        <nav className="max-md:hidden flex w-auto z-10 lg:-mr-6">
          {menuItems?.map((item, i) => {
            return (
              <Button
                asChild
                key={i}
                variant="link"
                className="w-full md:w-auto md:px-6"
              >
                <Link href={item.link}>
                  <span>{item.label}</span>
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
