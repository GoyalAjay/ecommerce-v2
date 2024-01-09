import nodemailer from "nodemailer";
import handlebars from "handlebars";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { passwordResetToken } from "./generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

const sendEmail = asyncHandler(async (res, user) => {
    try {
        passwordResetToken(res, user._id);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, "../config/password-reset.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        let replacements;
        if (process.env.NODE_ENV === "development") {
            replacements = {
                userName: `${user.firstName} ${user.lastName}`,
                message: `http://localhost:3000/resetPassword`,
            };
        } else {
            replacements = {
                userName: `${user.firstName} ${user.lastName}`,
                // message: `http://localhost:${process.env.PORT}/resetPassword`,
            };
        }
        const htmlToSend = template(replacements);
        const config = {
            service: "gmail",
            host: "smtp.gmail.com",
            port: process.env.NODEMAILER_PORT,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        };
        const transporter = nodemailer.createTransport(config);
        const mailOptions = {
            from: `Ecommerce <${process.env.NODEMAILER_USER}>`,
            to: user.email,
            subject: "Reset Password",
            html: htmlToSend,
            priority: "high",
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        res.status(200).json(info);
    } catch (error) {
        console.log(error);
    }
});

export default sendEmail;
