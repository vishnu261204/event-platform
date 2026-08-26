import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com", "https://images.unsplash.com", "https://*.unsplash.com", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
    },
  },
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

import fs from 'fs';

const frontendDist = path.join(__dirname, '../../frontend/dist');
const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  if (fs.existsSync(path.join(frontendDist, 'index.html'))) {
    return res.sendFile(path.join(frontendDist, 'index.html'));
  }
  if (fs.existsSync(path.join(publicDir, 'index.html'))) {
    return res.sendFile(path.join(publicDir, 'index.html'));
  }
  next();
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

export default app;
