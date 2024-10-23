// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateTitle,
  GenerateURL,
} from "@payloadcms/plugin-seo/types";
import { Page } from "@/payload-types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { en } from "@payloadcms/translations/languages/en";
import { nl } from "@payloadcms/translations/languages/nl";

import { Users } from "./db/collections/Users";
import { Media } from "./db/collections/Media";
import { Home } from "./db/globals/Home";
import { Footer } from "./db/globals/Footer";
import { Pages } from "./db/collections/Pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { nl, en },
    fallbackLanguage: "nl",
  },
  collections: [Users, Media, Pages],
  globals: [Home, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
});
