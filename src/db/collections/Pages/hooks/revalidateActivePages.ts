import type { CollectionAfterChangeHook } from "payload";
import { Page } from "@/payload-types";

import { revalidateTag } from "next/cache";

export const revalidateActivePages: CollectionAfterChangeHook<
  Page
> = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating active pages`);

  revalidateTag("pages_active");

  return doc;
};
