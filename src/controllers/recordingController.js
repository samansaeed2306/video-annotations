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

      
        const videoUrl = `${req.protocol}://${req.get('host')}/recordings/${videoFile.filename}`;

       
        const newRecording = new Recording({
            userId,             
            videoId,            
            lessonId,          
            videoUrl,         
            videoMimeType: videoFile.mimetype
        });

      
        await newRecording.save();

        
        res.status(201).json({ message: 'Recording uploaded successfully', recordingId: newRecording._id });
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
            return res.status(404).json({ message: 'No recordings found for this user' });
        }

       
        res.status(200).json(recordings);
    } catch (error) {
        console.error('Error fetching recordings:', error);
        res.status(500).json({ error: 'Error fetching recordings' });
    }
};
