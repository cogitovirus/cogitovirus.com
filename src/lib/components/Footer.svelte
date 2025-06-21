<script lang="ts">
  import { siteName } from '$lib/config';
  import { X, Youtube, Facebook } from '$lib/dist/icons';
  const year = new Date().getFullYear();
</script>

<footer class="bg-base-200 text-base-content p-10">
  <div class="footer sm:footer-horizontal mx-auto max-w-[85rem]">
    <aside>
      <p class="text-lg font-medium">{siteName}</p>
      <p>© 2008 - {year}</p>
      <p> v2.0.0</p>
    </aside>
    <nav>
      <div class="footer-title">Services</div>
      <!-- <a class="link-hover link" href="/">Branding</a> -->
      <a class="link-hover link" href="/">Design</a>
      <a class="link-hover link" href="/">Marketing</a>
      <a class="link-hover link" href="/">Development</a>
    </nav>
    <nav>
      <div class="footer-title">Company</div>
      <!-- <a class="link-hover link" href="/">About us</a> -->
      <a class="link-hover link" href="/">Contact</a>
      <a class="link-hover link" href="/">Jobs</a>
      <a class="link-hover link" href="/">Press kit</a>
    </nav>
    <nav>
      <div class="footer-title">Legal</div>
      <a class="link-hover link" href="/">Terms of use</a>
      <a class="link-hover link" href="/">Privacy policy</a>
      <!-- <a class="link-hover link" href="/">Cookie policy</a> -->
    </nav>
    <nav>
      <div class="footer-title">Social</div>
      <div class="grid grid-flow-col gap-4">
        <a href="https://x.com/cogitovirus3" target="_blank" aria-label="twitter"
          ><X width={19} heigth={19} aria-hidden={true} /></a
        >
        <!-- <a href="/" target="_blank" aria-label="youtube"
          ><Youtube width={24} heigth={24} aria-hidden={true} /></a
        > -->
        <!-- <a href="/" target="_blank" aria-label="facebook"
          ><Facebook width={24} heigth={24} aria-hidden={true} /></a
        > -->
      </div>
    </nav>
  </div>
</footer>
