-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "invijilationHours" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectName" TEXT NOT NULL
);
