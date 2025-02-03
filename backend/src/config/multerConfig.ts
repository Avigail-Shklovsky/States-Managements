import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where the file should be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Specify the file name
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name based on timestamp
  }
});

const upload = multer({ storage: storage });
