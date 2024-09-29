<script lang="ts">
  import { AUTHORS } from "$lib/index.js";
  import type { CreateBookPayload } from "$lib/types.js";

  export let generateBook: (payload: CreateBookPayload) => void

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

<div class="flex mb-5 items-center justify-center sm:-ml-14 flex-col sm:flex-row">
  <img 
    class="h-20"
    src="/svelte_icon.avif" 
    alt="svelte icon">

  <div>
    <p class="text-violet-500 font-bold italic">🎤 FC Open Mic </p>
    <p class="text-white text-4xl sm:text-6xl font-bold">Generate your Book</p>
    <p class="text-right text-orange-500 font-light italic">Created using sveltekit</p>
  </div>
</div>

<form 
  class="border border-violet-400 shadow-2xl shadow-violet-900 bg-black p-10 rounded-2xl max-w-screen-lg flex flex-col justify-center gap-10"
  on:submit|preventDefault={handleFormSubmit}>
  <div>
    <label 
      class="text-xl sm:text-3xl mb-3 block font-bold"
      for="name">What is your name?</label>
    <input 
      id="name"
      name="name"
      class="block w-full h-12 p-4 rounded-lg"
      placeholder="eg: Constantine Binvoglio"
      bind:value={name}
      on:change={handleChange}
      type="text">
  </div>
  
  <div>
    <p class="text-xl sm:text-3xl mb-3 block font-bold">Who do you want to write your book? {author}</p>
    <div class="flex flex-col gap-3">
      {#each AUTHORS as a}
        <button 
          class="col-span-6 border rounded h-10 text-2xl"
          on:click={() => author = a}
          type="button">
          <div>
            <p>{a}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>
  
  <button   
    class="bg-violet-500 text-2xl font-bold py-4 rounded-lg"
    type="submit">
    Generate Book
  </button>
</form>