export interface ISave {
    usuarioID?: number
    usuarioEmail: string
    usuarioNome: string
    usuarioSenha: string
    usuarioContaAtivada: true
}

export interface ISearchByEmail {
    email: string
}
