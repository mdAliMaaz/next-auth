import nodemailer from 'nodemailer'

import User from '@/models/user'

import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        const hashedToken = bcryptjs.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {

            await User.findOneAndUpdate(userId, { verifyToken: hashedToken, verfyTokenExpiry: Date.now() + 3600000 });
        }
        else if (emailType === 'RESET') {
            await User.findOneAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "951f16173029cd",
                pass: "6c929d9edd12e5"
            }
        });

        const DOMAIN = 'http://localhost:3000'
        const mailOptions = {
            from: 'alimaazali6@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.log(error.message)
    }

}