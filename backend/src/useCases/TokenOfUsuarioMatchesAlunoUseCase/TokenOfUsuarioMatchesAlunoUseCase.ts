import logger from '../../providers/LoggerProvider/logger'
import alunosService from '../../services/AlunosService'
import tokensService from '../../services/TokensService'
import { ITokenOfUsuarioMatchesAlunoUseCase } from './TokenOfUsuarioMatchesAlunoDTO'

export class TokenOfUsuarioMatchesAlunoUseCase {
    async execute(data: ITokenOfUsuarioMatchesAlunoUseCase) {
        try {
            const tokenData = tokensService.decodeToken(data.token)

            const info = await alunosService
                .findAlunoByUsuario({ usuarioID: tokenData?.data.usuarioID })
                .then((aluno) => aluno)

            if (tokenData.data.usuarioID == info.usuario_ID) {
                return true
            }

            throw new Error('Aluno invalido.')
        } catch (e) {
            logger.error(e)
            throw e
        }
    }
}
