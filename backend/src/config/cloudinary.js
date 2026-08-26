import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dfltjdqd7',
  api_key: process.env.CLOUDINARY_API_KEY || '973334328336933',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'P7NyyyVACDBP-HzkMy5bvYL8wzg',
  secure: true,
});

export default cloudinary;
