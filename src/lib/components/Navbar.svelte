<script lang="ts">
  import ThemeToggle from '$lib/dist/components/ThemeToggle.svelte';
  import CardIconMini from '$lib/dist/components/CardIconMini.svelte';
  import NavLink from '$lib/dist/components/NavLink.svelte';
  import {
    AtSign,
    BookOpen,
    Boxes,
    ChevronDown,
    CircleHelp,
    CodeXml,
    Menu,
    Users,
    X,
  } from 'lucide-svelte';
  import CardLinkImage from '$lib/dist/components/CardLinkImage.svelte';
  import { siteName, docsPath } from '$lib/config';
  import { joinPath } from '$lib/dist/utils';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  onMount(() => {
    return page.subscribe(() => {
      let navbar = document.getElementById('navbar-collapse');
      let navbarToggle = document.getElementById('navbar-toggle');
      if (navbar && navbarToggle) {
        navbar.classList.remove('open');
        navbar.classList.add('hidden');
        navbarToggle.classList.remove('open');
      }
    });
  });
</script>

<header class="z-50 flex w-full flex-wrap py-2 text-sm md:flex-nowrap md:justify-start">
  <nav class="mx-auto w-full max-w-[85rem] px-4 md:px-6 lg:px-8" aria-label="Global">
    <div class="relative md:flex md:items-center md:justify-between">
      <div class="flex items-center justify-between">
        <a class="flex-none text-3xl font-bold" href="/">
          <span class="text-base-content flex gap-2">
            <img src="/logo.svg" alt="logo" class="size-10" />
            <span class="hidden md:inline">{siteName}</span>
          </span>
        </a>
        <div class="md:hidden">
          <button
            id="navbar-toggle"
            type="button"
            class="hs-collapse-toggle border-base-content text-base-content flex size-9 items-center justify-center rounded-lg border text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
            data-hs-collapse="#navbar-collapse"
            aria-controls="navbar-collapse"
            aria-label="Toggle navigation"
          >
            <Menu class="text-base-content hs-collapse-open:hidden shrink-0" />
            <X class="text-base-content hs-collapse-open:block hidden shrink-0" />
          </button>
        </div>
      </div>
      <div
        id="navbar-collapse"
        class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"
      >
        <div
          class="max-h-[75vh] overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700"
        >
          <div
            class="divide-neutral mt-5 flex flex-col gap-x-0 divide-y divide-dashed md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-7 md:divide-y-0 md:divide-solid md:ps-7"
          >
            <!-- <NavLink name="Pricing" link="/pricing" /> -->
            <div
              class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:py-4 md:[--strategy:absolute] md:[--trigger:hover]"
            >
              <button
                type="button"
                class="text-base-content hover:text-accent flex w-full items-center font-medium"
              >
                Projects &nbsp;<ChevronDown size={18} />
              </button>
              <div
                class="hs-dropdown-menu bg-base-200 hs-dropdown-open:opacity-100 start-0 top-full z-10 hidden w-full min-w-60 rounded-lg py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:start-0 before:-top-5 before:h-5 before:w-full md:p-4 md:shadow-2xl md:duration-[150ms]"
              >
                <div class="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                  <div class="mx-1 flex flex-col md:mx-0">
                    <a href="/">
                      <CardIconMini
                        title="rook2root"
                        Icon={BookOpen}
                        description="An open-source intelligence platform documenting strategies of influence, control, and resilience."
                        className="bg-base-200 hover:bg-base-300"
                      />
                    </a>

                    <a href="/">
                      <CardIconMini
                        title="memetics"
                        Icon={Boxes}
                        description="Studying how ideas they replicate, evolve, and take hold of minds, blending open research with ancient dharma."
                        className="bg-base-200 hover:bg-base-300"
                      />
                    </a>

                    <!-- <a href="/">
                      <CardIconMini
                        title="API Reference"
                        Icon={CodeXml}
                        description="Build custom integrations with our first-class API."
                        className="bg-base-200 hover:bg-base-300"
                      />
                    </a> -->
                  </div>
                  <div class="mx-1 flex flex-col md:mx-0">
                    <a href="/">
                      <CardIconMini
                        title="ergoproxy"
                        Icon={CircleHelp}
                        description="Meta agent for self monitoring, self-healing, and self-optimizing systems."
                        className="bg-base-200 hover:bg-base-300"
                      />
                    </a>

                    <a href="/">
                      <CardIconMini
                        title="langprism"
                        Icon={AtSign}
                        description="AI powered translation and deployment engine"
                        className="bg-base-200 hover:bg-base-300"
                      />
                    </a>

                    <!-- <a href="/">
                      <CardIconMini
                        title="Community Forum"
                        Icon={Users}
                        description="Join the conversation and connect with other developers."
                        className="bg-base-200 hover:bg-base-300"
                      />
                    </a> -->
                  </div>
                  <!-- <div class="mx-1 flex flex-col pt-4 md:mx-0 md:pt-0">
                    <span class="text-base-content text-sm font-semibold uppercase"
                      >Customer stories</span
                    >
                    <CardLinkImage
                      link="/"
                      name="Learn More"
                      image_src="/images/header/header-resources.webp"
                      image_alt="learn more"
                      description="Hear from our customers about their experience with Svelte Starter Kit."
                    />
                  </div> -->
                </div>
              </div>
            </div>
            <NavLink name="Essays" link="/essays" />
            <NavLink name="Manifesto" link="/about/manifesto" />
            <!-- <NavLink name="About" link="/{joinPath(docsPath)}" /> -->
            <ThemeToggle />
            <div class="pt-3 md:pt-0">
              <a class="btn btn-accent text-accent-content" href="/support">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>
