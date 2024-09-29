<script lang="ts">
  import axios from 'axios'
  import CreateBookForm from '../components/create-book-form.svelte';
  import type { CreateBookPayload } from '$lib/types.js';
  import { fade, slide } from 'svelte/transition';
  import Header from '../components/header.svelte';
  import { goto } from '$app/navigation';
  import { afterUpdate } from 'svelte';

  
  let element: HTMLDivElement;
  let submitting: boolean = false
  let loading: boolean = false
  let author = ""
  let bookTitle = ""

  const handleTryAgain = () => {
    bookTitle = ""
    author = ""
  }

  const generateBook = async (payload: CreateBookPayload) => {
    if (!payload.author || !payload.name) {
      alert('Please input your name and select an author')
      return
    }
    try {
      loading = true
      author = payload.author
      const path = "/api/generate-book"

      const res = await axios.post(path, payload, {
        headers: { "Content-Type": "application/json" }
      })
      
      bookTitle = res.data.title
      loading = false
      
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' })
      }, 500)

    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2))
    }
  }

  const createBook = async () => {
    try {
      submitting = true
      const path = "/api/insert-book"

      await axios.post(path, { author, title: bookTitle }, {
        headers: { "Content-Type": "application/json" }
      })

      goto('/thank-you')

    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2))
    }
  }

</script>

<div 
  bind:this={element}
  class="flex items-center justify-center flex-col">
  <div class="border border-violet-400 shadow-2xl shadow-violet-900 bg-black p-10 rounded-2xl w-full max-w-screen-md">

    <Header />
    <CreateBookForm 
      {loading}
      {bookTitle}
      {generateBook} />

    {#if bookTitle}
      <div 
        in:slide
        out:fade
        class="mt-5 border-t border-violet-500 pt-5 sm:w-[620px]">
        <p class="text-lg sm:text-3xl text-center italic w-full text-wrap">{bookTitle}</p>
        <p class="text-center">by {author}</p>
      
        <div class="mt-5 flex gap-5 justify-end flex-col sm:flex-row">
          <button 
            disabled={submitting}
            class="bg-orange-400 text-2xl font-bold py-2 px-6 rounded-lg disabled:opacity-50"
            on:click={handleTryAgain}
            type="button">
            Try Again
          </button>
          <button 
            disabled={submitting}
            class="bg-violet-500 text-2xl font-bold py-2 px-6 rounded-lg"
            on:click={createBook}
            type="button">
            {#if submitting}
              <span>Saving...</span>
            {:else}
              <span>Submit your book</span>
            {/if}
          </button>
        </div>

        <div bind:this={element}></div>
      </div>
    {/if}
  </div>
  
</div>