import express from 'express';
import multer from 'multer';
import { uploadRecording, getRecordingsByUserId, getAllRecordings } from '../controllers/recordingController.js';

const router = express.Router();
// const upload = multer({ dest: 'recordings/' });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'recordings/');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Get the file extension
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });


router.post('/recordings/:userId', upload.single('video'), uploadRecording);


router.get('/recordings/user/:userId', getRecordingsByUserId);

router.get('/recordings/getAll', getAllRecordings);
export default router;
