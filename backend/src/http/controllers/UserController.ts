import { Request, Response } from 'express'
import prisma from '../../infra/prisma'
import usuariosLoginUseCase from '../../useCases/UserLogin'
import { z } from 'zod'
import logger from '../../providers/LoggerProvider/logger'
import tokensService from '../../services/TokensService'

async function handleLogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    if (!email || !password) {
        return res
            .status(401)
            .json({ code: 401, message: 'Faltando parâmetros.' })
    }

    let data = {
        email: email,
        password: password,
    }

    try {
        const login = await usuariosLoginUseCase.execute(data)

        if (login) {
            return res.status(200).json({
                code: 200,
                data: {
                    acessToken: login.acessToken,
                    refreshToken: login.refreshToken,
                },
            })
        }

        logger.error(`Não foi possível fazer login. - ${email}`)

        return res.status(500).json({
            code: 500,
            message: 'Não foi possível fazer login.',
        })
    } catch (e: any) {
        if (e.message == 'Senha incorreta.') {
            return res.status(400).json({
                code: 400,
                message: 'Senha incorreta.',
            })
        }

        if (e.message == 'Usuário não encontrado.') {
            return res.status(400).json({
                code: 400,
                message: 'Usuário não encontrado.',
            })
        }
        console.log(e)
        return res.status(500).json({
            code: 500,
            message: 'Não foi possível fazer login.',
        })
    }
}

async function handleNovaConta(req: Request, res: Response): Promise<Response> {
    const schema = z.object({
        fullName: z.string().max(100, { message: 'Nome muito grande.' }),
        email: z.string().email().max(254, { message: 'Email muito grande.' }),
        password: z.string().max(100, { message: 'Senha muito grande.' }),
        captchaToken: z
            .string()
            .min(200, { message: "Invalid Captcha's token." }),
    })

    const result = await schema.safeParseAsync(req.body)

    if (!result.success) {
        return res.status(401).json({
            message: 'Invalid params.',
            stack: result.error.stack,
        })
    }

    const data = {
        email: req.body.email,
        captchaToken: req.body.captchaToken,
        fullName: req.body.fullName,
        password: req.body.password,
    }

    return res.json({message: "LOL"});
    // return createNewAccountUseCase
    //     .execute(data)
    //     .then(() =>
    //         res.status(200).json({
    //             message: 'Conta criada.',
    //         }),
    //     )
    //     .catch((e: Error) => {
    //         switch (e.message) {
    //             case 'Email já usado.':
    //                 return res.status(400).json({
    //                     code: 400,
    //                     message: 'Email já usado.',
    //                 })
    //             case 'Captcha inválido.':
    //                 return res.status(400).json({
    //                     code: 400,
    //                     message: 'Captcha inválido.',
    //                 })
    //             default:
    //                 console.log(e)
    //                 return res.status(500).json({
    //                     code: 500,
    //                     message: 'Não foi possível criar a conta.',
    //                 })
    //         }
    //     })
}

// async function sendPasswordReset(
//     req: Request,
//     res: Response,
// ): Promise<Response> {
//     const { email } = req.body
//     if (!email) {
//         return res
//             .status(400)
//             .json({ code: 400, message: 'Faltando parâmetros.' })
//     }
//     return await sendEmailPasswordResetUseCase
//         .execute(email)
//         .then(() => {
//             return res
//                 .status(200)
//                 .json({ code: 200, message: 'Email enviado.' })
//         })
//         .catch((e) => {
//             console.log(e)
//             return res
//                 .status(500)
//                 .json({ code: 500, message: 'Erro ao enviar o email.' })
//         })
// }

// async function resetPassword(req: Request, res: Response): Promise<Response> {
//     const { token, newPassword } = req.body

//     return await resetUserPasswordUseCase
//         .execute(token, newPassword)
//         .then(() => {
//             return res.status(200).json({
//                 code: 200,
//                 message: 'Senha atualizada.',
//             })
//         })
//         .catch(() =>
//             res.status(400).json({ code: 400, message: 'Token inválido.' }),
//         )
// }
async function getInformacoes(req: Request, res: Response): Promise<Response> {
    let token = req.header('X-Token')
    if (!token)
        return res
            .status(400)
            .json({ code: 400, message: 'Faltando parâmetros.' })

    if (!tokensService.verifyToken(token))
        return res.status(400).json({ code: 400, message: 'Token inválido.' })

    let decodedToken = tokensService.decodeToken(token)

    return await prisma.usuario
        .findUnique({
            where: { usuarioID: decodedToken.data.usuarioID },
            select: {
                usuarioTelefone: true,
                usuarioNascimento: true,
                usuarioNome: true,
            },
        })
        .then((r: any) => res.status(200).json({ code: 200, data: r }))
        .catch(() => {
            return res
                .status(500)
                .json({ code: 500, message: 'Erro ao buscar informações.' })
        })
}

async function patchInformacoes(
    req: Request,
    res: Response,
): Promise<Response> {
    const { nome_completo, nascimento, telefone } = req.body

    let token = req.header('X-Token')

    if (!token)
        return res
            .status(400)
            .json({ code: 400, message: 'Faltando parâmetros.' })

    if (!tokensService.verifyToken(token))
        return res.status(400).json({ code: 400, message: 'Token inválido.' })

    let decodedToken = tokensService.decodeToken(token)

    return await prisma.usuario
        .update({
            where: { usuarioID: decodedToken.data.usuarioID },
            data: {
                usuarioNome: nome_completo ? nome_completo : undefined,
                usuarioNascimento: nascimento ? nascimento : undefined,
                usuarioTelefone: telefone ? telefone : undefined,
            },
        })
        .then(() =>
            res
                .status(200)
                .json({ code: 200, message: 'Informações atualizadas.' }),
        )
        .catch(() =>
            res
                .status(500)
                .json({ code: 500, message: 'Erro ao atualizar informações.' }),
        )
}

export {
    handleLogin,
    handleNovaConta,
    ativarConta,
    getInformacoes,
    patchInformacoes,
}
