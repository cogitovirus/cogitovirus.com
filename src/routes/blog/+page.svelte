<script lang="ts">
  export let data;
</script>

<h1>Blog</h1>
<ul>
  {#each data.posts as post}
    <li>
      <a href={`/blog/${post.slug}`}>{post.title}</a> — {post.date}
    </li>
  {/each}
</ul>
