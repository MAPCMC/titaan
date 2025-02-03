"use client";

import { Triangle } from "../Triangle";
import { Children, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const AnchorTriangle = ({
  anchor,
  children,
}: {
  anchor?: string | null;
  children?: React.ReactNode;
}) => {
  const [locationHash, setLocationHash] = useState("");
  const params = useSearchParams();

  useEffect(() => {
    // hack: listen to params but use window.location.hash
    setLocationHash(window?.location?.hash);
  }, [params]);

  if (!anchor || !locationHash.includes(anchor)) return children;
  return (
    <>
      <Triangle
        orientation="right"
        className="bg-blue"
        wrapperClassName="h-12 xl:block absolute hidden xl:-left-16 -translate-y-1/2 top-1/2 z-[-1]"
      />
      {children}
      <sup>
        <span className="sr-only"> (paginasectie geselecteerd)</span>
        <Triangle
          orientation="right"
          className="bg-blue"
          wrapperClassName="h-8 inline-block xl:hidden z-[-1] ml-4 sr-none"
        />
      </sup>
    </>
  );
};
