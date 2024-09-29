<script lang="ts">
  import { AUTHORS } from "$lib/index.js";
  import { fade, slide } from "svelte/transition";
  import type { CreateBookPayload } from "$lib/types.js";

  export let generateBook: (payload: CreateBookPayload) => void
  export let loading: boolean
  export let bookTitle: string

  let name: string = ""
  let author: string = ""

  async function handleFormSubmit() {
    const payload = { 
      name,
      author
    }

    generateBook(payload)
  }

  function handleChange(event: any) {
    const { name, value } = event.target
    self[name] = value
  }

</script>

<form 
  class="flex flex-col justify-center gap-10"
  on:submit|preventDefault={handleFormSubmit}>
  <div>
    <label 
      class="text-xl sm:text-3xl mb-3 block font-bold"
      for="name">What is your name?</label>
    <input 
      id="name"
      name="name"
      class="block w-full h-12 p-4 rounded-lg text-violet-700 font-medium text-xl"
      placeholder="eg: Constantine Binvoglio"
      bind:value={name}
      on:change={handleChange}
      type="text">
  </div>
  
  <div>
    <p class="text-xl sm:text-3xl mb-3 block font-bold">Who do you want to write your book?</p>
    <div class="grid grid-cols-12 gap-3">
      {#each AUTHORS as a}
        <button 
          transition:fade
          class="col-span-12 sm:col-span-6 border border-violet-500 rounded-lg h-50 text-2xl {author === a && "bg-violet-600"}"
          on:click={() => author = a}
          type="button">
          <div class="flex">
            <div class="h-20 w-20 overflow-hidden rounded-tl-lg rounded-bl-lg">
              <img 
                class="object-cover"
                src="/dp/{a}.png" alt={a}>
            </div>
            <div class="flex flex-col justify-center items-start px-5">
              {#each a.split("@") as t}
                <p class="text-lg">{t.replace('.com', '')}</p>
              {/each}
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
  
  <button   
    disabled={loading}
    class="bg-violet-500 text-2xl font-bold py-4 rounded-lg disabled:opacity-50 { bookTitle && 'hidden'}"
    type="submit">
    {#if loading}
      <span>Generating...</span>
    {:else}
      <span>Generate Book</span>
    {/if}
  </button>
</form>