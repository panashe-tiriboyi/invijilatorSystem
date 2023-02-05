/*
  Warnings:

  - Added the required column `invijilationHours` to the `Invijilation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paperNumber` to the `Invijilation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invijilation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "invijilationHours" INTEGER NOT NULL,
    "paperNumber" INTEGER NOT NULL,
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
INSERT INTO "new_Teacher" ("id", "invijilationHours", "name") SELECT "id", "invijilationHours", "name" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
