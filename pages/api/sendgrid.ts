import sgMail from '@sendgrid/mail';
import { env } from '../../lib/config/env';

const template = (url: string) => {
  return `
    You are receiving this message because you requested to reset your hexpense account password.

    To reset your password, please use the following link:

    ${url}

    If the link does not work, copy & paste the entire link into your web browser.

    If you did not request this email, you can ignore it and no changes will be made to your account.
`;
};

export async function sendEmail(to: string, name: string, token: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  try {
    await sgMail.send({
      from: process.env.SENDGRID_SENDER!,
      to,
      subject: 'Password reset',
      text: `Hello ${name}`,
      html: template(`${env.baseUrl}/reset-password?token=${token}`),
    });
  } catch (error) {
    console.error(error);
  }
}
