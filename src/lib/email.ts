import { assert } from "@acdh-oeaw/lib";
import { createTransport, type SendMailOptions } from "nodemailer";

import { env } from "@/config/env.config";

interface SendEmailParams extends Pick<SendMailOptions, "from" | "subject" | "text"> {}

export function sendEmail(params: SendEmailParams) {
	const { from, subject, text } = params;

	assert(env.EMAIL_SMTP_SERVER, "Invalid email configuration.");
	assert(env.EMAIL_SMTP_PORT, "Invalid email configuration.");
	assert(env.EMAIL_CONTACT_ADDRESS, "Invalid email configuration.");

	const transporter = createTransport({
		host: env.EMAIL_SMTP_SERVER,
		port: env.EMAIL_SMTP_PORT,
		secure: false,
	});

	return transporter.sendMail({
		from,
		to: env.EMAIL_CONTACT_ADDRESS,
		subject,
		text,
	});
}
