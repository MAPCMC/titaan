import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { Label } from "@/app/(app)/_components/ui/label";
import { Textarea as TextareaComponent } from "@/app/(app)/_components/ui/textarea";
import { Lexical } from "@/app/(app)/_components/Lexical";
import React from "react";

import { Error } from "../Error";
import { Width } from "../Width";

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<FieldValues>;
    rows?: number;
    description?: any;
    placeholder?: any;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
  description,
  placeholder,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} required={requiredFromProps}>
        {label}
      </Label>

      <TextareaComponent
        defaultValue={defaultValue}
        placeholder={placeholder}
        id={name}
        rows={rows}
        {...register(name, { required: requiredFromProps })}
      />

      {requiredFromProps && errors[name] && <Error />}
      {description && (
        <Lexical
          content={description}
          className="text-muted-foreground list-outside text-sm *:ps-0"
        />
      )}
    </Width>
  );
};
