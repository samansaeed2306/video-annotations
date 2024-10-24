import express from 'express';
import multer from 'multer';
import { uploadRecording, getRecordingsByUserId } from '../controllers/recordingController.js';

const router = express.Router();

// Set up multer to handle video uploads (this will temporarily store files in 'uploads/' folder)
const upload = multer({ dest: 'recordings/' });

// Route to upload a recording (POST /upload/:userId)
router.post('/uploadrec/:userId', upload.single('video'), uploadRecording);

// Route to get recordings by userId (GET /recordings/:userId)
router.get('/getrecbyuserid/:userId', getRecordingsByUserId);

export default router;
