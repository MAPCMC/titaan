import React from "react";
import { Header } from "@/payload-types";
import Link from "next/link";
import { Triangle } from "@/app/(app)/_components/Triangle";
import { Button } from "@/app/(app)/_components/Button";
import { isMedia } from "@/app/(app)/_helpers";

import Image from "next/image";

export default function Hero({ data }: { data: Header }) {
  const { title, introduction, callToAction, image } = data;
  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-wrap sm:grid sm:grid-cols-[auto_1fr] gap-4 mt-12">
      {title && (
        <h1 className="h-medium max-w-4xl col-span-full">
          {title}
        </h1>
      )}
      {introduction && (
        <p className="max-w-2xl w-full h-small-light max-sm:order-last">
          {introduction}
        </p>
      )}
      {callToAction && callToAction?.length > 0 && (
        <div className="sm:max-sm:row-start-3 flex flex-wrap gap-2 items-start md:items-end">
          {callToAction?.map((cta, i) => {
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
      {image && isMedia(image) && (
        <div className="col-start-2 row-start-2 row-span-2 relative max-md:h-40 max-md:w-40 md:h-52 md:w-52 ml-auto max-xl:mr-20">
          <Image
            src={image.url ?? ""}
            alt={image.alt ?? ""}
            width={image.width ?? 300}
            height={image.height ?? 300}
            className="h-full w-full"
          />
          <Triangle
            wrapperClassName="absolute inset-0 rotate-90 translate-x-[calc(100%-13.3%)]"
            className="bg-yellow/20"
          />
        </div>
      )}
    </div>
  );
}