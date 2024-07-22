-- CreateTable
CREATE TABLE "Artigos" (
    "artigoID" SERIAL NOT NULL,
    "artigoUUID" UUID NOT NULL DEFAULT gen_random_uuid(),
    "artigoAutorID" INTEGER NOT NULL,
    "artigoTitle" VARCHAR(255) NOT NULL,
    "artigoSubtitle" VARCHAR(100) NOT NULL,
    "artigoSubdescription" VARCHAR(300) NOT NULL,
    "artigoBody" TEXT NOT NULL,
    "artigoType" VARCHAR(50) NOT NULL,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artigos_pkey" PRIMARY KEY ("artigoID")
);

-- CreateTable
CREATE TABLE "ArtigoStars" (
    "artigoStarsID" INTEGER NOT NULL,
    "artigoID" INTEGER NOT NULL,
    "usuarioID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtigoStars_pkey" PRIMARY KEY ("artigoStarsID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artigos_artigoID_key" ON "Artigos"("artigoID");

-- CreateIndex
CREATE UNIQUE INDEX "ArtigoStars_artigoStarsID_key" ON "ArtigoStars"("artigoStarsID");

-- AddForeignKey
ALTER TABLE "Artigos" ADD CONSTRAINT "Artigos_artigoAutorID_fkey" FOREIGN KEY ("artigoAutorID") REFERENCES "Usuarios"("usuarioID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ArtigoStars" ADD CONSTRAINT "ArtigoStars_artigoID_fkey" FOREIGN KEY ("artigoID") REFERENCES "Artigos"("artigoID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtigoStars" ADD CONSTRAINT "ArtigoStars_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuarios"("usuarioID") ON DELETE NO ACTION ON UPDATE NO ACTION;
