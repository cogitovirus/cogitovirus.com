<script lang="ts">
  import { addResourceIfNotPresent } from '$lib/dist/dom';
  import { onMount } from 'svelte';
  interface Props {
    id: string;
    title: string;
  }

  let { id, title }: Props = $props();

  onMount(() => {
    addResourceIfNotPresent('css', '/dist/css/lite-yt-embed.css');
    addResourceIfNotPresent('js', '/dist/js/lite-yt-embed.js');
  });
</script>

<!-- https://github.com/paulirish/lite-youtube-embed -->
<lite-youtube
  videoid={id}
  style="background-image: url('https://i.ytimg.com/vi/{id}/hqdefault.jpg');"
>
  <span class="lty-playbtn" title="Play Video">
    <span class="lyt-visually-hidden">{title}</span>
  </span>
</lite-youtube>
