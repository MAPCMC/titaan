import type { Metadata } from "next";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import type { Page as PageType } from "@/payload-types";

import PageClient from "./page.client";
import { notFound, redirect } from "next/navigation";
import PageContent from "../_components/PageContent";
import { generateMeta } from "@/db/utilities/generateMeta";

export async function generateStaticParams() {
  const payload = await getPayloadHMR({
    config: configPromise,
  });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({
  params: paramsPromise,
}: Args) {
  const { slug = "home" } = await paramsPromise;
  // const url = "/" + slug;

  let page: PageType | null;

  page = await queryPageBySlug({
    slug,
  });

  if (!page) {
    notFound();
    // return <PayloadRedirects url={url} />
  }

  const { title, layout } = page;

  return (
    <>
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}
      <header>
        <h1>{title}</h1>
      </header>
      <main className="pt-16 pb-24">
        <PageClient />
        <PageContent blocks={layout} />
      </main>
    </>
  );
}

type Params = {
  slug?: string;
};

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug = "home" } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(
  async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode();

    const payload = await getPayloadHMR({
      config: configPromise,
    });

    const result = await payload.find({
      collection: "pages",
      draft,
      limit: 1,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return result.docs?.[0] || null;
  }
);