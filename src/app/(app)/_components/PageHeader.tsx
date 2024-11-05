import Link from "next/link";
import { Triangle } from "@/app/(app)/_components/Triangle";
import { MainLogo } from "@/app/(app)/_components/MainLogo";
import { Button } from "@/app/(app)/_components/Button";
import { Header } from "@/payload-types";

import Image from "next/image";
import {
  isMedia,
  isHeader,
  cn,
} from "@/app/(app)/_helpers";

export default async function PageHeader({
  menuItems,
  headerData,
}: {
  menuItems: { link: string; label: string }[];
  headerData?: Header | { title: string };
}) {
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
                  "lg:w-80": isHeader(headerData),
                })}
              />
            </Link>
            <Triangle
              wrapperClassName={cn(
                "absolute w-[120rem] top-[1.8rem] left-[4rem] -translate-y-1/2 z-[-1] md:top-[1.5rem] md:left-[1.5rem]",
                {
                  "lg:top-[2.5rem] lg:left-[8rem]":
                    isHeader(headerData),
                }
              )}
              className="bg-yellow-light scale-y-[-1] rotate-90"
            />
          </>
        </div>
        <nav className="max-md:hidden flex w-auto z-10">
          {menuItems?.map((item, i) => {
            return (
              <Button
                asChild
                key={i}
                variant="link"
                className="w-full md:w-auto"
              >
                <Link href={item.link}>
                  <span>{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
      {isHeader(headerData) && (
        <div className="max-w-5xl mx-auto p-4 flex flex-wrap sm:grid sm:grid-cols-[auto_1fr] gap-4">
          {headerData.title && (
            <h1 className="h-medium max-w-4xl col-span-full">
              {headerData.title}
            </h1>
          )}
          {headerData.introduction && (
            <p className="max-w-2xl h-small-light max-sm:order-last">
              {headerData.introduction}
            </p>
          )}
          {headerData.callToAction &&
            headerData.callToAction?.length > 0 && (
              <div className="sm:max-sm:row-start-3 flex flex-wrap gap-2 items-end">
                {headerData.callToAction?.map((cta, i) => {
                  return (
                    <Button asChild key={i} shape="skewed">
                      <Link href={cta.link}>
                        <span>{cta.label}</span>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}
          {headerData.image &&
            isMedia(headerData.image) && (
              <div className="col-start-2 row-start-2 row-span-2 relative max-md:h-40 max-md:w-40 md:h-52 md:w-52 ml-auto max-xl:mr-20">
                <Image
                  src={headerData.image.url ?? ""}
                  alt={headerData.image.alt ?? ""}
                  width={headerData.image.width ?? 300}
                  height={headerData.image.height ?? 300}
                  className="h-full w-full"
                />
                <Triangle
                  wrapperClassName="absolute inset-0 rotate-90 translate-x-[calc(100%-13.3%)]"
                  className="bg-yellow/20"
                />
              </div>
            )}
        </div>
      )}
    </header>
  );
}
