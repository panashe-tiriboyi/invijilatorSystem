/*
  Warnings:

  - You are about to alter the column `invijilationHours` on the `Teacher` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "invijilationHours" INTEGER NOT NULL
);
INSERT INTO "new_Teacher" ("id", "invijilationHours", "name", "subject") SELECT "id", "invijilationHours", "name", "subject" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
