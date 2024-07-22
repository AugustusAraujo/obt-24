import { Artigo } from '@prisma/client'

export interface IGetArtigoWithHighViews {
    page: number
}

export interface ISaveArtigo {
    artigoID: number
    artigoUUID: string
    artigoAutorID: number
    artigoTitle: string
    artigoSubtitle: string
    artigoSubdescription: string
    artigoBody: string
    publicado: boolean
    artigoType: string
    createdAt?: Date
}

export interface IDeleteArtigoByUUID {
    uuid: string
}

export interface IFindArtigoByUUID {
    uuid: string
}
