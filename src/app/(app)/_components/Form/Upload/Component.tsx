"use client";

import React from "react";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { Label } from "@/app/(app)/_components/ui/label";
import { Input } from "@/app/(app)/_components/ui/input";
import { Error } from "../Error";
import { Width } from "../Width";
import { Lexical } from "@/app/(app)/_components/Lexical";

type UploadField = {
  name: string;
  label: string;
  required: boolean;
  description?: any;
  width?: number;
  onFileChange?: (name: string, file: File | null) => void; // Add a callback for file change
};

export const Upload: React.FC<
  UploadField & {
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>;
    register: UseFormRegister<FieldValues>;
  }
> = ({
  name,
  errors,
  label,
  register,
  required: requiredFromProps,
  width = 100,
  description,
  onFileChange,
}) => {
  const allowedTypes = [
    "image/*",
    "image/jpeg",
    "image/png",
    "application/pdf",
    "image/svg+xml",
  ];
  const maxSizeInMB = 2;

  const checkFileContent = (file: File) => {
    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;

        // Perform a basic check for unwanted HTML tags or scripts
        const containsUnsafeContent =
          /<script.*?>|<\/script>|<\s*iframe.*?>|<\/iframe>/.test(content);
        resolve(!containsUnsafeContent);
      };
      reader.onerror = () => {
        resolve(false); // Reject if FileReader encounters an error
      };
      reader.readAsText(file);
    });
  };

  const validateFile = async (fileList: FileList) => {
    const file = fileList[0];

    if (!file) {
      return true;
    }

    if (!allowedTypes.includes(file.type)) {
      return "Bestandstype is niet toegestaan.";
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      return `Bestand is groter dan ${maxSizeInMB}MB.`;
    }
    // Validate file content using FileReader
    const isValidContent = await checkFileContent(file);
    if (!isValidContent) {
      return "Bestand bevat ongevraagde HTML-tags of scripts.";
    }

    return true;
  };

  return (
    <Width width={width}>
      <Label htmlFor={name} required={requiredFromProps}>
        {label}
      </Label>

      <Input
        id={name}
        type="file"
        accept={allowedTypes.join(",")}
        {...register(name, {
          required: requiredFromProps,
          validate: async (fileList) => await validateFile(fileList),
          onChange: (e) => {
            const file = e.target.files?.[0] || null;
            if (onFileChange) {
              onFileChange(name, file);
            }
          },
        })}
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
