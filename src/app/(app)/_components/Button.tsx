import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../_helpers";

const buttonVariants = cva(
  "z-10 inline-flex items-center justify-center whitespace-nowrap border box-border border-transparent disabled:pointer-events-none disabled:opacity-25 h-small focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue hover:ring-4 focus-visible:hover:ring-8 hover:ring-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-blue text-background hover:bg-foreground border-blue hover:border-foreground",
        outline:
          "border-foreground bg-background hover:bg-foreground hover:text-background checked:text-background checked:bg-foreground-light",
        selected:
          "bg-foreground-light border-foreground-light text-background hover:text-foreground hover:border-background-dark hover:bg-background-dark hover:ring-background-dark",
        dark: "bg-foreground text-background hover:bg-foreground-light hover:ring-foreground-light",
        link: "px-6 hover:text-background hover:bg-foreground *:block block first-letter:uppercase",
      },
      shape: {
        default: "py-2 px-10 max-md:min-h-16",
        skewed:
          "py-2 px-10 max-md:min-h-16 origin-bottom-left skew-x-[-30deg] *:block *:skew-x-[30deg]",
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
