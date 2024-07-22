import prisma from '../../infra/prisma'
import {
    IGetOlimpiadaParticipante,
    ISaveOlympiad,
    ISubscribeUser,
} from './OlimpiadasServiceDTO'

export class OlimpiadasService {
    async getUserParticipation(data: IGetOlimpiadaParticipante) {
        console.log(data.usuarioID)
        return prisma.olimpiadasInscritos
            .findMany({
                where: {
                    olimpiadaInscritoUsuarioID: data.usuarioID,
                },
                select: {
                    Olimpiada: {
                        select: {
                            olimpiadaNome: true,
                            olimpiadaFinalizada: true,
                            olimpiadaEdicao: true,
                            olimpiadaLogo: true,
                        },
                    },
                    Usuario: {
                        select: {
                            usuarioID: true,
                            usuarioNome: true,
                        },
                    },
                },
            })
            .then((r) => r)
            .catch(() => {
                message: 'Não foi posível buscar.'
            })
    }

    async subscribeUser(data: ISubscribeUser) {
        return prisma.olimpiadasInscritos
            .create({
                data: {
                    olimpiadaID: data.olimpiadaID,
                    olimpiadaInscritoNivel: data.olimpiadaInscritoNivel,
                    olimpiadaInscritoUsuarioID: data.olimpiadaInscritoUsuarioID,
                    olimpiadaInscritoTipoEscola:
                        data.olimpiadaInscritoTipoEscola,
                },
            })
            .then((r) => r)
            .catch(() => {
                message: 'Não foi posível salvar.'
            })
    }

    async deleteUserParticipation(data: { olimpiadaInscritosID: number }) {
        return prisma.olimpiadasInscritos
            .delete({
                where: {
                    olimpiadaInscritosID: data.olimpiadaInscritosID,
                },
            })
            .then((r) => r)
            .catch(() => {
                message: 'Não foi possível apagar.'
            })
    }
}
