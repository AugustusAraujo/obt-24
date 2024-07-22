require('dotenv').config()
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

const TokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.header('X-Token')) {
        return res
            .status(401)
            .json({ code: 401, message: 'Token não informado.' })
    }
    try {
        // @ts-ignore
        if (jwt.verify(req.header('X-Token'), process.env.JWT_SECRET)) {
            return next()
        }
        return res.status(401).json({ code: 401, message: 'Token inválido.' })
    } catch (_) {
        return res
            .status(401)
            .json({ code: 401, message: 'Erro ao analisar o token.' })
    }
}

module.exports = TokenMiddleware
