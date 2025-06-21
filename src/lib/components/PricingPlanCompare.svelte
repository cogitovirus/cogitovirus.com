<script lang="ts">
  import { Check, Minus } from 'lucide-svelte';

  let plans = [
    {
      name: 'Free',
      description: 'Free forever',
      link: '/',
    },
    {
      name: 'Startup',
      description: '$39 per month billed annually',
      link: '/',
      highlight: true,
    },
    {
      name: 'Team',
      description: '$89 per month billed annually',
      link: '/',
    },
    {
      name: 'Enterprise',
      description: '$149 per month billed annually',
      link: '/',
    },
  ];

  let data = [
    {
      title: 'General',
      features: [
        {
          name: 'Number of seats',
          offering: [
            { plan: 'Free', value: '1' },
            { plan: 'Startup', value: 'Up to 3' },
            { plan: 'Team', value: 'Up to 10' },
            { plan: 'Enterprise', value: 'Unlimited' },
          ],
        },
        {
          name: 'Storage',
          offering: [
            { plan: 'Free', value: '15 GB' },
            { plan: 'Startup', value: '1 TB' },
            { plan: 'Team', value: '15 TB' },
            { plan: 'Enterprise', value: 'Unlimited' },
          ],
        },
        {
          name: 'Email sharing',
          offering: [
            { plan: 'Free', value: true },
            { plan: 'Startup', value: true },
            { plan: 'Team', value: true },
            { plan: 'Enterprise', value: true },
          ],
        },
        {
          name: 'Any time, anywhere access',
          offering: [
            { plan: 'Free', value: false },
            { plan: 'Startup', value: true },
            { plan: 'Team', value: true },
            { plan: 'Enterprise', value: true },
          ],
        },
      ],
    },
    {
      title: 'Financial data',
      features: [
        {
          name: 'Open/High/Low/Close',
          offering: [
            { plan: 'Free', value: false },
            { plan: 'Startup', value: false },
            { plan: 'Team', value: true },
            { plan: 'Enterprise', value: true },
          ],
        },
        {
          name: 'Price-volume difference indicator',
          offering: [
            { plan: 'Free', value: false },
            { plan: 'Startup', value: true },
            { plan: 'Team', value: true },
            { plan: 'Enterprise', value: true },
          ],
        },
      ],
    },
  ];
</script>

<div class="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
  <h2 class="text-base-content text-2xl font-bold md:text-3xl md:leading-tight">Compare plans</h2>
</div>

<!-- Header -->
<div class="bg-base-200 sticky start-0 top-0 hidden rounded-md px-2 py-2 backdrop-blur-md lg:block">
  <!-- Grid -->
  <div class="grid grid-cols-6 gap-6">
    <div class="col-span-2">
      <span class="text-base-content text-lg font-semibold"> Features </span>
    </div>
    <!-- End Col -->

    {#each plans as plan}
      <div class="col-span-1">
        <span class="text-base-content text-lg font-semibold"> {plan.name} </span>
        <p class="mt-2 text-sm text-gray-500">{plan.description}</p>
      </div>
    {/each}
    <!-- End Col -->
  </div>
  <!-- End Grid -->
</div>
<!-- End Header -->

<!-- Section -->
{#each data as row}
  <div class="mt-6 space-y-4 lg:space-y-0">
    <!-- List -->
    <ul class="grid lg:grid-cols-6 lg:gap-6">
      <li class="lg:col-span-2 lg:py-3">
        <span class="text-base-content text-lg font-semibold"> {row.title} </span>
      </li>
    </ul>
    <!-- End List -->

    <!-- List -->
    {#each row.features as feature}
      <ul class="grid lg:grid-cols-6 lg:gap-6">
        <li class="pb-1.5 lg:col-span-2 lg:py-3">
          <span class="text-base-content text-sm font-semibold lg:font-normal">
            {feature.name}
          </span>
        </li>

        {#each feature.offering as offering}
          <!-- Item -->
          <li class="border-base-content/50 col-span-1 border-b py-1.5 lg:py-3">
            <div class="grid grid-cols-2 md:grid-cols-6 lg:block">
              <span class="text-base-content text-sm md:col-span-2 lg:hidden">
                {offering.plan}
              </span>
              {#if offering.value === true}
                <Check class="text-accent inline" size={20} />
              {:else if offering.value === false}
                <Minus class="text-neutral-content inline" size={20} />
              {:else}
                <span class="text-base-content text-sm"> {offering.value} </span>
              {/if}
            </div>
          </li>
          <!-- End Item -->
        {/each}
      </ul>
    {/each}
    <!-- End List -->
  </div>
{/each}
<!-- End Section -->

<div class="mt-6 hidden lg:block">
  <!-- Grid -->
  <div class="grid grid-cols-6 gap-6">
    <div class="col-span-2"></div>
    <!-- End Col -->

    {#each plans as plan}
      <div class="col-span-1">
        <a
          class="{plan.highlight
            ? 'bg-accent text-accent-content hover:bg-accent/80 font-semibold'
            : 'bg-primary text-primary-content hover:bg-primary/80'} inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium shadow-xs disabled:pointer-events-none disabled:opacity-50"
          href={plan.link}
        >
          Get started
        </a>
      </div>
    {/each}
    <!-- End Col -->
  </div>
  <!-- End Grid -->
</div>

<!-- Button Group -->
<div class="mt-8 flex items-center justify-center gap-x-3 md:mt-12">
  <p class="text-base-content text-sm">Need a custom plan?</p>

  <button type="button" class="btn border-base-content border"> Contact us </button>
</div>
<!-- End Button Group -->
