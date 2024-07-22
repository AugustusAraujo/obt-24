import usuariosService from '../../services/UsuariosService'
import createAndSaveTempTokenUseCase from '../CreateAndSaveTempToken'
import Mailer from '../Mailer/index'
import { IMailerDTO } from '../Mailer/MailerDTO'

export class SendEmailPasswordResetUseCase {
    private email: string | any
    private html: string | any
    private token: string | any
    private nome: string | any

    private async generateHTMLTemplate(): Promise<void> {
        this.html = `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Redefinir Senha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet">
    </head>
    
    <body>
        <table align="center" width="350" bgcolor="#42474D" height="300">
            <tr>
                <td style="padding: 5%;box-sizing: border-box;">
                    <h1
                        style="color: #ffff;margin:auto;text-align: center;font-family: 'Kanit', sans-serif;font-size: 1.5em;font-weight: 800;">
                        REDEFINIÇÃO DE SENHA
                    </h1>
                    <div align="center">
                        <h3 style="color: #ffff;width: 250px;font-size: 1.3em;text-align: left;padding: 10px 0 0 0;">
                            Olá, ${this.nome}>, esta é uma
                                mensagem automática referente a alteração de sua senha de acesso.
                        </h3>
                    </div>
                    <p style="color: #FF595E;text-align: center;padding: 20px;font-size: 1.1em;font-weight: 700;">
                        Clique no botão abaixo para alterar a sua
                        senha.
                    </p>
                    <div align="center" style="width: 320px;">
                        <a style="color: #ffff; background: #F66B0E;
                        box-shadow: 0px 0px 15px 3px rgba(251, 180, 84, 0.25);
                        border-radius: 5px;width: 200px;height: 30px;padding: 20px 40px;text-decoration: none;font-family: 'Kanit', sans-serif;font-weight: 800;font-size: 1.05em;
                        text-align: center;margin: 10px auto;" align="center"
                            href="http://estudemelhor.xyz/redefinir-senha/nova-senha?token=${this.token}">
                            REDEFINIR MINHA SENHA
                        </a>
                    </div>
                    <div>
                        <h4 style="color: #FF595E;text-align: center;
                        padding: 20px 0 0 0;font-size: 1.1em;font-weight: 700;">
                            Não foi você?
                        </h4>
                        <p style="color: #ffff;text-align: center;padding: 0;margin: 0;font-size: 1.05em;font-weight: 800;">
                            contato@estudemelhor.xyz
                        </p>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    
    </html>`
    }

    private async sendMail() {
        let data: IMailerDTO = {
            to: this.email,
            subject: 'Redefinir Senha',
            text: `Link para redefinir sua senha: https://estudemelhor.xyz/nova-senha?token=${this.token}`,
            html: this.html,
        }

        return await Mailer.execute(data).then((sucess) => {
            if (sucess) {
                return true
            }
        })
    }

    async execute(email: string) {
        this.email = email

        this.token = await createAndSaveTempTokenUseCase
            .execute(email, 'PRT')
            .then((token) => token)

        this.nome = await usuariosService.buscaNomeByEmail({email: email}).then((usuario) => usuario?.usuarioNome.split(" ")[0])

        await this.generateHTMLTemplate()

        return await this.sendMail()
    }
}
