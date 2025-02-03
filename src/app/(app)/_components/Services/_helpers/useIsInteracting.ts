"use client";

import { useEffect, useState } from "react";

export function useIsInteracting(
  ref: React.RefObject<HTMLElement> | React.RefObject<null>,
  events = ["mousedown", "touchstart", "keydown"],
) {
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    function handleEvent(e: Event) {
      if (ref && ref.current && ref.current.contains(e.target as Node)) {
        setIsInteracting(true);
      } else {
        setIsInteracting(false);
      }
    }

    events.forEach((event) => document.addEventListener(event, handleEvent));

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleEvent),
      );
    };
  }, [ref, events]);

  return isInteracting;
}
