<script>
  import Header from "../../components/header.svelte";

  export let data;
</script>

<main class="grid place-items-center md:p-10">
  {#if data.error}
    <div class="border border-violet-500 shadow-2xl shadow-violet-900  p-10 rounded-2xl w-full max-w-screen-md relative bg-gradient-to-br from-slate-950 to-[#11012e]">
      <Header />
      <p class="text-center shadow shadow-violet-900 text-2xl mt-10 border-2 border-red-600 p-10 rounded-lg bg-black">{data.error}</p>
    </div>
  {:else}
    <div class="border border-violet-500 shadow-2xl shadow-violet-900 p-5 md:p-10 rounded-2xl w-full relative bg-gradient-to-br from-slate-950 to-[#11012e]">
      <Header />
      <div class="mt-16 mb-2">
        <p class="text-lg font-semibold">{data.books.length} Books found</p>
      </div>
      <div class="grid grid-cols-12 gap-5">
        {#each data.books as book}
          <div class="col-span-12 sm:col-span-6 lg:col-span-4 text-2xl border border-violet-500 rounded-lg shadow-md shadow-violet-900 overflow-hidden flex flex-col justify-between">
            <div class="p-5">
              <p>{book.title}</p>
            </div>
            
            <div class="flex items-center gap-x-2 px-5 pb-5 pt-3 mt-2 bg-gradient-to-tr from-purple-950 to-black">
              <div class="rounded-full min-w-10 w-10 h-10 relative overflow-hidden border-2 ">
                <img 
                  class="object-fill"
                  src="/dp/{book.author.email}.png" alt={book.author._id} />
              </div>
              <div>
                <p class="text-lg mb-0">{book.author.name}</p>
                <p class="text-xs">{book.author.email}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  
</main>