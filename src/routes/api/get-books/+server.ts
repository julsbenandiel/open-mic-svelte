import clientPromise from '$lib/mongo.js';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('book-service');

    const books = await db.collection("books").find({}).toArray()

    return json(
      { books, count: books.length },
      { status: 200, statusText: 'Book list' }
    );

  } catch (error) {
    console.log(error)
    return json(
      { success: false, error: 'Failed to get books' }, 
      { status: 500 }
    );
  }
}
