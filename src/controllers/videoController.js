// src/controllers/videoController.js

import { createVideoFromImages } from '../utils/ffmpegUtil.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadAndCreateVideo(req, res) {
    try {
        const base64Images = req.body.images;

        if (!base64Images || base64Images.length === 0) {
            return res.status(400).json({ error: 'No images provided' });
        }

        const tempDir = path.join(__dirname, '../temp');
        const outputFilePath = path.join(tempDir, 'output.mp4');

        // Ensure temp directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Decode base64 images and save them temporarily
        const imagePaths = [];
        for (let i = 0; i < base64Images.length; i++) {
            const base64Data = base64Images[i].split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            const filePath = path.join(tempDir, `image${i}.png`);
            fs.writeFileSync(filePath, buffer);
            imagePaths.push(filePath);
        }

        // Create video from images
        await createVideoFromImages(imagePaths, outputFilePath);

        // Send video file as response
        res.download(outputFilePath, 'video.mp4', (err) => {
            // Clean up files
            imagePaths.forEach(imagePath => fs.unlinkSync(imagePath));
            fs.unlinkSync(outputFilePath);

            if (err) {
                console.error('Error sending video:', err);
                return res.status(500).json({ error: 'Error sending video.' });
            }
        });
    } catch (error) {
        console.error('Error creating video:', error);
        res.status(500).json({ error: 'Error creating video.' });
    }
}