require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const Ticket = require('./models/Ticket');
const connectDB = require('./config/database');

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Booking.deleteMany({}),
    Ticket.deleteMany({}),
  ]);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  });

  const organizer = await User.create({
    name: 'John Organizer',
    email: 'organizer@example.com',
    password: 'password123',
    role: 'organizer',
  });

  const organizer2 = await User.create({
    name: 'Sarah Organizer',
    email: 'organizer2@example.com',
    password: 'password123',
    role: 'organizer',
  });

  const attendee = await User.create({
    name: 'Alice Attendee',
    email: 'attendee@example.com',
    password: 'password123',
    role: 'attendee',
  });

  const attendee2 = await User.create({
    name: 'Bob Attendee',
    email: 'attendee2@example.com',
    password: 'password123',
    role: 'attendee',
  });

  const events = await Event.create([
    {
      title: 'React Summit 2026',
      description: 'A full-day conference covering the latest in React 19, Server Components, and the React ecosystem. Join industry leaders for talks, workshops, and networking.',
      category: 'Technology',
      venue: 'San Francisco Convention Center',
      date: new Date('2026-08-15'),
      time: '09:00 AM',
      price: 299,
      totalSeats: 500,
      availableSeats: 500,
      organizerId: organizer._id,
      status: 'active',
    },
    {
      title: 'Jazz Night Under the Stars',
      description: 'An enchanting evening of live jazz music featuring world-class musicians. Food and drinks available.',
      category: 'Music',
      venue: 'Central Park Amphitheater',
      date: new Date('2026-07-20'),
      time: '07:00 PM',
      price: 75,
      totalSeats: 300,
      availableSeats: 300,
      organizerId: organizer._id,
      status: 'active',
    },
    {
      title: 'Startup Pitch Competition',
      description: 'Watch 10 early-stage startups pitch to a panel of top VCs. Network with founders and investors.',
      category: 'Business',
      venue: 'WeWork Financial District',
      date: new Date('2026-09-10'),
      time: '02:00 PM',
      price: 0,
      totalSeats: 200,
      availableSeats: 200,
      organizerId: organizer._id,
      status: 'active',
    },
    {
      title: 'Yoga & Wellness Retreat',
      description: 'A weekend retreat focusing on mindfulness, yoga, and holistic wellness. Includes meals and accommodation.',
      category: 'Health',
      venue: 'Green Valley Resort',
      date: new Date('2026-10-05'),
      time: '08:00 AM',
      price: 499,
      totalSeats: 100,
      availableSeats: 100,
      organizerId: organizer2._id,
      status: 'active',
    },
    {
      title: 'AI & Machine Learning Workshop',
      description: 'Hands-on workshop covering LLMs, computer vision, and ML pipelines. Bring your laptop!',
      category: 'Technology',
      venue: 'MIT Media Lab',
      date: new Date('2026-11-01'),
      time: '10:00 AM',
      price: 199,
      totalSeats: 150,
      availableSeats: 150,
      organizerId: organizer2._id,
      status: 'active',
    },
    {
      title: 'Food Festival 2026',
      description: 'A culinary celebration featuring 50+ food stalls, live cooking demos, and tastings from around the world.',
      category: 'Food',
      venue: 'Waterfront Park',
      date: new Date('2026-08-25'),
      time: '11:00 AM',
      price: 25,
      totalSeats: 1000,
      availableSeats: 1000,
      organizerId: organizer._id,
      status: 'active',
    },
  ]);

  console.log('Database seeded successfully!');
  console.log('---');
  console.log('Admin:    admin@example.com / password123');
  console.log('Organizer: organizer@example.com / password123');
  console.log('Organizer: organizer2@example.com / password123');
  console.log('Attendee: attendee@example.com / password123');
  console.log('Attendee: attendee2@example.com / password123');
  console.log(`Created ${events.length} events`);

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
