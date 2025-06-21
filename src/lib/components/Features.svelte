<script lang="ts">
  import {
    AlignStartVerticalIcon,
    BookIcon,
    BookImageIcon,
    EarthIcon,
    PaletteIcon,
    RssIcon,
    SwatchBookIcon,
    TerminalIcon,
    ZapIcon,
  } from 'lucide-svelte';
  import CardIcon from '$lib/dist/components/CardIcon.svelte';
</script>

<div class="grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <!-- prettier-ignore -->
  <CardIcon
      title="memetics"
      content="A center for cognitive, semiotic, and memetic analysis in the digital age."
      icon={RssIcon}
    />

  <!-- prettier-ignore -->
  <CardIcon
      title="rook2root"
      content="An open-source intelligence platform documenting strategies of influence, control, and resilience."
      icon={BookIcon}
    />

  <!-- prettier-ignore -->
  <CardIcon
      title="gallery.cogitovirus"
      content="Curated images, visual signals, and symbolic fragments."
      icon={BookImageIcon}
      inactive={true}
    />

  <!-- prettier-ignore -->
  <CardIcon
      title="dreamlab.cogitovirus"
      content="A space for creative exploration and experimentation."
      icon={EarthIcon}
      class="opacity-50 grayscale pointer-events-none"
      inactive={true}

    />

  <!-- prettier-ignore -->
  <CardIcon
      title="cogitovirus"
      content="Main gateway for all projects."
      icon={PaletteIcon}
    />

  <!-- prettier-ignore -->
  <CardIcon
      title="langprism"
      content="toolkit for AI powered translation and deployment engine"
      icon={ZapIcon}
      inactive={true}

    />

  <!-- prettier-ignore -->
  <CardIcon
      title="ergoproxy"
      content="Meta agent for self monitoring, self-healing, and self-optimizing systems."
      icon={AlignStartVerticalIcon}
    />

  <!-- prettier-ignore -->
  <!-- <CardIcon
      title="Typescript"
      content="Built with Typescript to provide better type safety."
      icon={TerminalIcon}
    /> -->

  <!-- prettier-ignore -->
  <!-- <CardIcon
      title="Svelte"
      content="UI components are built with Svelte 4.x"
      icon={SwatchBookIcon}
    /> -->
</div>
