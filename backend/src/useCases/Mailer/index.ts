import { SMTPMailProvider } from "../../providers/SMTPMailProvider/SMTPMailProvider";
import { MailerUseCase } from "./MailerUseCase";

const mailerUseCase = new MailerUseCase(new SMTPMailProvider())

export default mailerUseCase