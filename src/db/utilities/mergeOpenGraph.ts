import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description:
    "Fondsenwerving en advies binnen de culturele sector door Suzanne Kortbeek. Gevestigd in Utrecht.",
  images: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/website-template-OG.webp`
        : "/website-template-OG.webp",
    },
  ],
  siteName: "Titaan Producties",
  title: "Titaan Producties",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images
      ? og.images
      : defaultOpenGraph.images,
  };
};
