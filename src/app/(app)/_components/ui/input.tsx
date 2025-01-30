import * as React from "react";

import { cn } from "@/app/(app)/_helpers";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "focus-visible:ring-blue focus:border-blue flex h-10 w-full border bg-white px-3 py-2 text-base ring-offset-white not-hover:border-black placeholder:text-black/50 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
