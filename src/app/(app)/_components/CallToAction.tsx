"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";

type CallToActionProps = {
  type: string;
  action: string;
  label: string;
  variant?: "outline" | "selected" | "dark" | "default" | null;
};

export const CallToAction = ({
  type,
  action,
  label,
  variant,
}: CallToActionProps) => {
  switch (type) {
    case "link":
      return (
        <Button asChild shape="skewed" variant={variant}>
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
        >
          <span>{label}</span>
        </Button>
      );
    default:
      return (
        <Button asChild shape="skewed" variant={variant}>
          <Link href={action}>
            <span>{label}</span>
          </Link>
        </Button>
      );
  }
};
