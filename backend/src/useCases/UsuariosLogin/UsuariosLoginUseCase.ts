import passwordService from '../../services/PasswordService'
import usuariosService from '../../services/UsuariosService'
import { createAcessToken, createRefreshToken } from '../../services/tokens'
import { IUsuariosLoginDTO } from './UsuariosLoginDTO'

export class UsuariosLoginUseCase {
    async execute(data: IUsuariosLoginDTO): Promise<{
        acessToken: string
        refreshToken: string
    }> {
        try {
            const usuario = await usuariosService.findOneByEmailWithPassword({
                email: data.email,
            })
            if (!usuario) throw new Error('Usuário não encontrado.')

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
                throw new Error('Senha incorreta.')
            }
        } catch (e) {
            throw e
        }
    }
}
