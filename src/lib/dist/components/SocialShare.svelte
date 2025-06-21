<script lang="ts">
  import { Copy, Mail, Share2 } from 'lucide-svelte';
  import { Reddit, X, LinkedIn, Telegram, Whatsapp } from '$lib/dist/icons';
  import { twMerge } from 'tailwind-merge';

  interface Props {
    url: string;
    title: string;
    className?: string;
  }

  let { url, title, className = '' }: Props = $props();

  let encodedURI = $derived(encodeURIComponent(url));
  let encodedTitle = $derived(encodeURIComponent(title));

  function shareTwitter() {
    const link = `https://twitter.com/intent/tweet?url=${encodedURI}&text=${encodedTitle}`;
    window.open(link, '_blank');
  }

  function shareLinkedIn() {
    const link = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURI}&title=${encodedTitle}`;
    window.open(link, '_blank');
  }

  function shareReddit() {
    const link = `https://reddit.com/submit?url=${encodedURI}&title=${encodedTitle}`;
    window.open(link, '_blank');
  }

  function shareTelegram() {
    const link = `https://telegram.me/share/url?text=${encodedTitle}&url=${encodedURI}`;
    window.open(link, '_blank');
  }

  function shareWhatsapp() {
    const link = `https://api.whatsapp.com/send?text=${encodedTitle}%0A${encodedURI}`;
    window.open(link, '_blank');
  }

  function shareEmail() {
    const link = `mailto:?subject=${encodedTitle}&body=${encodedURI}`;
    window.location.href = link;
  }

  function copyLink() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  }
</script>

<div class={twMerge('my-4 flex gap-2', className)}>
  <div class="mr-2 p-2" title="Share">
    <Share2 class="size-6 text-base-content/70" />
  </div>

  <button class="cursor-pointer px-1 py-2" onclick={shareReddit} title="Reddit"
    ><Reddit width={24} height={24} aria-hidden={true} /></button
  >
  <button class="cursor-pointer px-1 py-2" onclick={shareTwitter} title="X"
    ><X width={24} height={24} aria-hidden={true} /></button
  >
  <button class="cursor-pointer px-1 py-2" onclick={shareTelegram} title="Telegram"
    ><Telegram width={24} height={24} aria-hidden={true} /></button
  >
  <button class="cursor-pointer px-1 py-2" onclick={shareLinkedIn} title="LinkedIn"
    ><LinkedIn width={24} height={24} aria-hidden={true} /></button
  >
  <button class="cursor-pointer px-1 py-2" onclick={shareWhatsapp} title="Whatsapp"
    ><Whatsapp width={24} height={24} aria-hidden={true} /></button
  >
  <button class="cursor-pointer px-1 py-2" onclick={shareEmail} title="Email"><Mail /></button>
  <button class="cursor-pointer px-1 py-2" onclick={copyLink} title="Copy"><Copy /></button>
</div>
