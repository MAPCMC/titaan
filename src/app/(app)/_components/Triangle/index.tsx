import * as React from "react";
import "./index.css";

export const Triangle = ({
  className,
  orientation = "up",
  wrapperClassName,
  ref,
  ...props
}: {
  className?: string;
  orientation?: "up" | "down" | "left" | "right";
  wrapperClassName?: string;
  ref?: React.RefObject<HTMLDivElement> | React.RefObject<null>;
  [x: string]: any;
}) => (
  <div
    aria-hidden="true"
    className={`triangle-wrapper ${wrapperClassName}`}
    {...props}
  >
    <div ref={ref} className={`triangle ${orientation} ${className}`}></div>
  </div>
);
