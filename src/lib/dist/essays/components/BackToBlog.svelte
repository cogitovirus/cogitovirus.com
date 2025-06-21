<script lang="ts">
  import { joinPath } from '$lib/dist/utils.js';
  import { MoveLeft } from 'lucide-svelte';

  interface Props {
    blogDirName: string;
  }

  let { blogDirName }: Props = $props();
</script>

<div class="my-4">
  <a
    href="/{joinPath(blogDirName)}"
    class="text-base-content/50 hover:text-base-content text-lg font-bold"
    ><MoveLeft class="mr-1 inline" /> Back</a
  >
</div>
