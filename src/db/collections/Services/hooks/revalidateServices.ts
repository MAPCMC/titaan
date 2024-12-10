import type { CollectionAfterChangeHook } from "payload";
import { Service } from "@/payload-types";

import { revalidateTag } from "next/cache";

export const revalidateServices: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === "published" || previousDoc?._status === "published") {
    payload.logger.info(`Revalidating services`);
    revalidateTag("services");
  }
  return doc;
};
