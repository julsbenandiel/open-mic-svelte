<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let authors: any[] = []

  const getAuthors = async () => {
    try {
      const path = "/api/get-authors"
      const res = await axios.get(path, {
        headers: { "Content-Type": "application/json" }
      })
      
      authors = res.data.authors

    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2))
    }
  }

  onMount(async() => {
    await getAuthors()
  })

</script>

<div>
  <h1>Summary Page</h1>
  {#each authors as author}
    <p>{author.name}</p>
  {/each}
</div>