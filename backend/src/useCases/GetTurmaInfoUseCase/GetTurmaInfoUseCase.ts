import turmasService from '../../services/TurmasService'
import { IGetTurmaInfoUseCaseDTO } from './GetTurmasInfoUseCaseDTO'

export class GetTurmaInfoUseCase {
    async execute(input: IGetTurmaInfoUseCaseDTO) {
        try {
            const isInTurma = await turmasService.isUserInTurma(input)

            if (!isInTurma) {
                throw new Error('Aluno não está presente na turma.')
            }

            return turmasService
                .findTurmasInfo(parseInt(input.turmaID))
                .then((r) => r)
                .catch(e => e)
        } catch (e) {
            throw e
        }
    }
}
