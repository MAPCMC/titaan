import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CallToAction,
  Media,
  Text,
  Header,
} from "@/payload-types";
import { PayloadLexicalReactContent } from "@zapal/payload-lexical-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMedia(logo: any): logo is Media {
  return (logo as Media).url !== undefined;
}

export function isTextBlock(
  item: CallToAction | Text | undefined
): item is Text {
  if (item === undefined) return false;
  return "text" in item;
}

export function isHeader(
  item: Header | { title: string } | undefined
): item is Header {
  if (item === undefined) return false;
  return "callToAction" in item;
}

export function isLexicalText(
  item: PayloadLexicalReactContent | undefined | null
): item is PayloadLexicalReactContent {
  if (item === undefined || item === null) return false;
  return "root" in item;
}
