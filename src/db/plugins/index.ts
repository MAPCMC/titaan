import { Plugin } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateTitle,
  GenerateURL,
} from "@payloadcms/plugin-seo/types";
import { Page } from "@/payload-types";
import { s3Storage } from "@payloadcms/storage-s3";

const isProduction = process.env.NODE_ENV === "production";

const s3Config = {
  endpoint: process.env.S3_ENDPOINT || "",
  region: process.env.S3_REGION || "",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
  forcePathStyle: true,
};

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Titaan producties`
    : "Titaan producties";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!;
};

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.S3_BUCKET || "",
    config: s3Config,
    acl: "public-read",
    enabled: isProduction,
  }),
];
