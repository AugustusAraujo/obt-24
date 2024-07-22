/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UsuarioDiscordInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioID` to the `UsuarioDiscordInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsuarioDiscordInfo" ADD COLUMN     "usuarioID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDiscordInfo_email_key" ON "UsuarioDiscordInfo"("email");

-- AddForeignKey
ALTER TABLE "UsuarioDiscordInfo" ADD CONSTRAINT "UsuarioDiscordInfo_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuarios"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;
