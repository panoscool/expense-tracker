import sgMail from '@sendgrid/mail';

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  try {
    await sgMail.send({
      from: process.env.SENDGRID_TO_EMAIL!,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error(error);
  }
}
