import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export class VerificationUtil {
    static async sendVerificationEmail(email: string, token: string) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify?token=${token}`;

        await transporter.sendMail({
            from: `"ShopSphere" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Email Verification - ShopSphere",
            html: `
            <h1>Email Verification</h1>
            <p>Click the link below to verify your email address:</p>
            <a href="${verificationUrl}">Verify Email</a>
        `,
        });
    }

    static generateVerificationToken(): string {
        return crypto.randomBytes(32).toString("hex");
    }
}
