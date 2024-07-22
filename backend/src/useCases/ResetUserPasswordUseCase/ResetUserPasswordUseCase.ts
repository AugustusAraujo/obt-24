import passwordService from '../../services/PasswordService'
import usuariosService from '../../services/UsuariosService'
import {
    decodeToken,
    deleteTempToken,
    verifyTempToken,
    verifyToken,
} from '../../services/tokens'

export class ResetUserPasswordUseCase {
    async execute(token: string, newPassword: string) {
        try {
            if (!verifyToken(token)) {
                throw new Error('Token inválido.')
            }

            const checkToken = await verifyTempToken(token, 'PRT')

            if (checkToken) {
                const { email } = decodeToken(token).data
                const { usuarioID } = await usuariosService.findOneByEmail(
                    email,
                )

                const alterado = await passwordService.alterPassword(
                    usuarioID,
                    newPassword,
                )

                if (!alterado) {
                    throw new Error('Não foi possível atualizar a senha.')
                }

                // @ts-ignore
                await deleteTempToken(checkToken?.token_ID)

                return true
            }

            throw new Error('Token inválido')
        } catch (error) {
            throw error
        }
    }
}
