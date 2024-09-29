<script>
  import Header from "../../components/header.svelte";
</script>

<div class="border border-violet-400 shadow-2xl shadow-violet-900 bg-black p-10 rounded-2xl w-full max-w-screen-md">
  <Header />

  <div class="flex flex-col gap-y-5 items-center border-t border-violet-400">
    <p class="text-3xl font-bold pt-5">
      Thank you for your book!
    </p>
  
    <a   
      href='/'
      class="bg-violet-500 text-xl font-bold px-10 py-4 rounded-lg disabled:opacity-50 w-fit"
      type="submit">
      Generate Again
    </a>
  </div>
</div>