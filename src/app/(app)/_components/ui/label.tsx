"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/app/(app)/_helpers";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    required?: boolean;
  }
>(({ className, required, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    ref={ref}
    {...props}
  >
    {props.children}
    {required && (
      <>
        <span className="sr-only"> (invullen verplicht)</span>
        <sup className="text-red sr-none">*</sup>
      </>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
