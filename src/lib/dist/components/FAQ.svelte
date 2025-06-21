<script lang="ts">
  import Accordion from '$lib/dist/components/Accordion.svelte';

  interface Props {
    faq_arr: any;
    legend?: string;
    subtext?: string;
  }

  let { faq_arr, legend = 'Frequently<br />asked questions', subtext = 'Answers to the most frequently asked questions.' }: Props = $props();
</script>

<!-- Grid -->
<div class="grid gap-6 md:grid-cols-6">
  <div class="md:col-span-2">
    <div class="max-w-xs">
      <h2 class="text-2xl font-bold md:text-3xl md:leading-tight">
        {@html legend}
      </h2>
      <p class="mt-1 hidden text-base-content md:block">
        {subtext}
      </p>
    </div>
  </div>
  <!-- End Col -->

  <div class="md:col-span-4">
    <!-- Accordion -->
    <div class="hs-accordion-group divide-y divide-base-content/80" data-hs-accordion-always-open>
      {#each faq_arr as [question, answer]}
        <Accordion title={question} content={answer} />
      {/each}
    </div>
    <!-- End Accordion -->
  </div>
  <!-- End Col -->
</div>
<!-- End Grid -->
