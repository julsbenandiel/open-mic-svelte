import clientPromise from '$lib/mongo.js';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('author-service');

    const autthors = await db.collection("authors").find({}).toArray()

    return json(
      { autthors, count: autthors.length },
      { status: 200, statusText: 'Author list' }
    );

  } catch (error) {
    console.log(error)
    return json(
      { success: false, error: 'Failed to get authors' }, 
      { status: 500 }
    );
  }
}
