import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // console.log("user :", user, "URL :", url, "TOKEN :", token);
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"prisma blog" <prisma@example.com>', // sender address
          to: user.email, // list of recipients
          subject: "Please verify your mail", // subject line
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8; padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px; background-color:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#4f46e5; padding:28px 24px;">
              <h1 style="margin:0; font-size:22px; color:#ffffff;">Prisma Blog</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px; color:#333333; font-size:15px; line-height:1.6;">
              <h2 style="margin:0 0 12px; font-size:20px; color:#111111;">Verify your email address</h2>
              <p style="margin:0 0 16px;">Hi ${user.name || "there"},</p>
              <p style="margin:0 0 24px;">
                Thanks for signing up! Please confirm your email address by clicking the button below.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 24px;">
                <tr>
                  <td align="center" style="background-color:#4f46e5; border-radius:6px;">
                    <a href="${verificationUrl}"
                       style="display:inline-block; padding:14px 32px; font-size:16px; font-weight:bold; color:#ffffff; text-decoration:none;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px; font-size:13px; color:#666666;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin:0 0 24px; font-size:13px; word-break:break-all;">
                <a href="${verificationUrl}" style="color:#4f46e5;">${verificationUrl}</a>
              </p>

              <p style="margin:0; font-size:13px; color:#666666;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#f9fafb; padding:16px; font-size:12px; color:#999999;">
              &copy; ${new Date().getFullYear()} Prisma Blog. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      } catch (err) {
        console.error("Error while sending mail:", err);
      }
    },
  },
  socialProviders: {
        google: { 
            prompt: "select_account consent",
            accessType: "offline",

            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 

        }, 
    },
});
