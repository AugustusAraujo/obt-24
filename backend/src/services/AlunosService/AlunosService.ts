import logger from '../../providers/LoggerProvider/logger'
import prisma from '../../infra/prisma'
import { IFindAlunoByUsuario, ISaveAluno } from './AlunosServiceDTO'

export class AlunosService {
    async saveAluno(data: ISaveAluno) {
        return prisma.aluno
            .create({
                data: {
                    alunoID: data.alunoID,
                    usuario_ID: data.usuarioID,
                },
            })
            .then((aluno) => aluno)
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }

    async findAlunoByUsuario(data: IFindAlunoByUsuario) : Promise<any> {
        return prisma.aluno
            .findFirst({
                where: {
                    Usuarios: {
                        usuarioID: data.usuarioID,
                    },
                },
            })
            .then((aluno) => {
                if (aluno == null) return []
                return aluno
            })
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }
}
