-- CreateTable
CREATE TABLE "Olimpiadas" (
    "olimpiadaID" SERIAL NOT NULL,
    "olimpiadaNome" VARCHAR(100) NOT NULL,
    "olimpiadaLogo" TEXT NOT NULL,
    "olimpiadaDescription" TEXT NOT NULL,
    "olimpiadaEdicao" INTEGER NOT NULL,
    "olimpiadaFinalizada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OlimpiadasInscritos" (
    "olimpiadaInscritosID" SERIAL NOT NULL,
    "olimpiadaID" INTEGER NOT NULL,
    "olimpiadaInscritoUsuarioID" INTEGER NOT NULL,
    "olimpiadaInscritoNivel" INTEGER,
    "olimpiadaInscritoTipoEscola" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Olimpiadas_olimpiadaID_key" ON "Olimpiadas"("olimpiadaID");

-- CreateIndex
CREATE UNIQUE INDEX "OlimpiadasInscritos_olimpiadaInscritosID_key" ON "OlimpiadasInscritos"("olimpiadaInscritosID");

-- AddForeignKey
ALTER TABLE "OlimpiadasInscritos" ADD CONSTRAINT "OlimpiadasInscritos_olimpiadaID_fkey" FOREIGN KEY ("olimpiadaID") REFERENCES "Olimpiadas"("olimpiadaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OlimpiadasInscritos" ADD CONSTRAINT "OlimpiadasInscritos_olimpiadaInscritoUsuarioID_fkey" FOREIGN KEY ("olimpiadaInscritoUsuarioID") REFERENCES "Usuarios"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;
