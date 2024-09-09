// controllers/mediaController.js
import * as model from '../models/mediaModel.js';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';

export async function addMedia(req, res) {
  try {
    const { originalname, mimetype, filename, size } = req.file;
    const media = {
      originalName: originalname,
      mimeType: mimetype,
      fileName: filename,
      size: size,
      uploadDate: new Date()
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