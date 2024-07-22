/*
  Warnings:

  - You are about to drop the `Clubes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Professores" DROP CONSTRAINT "Professores_professorMateria_fkey";

-- DropForeignKey
ALTER TABLE "Turmas" DROP CONSTRAINT "Turmas_turmaMateria_fkey";

-- DropTable
DROP TABLE "Clubes";

-- CreateTable
CREATE TABLE "Materias" (
    "materiaID" SERIAL NOT NULL,
    "materia_nome" VARCHAR(255) NOT NULL,
    "materia_alias" VARCHAR(255) NOT NULL,

    CONSTRAINT "Materias_pkey" PRIMARY KEY ("materiaID")
);

-- AddForeignKey
ALTER TABLE "Professores" ADD CONSTRAINT "Professores_professorMateria_fkey" FOREIGN KEY ("professorMateria") REFERENCES "Materias"("materiaID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turmas" ADD CONSTRAINT "Turmas_turmaMateria_fkey" FOREIGN KEY ("turmaMateria") REFERENCES "Materias"("materiaID") ON DELETE RESTRICT ON UPDATE CASCADE;
