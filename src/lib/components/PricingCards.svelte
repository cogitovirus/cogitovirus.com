<script lang="ts">
  import { Check } from 'lucide-svelte';

  interface Props {
    paymentPlan?: string;
  }

  let { paymentPlan = $bindable('annual') }: Props = $props();

  let plans = [
    {
      name: 'Free',
      monthlyPrice: {
        price: 'Free',
        link: '/pricing',
      },
      annualPrice: {
        price: 'Free',
        link: '/pricing',
      },
      description: 'Get started with basic features',
      features: ['1 user', 'Plan features', 'Product support'],
      specialText: '',
    },
    {
      name: 'Startup',
      monthlyPrice: {
        price: '$39',
        link: '/pricing',
      },
      annualPrice: {
        price: '$29',
        link: '/pricing',
      },
      description: 'All the basics for starting a new business',
      features: ['2 user', 'Plan features', 'Product support'],
      specialText: 'MOST POPULAR',
    },
    {
      name: 'Team',
      monthlyPrice: {
        price: '$89',
        link: '/pricing',
      },
      annualPrice: {
        price: '$69',
        link: '/pricing',
      },
      description: 'Everything you need for a growing business',
      features: ['5 user', 'Plan features', 'Product support'],
      specialText: '',
    },
    {
      name: 'Enterprise',
      monthlyPrice: {
        price: '$149',
        link: '/pricing',
      },
      annualPrice: {
        price: '$129',
        link: '/pricing',
      },
      description: 'Advanced features for scaling your business',
      features: ['15 user', 'Plan features', 'Product support'],
      specialText: '',
    },
  ];
</script>

<!-- Switch -->
<div class="flex justify-center">
  <div id="toggle-price" class="inline-block rounded-lg border border-primary bg-base-200 p-1">
    <label for="toggle-price-monthly" class="relative inline-block px-3 py-2">
      <span
        class="relative z-10 inline-block cursor-pointer text-sm font-medium {paymentPlan ===
        'monthly'
          ? 'text-primary-content'
          : 'text-base-content'}"
      >
        Monthly
      </span>
      <input
        id="toggle-price-monthly"
        name="toggle-price"
        type="radio"
        class="absolute end-0 top-0 size-full cursor-pointer rounded-lg border-transparent bg-transparent bg-none text-transparent before:absolute before:inset-0 before:size-full before:rounded-lg checked:bg-none checked:before:bg-primary focus:ring-transparent focus:ring-offset-0"
        value="monthly"
        bind:group={paymentPlan}
      />
    </label>
    <label for="toggle-price-annual" class="relative inline-block px-3 py-2">
      <span
        class="relative z-10 inline-block cursor-pointer text-sm font-medium {paymentPlan ===
        'annual'
          ? 'text-primary-content'
          : 'text-base-content'}"
      >
        Annual / 16% off
      </span>
      <input
        id="toggle-price-annual"
        name="toggle-price"
        type="radio"
        class="absolute end-0 top-0 size-full cursor-pointer rounded-lg border-transparent bg-transparent bg-none text-transparent before:absolute before:inset-0 before:size-full before:rounded-lg checked:bg-none checked:before:bg-primary checked:before:text-primary-content focus:ring-transparent focus:ring-offset-0"
        value="annual"
        bind:group={paymentPlan}
      />
    </label>
  </div>
</div>
<!-- End Switch -->

<div
  class="mt-6 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-4 lg:items-center lg:gap-3 xl:gap-6"
>
  {#each plans as plan}
    <div
      class="flex flex-col rounded-2xl {plan.specialText
        ? 'border-2 border-accent bg-base-200'
        : 'border border-base-content/80 bg-base-100'} p-4 text-center md:p-8"
    >
      {#if plan.specialText}
        <p class="mb-3">
          <span
            class="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold uppercase text-accent-content"
            >{plan.specialText}</span
          >
        </p>
      {/if}
      <h4 class="text-lg font-medium text-base-content">{plan.name}</h4>
      <span class="mt-7 text-3xl font-bold text-base-content md:text-4xl xl:text-5xl">
        {paymentPlan === 'monthly' ? plan.monthlyPrice.price : plan.annualPrice.price}
        <span class="text-xl font-bold">/mo</span>
      </span>
      <p class="mt-2 text-sm text-base-content">{plan.description}</p>

      {#if plan.features}
        <ul class="mt-7 space-y-2.5 text-sm">
          {#each plan.features as feature}
            <li class="flex space-x-2">
              <Check size={20} class="text-success" />
              <span class="text-base-content"> {feature} </span>
            </li>
          {/each}
        </ul>
      {/if}

      <a
        class="{plan.specialText
          ? 'bg-accent/90 text-accent-content hover:bg-accent'
          : 'border-primary text-base-content hover:bg-primary hover:text-primary-content'} hover:border-highlight hover:text-highlight mt-5 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border px-4 py-3 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
        href={paymentPlan === 'monthly' ? plan.monthlyPrice.link : plan.annualPrice.link}
      >
        Get started
      </a>
    </div>
  {/each}
</div>
