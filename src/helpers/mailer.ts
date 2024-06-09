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

        const mailOptions = {
            from: 'abhi2003shukla@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Plaese verify your email" : "Reset your password",
            html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashed_token}'>Here</a> to ${emailType === "VERIFY" ? "Plaese verify your email" : "Reset your password"} or paste below url ${process.env.DOMAIN}/verifyemail?token=${hashed_token}}`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;


    } catch (error: any) {
        console.log(error.message)
    }
}
