"use client";

import * as React from "react";

export const Error: React.FC<{ errors?: any }> = ({ errors }) => {
  return (
    <div className="mt-2 text-sm text-red-500">
      {(errors?.message?.length > 0 && errors?.message) ??
        "Dit veld is verplicht"}
    </div>
  );
};
