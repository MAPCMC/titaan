import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "../_helpers";

const buttonVariants = cva(
  "z-10 inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 hover:outline hover:outline-4 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-8 h-small py-2 max-md:min-h-16",
  {
    variants: {
      variant: {
        default:
          "bg-blue text-background hover:bg-foreground hover:outline-foreground",
        link: "hover:text-background hover:bg-foreground hover:outline-foreground *:block  block first-letter:uppercase",
      },
      shape: {
        default: "",
        skewed:
          "origin-bottom-left skew-x-[-30deg] *:block *:skew-x-[30deg] outline-offset-[-1px] mr-[2.3rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      shape: "default",
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      shape,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            shape,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
