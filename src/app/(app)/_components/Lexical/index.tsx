import "./index.css";
import { cn } from "../../_helpers";
import { RichText } from "../RichText";

export function Lexical({
  content,
  className,
}: {
  content?: any;
  className?: string;
}) {
  if (!content) return null;
  return (
    <div className={cn("lexical mt-4 max-w-2xl", className)}>
      {content && <RichText content={content} excerpt={false} />}
    </div>
  );
}
