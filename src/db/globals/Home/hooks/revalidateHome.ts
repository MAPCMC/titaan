import type { GlobalAfterChangeHook } from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateHome: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating home`);

  revalidateTag("global_home");
  revalidatePath("/");

  return doc;
};
