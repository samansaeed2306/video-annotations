import * as model from '../models/annotationModel.js';
import { ObjectId } from 'mongodb';

export async function addAnnotation(req, res) {
  try {
    const annotation = req.body;
    await model.createAnnotationDocument(annotation);
    res.status(201).json({ message: 'Annotation created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create annotation' });
  }
}

export async function updateAnnotation(req, res) {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const updatedAnnotation = req.body; // Get the updated annotation data from the request body
  
      // Check if the ID is a valid MongoDB ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
  
      // Call the model function to update the annotation in the database
      const result = await model.updateAnnotation(id, updatedAnnotation);
  
      // Check if any document was matched and updated
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Annotation not found' });
      }
  
      res.status(200).json({ message: 'Annotation updated successfully!' });
    } catch (error) {
      console.error('Error in updateAnnotation:', error);
      res.status(500).json({ error: 'Failed to update annotation' });
    }
  }


