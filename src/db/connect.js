import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://samansaeed2306:saman@cluster0.wvdsiey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    console.log("Connected to MongoDB!");
    return client.db('VideoAnnotations');
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}

export { client };
