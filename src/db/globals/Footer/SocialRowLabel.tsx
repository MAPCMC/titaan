"use client";

import { useRowLabel } from "@payloadcms/ui";

export const SocialRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    label: string;
    link: string;
  }>();

  const customLabel = `${data.label || "Social"} (${String(rowNumber).padStart(2, "0")})`;

  return <div>{customLabel}</div>;
};
