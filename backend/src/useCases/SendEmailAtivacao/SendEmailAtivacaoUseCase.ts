import { IMailerDTO } from '../Mailer/MailerDTO'
import Mailer from '../Mailer/index'
import tokensService from '../../services/TokensService'
import usuariosService from '../../services/UsuariosService'

export class SendEmailAtivacaoUseCase {
    private email: string | any
    private html: string | any
    private token: string | any
    private nome: string | any

    private async saveTempToken(): Promise<void> {
        let token = tokensService.createTempTokenFromEmail(this.email)
        await tokensService.saveToken(token, 'NAC').then(async () => {
            this.token = token
        })
    }

    private async generateHTMLTemplate(token: string): Promise<void> {
        //TODO: AÇÃO TEMPORÁRIA APENAS PARA CONSEGUIR USAR O SERVIÇO
        this.html = `
        <!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Ativar Senha</title>
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
                        style="color: #ffff;margin:auto;text-align: center;font-family: 'Kanit', sans-serif;font-size: 1.7em;font-weight: 800;">
                        ATIVAÇÃO
                    </h1>
                    <div align="center">
                        <h3 style="color: #ffff;width: 250px;font-size: 1.3em;text-align: justify;padding: 10px 0 0 0;">
                            Olá, ${this.nome}, esta é uma
                                mensagem automática para a verificação de seu 
                                e-mail e ativação de sua conta. 
                        </h3>
                    </div>
                    <p style="color: #FF595E;text-align: center;padding: 20px;font-size: 1.1em;font-weight: 700;">
                        Clique no botão abaixo para ativar sua conta.
                    </p>
                    <div align="center" style="width: 320px;">
                        <a style="color: #ffff; background: #F66B0E;
                        box-shadow: 0px 0px 15px 3px rgba(251, 180, 84, 0.25);
                        border-radius: 5px;width: 200px;height: 30px;padding: 15px 40px;text-decoration: none;font-family: 'Kanit', sans-serif;font-weight: 800;font-size: 1.15em;
                        text-align: center;margin: 10px auto;" align="center"
                            href="https://estudemelhor.xyz/ativar-conta?token=${this.token}">
                            ATIVAR MINHA CONTA
                        </a>
                    </div>
                    <br>
                </td>
            </tr>
        </table>
    </body>
        </html>`
    }

    private async sendMail() {
        const data: IMailerDTO = {
            to: this.email,
            subject: 'Ativação de Conta',
            text: `https://estudemelhor.xyz/ativar-conta?token=${this.token}`,
            html: this.html,
        }

        return await Mailer.execute(data)
            .then((sucess) => {
                if (sucess) return true
                throw new Error('Não foi possível enviar o email.')
            })
            .catch(() => new Error('Não foi possível enviar o email.'))
    }

    async execute(email: string) {
        this.email = email
        this.nome = await usuariosService
            .buscaNomeByEmail({ email: email })
            .then((nome) => nome?.usuarioNome.split(' ')[0])
        await this.saveTempToken()
        await this.generateHTMLTemplate(this.token)

        return this.sendMail()
    }
}
