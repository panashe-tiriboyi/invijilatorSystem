-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invijilation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "invijilationMinutes" INTEGER,
    "paperNumber" INTEGER,
    CONSTRAINT "Invijilation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invijilation" ("date", "id", "invijilationMinutes", "paperNumber", "subjectId", "time") SELECT "date", "id", "invijilationMinutes", "paperNumber", "subjectId", "time" FROM "Invijilation";
DROP TABLE "Invijilation";
ALTER TABLE "new_Invijilation" RENAME TO "Invijilation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
