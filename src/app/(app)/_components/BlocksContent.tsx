import React from "react";
import {
  CallToAction as CTAType,
  Clients,
  Text,
} from "@/payload-types";
import { cn } from "../_helpers";

import { ClientsFeed } from "./ClientsFeed";
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
    <div className={cn("", className)}>
      {content?.map((block, i) => {
        return (() => {
          switch (block.blockType) {
            case "clients":
              return (
                <ClientsFeed key={i} clients={block.list} />
              );
            case "text":
              return (
                <Lexical key={i} content={block.text} />
              );
            case "callToAction":
              return (
                <CallToAction
                  key={i}
                  label={block.label}
                  action={block.action}
                  type={block.type}
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
