import { Request, Response } from 'express'
import { z } from 'zod'
const {
    countAlunoCertificados,
    getAlunoCertificados,
    novoCertificado,
} = require('../../services/certificados')
const { decodeToken } = require('../../services/tokens')
const { verifyTurmaConcluida } = require('../../services/TurmasService')

async function getCertificado(req: Request, res: Response) {
    try {
        const token = req.header('X-Token')
        const turmaID = parseInt(req.body.turmaID)
        const decodedToken: any = decodeToken(token)

        if (!turmaID) {
            return res
                .status(400)
                .json({ code: 400, message: 'Faltando parâmetros.' })
        }

        const usuarioID = parseInt(decodedToken.data.usuarioID)

        const count = await countAlunoCertificados(usuarioID)
            .then((r: number) => r)
            .catch(() => {
                return res.status(500).json({
                    code: 500,
                    message: 'Não foi possível buscar.',
                })
            })

        if (count == 0) {
            const turma: boolean | Error = await verifyTurmaConcluida(
                turmaID,
            ).then((r: boolean) => r)
            if (turma === true) {
                await novoCertificado(usuarioID, turmaID, 'PCC')
            }
        }

        return await getAlunoCertificados(usuarioID, turmaID)
            .then((r: any) =>
                res.status(200).json({
                    code: 200,
                    data: r,
                }),
            )
            .catch(() =>
                res.status(500).json({
                    code: 500,
                    message: 'Não foi possível buscar.',
                }),
            )
    } catch {
        return res.status(500).json({ code: 500, message: 'Erro imprevisto.' })
    }
}
import { OlimpiadasService } from '../../services/OlimpiadasService/OlimpiadasService'

let olimpiadasService = new OlimpiadasService()

async function getParticipacaoOlimpiadaCertificado(
    req: Request,
    res: Response,
) {
    try {
        const schema = z.object({
            olimpiadaID: z.number().int('ID inválido.'),
            usuarioEmail: z.string().email('Email inválido.'),
        })
        let check = schema.safeParse(req.body)
        if (!check.success) {
            return res.status(401).json({
                message: JSON.parse(check.error.message)[0].message,
            })
        }
        let r = await olimpiadasService.getOlimpiadaParticipante({
            email: req.body.email,
            id: req.body.olimpiadaID,
        })
        return res.status(200).json(r)
    } catch {
        return res.status(500).json({
            message: 'Problemas no servidor.',
        })
    }
}

module.exports = { getCertificado, getParticipacaoOlimpiadaCertificado }
