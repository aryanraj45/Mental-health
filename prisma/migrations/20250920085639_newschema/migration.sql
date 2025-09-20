-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "college" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "academicYear" DROP NOT NULL;
