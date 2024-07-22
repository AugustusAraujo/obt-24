-- CreateTable
CREATE TABLE "Usuarios" (
    "usuarioID" SERIAL NOT NULL,
    "usuarioNome" VARCHAR(255) NOT NULL,
    "usuarioEmail" VARCHAR(100) NOT NULL,
    "usuarioTelefone" VARCHAR(30),
    "usuarioNascimento" VARCHAR(10),
    "usuarioSenha" VARCHAR(300) NOT NULL,
    "usuarioPermissions" TEXT[] DEFAULT ARRAY['default']::TEXT[],
    "usuarioContaAtivada" BOOLEAN NOT NULL DEFAULT false,
    "usuarioRefreshToken" VARCHAR(300),
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("usuarioID")
);

-- CreateTable
CREATE TABLE "ProfessorTurmas" (
    "professorTurmasID" SERIAL NOT NULL,
    "professorID" INTEGER NOT NULL,
    "turmaID" INTEGER NOT NULL,

    CONSTRAINT "ProfessorTurmas_pkey" PRIMARY KEY ("professorTurmasID")
);

-- CreateTable
CREATE TABLE "Professores" (
    "professorID" SERIAL NOT NULL,
    "usuarioID" INTEGER NOT NULL,
    "professorMateria" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Professores_pkey" PRIMARY KEY ("professorID")
);

-- CreateTable
CREATE TABLE "Admins" (
    "adminID" SERIAL NOT NULL,
    "usuarioID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "Alunos" (
    "alunoID" SERIAL NOT NULL,
    "usuario_ID" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alunos_pkey" PRIMARY KEY ("alunoID")
);

-- CreateTable
CREATE TABLE "AlunoTurmas" (
    "alunoTurmasID" SERIAL NOT NULL,
    "alunoID" INTEGER NOT NULL,
    "turmaID" INTEGER NOT NULL,
    "usuarioID" INTEGER NOT NULL,

    CONSTRAINT "AlunoTurmas_pkey" PRIMARY KEY ("alunoTurmasID")
);

-- CreateTable
CREATE TABLE "Turmas" (
    "turmaID" SERIAL NOT NULL,
    "turmaMateria" INTEGER NOT NULL,
    "turmaAulasLecionadas" INTEGER NOT NULL DEFAULT 0,
    "turmaAulasTotais" INTEGER NOT NULL DEFAULT 12,
    "turmaConcluida" BOOLEAN NOT NULL DEFAULT false,
    "turmaFinalizadaAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Turmas_pkey" PRIMARY KEY ("turmaID")
);

