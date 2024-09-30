export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
}

export type Author = {
  _id: string;
  name: string;
  email: string;
}

export type BookWithAuthor = Book & {
  author: Author
}

export type CreateBookPayload = {
  name: string
  author: string
}