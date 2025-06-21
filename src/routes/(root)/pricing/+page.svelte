<script lang="ts">
  import SEO from '$lib/dist/components/SEO.svelte';
  import PricingCards from '$lib/components/PricingCards.svelte';
  import PricingPlanCompare from '$lib/components/PricingPlanCompare.svelte';
  import FAQ from '$lib/dist/components/FAQ.svelte';
  import BannerBand from '$lib/dist/components/BannerBand.svelte';
  import Container from '$lib/dist/components/Container.svelte';

  const pricing_faq = [
    [
      'Can I cancel at anytime?',
      'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.',
    ],
    [
      'My team has credits. How do we use them?',
      'Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.',
    ],
    [
      'How do I get access to a theme I purchased?',
      "If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.",
    ],
    [
      'Upgrade License Type',
      'There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.',
    ],
  ];
</script>

<SEO title="Pricing" />

<!-- <BannerBand subtext="Learn more" legend="A simple announcement banner." link="/" /> -->

<Container className="text-center !pt-12 !pb-2">
  <h2
    class="from-accent to-primary bg-linear-to-r bg-clip-text text-3xl leading-tight font-bold text-transparent md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight"
  >
    Simple, transparent pricing
  </h2>
  <p class="text-base-content mt-2 lg:text-lg">
    Whatever your status, our offers evolve according to your needs.
  </p>
</Container>

<Container>
  <PricingCards />
</Container>

<Container outerClassName="py-8">
  <PricingPlanCompare />
</Container>

<Container outerClassName="pt-4 pb-8">
  <FAQ faq_arr={pricing_faq} />
</Container>
