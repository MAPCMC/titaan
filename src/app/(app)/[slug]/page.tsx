import type { Metadata } from "next";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import type { Page as PageType } from "@/payload-types";

import PageClient from "./page.client";
import { notFound } from "next/navigation";
import PageHeader from "../_components/PageHeader";
import PageContent from "../_components/PageContent";
import PageFooter from "../_components/PageFooter";
import { generateMeta } from "@/db/utilities/generateMeta";
import PageTitle from "./_components/PageTitle";

export async function generateStaticParams() {
  const payload = await getPayload({
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

export default async function Page({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise;
  const url = "/" + slug;

  let page: PageType | null;

  if (!slug) {
    notFound();
  }
  page = await queryPageBySlug({
    slug,
  });

  if (!page) {
    notFound();
  }

  const { title, layout } = page;

  return (
    <>
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}
      <PageHeader>
        <PageTitle title={title} />
      </PageHeader>
      <PageClient />
      <PageContent blocks={layout} />
      <PageFooter />
    </>
  );
}

type Params = Promise<{
  slug?: string;
}>;

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await paramsPromise;

  if (!slug) return {};
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({
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
});
