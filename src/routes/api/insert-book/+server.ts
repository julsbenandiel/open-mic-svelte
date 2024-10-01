import clientPromise from '$lib/mongo.js';
import { json } from '@sveltejs/kit';
import _ from 'lodash'

export async function POST({ request }) {
  try {
    const client = await clientPromise;
    const body = await request.json();
    const { title, name, author } = body;

    const db = client.db('book-service');

    const bookFound = await db.collection("books").count({ name: new RegExp(name, 'i') })

    if (bookFound > 0) {
      return json(
        { result: null, error: "You've already submitted your entry." },
        { status: 400 }
      )
    }

    const result = await db
      .collection("books")
      .insertOne({ 
        title,
        name,
        author,
        created_at: new Date()
      })

    return json(
      { result },
      { status: 200, statusText: 'Book successfully inserted' }
    );

  } catch (error) {
    console.log(error)
    return json(
      { success: false, error: 'Failed to insert book' }, 
      { status: 500 }
    );
  }
}
