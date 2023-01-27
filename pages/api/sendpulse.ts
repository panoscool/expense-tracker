import axios from 'axios';
import { env } from '../../lib/config/env';

const sendpulse = axios.create({
  timeout: 30000,
  responseType: 'json',
  baseURL: 'https://events.sendpulse.com',
});

export const forgotPasswordEmail = async (email: string, token: string, name: string) => {
  await sendpulse.post(`${process.env.SENDPULSE_FORGOT_PASSWORD}`, {
    phone: '+306900000000',
    email,
    url: `${env.baseUrl}/reset-password?${token}`,
    name,
  });
};
