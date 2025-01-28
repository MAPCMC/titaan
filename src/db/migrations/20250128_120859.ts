import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section" ALTER COLUMN "type" SET DEFAULT 'section-text';
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "type" SET DEFAULT 'section-text';
  ALTER TABLE "home_blocks_section" ALTER COLUMN "type" SET DEFAULT 'section-text';
  ALTER TABLE "home_blocks_section" ALTER COLUMN "type" SET NOT NULL;
  ALTER TABLE "cases" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "_cases_v" DROP COLUMN IF EXISTS "version_name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_section" ALTER COLUMN "type" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "type" DROP DEFAULT;
  ALTER TABLE "home_blocks_section" ALTER COLUMN "type" DROP DEFAULT;
  ALTER TABLE "home_blocks_section" ALTER COLUMN "type" DROP NOT NULL;
  ALTER TABLE "cases" ADD COLUMN "name" varchar;
  ALTER TABLE "_cases_v" ADD COLUMN "version_name" varchar;`)
}
