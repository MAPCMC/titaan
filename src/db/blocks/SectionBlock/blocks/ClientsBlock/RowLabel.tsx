"use client";

import { useRowLabel } from "@payloadcms/ui";
import "./style.css";

export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    companyName?: string;
  }>();

  const customLabel = `${data.companyName || "Client"}`;

  return (
    <div className="row-header">
      <p>{`${String(rowNumber).padStart(2, "0")}`}</p>
      <h4>{customLabel}</h4>
    </div>
  );
};
