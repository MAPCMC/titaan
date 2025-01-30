"use client";

import * as React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export const Error: React.FC<{
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}> = ({ errors }) => {
  return (
    <div className="mt-2 text-sm text-red-500">
      {typeof errors === "string" ? (
        <>{errors}</>
      ) : errors?.message &&
        typeof errors?.message === "string" &&
        errors?.message.length > 0 ? (
        <>{errors?.message}</>
      ) : (
        <>Dit veld is verplicht</>
      )}
    </div>
  );
};
