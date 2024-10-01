export type Book = {
  _id: string;
  name: string
  title: string;
  author: string;
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