import * as React from "react";

import { cn } from "@/app/(app)/_helpers";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "focus-visible:ring-blue focus:border-blue flex min-h-[80px] w-full border bg-white px-3 py-2 text-base ring-offset-white not-hover:border-black placeholder:text-black/50 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
