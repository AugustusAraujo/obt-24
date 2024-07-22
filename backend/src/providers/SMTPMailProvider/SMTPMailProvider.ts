import * as nodemailer from 'nodemailer'
require('dotenv').config()

export class SMTPMailProvider {
    private transporter
    constructor() {
        try {
            this.transporter = nodemailer.createTransport({
                // @ts-ignore
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                tls: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            })
        } catch (err) {
            throw new Error(`Erro ao criar transporte: ${err}`)
        }
    }

    async send(to: string, subject: string, text: string, html: string = '') {
        return await this.transporter
            .sendMail({
                from: "'Estude Melhor'<noreply@estudemelhor.xyz>",
                to: to,
                subject: subject,
                text: text,
                html: html,
            })
            .then(() => true)
            .catch((e) => {
                console.log(e)
                throw new Error('Problemas com o serviço de email.')
            })
    }
}
