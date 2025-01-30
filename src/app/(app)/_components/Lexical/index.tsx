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
  if (
    !(
      content &&
      !Array.isArray(content) &&
      typeof content === "object" &&
      "root" in content
    )
  )
    return null;
  return (
    <div className={cn("lexical max-w-2xl", className)}>
      {serializeLexical({ nodes: content?.root?.children, excerpt })}
    </div>
  );
}
