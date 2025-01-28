import { cn } from "../../_helpers";
import React from "react";

import { serializeLexical } from "./serialize";

type Props = {
  className?: string;
  content: Record<string, any>;
  excerpt?: boolean;
};

export const RichText: React.FC<Props> = ({
  className,
  content,
  excerpt = false,
}) => {
  if (!content) {
    return null;
  }

  const Slot = excerpt ? "span" : "div";

  return (
    <Slot className={className}>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({ nodes: content?.root?.children, excerpt })}
    </Slot>
  );
};

export default RichText;
