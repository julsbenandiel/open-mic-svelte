<script lang="ts">
  import { AUTHORS } from "$lib/index.js";
  import { fade, slide } from "svelte/transition";
  import type { CreateBookPayload } from "$lib/types.js";
  import _ from "lodash";

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

  function getName(email: string) {
    return _.startCase(email.split("@")[0].split(".").join(" "))
  }

  function getShow(email: string) {
    return email.split("@")[1].replace('.com', '')
  }

  function handleAuthorSelect(a: string) {
    if (author === a) {
      author = ""
    } else {
      author = a
    }
  }

</script>

<form 
  class="flex flex-col justify-center gap-5"
  on:submit|preventDefault={handleFormSubmit}>
  <div>
    <label 
      class="text-xl sm:text-3xl mb-3 font-bold flex items-center gap-x-1"
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
          class="col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-200 border border-violet-500 rounded-lg h-50 text-2xl 
          {author === a ? "bg-gradient-to-tr from-violet-600 to-violet-950" : "hover:bg-gradient-to-tr from-violet-950 to-black"}"
          on:click={() => handleAuthorSelect(a)}
          type="button">
          <div class="flex">
            <div class="h-20 w-20 overflow-hidden rounded-tl-lg rounded-bl-lg">
              <img 
                class="object-contain transition-transform duration-150 {author === a && "scale-150"}"
                src="/dp/{a}.png" alt={a}>
            </div>
            <div class="flex flex-col justify-center items-start px-5">
              <p class="text-xl font-medium">{getName(a)}</p>
              <p class="text-sm">{getShow(a)}</p>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
  
  <button   
    disabled={loading}
    class="mt-5 bg-gradient-to-b from-violet-500 to-violet-700 transition-all hover:text-white text-2xl text-violet-200 font-bold py-4 rounded-lg disabled:opacity-50 { bookTitle && 'hidden'}"
    type="submit">
    {#if loading}
      <span>Generating...</span>
    {:else}
      <span>Generate Book</span>
    {/if}
  </button>
</form>