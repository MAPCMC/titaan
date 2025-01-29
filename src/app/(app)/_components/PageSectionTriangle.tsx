"use client";

import { Triangle } from "./Triangle";
import { ReactNode, useRef } from "react";
import { cn } from "../_helpers";
import { useInView } from "../_helpers/useInView";

interface PageSectionProps {
  id?: string | null;
  children: ReactNode;
  triangleProps?: {
    orientation?: "left" | "right";
    wrapperClassName?: string;
    className?: string;
  };
}

export const PageSectionTriangle: React.FC<PageSectionProps> = ({
  id,
  children,
  triangleProps,
}) => {
  const idProp = id ? { id } : {};

  const ref = useRef(null);
  const isVisible = useInView(ref);

  const animateInFromRight = isVisible
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0";

  const animateInFromLeft = isVisible
    ? "translate-x-0 opacity-100"
    : "-translate-x-full opacity-0";

  return (
    <section className="relative">
      <Triangle
        {...triangleProps}
        className={cn(
          "absolute top-1/2 z-[-1] -translate-y-1/2 transform transition-transform delay-500 duration-700",
          triangleProps?.className ?? "",
          triangleProps?.orientation === "left"
            ? animateInFromRight
            : animateInFromLeft,
        )}
        ref={ref}
      />
      <div {...idProp} className="mx-auto max-w-5xl p-4">
        {children}
      </div>
    </section>
  );
};
