import type { CollectionAfterChangeHook } from "payload";
import { Case } from "@/payload-types";

import { revalidateTag } from "next/cache";

export const revalidateActiveCases: CollectionAfterChangeHook<
  Case
> = ({ doc, previousDoc, req: { payload } }) => {
  if (
    doc._status === "published" ||
    previousDoc?._status === "published"
  ) {
    payload.logger.info(`Revalidating active cases`);
    revalidateTag("cases_active");
  }
  return doc;
};
