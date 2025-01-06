import type { Filter } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";

async function getFilters(): Promise<Filter[]> {
  const payload = await getPayload({
    config: configPromise,
  });

  const collection = await payload.find({
    collection: "filters",
    limit: 500,
    depth: 0,
    sort: ["level", "order"],
  });

  return collection.docs;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedFilters = () =>
  unstable_cache(async () => getFilters(), [], {
    tags: ["filters"],
  });
