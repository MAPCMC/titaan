import { cn } from "@/app/(app)/_helpers";
import * as React from "react";

export const Width: React.FC<{
  children: React.ReactNode;
  className?: string;
  width?: number | string;
}> = ({ children, className, width }) => {
  return (
    <div className={cn(className, width ? `max-w-[${width}%]` : "")}>
      {children}
    </div>
  );
};
