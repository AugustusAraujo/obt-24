import logger from '../../providers/LoggerProvider/logger'
import turmasService from '../../services/TurmasService'
import { IFindTurmasEmAndamentoOfUser } from '../../services/TurmasService/TurmasServiceDTOs'

export class GetTurmasEmAndamentoOfUser {
    public async execute(data: IFindTurmasEmAndamentoOfUser) {
        return turmasService
            .findTurmasEmAndamentoOfUser(data)
            .then((turmas) => turmas)
            .catch((e: Error) => {
                logger.error(e.message)
                throw new Error('Nao foi possivel reliazar a operacao.')
            })
    }
}
