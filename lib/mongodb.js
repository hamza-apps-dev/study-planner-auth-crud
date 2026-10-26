import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

import os from 'os';

function getPreferredLocalAddress() {
  if (process.env.LOCAL_ADDRESS) return process.env.LOCAL_ADDRESS;
  const ifaces = os.networkInterfaces();
  for (const [name, addrs] of Object.entries(ifaces)) {
    if (/pdanet/i.test(name)) {
      const ipv4 = (addrs || []).find((a) => a.family === 'IPv4' && !a.internal);
      if (ipv4) return ipv4.address;
    }
  }
  return undefined;
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const localAddress = getPreferredLocalAddress();
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      ...(localAddress ? { localAddress } : {}),
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
