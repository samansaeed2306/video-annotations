import Recording from '../models/recordingModel.js';
import fs from 'fs';
import path from 'path';


const uploadFolder = path.join(process.cwd(), 'recordings');


export const uploadRecording = async (req, res) => {
    try {
        const { videoId, lessonId } = req.body;  
        const { userId } = req.params;          
        const videoFile = req.file;           

    
        if (!userId || !videoFile) {
            return res.status(400).json({ error: 'userId and video file are required' });
        }

    
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }

        // const serverUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`;
        const serverUrl = process.env.SERVER_URL;
        const videoUrl = `https://api.tuneup.golf/recordings/${videoFile.filename}`;

        // const videoUrl = `${req.protocol}://${req.get('host')}/recordings/${videoFile.filename}`;
        const lastRecording = await Recording.findOne().sort({ createdAt: -1 });

        
        let title = 'Recording 1'; 
        if (lastRecording) {
            const lastTitleNumber = parseInt(lastRecording.title.split(' ')[1]); 
            title = `Recording ${lastTitleNumber + 1}`; 
        }

       
        const newRecording = new Recording({
            userId,             
            videoId,            
            lessonId,          
            videoUrl,
            title,         
            videoMimeType: videoFile.mimetype
        });

      
        await newRecording.save();

        
        // res.status(201).json({ message: 'Recording uploaded successfully', recordingId: newRecording._id });
        res.status(201).json({ message: 'Recording uploaded successfully', newRecording});
    } catch (error) {
        console.error('Error uploading recording:', error);
        res.status(500).json({ error: 'Error uploading recording' });
    }
};


export const getRecordingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        
        const recordings = await Recording.find({ userId });

       
        if (!recordings.length) {
            return res.status(200).json([]);
        }

       
        res.status(200).json(recordings);
    } catch (error) {
        console.error('Error fetching recordings:', error);
        res.status(500).json({ error: 'Error fetching recordings' });
    }
};


export const getAllRecordings = async (req, res) => {
    try {
        
        const recordings = await Recording.find();

        if (!recordings.length) {
            return res.status(200).json([]);
        }

        
        const recordingsWithUrls = recordings.map(recording => ({
            _id: recording._id,
            userId: recording.userId,
            videoId: recording.videoId,
            lessonId: recording.lessonId,
            videoUrl: recording.videoUrl,
            videoMimeType: recording.videoMimeType,
            title: recording.title
        }));

        res.status(200).json(recordingsWithUrls);
    } catch (error) {
        console.error('Error fetching all recordings:', error);
        res.status(500).json({ error: 'Error fetching all recordings' });
    }
};