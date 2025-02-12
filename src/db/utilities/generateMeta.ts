import type { Metadata } from "next";

import type { Home, Page } from "@/payload-types";

import { mergeOpenGraph } from "./mergeOpenGraph";

export const generateMeta = async (args: {
  doc: Page | Home;
}): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage =
    typeof doc?.meta?.image === "object" &&
    doc.meta.image !== null &&
    "url" in doc.meta.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`;

  const title = doc?.meta?.title
    ? doc?.meta?.title + " | " + process.env.NEXT_PUBLIC_SITE_TITLE
    : process.env.NEXT_PUBLIC_SITE_TITLE;

  let urlFromSlug: string | undefined;
  function isPage(doc: Page | Home): doc is Page {
    return (doc as Page).slug !== undefined;
  }

  if (doc && isPage(doc)) {
    urlFromSlug = Array.isArray(doc.slug) ? doc.slug.join("/") : "/";
  }

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: urlFromSlug ?? "/",
    }),
    title,
  };
};
