"use client";

import { Triangle } from "./Triangle";
import { ReactNode } from "react";
import { cn } from "../_helpers";

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

  return (
    <section className="relative">
      <Triangle
        {...triangleProps}
        className={cn(
          "intersect:motion-opacity-in-0 intersect:motion-duration-700 intersect:motion-delay-500",
          {
            "intersect:motion-translate-x-in-[100%]":
              triangleProps?.orientation === "left",
            "intersect:motion-translate-x-in-[-100%]":
              triangleProps?.orientation === "right",
          },
          triangleProps?.className ?? "",
        )}
        wrapperClassName={cn(
          "absolute top-1/2 z-[-1] -translate-y-1/2 h-full",
          {
            "right-0": triangleProps?.orientation === "left",
          },
        )}
      />
      <div {...idProp} className="mx-auto max-w-5xl p-4">
        {children}
      </div>
    </section>
  );
};
