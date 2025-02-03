"use client";

import { useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export function AutoFocus({
  children,
  isVisible,
  asChild,
  focusProps,
  ...props
}: {
  children: React.ReactNode;
  isVisible: boolean;
  asChild?: boolean;
  [x: string]: any;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const Comp = asChild ? Slot : "div";

  useEffect(() => {
    if (isVisible && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        ...focusProps,
      });
      ref.current.focus();
    }
  }, [isVisible, focusProps]);

  if (!isVisible) return null;
  return (
    <Comp tabIndex={-1} {...props} ref={ref}>
      {children}
    </Comp>
  );
}
