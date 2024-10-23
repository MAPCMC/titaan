import * as React from "react";
import "./index.css";

export const Triangle = ({
  className,
  wrapperClassName,
  ...props
}: {
  className?: string;
  wrapperClassName?: string;
  [x: string]: any;
}) => (
  <div
    aria-hidden="true"
    className={`triangle-wrapper ${wrapperClassName}`}
    {...props}
  >
    <div className={`triangle ${className}`}></div>
  </div>
);
