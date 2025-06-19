<script>
  export let data;
</script>

<article>
  <h1>{data.metadata.title}</h1>
  <p>{data.metadata.date}</p>
  <svelte:component this={data.content} />
</article>
