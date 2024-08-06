import { createAnnotationDocument } from '../models/annotationModel.js';

export async function addAnnotation(req, res) {
  try {
    const annotation = req.body;
    await createAnnotationDocument(annotation);
    res.status(201).json({ message: 'Annotation created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create annotation' });
  }
}


