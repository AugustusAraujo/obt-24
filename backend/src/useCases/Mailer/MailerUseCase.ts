import { ISMTPMailProvider } from "../../providers/SMTPMailProvider/ISMTPMailProvider";
import { IMailerDTO } from "./MailerDTO";

export class MailerUseCase {
    constructor(private mailProvider: ISMTPMailProvider) { }
    async execute(data: IMailerDTO) {
        try {
            return this.mailProvider.send(data.to, data.subject, data.text, data.html)
        }
        catch {
            throw new Error("Não foi possível executar o envio de email.")
        }
    }
}