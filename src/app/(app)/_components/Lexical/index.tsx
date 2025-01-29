import "./index.css";
import { cn } from "../../_helpers";
import { serializeLexical } from "./serialize";

export function Lexical({
  content,
  className,
  excerpt = false,
}: {
  content?: any;
  className?: string;
  excerpt?: boolean;
}) {
  if (!content) return null;
  return (
    <div className={cn("lexical mt-4 max-w-2xl", className)}>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({ nodes: content?.root?.children, excerpt })}
    </div>
  );
}
