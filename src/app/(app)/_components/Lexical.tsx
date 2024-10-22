import {
  PayloadLexicalReact,
  PayloadLexicalReactContent,
} from "@zapal/payload-lexical-react";

export function Lexical({
  content,
}: {
  content: PayloadLexicalReactContent;
}) {
  return (
    <div className="lexical max-w-2xl">
      <PayloadLexicalReact content={content} />
    </div>
  );
}
