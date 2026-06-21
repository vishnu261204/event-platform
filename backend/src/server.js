import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import app from './app.js';
import connectDB from './config/database.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const fixBookingIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    if (!db) return;
    const collections = await db.listCollections({ name: 'bookings' }).toArray();
    if (collections.length === 0) return;

    await db.collection('bookings').dropIndex('bookingId_1').catch(() => {});
    await db.collection('bookings').updateMany(
      { bookingId: { $exists: false } },
      [{ $set: { bookingId: { $concat: ['BOOK-', { $toString: '$_id' }] } } }],
    ).catch(() => {});

    const Booking = mongoose.model('Booking');
    await Booking.syncIndexes();
  } catch {}
};

const start = async () => {
  await connectDB();
  await fixBookingIndexes();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

start();
