import clientPromise from "$lib/mongo.js";

export async function load() {
  try {
    const client = await clientPromise;
    const db = client.db('book-service'); // Replace with your database name
    const collection = db.collection('books'); // Replace with your collection name

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    return {
      data: data.map((d: any) => ({ ...d, _id: d._id.toString() }))
    };

  } catch (error) {
    console.error(error);
    return {
      data: []
    };
  }
}