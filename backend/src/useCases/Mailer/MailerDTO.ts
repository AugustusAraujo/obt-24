export interface IMailerDTO {
    to: string
    subject: string
    text: string
    html: string | any
}