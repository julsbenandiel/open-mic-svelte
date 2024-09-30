import clientPromise from "$lib/mongo.js";
import type { Book, BookWithAuthor } from "$lib/types.js";
import _ from 'lodash'

export async function load(): Promise<{ error: any, books: BookWithAuthor[] }> {

  try {
    const client = await clientPromise;
    const bookDb = client.db('book-service')
    const authorDb = client.db('author-service')

    const [books, authors] = await Promise.all([
      bookDb.collection('books').find({}).sort({ created_at: -1 }).toArray(),
      authorDb.collection('authors').find({}).toArray()
    ])

    const authorsMap = _.keyBy(authors, 'email')

    const data = books.map((book: Book) => {
      const author = authorsMap[book.author]
      return {
        ...book,
        _id: book._id.toString(),
        author: {
          ...author,
          _id: author._id.toString()
        }
      }
    })

    return { 
      error: null,
      books: data
    };

  } catch (error) {
    
    return {
      error: "Something went wrong",
      books: []
    };
  }
}