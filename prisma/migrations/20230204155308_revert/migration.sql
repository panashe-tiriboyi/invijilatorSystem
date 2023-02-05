/*
  Warnings:

  - You are about to drop the column `invijilationMinutes` on the `Invijilation` table. All the data in the column will be lost.
  - You are about to drop the column `paperNumber` on the `Invijilation` table. All the data in the column will be lost.
  - You are about to drop the column `invijilationMinutes` on the `Teacher` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invijilation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Invijilation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invijilation" ("date", "id", "subjectId", "time") SELECT "date", "id", "subjectId", "time" FROM "Invijilation";
DROP TABLE "Invijilation";
ALTER TABLE "new_Invijilation" RENAME TO "Invijilation";
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "invijilationHours" TEXT
);
INSERT INTO "new_Teacher" ("id", "name") SELECT "id", "name" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
