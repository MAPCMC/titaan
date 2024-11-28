"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";

type CallToActionProps = {
  type: string;
  action: string;
  label: string;
};

export const CallToAction = ({
  type,
  action,
  label,
}: CallToActionProps) => {
  switch (type) {
    case "link":
      return (
        <Button asChild shape="skewed">
          <Link href={action}>
            <span>{label}</span>
          </Link>
        </Button>
      );
    case "copy":
      return (
        <Button
          shape="skewed"
          onClick={() =>
            navigator.clipboard.writeText(action)
          }
        >
          <span>{label}</span>
        </Button>
      );
    default:
      return (
        <Button asChild shape="skewed">
          <Link href={action}>
            <span>{label}</span>
          </Link>
        </Button>
      );
  }
};
