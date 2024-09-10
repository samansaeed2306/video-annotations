// controllers/mediaController.js
import * as model from '../models/mediaModel.js';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function addMedia(req, res) {
  try {
    const { originalname, mimetype, filename, size } = req.file;
    const userId = req.body.userId; // Assuming userId is sent in the request body

    // Validate userId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const media = {
      originalName: originalname,
      mimeType: mimetype,
      fileName: filename,
      size: size,
      uploadDate: new Date(),
      userId: new ObjectId(userId) // Add userId
    };
    const createdMedia = await model.createMediaDocument(media);
    res.status(201).json({
      message: 'Media uploaded successfully!',
      media: createdMedia
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload media' });
  }
}

export async function getAllMedia(req, res) {
  try {
    const media = await model.getAllMedia();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve media' });
  }
}
export function getMediaFiles(req, res){
  const directoryPath = path.join(__dirname, '../../uploads');

  // Read files in the 'uploads' folder
  fs.readdir(directoryPath, (err, files) => {
      if (err) {
          return res.status(500).send({ message: 'Unable to scan files' });
      }
      
      // Send back the file names
      res.status(200).send(files);
  });
};

export async function getMediaById(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const media = await model.getMediaById(id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve media' });
  }
}

export async function deleteMedia(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const media = await model.getMediaById(id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    // Delete file from the file system
    const filePath = path.join(__dirname, '..', 'uploads', media.fileName);
    fs.unlinkSync(filePath);

    // Delete media document from the database
    await model.deleteMedia(id);

    res.status(200).json({ message: 'Media deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media' });
  }
}

