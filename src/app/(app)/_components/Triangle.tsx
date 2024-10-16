import * as React from "react";

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
