<script lang="ts">
  let { content, link } = $props();
</script>

<a class="text-accent-content" href={link} target="_blank">
  <div class="flex justify-center bg-accent p-[1px]">
    {@html content}
  </div>
</a>
