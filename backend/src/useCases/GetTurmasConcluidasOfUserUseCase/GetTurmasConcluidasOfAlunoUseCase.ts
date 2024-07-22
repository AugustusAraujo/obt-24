import logger from '../../providers/LoggerProvider/logger'
import turmasService from '../../services/TurmasService'
import { IFindTurmasConcluidasOfUser } from '../../services/TurmasService/TurmasServiceDTOs'

export class GetTurmasConcluidasOfAluno {
    public async execute(data: IFindTurmasConcluidasOfUser) {
        return turmasService
            .findTurmasConcluidasOfUser(data)
            .then((turmas) => turmas)
            .catch((e: Error) => {
                logger.error(e.message)
                throw new Error('Nao foi possivel reliazar a operacao.')
            })
    }
}
