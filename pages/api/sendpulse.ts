import axios from 'axios';

const sendpulse = axios.create({
  timeout: 30000,
  responseType: 'json',
  baseURL: 'https://events.sendpulse.com/',
});

export const forgotPasswordEmail = async (email: string) => {
  await sendpulse.post('/events/id/*****/****', {
    phone: '+306900000000',
    email,
  });
};
