<script lang="ts">
  import Container from '$lib/dist/components/Container.svelte';
  import HeroOne from '$lib/components/HeroOne.svelte';
  import Features from '$lib/components/Features.svelte';
  import FeaturesNav from '$lib/components/FeaturesNav.svelte';
  import SEO from '$lib/dist/components/SEO.svelte';
  import FeaturesList from '$lib/dist/components/FeaturesList.svelte';
</script>

<SEO />

<Container>
  <HeroOne />
</Container>

<Container id="features">
  <Features />
</Container>

<!-- <Container outerClassName="py-8 md:py-20">
  <FeaturesList
    image_src="/images/blog.avif"
    title={'Powerful <span class="text-accent">Blogging</span> System with Markdown'}
    description="Create a blog with markdown and deploy it with Vercel or Netlify."
    features={[
      'Fast and reliable: Built with SvelteKit',
      'SEO friendly: Meta tags, Schema Markup, etc.',
      'Open Graph and Twitter Card support',
      'Use Markdown, HTML or use Svelte Components',
      'RSS feed support',
      'Syntax highlighting with Shiki',
      'Sitemap.xml for easy link discovery',
      'Multiple authors support',
      'Publish Unlisted posts (only accessible via direct link)',
      'Builds into prerendered static files',
      'Deploy anywhere: Vercel, Netlify, Cloudflare, etc.',
    ]}
  />
</Container> -->

<!-- <Container outerClassName="pb-8 md:pb-20">
  <FeaturesList
    mirror={true}
    image_src="/images/features/feature_docs.jpg"
    title={'Easy to Use <span class="text-accent">Documentation System</span>'}
    description="Easily create documentation with markdown"
    features={[
      'Zero setup: Just write markdown',
      'Supports Svelte Component via Mdsvex',
      'Create multi-level documentation',
      'Powerful search functionality',
      'File based routing',
      'Builds into prerendered static files',
      'SEO friendly: Meta tags, Schema Markup, etc.',
    ]}
  />
</Container> -->

<Container outerClassName="pb-8 md:pb-20">
  <FeaturesNav />
</Container>
