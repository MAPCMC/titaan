import type { Page } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { unstable_cache } from "next/cache";

async function getActivePages(): Promise<Page[]> {
  const payload = await getPayloadHMR({
    config: configPromise,
  });

  const collection = await payload.find({
    collection: "pages",
    limit: 12,
    depth: 0,
    where: {
      slug: {
        not_equals: "home",
      },
    },
  });

  return collection.docs;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedPages = () =>
  unstable_cache(
    async () => getActivePages(),
    ["pages_active"],
    { tags: ["pages_active"] }
  );
