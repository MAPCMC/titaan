import type { CheckboxField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { useFormContext } from "react-hook-form";

import { Checkbox as CheckboxUi } from "@/app/(app)/_components/ui/checkbox";
import { Label } from "@/app/(app)/_components/ui/label";
import React from "react";

import { Error } from "../Error";
import { Width } from "../Width";

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    getValues: any;
    register: UseFormRegister<FieldValues>;
    setValue: any;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
  const props = register(name, { required: requiredFromProps });
  const { setValue } = useFormContext();

  return (
    <Width width={width}>
      <div className="flex min-h-4 items-center gap-2">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />
        <Label htmlFor={name} required={requiredFromProps}>
          {label}
        </Label>
      </div>
      {requiredFromProps && errors[name] && <Error errors={errors[name]} />}
    </Width>
  );
};
