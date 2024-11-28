import * as React from "react";
import "./index.css";

export const Triangle = ({
  className,
  orientation = "up",
  wrapperClassName,
  ...props
}: {
  className?: string;
  orientation?: "up" | "down" | "left" | "right";
  wrapperClassName?: string;
  [x: string]: any;
}) => (
  <div
    aria-hidden="true"
    className={`triangle-wrapper ${wrapperClassName}`}
    {...props}
  >
    <div className={`triangle ${orientation} ${className}`}></div>
  </div>
);
