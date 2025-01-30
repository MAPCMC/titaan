import { Block, Plugin } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Page } from "@/payload-types";
import { updatedFields } from "./updatedFields";

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
  return doc?.title ? `${doc.title} | Titaan producties` : "Titaan producties";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!;
};

const hiddenField: Block = {
  slug: "hidden",
  interfaceName: "hiddenField",
  labels: {
    singular: {
      nl: "Verborgen veld",
      en: "Hidden field",
    },
    plural: {
      nl: "Verborgen velden",
      en: "Hidden fields",
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: {
          en: 'Add a hidden value to the form ("services" and "filters" are automatically filled)',
          nl: 'Geef een verborgen waarde mee aan het formulier ("services" en "filters" worden automatisch gevuld)',
        },
      },
    },
  ],
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
  formBuilderPlugin({
    fields: {
      text: true,
      textarea: true,
      select: true,
      email: true,
      checkbox: true,
      number: true,
      message: true,
    },
    formOverrides: {
      labels: {
        plural: {
          nl: "Formulieren",
          en: "Forms",
        },
        singular: {
          nl: "Formulier",
          en: "Form",
        },
      },
      admin: {
        group: {
          nl: "Formulieren",
          en: "Forms",
        },
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ("name" in field && field.name === "fields" && "blocks" in field) {
            return {
              ...field,
              blocks: [...updatedFields(field.blocks), hiddenField],
            };
          }
          return field;
        });
      },
    },
    formSubmissionOverrides: {
      admin: {
        group: {
          nl: "Formulieren",
          en: "Forms",
        },
      },
      labels: {
        plural: {
          nl: "Ingevulde formulieren",
          en: "Submitted forms",
        },
        singular: {
          nl: "Ingevuld formulier",
          en: "Submitted form",
        },
      },
    },
  }),
];
