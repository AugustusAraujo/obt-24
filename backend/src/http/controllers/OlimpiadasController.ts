import { Request, Response } from 'express'
import { olimpiadasService } from '../../services/OlimpiadasService'
import tokensService from '../../services/TokensService'

export class OlimpiadasController {
    async getOlimpiadaResultados(req: Request, res: Response) {
        const token: any | string = req.header('X-Token')
        const { usuarioID } = tokensService.decodeToken(token).data

        if (!usuarioID) {
            return res.status(500).json({ message: 'Problemas ao buscar.' })
        }

        return olimpiadasService
            .getUserParticipation({ usuarioID: usuarioID })
            .then((r) => {
                res.set({
                    'Cache-Control': 'max-age=600',
                })
                return res.json(r)
            })
            .catch(() =>
                res.status(500).json({ message: 'Problemas ao buscar.' }),
            )
    }
}
