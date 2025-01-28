import React from "react";
import { CallToAction as CTAType, Clients, Text } from "@/payload-types";
import { cn } from "../_helpers";

import { ClientsFeed } from "./ClientsFeed";
import { CasesFeed } from "./CasesFeed/index";
import { Lexical } from "./Lexical";
import { CallToAction } from "./CallToAction";

export function BlocksContent({
  content,
  className,
}: {
  className?: string;
  content?: (CTAType | Text | Clients | any)[] | null;
}) {
  if (!content || content.length < 1) return null;
  return (
    <div className={cn("my-4 space-y-4", className)}>
      {content?.map((block, i) => {
        return (() => {
          switch (block.blockType) {
            case "cases":
              return <CasesFeed key={block.id} />;
            case "clients":
              return <ClientsFeed key={block.id} clients={block.list} />;
            case "text":
              return <Lexical key={block.id} content={block.text} />;
            case "callToAction":
              return (
                <CallToAction
                  key={i}
                  label={block.label}
                  action={block.action}
                  type={block.type}
                  variant={block.variant}
                  className="mb-3 mr-3"
                />
              );
            default:
              console.error(`Unknown content block type`);
              return null;
          }
        })();
      })}
    </div>
  );
}
