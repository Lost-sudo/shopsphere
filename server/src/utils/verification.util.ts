import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export class VerificationUtil {
    private static createTransporter() {
        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const smtpPort = Number(process.env.SMTP_PORT ?? 587);
        const smtpSecure =
            process.env.SMTP_SECURE === "true" || smtpPort === 465;

        if (smtpHost && smtpUser && smtpPass) {
            return nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpSecure,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });
        }

        if (process.env.NODE_ENV === "development") {
            console.warn(
                "[VerificationUtil] SMTP env vars are missing. Using json transport in development mode.",
            );

            return nodemailer.createTransport({
                jsonTransport: true,
            });
        }

        throw new Error(
            "SMTP configuration is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.",
        );
    }

    private static getVerificationBaseUrl() {
        if (process.env.BASE_URL) {
            return process.env.BASE_URL;
        }

        const backendPort = process.env.PORT || "5000";

        return `http://localhost:${backendPort}`;
    }

    static async sendVerificationEmail(email: string, token: string) {
        const transporter = this.createTransporter();

        const verificationUrl = `${this.getVerificationBaseUrl()}/api/v1/auth/verify?token=${token}`;
        const fromAddress =
            process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@shopsphere.local";

        await transporter.sendMail({
            from: `"ShopSphere" <${fromAddress}>`,
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
