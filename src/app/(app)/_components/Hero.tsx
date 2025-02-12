import React from "react";
import { Header } from "@/payload-types";
import { Triangle } from "@/app/(app)/_components/Triangle";
import { CallToAction } from "@/app/(app)/_components/CallToAction";
import { isMedia } from "@/app/(app)/_helpers";

import Image from "next/image";

export default function Hero({ data }: { data: Header }) {
  const { title, introduction, callToAction, image } = data;
  return (
    <div className="mx-auto mt-12 flex max-w-5xl flex-wrap gap-4 p-4 sm:grid sm:grid-cols-[auto_1fr]">
      {title && (
        <h1 className="h-medium col-span-full w-full max-w-4xl">{title}</h1>
      )}
      {introduction && (
        <p className="h-small-light w-full max-w-2xl max-sm:order-last">
          {introduction}
        </p>
      )}
      {callToAction && callToAction?.length > 0 && (
        <div className="motion-safe:motion-preset-rebound-down motion-delay-500 col-start-1 flex flex-wrap items-start gap-2 sm:max-sm:row-start-3 md:items-end">
          {callToAction?.map((cta, i) => (
            <CallToAction
              key={i}
              type={cta.type}
              action={cta.action}
              label={cta.label}
              variant={cta.variant}
            />
          ))}
        </div>
      )}
      {image && isMedia(image) && (
        <div className="motion-safe:motion-translate-x-in-[183%] motion-safe:motion-scale-in-[.5] motion-safe:motion-opacity-in-[0%] motion-safe:motion-translate-y-in-[25%] motion-delay-1000 motion-duration-1500 relative col-start-2 row-span-2 row-start-2 ml-auto max-xl:mr-20 max-md:h-40 max-md:w-40 md:h-52 md:w-52">
          <Image
            src={image.url ?? ""}
            alt={image.alt ?? ""}
            width={300}
            height={300}
            className="h-full w-full"
          />
          {/* light from right to left */}
          <Triangle
            wrapperClassName="absolute inset-0 translate-x-full"
            className="bg-yellow/20"
            orientation="right"
          />
        </div>
      )}
    </div>
  );
}
