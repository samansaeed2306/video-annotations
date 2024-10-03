// models/mediaModel.js
import { connectToDb } from '../db/connect.js';
import { ObjectId } from 'mongodb';

export async function createMediaDocument(media) {
  const db = await connectToDb();
  const collection = db.collection('media');
  return collection.insertOne(media);
}

export async function getAllMedia() {
  const db = await connectToDb();
  const collection = db.collection('media');
  return await collection.find().toArray();
}

export async function getMediaById(id) {
  const db = await connectToDb();
  const collection = db.collection('media');
  
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function deleteMedia(id) {
  const db = await connectToDb();
  const collection = db.collection('media');

  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  return await collection.deleteOne({ _id: new ObjectId(id) });
}


export async function updateMedia(id, updatedData) {
  try {
    const db = await connectToDb();
    
  
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const objectId = new ObjectId(id);

   
    const result = await db.collection('media').findOneAndUpdate(
      { _id: objectId },
      { $set: updatedData },
      { returnDocument: 'after' } 
    );

    // if (!result.value) {
    //   throw new Error('Document not found');
    // }

    return result.value;
  } catch (error) {
    console.error('Error updating media:', error);
    throw error; 
  }
}