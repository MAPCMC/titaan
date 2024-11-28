import React from "react";
import {
  CallToAction,
  Clients,
  Text,
} from "@/payload-types";
import { cn } from "../_helpers";

import { ClientsFeed } from "./ClientsFeed";
import { Lexical } from "./Lexical";

export function BlocksContent({
  content,
  className,
}: {
  className?: string;
  content?: (CallToAction | Text | Clients)[] | null;
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
            default:
              console.error(`Unknown block type`);
              return null;
          }
        })();
      })}
    </div>
  );
}
