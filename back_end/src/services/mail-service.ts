import { transporter } from "../utils/nodemailer/nodemailer"

export async function sendEmail(email: string, token: string) {
    const mailOptions = {
        from: 'your email',
        to: email,
        subject: 'Password reset',
        html:`
        <div style="text-align: center;">
            <h1>Reset Password</h1>
            <a style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px;" href="http://localhost:5173/reset/${token}">Click here to reset password</a>
        </div>`
    }
    await transporter.sendMail(mailOptions)
}