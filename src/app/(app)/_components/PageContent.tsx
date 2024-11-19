import React from "react";
import { Section } from "@/payload-types";
import { cn, isTextBlock } from "../_helpers";

import { Lexical } from "./Lexical";

export default function PageContent({
  blocks,
  className,
  variant,
}: {
  className?: string;
  variant?: "home";
  blocks: Section[] | null | undefined;
}) {
  const isHome = variant === "home";

  if (!blocks || blocks.length < 1) return null;
  return (
    <main className={cn("space-y-36 grow", className)}>
      {blocks?.map((block) => {
        return (() => {
          switch (block.blockType) {
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
                    <h2
                      className={
                        isHome ? "h-large" : "h-medium"
                      }
                    >
                      {block.title}
                    </h2>
                  )}
                  {block.introduction && (
                    <p className="h-small-light max-w-2xl">
                      {block.introduction}
                    </p>
                  )}
                  {!!block.content &&
                    block.content.length > 0 &&
                    block.content?.map(
                      (blockContent, i) => {
                        if (isTextBlock(blockContent))
                          return (
                            <Lexical
                              key={i}
                              content={blockContent.text}
                            />
                          );
                        return null;
                      }
                    )}
                </section>
              );
            default:
              console.error(`Unknown block type`);
              return null;
          }
        })();
      })}
    </main>
  );
}
