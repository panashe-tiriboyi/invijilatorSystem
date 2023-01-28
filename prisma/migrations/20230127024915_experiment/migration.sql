/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Invijilation` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_InvijilationToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InvijilationToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Invijilation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InvijilationToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_InvijilationToTeacher_AB_unique" ON "_InvijilationToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_InvijilationToTeacher_B_index" ON "_InvijilationToTeacher"("B");
