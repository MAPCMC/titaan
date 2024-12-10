import type { CollectionAfterChangeHook } from "payload";
import { Service } from "@/payload-types";

import { revalidateTag, revalidatePath } from "next/cache";

export const revalidateFilter: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating filter`);
  revalidateTag("filters");
  revalidatePath("/");

  return doc;
};
