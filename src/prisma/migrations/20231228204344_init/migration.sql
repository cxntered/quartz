-- CreateTable
CREATE TABLE "link" (
    "url" TEXT NOT NULL,
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "link_id_key" ON "link"("id");
