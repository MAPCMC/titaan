"use client";

import { useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../_helpers";

export function AnimatedExit({
  children,
  isVisible,
  className,
  asChild,
  animationOut,
  duration = 700,
  ...props
}: {
  children: React.ReactNode;
  isVisible: boolean;
  animationOut: string;
  className?: string;
  asChild?: boolean;
  duration?: number;
  [x: string]: any;
}) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [exiting, setExiting] = useState(false);

  const Comp = asChild ? Slot : "div";

  // Handle mounting/unmounting logic
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setExiting(false);
    } else if (!exiting) {
      setExiting(true);
    }
  }, [isVisible]);

  // Remove on timeout as backup
  useEffect(() => {
    if (exiting) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setExiting(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [exiting, duration]);

  // Remove the component only after the animation ends
  const handleAnimationEnd = (e: any) => {
    if (e.animationName.includes("-out")) {
      setShouldRender(false);
      setExiting(false);
    }
  };

  if (!shouldRender) return null;
  return (
    <Comp
      {...props}
      className={cn({ [animationOut]: exiting }, className)}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </Comp>
  );
}
