import passwordService from '../../services/PasswordService'
import usuariosService from '../../services/UsuariosService'
import { createAcessToken, createRefreshToken } from '../../services/tokens'
import { IUsuariosLoginDTO as IUserLoginDTO } from './UserLoginDTO'

export class UserLoginUseCase {
    async execute(data: IUserLoginDTO): Promise<{
        acessToken: string
        refreshToken: string
    }> {
        try {
            const usuario = await usuariosService.findOneByEmailWithPassword({
                email: data.email,
            })
            if (!usuario) throw new Error('Invalid user.')

            const match = await passwordService.comparePassword(
                data.password,
                usuario.usuarioSenha,
            )

            if (match) {
                return {
                    acessToken: await createAcessToken(usuario),
                    refreshToken: await createRefreshToken(usuario),
                }
            } else {
                throw new Error('Invalid user.')
            }
        } catch (e) {
            throw e
        }
    }
}
