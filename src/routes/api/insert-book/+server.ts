import clientPromise from '$lib/mongo.js';
import { json } from '@sveltejs/kit';
import _ from 'lodash'

export async function POST({ request }) {
  try {
    const client = await clientPromise;
    const body = await request.json();
    const { title, author } = body;

    const db = client.db('book-service');

    const result = await db
      .collection("books")
      .insertOne({ title, author })

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
