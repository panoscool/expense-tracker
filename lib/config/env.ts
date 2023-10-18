export const isDevelopment = process.env.NODE_ENV === 'development';

export const env = {
  APP_URL: isDevelopment ? 'http://localhost:3000' : 'https://panoscool.com',
  API_URL: isDevelopment ? 'http://localhost:3000/api' : '/api',

  MONGODB_URI: isDevelopment ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || '',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  SENDGRID_SENDER: process.env.SENDGRID_SENDER || '',
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
