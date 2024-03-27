const nodemailer = require('nodemailer');

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'myunakk@mail.ru',
          pass: 'Au8tTwqQ6xRg5jPubWix',
        },
      },
      {
        from: 'test test myunakk@mail.ru',
      },
    );
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'myunakk@mail.ru',
      to,
      subject: 'activation on' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
        `,
    });
  }
}

module.exports = new mailService();
