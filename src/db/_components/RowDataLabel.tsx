"use client";

import { useRowLabel } from "@payloadcms/ui";

export const RowDataLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string; value?: string }>();

  const customLabel = data.label ?? "";

  return (
    <p>
      ({data.value ?? rowNumber}) {customLabel}
    </p>
  );
};
