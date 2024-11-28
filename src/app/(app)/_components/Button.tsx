import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../_helpers";

const buttonVariants = cva(
  "z-10 inline-flex items-center justify-center whitespace-nowrap border box-border border-transparent disabled:pointer-events-none disabled:opacity-50 px-10 h-small py-2 max-md:min-h-16 hover:ring-4 focus-visible:hover:ring-8 hover:ring-foreground",
  {
    variants: {
      variant: {
        default: "bg-blue text-background hover:bg-foreground",
        outline:
          "border-foreground hover:bg-foreground hover:text-background checked:text-background checked:bg-foreground-light",
        selected:
          "bg-foreground-light text-background hover:text-foreground hover:bg-background hover:border-foreground",
        dark: "bg-foreground text-background hover:bg-foreground-light",
        link: "px-6 hover:text-background hover:bg-foreground *:block block first-letter:uppercase",
      },
      shape: {
        default: "",
        skewed: "origin-bottom-left skew-x-[-30deg] *:block *:skew-x-[30deg]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      shape: "default",
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            shape,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
