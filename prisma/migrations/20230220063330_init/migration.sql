-- CreateTable
CREATE TABLE "Dataset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datasetCode" TEXT NOT NULL,
    "datasetName" TEXT NOT NULL,
    "topic" TEXT,
    "datasetDescription" TEXT,
    "contact" TEXT,
    "email" TEXT,
    "dateUpdate" DATETIME NOT NULL,
    "compressionFormat" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "fileRows" INTEGER NOT NULL,
    "fileLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_datasetCode_key" ON "Dataset"("datasetCode");

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_datasetName_key" ON "Dataset"("datasetName");