-- CreateTable
CREATE TABLE "Certificados" (
    "certificadoUUID" UUID NOT NULL DEFAULT gen_random_uuid(),
    "certificadoTurma" INTEGER NOT NULL,
    "certificadoAluno" INTEGER NOT NULL,
    "certificadoTipo" CHAR(3) NOT NULL DEFAULT 'PCC',
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CertificadoAluno" (
    "certificadoAlunoID" SERIAL NOT NULL,
    "alunoID" INTEGER NOT NULL,
    "certificadoUUID" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "AlunoChamada" (
    "alunoChamadaID" SERIAL NOT NULL,

    CONSTRAINT "AlunoChamada_pkey" PRIMARY KEY ("alunoChamadaID")
);

-- CreateTable
CREATE TABLE "Chamadas" (
    "chamada_ID" SERIAL NOT NULL,
    "professorID" INTEGER NOT NULL,
    "turmaID" INTEGER NOT NULL,
    "chamada_objetivo" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chamadas_pkey" PRIMARY KEY ("chamada_ID")
);

-- CreateTable
CREATE TABLE "Clubes" (
    "clubeID" SERIAL NOT NULL,
    "clube_nome" VARCHAR(255) NOT NULL,
    "clube_alias" VARCHAR(255) NOT NULL,

    CONSTRAINT "Clubes_pkey" PRIMARY KEY ("clubeID")
);

-- CreateTable
CREATE TABLE "Token" (
    "token_ID" SERIAL NOT NULL,
    "data" VARCHAR(400) NOT NULL,
    "type" CHAR(3) NOT NULL DEFAULT 'PRT',
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("token_ID")
);

-- CreateTable
CREATE TABLE "_AlunoChamadaToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_usuarioEmail_key" ON "Usuarios"("usuarioEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_usuarioTelefone_key" ON "Usuarios"("usuarioTelefone");

-- CreateIndex
CREATE UNIQUE INDEX "Professores_usuarioID_key" ON "Professores"("usuarioID");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_usuarioID_key" ON "Admins"("usuarioID");

-- CreateIndex
CREATE UNIQUE INDEX "Alunos_usuario_ID_key" ON "Alunos"("usuario_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Certificados_certificadoUUID_key" ON "Certificados"("certificadoUUID");

-- CreateIndex
CREATE UNIQUE INDEX "CertificadoAluno_certificadoAlunoID_key" ON "CertificadoAluno"("certificadoAlunoID");

-- CreateIndex
CREATE UNIQUE INDEX "Chamadas_professorID_key" ON "Chamadas"("professorID");

-- CreateIndex
CREATE UNIQUE INDEX "_AlunoChamadaToUsuario_AB_unique" ON "_AlunoChamadaToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_AlunoChamadaToUsuario_B_index" ON "_AlunoChamadaToUsuario"("B");

-- AddForeignKey
ALTER TABLE "ProfessorTurmas" ADD CONSTRAINT "ProfessorTurmas_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professores"("professorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorTurmas" ADD CONSTRAINT "ProfessorTurmas_turmaID_fkey" FOREIGN KEY ("turmaID") REFERENCES "Turmas"("turmaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professores" ADD CONSTRAINT "Professores_professorMateria_fkey" FOREIGN KEY ("professorMateria") REFERENCES "Clubes"("clubeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professores" ADD CONSTRAINT "Professores_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuarios"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuarios"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alunos" ADD CONSTRAINT "Alunos_usuario_ID_fkey" FOREIGN KEY ("usuario_ID") REFERENCES "Usuarios"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoTurmas" ADD CONSTRAINT "AlunoTurmas_turmaID_fkey" FOREIGN KEY ("turmaID") REFERENCES "Turmas"("turmaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoTurmas" ADD CONSTRAINT "AlunoTurmas_alunoID_fkey" FOREIGN KEY ("alunoID") REFERENCES "Alunos"("alunoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoTurmas" ADD CONSTRAINT "AlunoTurmas_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuarios"("usuarioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turmas" ADD CONSTRAINT "Turmas_turmaMateria_fkey" FOREIGN KEY ("turmaMateria") REFERENCES "Clubes"("clubeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificados" ADD CONSTRAINT "Certificados_certificadoTurma_fkey" FOREIGN KEY ("certificadoTurma") REFERENCES "Turmas"("turmaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificadoAluno" ADD CONSTRAINT "CertificadoAluno_alunoID_fkey" FOREIGN KEY ("alunoID") REFERENCES "Alunos"("alunoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificadoAluno" ADD CONSTRAINT "CertificadoAluno_certificadoUUID_fkey" FOREIGN KEY ("certificadoUUID") REFERENCES "Certificados"("certificadoUUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamadas" ADD CONSTRAINT "Chamadas_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professores"("professorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamadas" ADD CONSTRAINT "Chamadas_turmaID_fkey" FOREIGN KEY ("turmaID") REFERENCES "Turmas"("turmaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoChamadaToUsuario" ADD CONSTRAINT "_AlunoChamadaToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "AlunoChamada"("alunoChamadaID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoChamadaToUsuario" ADD CONSTRAINT "_AlunoChamadaToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuarios"("usuarioID") ON DELETE CASCADE ON UPDATE CASCADE;
