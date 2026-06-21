const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');

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

const uploadEventBanner = createUploader('events').single('banner');

module.exports = { uploadEventBanner };
