import Recording from '../models/recordingModel.js';
import fs from 'fs';
import path from 'path';

// Specify a folder to store uploaded videos (e.g., 'uploads/')
const uploadFolder = '../recordings/';

// Upload recording
export const uploadRecording = async (req, res) => {
    try {
        const { videoId, lessonId } = req.body;  // Extract optional fields from request body
        const { userId } = req.params;           // Extract userId from URL params
        const videoFile = req.file;              // Get the video file from the request (using multer)

        // Check if userId and videoFile are provided
        if (!userId || !videoFile) {
            return res.status(400).json({ error: 'userId and video file are required' });
        }

        // Ensure upload folder exists
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }

        // Save the file in the specified folder
        const filePath = path.join(uploadFolder, videoFile.filename);

        // Construct the video URL (adjust the URL depending on your server setup)
        const videoUrl = `${req.protocol}://${req.get('host')}/${filePath}`;

        // Save video metadata and URL in the database
        const newRecording = new Recording({
            userId,          // Save userId from URL
            videoId,         // Optional videoId from request body
            lessonId,        // Optional lessonId from request body
            videoUrl,        // Store video URL
            videoMimeType: videoFile.mimetype  // Save file's mimetype (e.g., 'video/mp4')
        });

        await newRecording.save();  // Save the new recording in the database

        res.status(201).json({ message: 'Recording uploaded successfully', recordingId: newRecording._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error uploading recording' });
    }
};

// Get recordings by userId
export const getRecordingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;  // Extract userId from URL params

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        // Find recordings associated with the provided userId
        const recordings = await Recording.find({ userId });

        // Check if any recordings were found
        if (!recordings || recordings.length === 0) {
            return res.status(404).json({ message: 'No recordings found for this user' });
        }

        // Send the recordings in response
        res.status(200).json(recordings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching recordings' });
    }
};
