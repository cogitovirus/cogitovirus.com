<script lang="ts">
  import { Plus, Minus } from 'lucide-svelte';
  import { slugify } from '$lib/dist/utils';

  interface Props {
    title: any;
    content: any;
    id?: any;
  }

  let { title, content, id = $bindable(null) }: Props = $props();

  if (id === null) {
    id = 'accordion-' + slugify(title);
  }
</script>

<!-- usage :-
<div class="hs-accordion-group divide-y divide-base-content/80">
  <Accordion title="Title One" content="Content One" />
  <Accordion title="Title Two" content="Content Two" />
  <Accordion title="Title Three" content="Content Three" />
</div> -->

<div class="hs-accordion pt-6 pb-3" {id}>
  <button
    class="hs-accordion-toggle group text-base-content hover:text-base-content/80 hs-accordion-active:text-primary inline-flex w-full items-center justify-between gap-x-3 rounded-lg pb-3 text-start font-semibold transition md:text-lg"
    aria-controls={id}
  >
    {title}
    <Plus
      class="text-base-content group-hover:text-base-content/80 hs-accordion-active:hidden block shrink-0"
    />
    <Minus
      class="text-base-content group-hover:text-base-content/80 hs-accordion-active:block hidden shrink-0"
    />
  </button>
  <div
    id={id + '-content'}
    class="hs-accordion-content text-base-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby={id + '-content'}
  >
    {@html content}
  </div>
</div>
