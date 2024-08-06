import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://samansaeed2306:saman@cluster0.wvdsiey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export async function createAnnotationDocument(collection) {
 const AnnotationDocument = {
        time:5,
        content: '{"version":"4.5.0","objects":[{"type":"circle","version":"4.5.0","originX":"left","originY":"top","left":100,"top":70,"width":60,"height":60,"fill":"transparent","stroke":"#33FF57","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":2.43,"scaleY":2.43,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"radius":30,"startAngle":0,"endAngle":6.283185307179586}]}' 
    };

  await collection.insertOne(AnnotationDocument);
}
export async function executeAnnotationsOperations() {
  let mongoClient;

  try {
    // Use the same client connection URI here
    mongoClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    await mongoClient.connect();
    
    const db = mongoClient.db('VideoAnnotations');
    const collection = db.collection('annotations');
    console.log('CREATE Annotation');
       await createAnnotationDocument(collection);
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

executeAnnotationsOperations().catch(console.dir);
