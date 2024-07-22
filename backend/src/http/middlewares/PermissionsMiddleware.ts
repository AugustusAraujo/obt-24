require('dotenv').config()
import { NextFunction, Request, Response } from 'express'
import { IUsuarios } from '../../interfaces/IUsuarios'
import { decodeToken } from '../../services/tokens'

const PermissionsMiddleware =
    (permissao: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const usuario: IUsuarios = decodeToken(req.header('X-Token')).data
        
        // TODO: Adicionar verificação por array.
        // TODO: Verificar as permissões no banco de dados.
        return usuario.usuarioPermissions.filter((i: any) => {
            if(permissao === i) {
                return next()
            }
            return res
              .status(401)
              .json({ code: 401, message: 'Usuário não autorizado.' })
        })
    }

export { PermissionsMiddleware }
