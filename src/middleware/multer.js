import multer from 'multer';

export const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return callback(new Error('Only images allowed'));
    }
    callback(null, true);
  },
});

// callback(null, false);
// callback(new Error(''));
