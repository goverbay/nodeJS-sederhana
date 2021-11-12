require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        console.log(process.env.MAIL_USER, process.env.MAIL_PASSWORD);
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: `${process.env.MAIL_USER}`,
                pass: `${process.env.MAIL_PASSWORD}`,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: text,
            html: text,
        });
        console.log('Email berhasil dikirimkan')
    } catch (error) {
        console.log(`Gagal ngirim email: ${error}`);
    }
}

module.exports = sendEmail;