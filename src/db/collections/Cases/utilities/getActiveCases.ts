import type { Case } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { unstable_cache } from "next/cache";

async function getActiveCases(): Promise<Case[]> {
  const payload = await getPayloadHMR({
    config: configPromise,
  });

  const collection = await payload.find({
    collection: "cases",
    limit: 12,
    depth: 0,
  });

  return collection.docs;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedCases = () =>
  unstable_cache(
    async () => getActiveCases(),
    ["cases_active"],
    { tags: ["cases_active"] }
  );
