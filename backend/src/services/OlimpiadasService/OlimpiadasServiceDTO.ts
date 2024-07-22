export interface IGetOlimpiadaParticipante {
    usuarioID: number | any
}

export interface ISubscribeUser {
    olimpiadaInscritosID?: number | any
    olimpiadaID: number
    olimpiadaInscritoUsuarioID: number
    olimpiadaInscritoNivel: number
    olimpiadaInscritoTipoEscola: string
}

export interface ISaveOlympiad {
    olimpiadaID?: number | any
    olimpiadaNome: string
    olimpiadaEdicao: number
    olimpiadaLogo: string
    olimpiadaDescription: string
    olimpiadaFinalizada?: boolean
}

// olimpiadaID          Int                   @unique @default(autoincrement())
// olimpiadaNome        String                @db.VarChar(100)
// olimpiadaLogo        String
// olimpiadaDescription String
// olimpiadaEdicao      Int
// olimpiadaFinalizada  Boolean               @default(false)
// createdAt            DateTime?             @default(now()) @db.Timestamptz(6)
// OlimpiadasInscritos
