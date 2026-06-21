import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ApiError from '../utils/ApiError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUploader = (subFolder, allowedTypes = /jpeg|jpg|png|webp/) => {
  const destPath = path.join(__dirname, '../../uploads', subFolder);

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const name = `event-${Date.now()}${ext}`;
      cb(null, name);
    },
  });

  const fileFilter = (req, file, cb) => {
    const mime = allowedTypes.test(file.mimetype);
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (mime && ext) {
      cb(null, true);
    } else {
      cb(new ApiError(400, 'Only image files (jpg, jpeg, png, webp) are allowed'), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 },
  });
};

export const uploadEventBanner = createUploader('events').single('banner');
