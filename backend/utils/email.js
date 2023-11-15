const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `App name <${process.env.EMAIL_FORM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === "production") {
    //   //Sendgrid
    //   return 1;
    // }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on template

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: template,
      //html:
    };

    // 3) create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the App!");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "הקוד שלך לאיפוס סיסמה (תקף ל10 דקות)");
  }
};
