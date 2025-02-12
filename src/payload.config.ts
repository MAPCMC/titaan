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
import { Cases } from "./db/collections/Cases";
import { Services } from "./db/collections/Services";
import { Filters } from "./db/collections/Filters";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: "Admin",
      titleSuffix: ` | ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
      description: `Sitebeheer ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/icon.svg",
        },
      ],
    },
    avatar: {
      Component: "@/app/(app)/_components/Avatar#Avatar",
    },
    components: {
      graphics: {
        Icon: "@/app/(app)/_components/Icon#Icon",
        Logo: "@/app/(app)/_components/AdminLogo#AdminLogo",
      },
    },
  },
  i18n: {
    supportedLanguages: { nl, en },
    fallbackLanguage: "nl",
    translations: {
      nl: {
        "plugin-seo": {
          almostThere: "Bijna klaar",
          autoGenerate: "Automatisch",
          bestPractices: "Tips",
          characterCount: "{{current}}/{{minLength}}-{{maxLength}} karakters, ",
          charactersLeftOver: "{{characters}} over",
          charactersToGo: "{{characters}} te gaan",
          charactersTooMany: "{{characters}} te veel",
          checksPassing: "{{current}}/{{max}} checks zijn geslaagd",
          good: "Goed",
          imageAutoGenerationTip:
            "Automisch genereren selecteert hero afbeelding",
          lengthTipDescription:
            "Dit moet tussen de {{minLength}} en {{maxLength}} karakters. Voor hulp, zie ",
          lengthTipTitle:
            "Dit moet tussen de {{minLength}} en {{maxLength}} karakters. Voor hulp, zie ",
          missing: "Ontbreekt",
          noImage: "Geen afbeelding",
          preview: "Preview",
          previewDescription: "Exact resultaat varieert (op inhoud/relevantie)",
          tooLong: "te lang",
          tooShort: "te kort",
        },
      },
    },
  },
  collections: [Users, Media, Pages, Cases, Services, Filters],
  globals: [Home, Footer],
  editor: lexicalEditor({}),
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
