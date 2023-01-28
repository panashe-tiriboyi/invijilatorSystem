/*
  Warnings:

  - Added the required column `date` to the `Invijilation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Invijilation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invijilation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Invijilation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invijilation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invijilation" ("id", "subjectId", "teacherId") SELECT "id", "subjectId", "teacherId" FROM "Invijilation";
DROP TABLE "Invijilation";
ALTER TABLE "new_Invijilation" RENAME TO "Invijilation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
