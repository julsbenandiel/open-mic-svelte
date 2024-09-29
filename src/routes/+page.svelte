<script lang="ts">
  import axios from 'axios'
  import CreateBookForm from '../components/create-book-form.svelte';
  import type { Book, CreateBookPayload } from '$lib/types.js';

  // let books: Array<any> = []
  // let count: number = 0
  let author = ""
  let bookTitle = ""

  const generateBook = async (payload: CreateBookPayload) => {
    try {
      author = payload.author
      const path = "/api/generate-book"

      const res = await axios.post(path, payload, {
        headers: { "Content-Type": "application/json" }
      })

      bookTitle = res.data.title

    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2))
    }
  }

  const createBook = async () => {
    try {
      const path = "/api/insert-book"

      await axios.post(path, { author, title: bookTitle }, {
        headers: { "Content-Type": "application/json" }
      })

      alert('Thanks')

    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2))
    }
  }

  // const getBooks = async () => {
  //   try {
  //     const path = "/api/get-books"
  //     const res = await axios.get(path, {
  //       headers: { "Content-Type": "application/json" }
  //     })
  //     console.log({ res })
  //     books = res.data.books
  //     count = res.data.count

  //   } catch (error) {
  //     throw new Error(JSON.stringify(error, null, 2))
  //   }
  // }

  // onMount(async() => {
  //   await getBooks()
  // })
</script>

<!-- {#each books as book}
  <div>
    {book.title}
    {book.author}
    {book.genre}
  </div>
{/each} -->

<div class="flex items-center justify-center flex-col">
  <p class="bg-red-600 text-2xl">
  
  </p>
  
  <CreateBookForm {generateBook} />
  
  {#if bookTitle}
    <hr>
    <h1>{bookTitle}</h1>
    <small>by {author}</small>
  
    <button 
      on:click={createBook}
      type="button">
      Submit Your Book!
    </button>
  {/if}
</div>