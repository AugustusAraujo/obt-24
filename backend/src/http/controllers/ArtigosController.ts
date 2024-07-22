import { Request, Response } from 'express'
import getArtigoByUUIDUseCase from '../../useCases/GetArtigoByUUIDUseCase'
import getArtigoWithHighViewsUseCase from '../../useCases/GetArtigoWithHighViewsUseCase'

export class ArtigosController {
    async handleGetArtigosWithHighViews(req: Request, res: Response) {
        let { page } = req.params

        if (parseInt(page) < 0) {
            return res.status(401).json({
                code: 401,
                message: 'Pagina invalida',
            })
        }

        try {
            const data = {
                page: parseInt(page),
            }

            let artigos = await getArtigoWithHighViewsUseCase
                .execute(data)
                .then((artigos) => artigos)

            if (artigos == null) {
                artigos = []
            }

            res.set({
                'Cache-Control': 'max-age=300',
            })

            return res.status(200).json({
                data: artigos,
            })
        } catch {
            return res.status(500).json({
                code: 500,
                message: 'Nao foi possivel buscar artigos.',
            })
        }
    }

    async handleGetArtigoByUUID(req: Request, res: Response) {
        const { uuid } = req.params

        if (!uuid) {
            return res.status(401).json({
                code: 401,
                message: 'Pagina invalida',
            })
        }

        try {
            const artigo = await getArtigoByUUIDUseCase.execute({
                uuid: uuid,
            })

            res.set({
                'Cache-Control': 'max-age=600',
            })

            return res.status(200).json({
                data: artigo,
            })
        } catch {
            return res.status(500).json({
                code: 500,
                message: 'Nao foi possivel buscar o artigo.',
            })
        }
    }
}
