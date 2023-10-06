import nodemailer from 'nodemailer'
import CONFIG from '../config/dotEnv.config.js'

export default class Mail {
  
  constructor() {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: CONFIG.NODEMAILER_EMAIL,
        pass: CONFIG.NODEMAILER_PWD
      }
    })
  }

  send = async (user, subject, html) => {
    const result = await this.transport.sendMail({
      from: CONFIG.NODEMAILER_EMAIL,
      to: user.email,
      subject,
      html
    })
    return result
  }

}