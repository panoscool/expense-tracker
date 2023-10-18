import mongoose from 'mongoose';
import { env } from './env';

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 * https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
 */

interface Global {
  mongoose: {
    conn: any;
    promise: any;
  };
}

declare const global: Global;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  mongoose.set('strictQuery', true);

  if (!env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(env.MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
