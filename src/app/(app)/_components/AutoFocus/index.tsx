"use client";

import { useEffect, useRef, useState } from "react";
import { Slot } from "@radix-ui/react-slot";

export function AutoFocus({
  children,
  isVisible,
  asChild,
  focusProps,
  stopFocus,
  ...props
}: {
  children: React.ReactNode;
  isVisible: boolean;
  asChild?: boolean;
  stopFocus?: boolean;
  [x: string]: any;
}) {
  const [focusedOnce, setFocusedOnce] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const Comp = asChild ? Slot : "div";

  useEffect(() => {
    if (isVisible && ref.current && !stopFocus) {
      if (focusedOnce) return;
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        ...focusProps,
      });
      ref.current.focus();
      setFocusedOnce(true);
    } else if (!isVisible && focusedOnce) {
      setFocusedOnce(false);
    }
  }, [isVisible, focusProps, stopFocus, focusedOnce]);

  if (!isVisible) return null;
  return (
    <Comp tabIndex={-1} {...props} ref={ref}>
      {children}
    </Comp>
  );
}
