import { MongoClient } from 'mongodb';
import { MONGO_URI } from '$env/static/private' 

let client: any;
let clientPromise: any;

if (!client) {
  try {
    client = new MongoClient(MONGO_URI);
    clientPromise = client.connect();
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
}

export default clientPromise;
