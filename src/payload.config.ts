import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { en } from "@payloadcms/translations/languages/en";
import { nl } from "@payloadcms/translations/languages/nl";

import { plugins } from "./db/plugins";
import { migrations } from "./db/migrations";
import { Users } from "./db/collections/Users";
import { Media } from "./db/collections/Media";
import { Home } from "./db/globals/Home";
import { Footer } from "./db/globals/Footer";
import { Pages } from "./db/collections/Pages";
import { Cases } from './db/collections/Cases'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: "Titaan admin",
      description: "Sitebeheer",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/icon.svg",
        },
      ],
    },
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  i18n: {
    supportedLanguages: { nl, en },
    fallbackLanguage: "nl",
  },
  collections: [Users, Media, Pages, Cases],
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
    migrationDir: path.resolve(dirname, "db/migrations"),
    prodMigrations: migrations,
  }),
  sharp,
  plugins: plugins,
  email: nodemailerAdapter({
    defaultFromAddress: "info@maartenpeene.nl",
    defaultFromName: "Admin Titaan producties",
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
  }),
});
