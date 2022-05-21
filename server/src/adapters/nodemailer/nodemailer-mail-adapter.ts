import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "756ef266765a48",
    pass: "3913b40c6df791"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Willian Guerra <willianguerrapossamai0901@gmail.com>',
      subject,
      html: body,

    })
  }
}