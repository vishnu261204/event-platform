const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');

const createUploader = (subFolder, allowedTypes = /jpeg|jpg|png|webp/) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads', subFolder));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
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
