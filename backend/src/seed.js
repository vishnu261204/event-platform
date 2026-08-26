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

  console.log('Clearing all collections (User, Event, Booking, Counter)...');
  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Booking.deleteMany({}),
    Counter.deleteMany({}),
  ]);

  console.log('Seeding Users according to User Schema...');
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    isActive: true,
  });

  const organizer1 = await User.create({
    name: 'John Organizer',
    email: 'organizer@example.com',
    password: 'password123',
    role: 'organizer',
    isActive: true,
  });

  const organizer2 = await User.create({
    name: 'Sarah Organizer',
    email: 'organizer2@example.com',
    password: 'password123',
    role: 'organizer',
    isActive: true,
  });

  const attendee1 = await User.create({
    name: 'Alice Attendee',
    email: 'attendee@example.com',
    password: 'password123',
    role: 'attendee',
    isActive: true,
  });

  const attendee2 = await User.create({
    name: 'Bob Attendee',
    email: 'attendee2@example.com',
    password: 'password123',
    role: 'attendee',
    isActive: true,
  });

  const attendee3 = await User.create({
    name: 'Carol Attendee',
    email: 'attendee3@example.com',
    password: 'password123',
    role: 'attendee',
    isActive: true,
  });

  console.log('Seeding Events according to Event Schema...');
  const events = await Event.create([
    {
      title: 'React Summit 2026',
      description: 'A full-day conference covering React 19, Server Components, and the modern frontend ecosystem with keynotes, technical workshops, and developer networking.',
      category: 'Technology',
      venue: 'San Francisco Convention Center',
      date: new Date('2026-09-15'),
      time: '09:00 AM',
      price: 299,
      totalSeats: 500,
      availableSeats: 497,
      banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      organizerId: organizer1._id,
      status: 'active',
    },
    {
      title: 'Jazz Night Under the Stars',
      description: 'An enchanting evening of live outdoor jazz music featuring world-class saxophonists and pianists with food stalls and wine tasting.',
      category: 'Music',
      venue: 'Central Park Amphitheater',
      date: new Date('2026-09-20'),
      time: '07:00 PM',
      price: 75,
      totalSeats: 300,
      availableSeats: 298,
      banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
      organizerId: organizer1._id,
      status: 'active',
    },
    {
      title: 'Startup Pitch Competition',
      description: 'Watch 10 early-stage technology startups pitch live to top Silicon Valley venture capitalists for seed funding and accelerator entry.',
      category: 'Business',
      venue: 'WeWork Financial District',
      date: new Date('2026-10-10'),
      time: '02:00 PM',
      price: 0,
      totalSeats: 200,
      availableSeats: 198,
      banner: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
      organizerId: organizer2._id,
      status: 'active',
    },
    {
      title: 'Yoga & Wellness Retreat',
      description: 'A weekend retreat focusing on guided meditation, restorative yoga sessions, sound bath therapy, and organic plant-based nutrition.',
      category: 'Health',
      venue: 'Green Valley Resort',
      date: new Date('2026-10-25'),
      time: '08:00 AM',
      price: 499,
      totalSeats: 100,
      availableSeats: 98,
      banner: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
      organizerId: organizer2._id,
      status: 'active',
    },
    {
      title: 'AI & Machine Learning Workshop',
      description: 'Hands-on practical workshop covering LLMs, neural networks, computer vision, and ML model deployment pipelines.',
      category: 'Technology',
      venue: 'MIT Media Lab',
      date: new Date('2026-11-05'),
      time: '10:00 AM',
      price: 199,
      totalSeats: 150,
      availableSeats: 150,
      banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      organizerId: organizer2._id,
      status: 'active',
    },
    {
      title: 'Food & Wine Festival 2026',
      description: 'A culinary celebration featuring 50+ international food vendor stalls, artisan wine tastings, and live cooking demonstrations.',
      category: 'Food',
      venue: 'Waterfront Park',
      date: new Date('2026-11-20'),
      time: '11:00 AM',
      price: 25,
      totalSeats: 1000,
      availableSeats: 998,
      banner: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      organizerId: organizer2._id,
      status: 'active',
    },
    {
      title: 'International Film Festival',
      description: 'Screening award-winning independent feature films, short films, and documentaries with guest Q&A sessions with directors.',
      category: 'Arts',
      venue: 'Metropolitan Cinema Hall',
      date: new Date('2026-12-05'),
      time: '06:30 PM',
      price: 120,
      totalSeats: 250,
      availableSeats: 250,
      banner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      organizerId: organizer1._id,
      status: 'active',
    },
    {
      title: 'City Marathon & Fitness Expo',
      description: 'Join thousands of runners in the annual city marathon featuring 5K, 10K, and full marathon routes with official timing medals.',
      category: 'Sports',
      venue: 'City Stadium Square',
      date: new Date('2026-12-15'),
      time: '06:00 AM',
      price: 50,
      totalSeats: 800,
      availableSeats: 800,
      banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      organizerId: organizer1._id,
      status: 'active',
    },
  ]);

  console.log('Seeding Bookings according to Booking Schema...');
  await Booking.create([
    {
      bookingId: 'BOOK-000001',
      userId: attendee1._id,
      eventId: events[0]._id,
      quantity: 3,
      totalAmount: events[0].price * 3,
      bookingStatus: 'booked',
      bookingDate: new Date('2026-08-26'),
    },
    {
      bookingId: 'BOOK-000002',
      userId: attendee2._id,
      eventId: events[1]._id,
      quantity: 2,
      totalAmount: events[1].price * 2,
      bookingStatus: 'booked',
      bookingDate: new Date('2026-08-26'),
    },
    {
      bookingId: 'BOOK-000003',
      userId: attendee3._id,
      eventId: events[2]._id,
      quantity: 2,
      totalAmount: events[2].price * 2,
      bookingStatus: 'booked',
      bookingDate: new Date('2026-08-26'),
    },
    {
      bookingId: 'BOOK-000004',
      userId: attendee1._id,
      eventId: events[3]._id,
      quantity: 2,
      totalAmount: events[3].price * 2,
      bookingStatus: 'booked',
      bookingDate: new Date('2026-08-26'),
    },
    {
      bookingId: 'BOOK-000005',
      userId: attendee2._id,
      eventId: events[5]._id,
      quantity: 2,
      totalAmount: events[5].price * 2,
      bookingStatus: 'booked',
      bookingDate: new Date('2026-08-26'),
    },
  ]);

  console.log('Seeding Sequence Counter according to Counter Schema...');
  await Counter.create({
    name: 'booking',
    sequence: 5,
  });

  console.log('\n======================================================');
  console.log('Database seeded successfully based on DB Schema!');
  console.log('======================================================');
  console.log('Admin User:      admin@example.com / password123');
  console.log('Organizer 1:     organizer@example.com / password123');
  console.log('Organizer 2:     organizer2@example.com / password123');
  console.log('Attendee 1:      attendee@example.com / password123');
  console.log('Attendee 2:      attendee2@example.com / password123');
  console.log('Attendee 3:      attendee3@example.com / password123');
  console.log('======================================================\n');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed execution error:', err);
  process.exit(1);
});
