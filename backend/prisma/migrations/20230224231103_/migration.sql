-- CreateTable
CREATE TABLE "UsuarioDiscordInfo" (
    "usuarioDiscordInfoID" SERIAL NOT NULL,
    "userid" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(200) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "discriminator" CHAR(4) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "token" VARCHAR(150) NOT NULL,
    "expires_in" VARCHAR(200) NOT NULL,

    CONSTRAINT "UsuarioDiscordInfo_pkey" PRIMARY KEY ("usuarioDiscordInfoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDiscordInfo_usuarioDiscordInfoID_key" ON "UsuarioDiscordInfo"("usuarioDiscordInfoID");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDiscordInfo_token_key" ON "UsuarioDiscordInfo"("token");
