import turmasService from '../../services/TurmasService'
import postgresDatabaseProvider from '../../providers/PostgresDatabaseProvider'
import { IInputGetTurmaInfoUseCaseDTO } from './GetTurmasOfAlunoUseCaseDTO'

export class GetTurmasOfAlunoUseCase {
    async execute(input: IInputGetTurmaInfoUseCaseDTO) {
        return turmasService
            .countAlunoTurmas(input.usuarioID)
            .then(async (count) => {
                if (count == 0) {
                    throw new Error('Você não tem turmas.')
                }

                const { rows } = await postgresDatabaseProvider
                    .query(
                        `
                        SELECT "Turmas"."turmaID","Turmas"."turmaMateria", "Turmas"."turmaAulasLecionadas",
                        "Turmas"."turmaAulasTotais", "Turmas"."turmaConcluida","Turmas"."createdAt",
                        "Turmas"."updatedAt", "Materias"."materia_nome", "Materias"."materia_alias"
                        FROM "AlunoTurmas"
                        INNER JOIN "Usuarios" ON "AlunoTurmas"."usuarioID" = "Usuarios"."usuarioID"
                        INNER JOIN "Turmas" ON "AlunoTurmas"."turmaID"  = "Turmas"."turmaID"
                        inner join "Materias" on "Materias"."materiaID"  = "Turmas"."turmaMateria"
                        where "Usuarios"."usuarioID" = $1::integer`,
                        [input.usuarioID],
                    )
                    .then((result) => result)

                return rows
            })
            .catch((e) => {
                throw e
            })
    }
}
