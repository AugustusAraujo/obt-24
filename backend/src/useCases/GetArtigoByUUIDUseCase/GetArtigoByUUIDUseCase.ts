import artigosService from '../../services/ArtigosService'
import { IGetArtigoByUUIDInput } from './GetArtigoByUUIDDTO'

export class GetArtigoByUUIDUseCase {
    async execute(input: IGetArtigoByUUIDInput) {
        let data = {
            uuid: input.uuid,
        }
        return artigosService
            .findArtigoByUUID(data)
            .then((artigo) => {
                if (artigo == null) return {}
                return artigo
            })
            .catch((e) => e)
    }
}
