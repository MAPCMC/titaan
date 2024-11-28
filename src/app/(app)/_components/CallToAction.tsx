"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";

type CallToActionProps = {
  type: string;
  action: string;
  label: string;
  variant?: "outline" | "selected" | "dark" | "default" | null;
  [x: string]: any;
};

export const CallToAction = ({
  type,
  action,
  label,
  variant,
  ...props
}: CallToActionProps) => {
  switch (type) {
    case "link":
      return (
        <Button asChild shape="skewed" variant={variant} {...props}>
          <Link href={action}>
            <span>{label}</span>
          </Link>
        </Button>
      );
    case "copy":
      return (
        <Button
          variant={variant}
          shape="skewed"
          onClick={() => navigator.clipboard.writeText(action)}
          {...props}
        >
          <span>{label}</span>
        </Button>
      );
    default:
      return (
        <Button asChild shape="skewed" variant={variant} {...props}>
          <Link href={action}>
            <span>{label}</span>
          </Link>
        </Button>
      );
  }
};
