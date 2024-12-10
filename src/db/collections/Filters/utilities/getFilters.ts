import type { Filter } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { unstable_cache } from "next/cache";

async function getFilters(): Promise<Filter[]> {
  const payload = await getPayloadHMR({
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
