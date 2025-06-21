<script lang="ts">
  import { docsPath } from '$lib/config';
  import { joinPath } from '$lib/dist/utils';
  import CardIconMini from '$lib/dist/components/CardIconMini.svelte';
  import type { Doc } from '$lib/dist/docs/types';
  import { FileText, Notebook } from 'lucide-svelte';

  interface Props {
    docs: Doc[];
  }

  let { docs }: Props = $props();
</script>

{#if docs.length > 0}
  <div class="my-10">
    <h2 class="my-4 text-2xl font-bold">Pages</h2>

    <div class="grid grid-cols-1 md:grid-cols-2">
      {#each docs as doc}
        {#if doc.slug !== ''}
          <a href="/{joinPath(docsPath, doc.slug)}">
            <CardIconMini
              title={doc.title}
              description=""
              Icon={doc.children.length > 0 ? Notebook : FileText}
              className="m-2 rounded-md border border-base-content/50 hover:bg-base-200 hover:border-primary/50"
            />
          </a>
        {/if}
      {/each}
    </div>
  </div>
{/if}
