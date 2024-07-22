import { Request, Response } from 'express'
const { professorLogin } = require('../../services/professores')
const { findAlunosTurma } = require('../../services/TurmasService')
const { decodeToken } = require('../../services/tokens')

async function login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password)
        res.status(400).json({
            code: 400,
            message: 'Faltando parâmetros',
        })
    return await professorLogin(email, password)
        .then((tokens: any) => {
            return res.status(200).json({
                code: 200,
                acessToken: tokens?.acessToken,
                refreshToken: tokens?.refeshToken,
            })
        })
        .catch((e: Error) => {
            if (e.message == 'Senha incorreta.') {
                return res.status(401).json({
                    code: 401,
                    message: 'Senha incorreta.',
                })
            }
            if (e.message == 'Usuário inválido.') {
                return res.status(401).json({
                    code: 401,
                    message: 'Usuário inválido.',
                })
            }
        })
}

async function listarAlunos(req: Request, res: Response) {
    let token = req.header('X-Token')
    const decodedToken = decodeToken(token)
    const usuarioID = decodedToken.data.usuarioID
    const { turmaID } = req.body
    let data: Array<any> = []

    return await findAlunosTurma(usuarioID, turmaID)
        .then((alunos: any) => {
            if (!alunos) return res.status(200).json({ code: 200, data: [] })

            alunos.Turma.AlunoTurmas.map((i: any) => {
                return data.push(i.Aluno.Usuarios)
            })

            return res.status(200).json({
                code: 200,
                data: data,
            })
        })
        .catch(() =>
            res.status(500).json({
                code: 500,
                message: 'Não foi possível buscar.',
            }),
        )
}

module.exports = {
    login,
    listarAlunos,
}
