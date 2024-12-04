import React from "react";
import { Section, ServiceSection } from "@/payload-types";
import { cn } from "../_helpers";
import { BlocksContent } from "./BlocksContent";
import { Services } from "./Services";
import { PageSectionTriangle } from "./PageSectionTriangle";

export default function PageContent({
  blocks,
  className,
  variant,
}: {
  className?: string;
  variant?: "home";
  blocks: (Section | ServiceSection)[] | null | undefined;
}) {
  const isHome = variant === "home";

  if (!blocks || blocks.length < 1) return null;
  return (
    <main className={cn("grow space-y-36 overflow-x-hidden", className)}>
      {blocks?.map((block, i) => {
        return (() => {
          switch (block.type) {
            case "section-clients": {
              return (
                <section className="bg-white/30" key={block.id}>
                  {block.title && (
                    <h2 className={isHome ? "hidden" : "h-medium"}>
                      {block.title}
                    </h2>
                  )}
                  <BlocksContent content={block.content} />
                </section>
              );
            }
            case "section-services": {
              const idProp = block.anchor ? { id: block.anchor } : {};
              return (
                <section {...idProp} key={block.id}>
                  <div className="mx-auto max-w-5xl p-4">
                    {block.title && (
                      <h2 className={isHome ? "h-large" : "h-medium"}>
                        {block.title}
                      </h2>
                    )}
                    {block.introduction && (
                      <p className="h-small-light max-w-2xl">
                        {block.introduction}
                      </p>
                    )}
                  </div>
                  <Services section={block} />
                </section>
              );
            }
            case "section-cases":
            case "section-text": {
              const idProp = block.anchor ? { id: block.anchor } : {};

              // Quick implementation of home background triangle
              if (blocks.length > 4 && i === 2 && isHome) {
                return (
                  <PageSectionTriangle
                    id={block.anchor}
                    key={block.id}
                    triangleProps={{
                      orientation: "left",
                      wrapperClassName:
                        "w-[180%] max-w-6xl absolute right-0 top-1/2 -translate-y-1/2 z-[-1] flex justify-end",
                      className: "bg-blue-light",
                    }}
                  >
                    {block.title && (
                      <h2 className={isHome ? "h-large" : "h-medium"}>
                        {block.title}
                      </h2>
                    )}
                    {block.introduction && (
                      <p className="h-small-light max-w-2xl">
                        {block.introduction}
                      </p>
                    )}
                    <BlocksContent content={block.content} />
                  </PageSectionTriangle>
                );
              }
              if (blocks.length > 4 && i === 3 && isHome) {
                return (
                  <PageSectionTriangle
                    id={block.anchor}
                    key={block.id}
                    triangleProps={{
                      orientation: "right",
                      wrapperClassName:
                        "w-[140%] md:w-3/4 max-w-4xl absolute left-0 top-1/2 -translate-y-1/2 z-[-1]",
                      className: "bg-yellow-light",
                    }}
                  >
                    {block.title && (
                      <h2 className={isHome ? "h-large" : "h-medium"}>
                        {block.title}
                      </h2>
                    )}
                    {block.introduction && (
                      <p className="h-small-light max-w-2xl">
                        {block.introduction}
                      </p>
                    )}
                    <BlocksContent content={block.content} />
                  </PageSectionTriangle>
                );
              }

              return (
                <section
                  {...idProp}
                  key={block.id}
                  className="mx-auto max-w-5xl p-4"
                >
                  {block.title && (
                    <h2 className={isHome ? "h-large" : "h-medium"}>
                      {block.title}
                    </h2>
                  )}
                  {block.introduction && (
                    <p className="h-small-light max-w-2xl">
                      {block.introduction}
                    </p>
                  )}
                  <BlocksContent content={block.content} />
                </section>
              );
            }
            default: {
              console.error(`Unknown page section type`);
              return null;
            }
          }
        })();
      })}
    </main>
  );
}
