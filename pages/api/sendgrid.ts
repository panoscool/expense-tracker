import sgMail from '@sendgrid/mail';
import { env } from '../../lib/config/env';

const template = (name: string, hash: string) => {
  return `
    Hello ${name}

    <p>You are receiving this message because you requested to reset your password.</p>

    <p>To reset your password, please use the following link:</p>

    ${env.baseUrl}/reset-password?hash=${hash}

    <p>If the link does not work, copy & paste the entire link into your web browser.</p>

    <p>If you did not request this email, you can ignore it and no changes will be made to your account.</p>

    <a href="https://panoscool.com" rel="noopener noreferrer">panoscool.com</a>
`;
};

export async function forgotPasswordEmail(to: string, name: string, hash: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  try {
    await sgMail.send({
      from: process.env.SENDGRID_SENDER!,
      to,
      subject: 'Password reset',
      html: template(name, hash),
    });
  } catch (error) {
    console.error(error);
  }
}
