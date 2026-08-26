import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import mongoose from 'mongoose';
import User from './models/User.js';
import Event from './models/Event.js';
import Booking from './models/Booking.js';
import Counter from './models/Counter.js';
import connectDB from './config/database.js';

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Booking.deleteMany({}),
    Counter.deleteMany({}),
  ]);

  const admin = await User.create({ name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' });
  const organizer = await User.create({ name: 'John Organizer', email: 'organizer@example.com', password: 'password123', role: 'organizer' });
  const organizer2 = await User.create({ name: 'Sarah Organizer', email: 'organizer2@example.com', password: 'password123', role: 'organizer' });
  const attendee = await User.create({ name: 'Alice Attendee', email: 'attendee@example.com', password: 'password123', role: 'attendee' });
  const attendee2 = await User.create({ name: 'Bob Attendee', email: 'attendee2@example.com', password: 'password123', role: 'attendee' });

  const events = await Event.create([
    { title: 'React Summit 2026', description: 'A full-day conference covering the latest in React 19, Server Components, and the React ecosystem. Join industry leaders for talks, workshops, and networking.', category: 'Technology', venue: 'San Francisco Convention Center', date: new Date('2026-09-15'), time: '09:00 AM', price: 299, totalSeats: 500, availableSeats: 498, organizerId: organizer._id },
    { title: 'Jazz Night Under the Stars', description: 'An enchanting evening of live jazz music featuring world-class musicians. Food and drinks available.', category: 'Music', venue: 'Central Park Amphitheater', date: new Date('2026-09-20'), time: '07:00 PM', price: 75, totalSeats: 300, availableSeats: 299, organizerId: organizer._id },
    { title: 'Startup Pitch Competition', description: 'Watch 10 early-stage startups pitch to a panel of top VCs. Network with founders and investors.', category: 'Business', venue: 'WeWork Financial District', date: new Date('2026-10-10'), time: '02:00 PM', price: 0, totalSeats: 200, availableSeats: 200, organizerId: organizer2._id },
    { title: 'Yoga & Wellness Retreat', description: 'A weekend retreat focusing on mindfulness, yoga, and holistic wellness. Includes meals and accommodation.', category: 'Health', venue: 'Green Valley Resort', date: new Date('2026-10-25'), time: '08:00 AM', price: 499, totalSeats: 100, availableSeats: 100, organizerId: organizer2._id },
    { title: 'AI & Machine Learning Workshop', description: 'Hands-on workshop covering LLMs, computer vision, and ML pipelines. Bring your laptop!', category: 'Technology', venue: 'MIT Media Lab', date: new Date('2026-11-05'), time: '10:00 AM', price: 199, totalSeats: 150, availableSeats: 150, organizerId: organizer2._id },
    { title: 'Food Festival 2026', description: 'A culinary celebration featuring 50+ food stalls, live cooking demos, and tastings from around the world.', category: 'Food', venue: 'Waterfront Park', date: new Date('2026-11-20'), time: '11:00 AM', price: 25, totalSeats: 1000, availableSeats: 1000, organizerId: organizer2._id },
  ]);

  await Counter.create({ name: 'booking', sequence: 2 });

  await Booking.create([
    {
      bookingId: 'BOOK-000001',
      userId: attendee._id,
      eventId: events[0]._id,
      quantity: 2,
      totalAmount: events[0].price * 2,
      bookingStatus: 'booked',
    },
    {
      bookingId: 'BOOK-000002',
      userId: attendee2._id,
      eventId: events[1]._id,
      quantity: 1,
      totalAmount: events[1].price * 1,
      bookingStatus: 'booked',
    },
  ]);

  console.log('Database seeded successfully with users, events, and bookings!');
  console.log('---');
  console.log('Admin:    admin@example.com / password123');
  console.log('Organizer: organizer@example.com / password123');
  console.log('Organizer: organizer2@example.com / password123');
  console.log('Attendee: attendee@example.com / password123');
  console.log('Attendee: attendee2@example.com / password123');
  process.exit(0);
};

seed().catch((err) => { console.error('Seed error:', err); process.exit(1); });
