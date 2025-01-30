import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/app/(app)/_components/ui/input";
import { Label } from "@/app/(app)/_components/ui/label";
import React from "react";
import { Lexical } from "@/app/(app)/_components/Lexical";
import { Error } from "../Error";
import { Width } from "../Width";

export const Text: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<FieldValues>;
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
  description,
  width,
  placeholder,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} required={requiredFromProps}>
        {label}
      </Label>
      <Input
        defaultValue={defaultValue}
        placeholder={placeholder}
        id={name}
        type="text"
        {...register(name, { required: requiredFromProps })}
      />
      {requiredFromProps && errors[name] && <Error errors={errors[name]} />}
      {description && (
        <Lexical
          content={description}
          className="text-muted-foreground list-outside text-sm *:ps-0"
        />
      )}
    </Width>
  );
};
