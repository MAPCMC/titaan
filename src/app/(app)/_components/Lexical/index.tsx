import {
  PayloadLexicalReact,
  PayloadLexicalReactContent,
} from "@zapal/payload-lexical-react";

import "./index.css";
import { cn } from "../../_helpers";

export function Lexical({
  content,
  className,
}: {
  content?: PayloadLexicalReactContent;
  className?: string;
}) {
  if (!content) return null;
  return (
    <div className={cn("lexical mt-4 max-w-2xl", className)}>
      <PayloadLexicalReact content={content} />
    </div>
  );
}
