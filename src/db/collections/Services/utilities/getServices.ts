import type { Service } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { unstable_cache } from "next/cache";

async function getServices(): Promise<Service[]> {
  const payload = await getPayloadHMR({
    config: configPromise,
  });

  const collection = await payload.find({
    collection: "services",
    limit: 50,
  });

  return collection.docs;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedServices = () =>
  unstable_cache(async () => getServices(), ["services"], {
    tags: ["services"],
  });
