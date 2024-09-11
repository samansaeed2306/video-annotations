// routes/mediaRoutes.js
import express from 'express';
import * as controller from '../controllers/mediaController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), controller.addMedia);


router.get('/getmediafiles', (req, res, next) => {
  console.log("Request made to /getmediafiles");
  next(); 
}, controller.getMediaFiles);

router.get('/getall', controller.getAllMedia);
// router.get('/:id', controller.getMediaById);
// router.delete('/:id', controller.deleteMedia);


export default router;
