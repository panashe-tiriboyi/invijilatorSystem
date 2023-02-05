/*
  Warnings:

  - You are about to drop the column `invijilationHours` on the `Invijilation` table. All the data in the column will be lost.
  - Added the required column `invijilationMinutes` to the `Invijilation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invijilation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "invijilationMinutes" INTEGER NOT NULL,
    "paperNumber" INTEGER NOT NULL,
    CONSTRAINT "Invijilation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invijilation" ("date", "id", "paperNumber", "subjectId", "time") SELECT "date", "id", "paperNumber", "subjectId", "time" FROM "Invijilation";
DROP TABLE "Invijilation";
ALTER TABLE "new_Invijilation" RENAME TO "Invijilation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
