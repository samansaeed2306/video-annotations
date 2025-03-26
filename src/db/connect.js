import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
// const uri = "mongodb+srv://samansaeed2306:saman@cluster0.wvdsiey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const uri = "mongodb+srv://samansaeed2306:saman@cluster0.wvdsiey.mongodb.net/VideoAnnotations?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDb() {
  try {
    
    await client.connect();
    console.log("Connected to MongoDB with MongoClient!");

    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose!");

    return client.db('VideoAnnotations');
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}