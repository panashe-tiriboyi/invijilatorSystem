/*
  Warnings:

  - You are about to drop the column `subject` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `form` to the `Subjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Invijilation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "Invijilation_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invijilation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SubjectsToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SubjectsToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SubjectsToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectName" TEXT NOT NULL,
    "form" TEXT NOT NULL
);
INSERT INTO "new_Subjects" ("id", "subjectName") SELECT "id", "subjectName" FROM "Subjects";
DROP TABLE "Subjects";
ALTER TABLE "new_Subjects" RENAME TO "Subjects";
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "invijilationHours" TEXT NOT NULL
);
INSERT INTO "new_Teacher" ("id", "invijilationHours", "name") SELECT "id", "invijilationHours", "name" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectsToTeacher_AB_unique" ON "_SubjectsToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectsToTeacher_B_index" ON "_SubjectsToTeacher"("B");
