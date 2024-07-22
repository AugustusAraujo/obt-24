import artigosService from '../../services/ArtigosService'

export class GetArtigoWithHighViewsUseCase {
    async execute(data: { page: number }) {
        return artigosService
            .getArtigoWithHighViews({ page: data.page })
            .then((artigos) => artigos)
            .catch((e) => e)
    }
}
