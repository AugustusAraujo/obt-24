import { Request, Response } from 'express'

const { verifyToken } = require('../../services/tokens')

const checktoken = async (req: Request, res: Response) => {
    const token: any | string = req.header('X-Token')
    if (token) {
        if (verifyToken(token)) return res.status(200).json({ code: 200 })
        return res.status(400).json({ code: 400, message: 'Invalid token.' })
    }
    return res.status(400).json({ code: 400, message: 'Invalid token.' })
}

module.exports = checktoken
