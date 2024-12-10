import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_call_to_action_type" AS ENUM('link', 'linkExternal', 'copy');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_variant" AS ENUM('default', 'selected', 'dark', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_type" AS ENUM('link', 'linkExternal', 'copy');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_variant" AS ENUM('default', 'selected', 'dark', 'outline');
  CREATE TYPE "public"."enum_cases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_blocks_call_to_action_type" AS ENUM('link', 'linkExternal', 'copy');
  CREATE TYPE "public"."enum_home_blocks_call_to_action_variant" AS ENUM('default', 'selected', 'dark', 'outline');
  CREATE TYPE "public"."enum_home_blocks_service_section_type" AS ENUM('section-services');
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"company_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"company_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"name" varchar,
  	"fullname" varchar,
  	"position" varchar,
  	"commentary" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_cases_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_cases_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_name" varchar,
  	"version_fullname" varchar,
  	"version_position" varchar,
  	"version_commentary" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__cases_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "filters_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "filters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"level" numeric DEFAULT 1 NOT NULL,
  	"key" varchar NOT NULL,
  	"multiple" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "filters_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"filters_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_clients_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar,
  	"company_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_service_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"introduction" varchar,
  	"type" "enum_home_blocks_service_section_type" DEFAULT 'section-services',
  	"results_intro" jsonb,
  	"block_name" varchar
  );
  
  ALTER TABLE "home_blocks_section" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "type" "enum_pages_blocks_call_to_action_type" DEFAULT 'link';
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "action" varchar;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "variant" "enum_pages_blocks_call_to_action_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "type" "enum__pages_v_blocks_call_to_action_type" DEFAULT 'link';
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "action" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "variant" "enum__pages_v_blocks_call_to_action_variant" DEFAULT 'default';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "filters_id" integer;
  ALTER TABLE "home_blocks_call_to_action" ADD COLUMN "type" "enum_home_blocks_call_to_action_type" DEFAULT 'link' NOT NULL;
  ALTER TABLE "home_blocks_call_to_action" ADD COLUMN "action" varchar NOT NULL;
  ALTER TABLE "home_blocks_call_to_action" ADD COLUMN "variant" "enum_home_blocks_call_to_action_variant" DEFAULT 'default';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_list" ADD CONSTRAINT "pages_blocks_clients_list_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients_list" ADD CONSTRAINT "pages_blocks_clients_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_clients" ADD CONSTRAINT "pages_blocks_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cases" ADD CONSTRAINT "pages_blocks_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_list" ADD CONSTRAINT "_pages_v_blocks_clients_list_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients_list" ADD CONSTRAINT "_pages_v_blocks_clients_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_clients" ADD CONSTRAINT "_pages_v_blocks_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cases" ADD CONSTRAINT "_pages_v_blocks_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_parent_id_cases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filters_options" ADD CONSTRAINT "filters_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."filters"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filters_rels" ADD CONSTRAINT "filters_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."filters"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filters_rels" ADD CONSTRAINT "filters_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "filters_rels" ADD CONSTRAINT "filters_rels_filters_fk" FOREIGN KEY ("filters_id") REFERENCES "public"."filters"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_clients_list" ADD CONSTRAINT "home_blocks_clients_list_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_clients_list" ADD CONSTRAINT "home_blocks_clients_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_clients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_clients" ADD CONSTRAINT "home_blocks_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_cases" ADD CONSTRAINT "home_blocks_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_service_section" ADD CONSTRAINT "home_blocks_service_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_list_order_idx" ON "pages_blocks_clients_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_list_parent_id_idx" ON "pages_blocks_clients_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_list_logo_idx" ON "pages_blocks_clients_list" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_order_idx" ON "pages_blocks_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_parent_id_idx" ON "pages_blocks_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_clients_path_idx" ON "pages_blocks_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cases_order_idx" ON "pages_blocks_cases" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cases_parent_id_idx" ON "pages_blocks_cases" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cases_path_idx" ON "pages_blocks_cases" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_list_order_idx" ON "_pages_v_blocks_clients_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_list_parent_id_idx" ON "_pages_v_blocks_clients_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_list_logo_idx" ON "_pages_v_blocks_clients_list" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_order_idx" ON "_pages_v_blocks_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_parent_id_idx" ON "_pages_v_blocks_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_clients_path_idx" ON "_pages_v_blocks_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cases_order_idx" ON "_pages_v_blocks_cases" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cases_parent_id_idx" ON "_pages_v_blocks_cases" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cases_path_idx" ON "_pages_v_blocks_cases" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "cases_updated_at_idx" ON "cases" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cases_created_at_idx" ON "cases" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cases__status_idx" ON "cases" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_cases_v_parent_idx" ON "_cases_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version_updated_at_idx" ON "_cases_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version_created_at_idx" ON "_cases_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version__status_idx" ON "_cases_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_cases_v_created_at_idx" ON "_cases_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_updated_at_idx" ON "_cases_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_latest_idx" ON "_cases_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_cases_v_autosave_idx" ON "_cases_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "filters_options_order_idx" ON "filters_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "filters_options_parent_id_idx" ON "filters_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "filters_updated_at_idx" ON "filters" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "filters_created_at_idx" ON "filters" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "filters_rels_order_idx" ON "filters_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "filters_rels_parent_idx" ON "filters_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "filters_rels_path_idx" ON "filters_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "filters_rels_services_id_idx" ON "filters_rels" USING btree ("services_id");
  CREATE INDEX IF NOT EXISTS "filters_rels_filters_id_idx" ON "filters_rels" USING btree ("filters_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_clients_list_order_idx" ON "home_blocks_clients_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_clients_list_parent_id_idx" ON "home_blocks_clients_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_clients_list_logo_idx" ON "home_blocks_clients_list" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_clients_order_idx" ON "home_blocks_clients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_clients_parent_id_idx" ON "home_blocks_clients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_clients_path_idx" ON "home_blocks_clients" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_blocks_cases_order_idx" ON "home_blocks_cases" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_cases_parent_id_idx" ON "home_blocks_cases" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_cases_path_idx" ON "home_blocks_cases" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_blocks_service_section_order_idx" ON "home_blocks_service_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_service_section_parent_id_idx" ON "home_blocks_service_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_service_section_path_idx" ON "home_blocks_service_section" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cases_fk" FOREIGN KEY ("cases_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_filters_fk" FOREIGN KEY ("filters_id") REFERENCES "public"."filters"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("cases_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_filters_id_idx" ON "payload_locked_documents_rels" USING btree ("filters_id");
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "home_blocks_call_to_action" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "public"."pages_blocks_section" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_section_type";
  CREATE TYPE "public"."enum_pages_blocks_section_type" AS ENUM('section-text', 'section-clients', 'section-cases');
  ALTER TABLE "public"."pages_blocks_section" ALTER COLUMN "type" SET DATA TYPE "public"."enum_pages_blocks_section_type" USING "type"::"public"."enum_pages_blocks_section_type";
  ALTER TABLE "public"."_pages_v_blocks_section" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_section_type";
  CREATE TYPE "public"."enum__pages_v_blocks_section_type" AS ENUM('section-text', 'section-clients', 'section-cases');
  ALTER TABLE "public"."_pages_v_blocks_section" ALTER COLUMN "type" SET DATA TYPE "public"."enum__pages_v_blocks_section_type" USING "type"::"public"."enum__pages_v_blocks_section_type";
  ALTER TABLE "public"."home_blocks_section" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_home_blocks_section_type";
  CREATE TYPE "public"."enum_home_blocks_section_type" AS ENUM('section-text', 'section-clients', 'section-cases');
  ALTER TABLE "public"."home_blocks_section" ALTER COLUMN "type" SET DATA TYPE "public"."enum_home_blocks_section_type" USING "type"::"public"."enum_home_blocks_section_type";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_clients_list";
  DROP TABLE "pages_blocks_clients";
  DROP TABLE "pages_blocks_cases";
  DROP TABLE "_pages_v_blocks_clients_list";
  DROP TABLE "_pages_v_blocks_clients";
  DROP TABLE "_pages_v_blocks_cases";
  DROP TABLE "cases";
  DROP TABLE "_cases_v";
  DROP TABLE "services";
  DROP TABLE "_services_v";
  DROP TABLE "filters_options";
  DROP TABLE "filters";
  DROP TABLE "filters_rels";
  DROP TABLE "home_blocks_clients_list";
  DROP TABLE "home_blocks_clients";
  DROP TABLE "home_blocks_cases";
  DROP TABLE "home_blocks_service_section";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_filters_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cases_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_services_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_filters_id_idx";
  ALTER TABLE "home_blocks_section" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "link" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD COLUMN "link" varchar;
  ALTER TABLE "home_blocks_call_to_action" ADD COLUMN "link" varchar NOT NULL;
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "action";
  ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "action";
  ALTER TABLE "_pages_v_blocks_call_to_action" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "cases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "filters_id";
  ALTER TABLE "home_blocks_call_to_action" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "home_blocks_call_to_action" DROP COLUMN IF EXISTS "action";
  ALTER TABLE "home_blocks_call_to_action" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "public"."pages_blocks_section" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_section_type";
  CREATE TYPE "public"."enum_pages_blocks_section_type" AS ENUM('section-text', 'section-partners', 'section-services', 'section-cases');
  ALTER TABLE "public"."pages_blocks_section" ALTER COLUMN "type" SET DATA TYPE "public"."enum_pages_blocks_section_type" USING "type"::"public"."enum_pages_blocks_section_type";
  ALTER TABLE "public"."_pages_v_blocks_section" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_section_type";
  CREATE TYPE "public"."enum__pages_v_blocks_section_type" AS ENUM('section-text', 'section-partners', 'section-services', 'section-cases');
  ALTER TABLE "public"."_pages_v_blocks_section" ALTER COLUMN "type" SET DATA TYPE "public"."enum__pages_v_blocks_section_type" USING "type"::"public"."enum__pages_v_blocks_section_type";
  ALTER TABLE "public"."home_blocks_section" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_home_blocks_section_type";
  CREATE TYPE "public"."enum_home_blocks_section_type" AS ENUM('section-text', 'section-partners', 'section-services', 'section-cases');
  ALTER TABLE "public"."home_blocks_section" ALTER COLUMN "type" SET DATA TYPE "public"."enum_home_blocks_section_type" USING "type"::"public"."enum_home_blocks_section_type";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_type";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_variant";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_type";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_variant";
  DROP TYPE "public"."enum_cases_status";
  DROP TYPE "public"."enum__cases_v_version_status";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_home_blocks_call_to_action_type";
  DROP TYPE "public"."enum_home_blocks_call_to_action_variant";
  DROP TYPE "public"."enum_home_blocks_service_section_type";`)
}
