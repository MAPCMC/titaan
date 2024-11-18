import type { CollectionAfterChangeHook } from "payload";
import { Page } from "@/payload-types";

import { revalidateTag } from "next/cache";

export const revalidateActivePages: CollectionAfterChangeHook<
  Page
> = ({ doc, previousDoc, req: { payload } }) => {
  if (
    doc._status === "published" ||
    previousDoc?._status === "published"
  ) {
    payload.logger.info(`Revalidating active pages`);
    revalidateTag("pages_active");
  }
  return doc;
};
