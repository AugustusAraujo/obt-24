import { PasswordService } from '../../services/PasswordService/PasswordService'
import { UsuariosService } from '../../services/UsuariosService/UsuariosService'
import { ICreateNewAccount } from './CreateNewAccountDTO'
import { verify } from 'hcaptcha'

export class CreateNewAccountUseCase {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly passwordService: PasswordService,
    ) {}

    private HCAPTCHA_SECRET: string | any = process.env.HCAPTCHA_SECRET

    async execute(data: ICreateNewAccount) {
        const verified = await verify(this.HCAPTCHA_SECRET, data.captchaToken)

        if (!verified.success) {
            throw new Error('Captcha inválido.')
        }

        const countUser = await this.usuariosService.countEmail({
            email: data.email,
        })

        if (countUser != 0) {
            throw new Error('Email já usado.')
        }

        const hash = await this.passwordService.hashPassword(data.password)

        return this.usuariosService
            .save({
                usuarioEmail: data.email,
                usuarioNome: data.fullName,
                usuarioSenha: hash,
                usuarioContaAtivada: true,
            })
            .then((user) => user)
            .catch((e) => {
                throw e
            })
    }
}
