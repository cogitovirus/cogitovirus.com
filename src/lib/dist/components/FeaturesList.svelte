<script lang="ts">
  import { Check } from 'lucide-svelte';

  interface Props {
    title: string;
    description: string;
    features: string[];
    image_src: any;
    image_alt?: string;
    mirror?: boolean;
  }

  let { title, description, features, image_src, image_alt = '', mirror = false }: Props = $props();

  const img = `<img class="rounded-md" src=${image_src} alt=${image_alt} loading="lazy" />`;
</script>

<!-- Grid -->
<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
  <div class="hidden {mirror ? '' : 'items-center justify-center lg:flex'}">
    {@html img}
  </div>

  <div>
    <div class="space-y-6 sm:space-y-8">
      <!-- Title -->
      <div class="space-y-2 lg:space-y-8">
        <h2 class="text-base-content text-4xl font-bold lg:text-5xl">
          {@html title}
        </h2>
        <p class="text-base-content text-lg">
          {description}
        </p>
      </div>
      <!-- End Title -->

      <ul class="space-y-2 sm:space-y-4">
        {#each features as feature}
          <li
            class="flex space-x-3 transition ease-in-out hover:translate-x-1 hover:cursor-pointer"
          >
            <span class="mt-0.5 flex items-center justify-center">
              <Check class="text-accent size-5 shrink-0 font-bold" />
            </span>

            <span class="text-base-content text-base">
              {@html feature}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="flex items-center justify-center {mirror ? '' : 'lg:hidden'}">
    {@html img}
  </div>
</div>
<!-- End Grid -->
