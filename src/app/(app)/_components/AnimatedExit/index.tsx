import { useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";

export function AnimatedExit({
  children,
  isVisible,
  className,
  asChild,
  duration = 500,
  ...props
}: {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
  asChild?: boolean;
  duration?: number;
  [x: string]: any;
}) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [exiting, setExiting] = useState(false);

  const Comp = asChild ? Slot : "div";

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setExiting(false);
    } else if (!exiting) {
      setExiting(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setExiting(false);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration, exiting]);

  const handleAnimationEnd = () => {
    if (exiting) setShouldRender(false);
  };

  if (!shouldRender) return null;
  return (
    <Comp className={className} {...props}>
      {children}
    </Comp>
  );
}
