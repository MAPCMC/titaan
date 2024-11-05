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
  content: PayloadLexicalReactContent;
  className?: string;
}) {
  return (
    <div
      className={cn("lexical max-w-2xl mt-4", className)}
    >
      <PayloadLexicalReact content={content} />
    </div>
  );
}
