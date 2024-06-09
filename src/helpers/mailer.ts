import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import nodemailer from "nodemailer"


export async function sendEmail({ email, emailType, userId }: any) {
    try {
        const hashed_token = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {
            await User.findOneAndUpdate({ _id: userId }, { verifyToken: hashed_token, verifyTokenExpiry: Date.now() + 3600000 });

        }
        else if (emailType === 'RESET') {
            await User.findOneAndUpdate({ _id: userId }, { forgotPasswordToken: hashed_token, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        //nodemailer documentation
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const encodedToken = encodeURIComponent(hashed_token);
        const urlPath = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
        const subject = emailType === "VERIFY" ? "Please verify your email" : "Reset your password";
        const url = `${process.env.DOMAIN}/${urlPath}?token=${encodedToken}`;
        const htmlContent = `
            <p>Click <a href="${url}">Here</a> to ${subject.toLowerCase()} or paste the below URL into your browser:</p>
            <p>${url}</p>
        `;


        const mailOptions = {
            from: 'abhi2003shukla@gmail.com',
            to: email,
            subject: subject,
            html: htmlContent
        }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.log(error.message)
    }
}
