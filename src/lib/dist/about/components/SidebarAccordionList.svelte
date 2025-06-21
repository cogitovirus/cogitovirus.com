<!-- <script lang="ts">
  import SidebarAccordionList from './SidebarAccordionList.svelte';
  import type { Doc } from '$lib/dist/docs/types';
  import { slugify, joinPath } from '$lib/dist/utils';
  import * as config from '$lib/config';
  import { ChevronUp, ChevronDown } from 'lucide-svelte';
  import { tick } from 'svelte';
  import { currDocSlug } from '$lib/dist/docs/stores.svelte.js';

  interface Props {
    docs: Doc[];
    shift?: boolean;
  }

  let { docs, shift = false }: Props = $props();

  const activeLink = 'bg-neutral text-neutral-content font-semibold';
  let sidebarListIds: string[] = $state([]);

  function getSidebarListIds() {
    let ids: string[] = [];
    var elements = document.querySelectorAll('.sidebar-list');
    elements.forEach(function (element) {
      if (element.id) {
        ids.push(element.id);
      }
    });
    return ids;
  }

  function findParentIdsWithClass(elementId: string, className: string) {
    var parentIds = [];
    var element = document.getElementById(elementId);
    while (element) {
      if (element && element.classList.contains(className)) {
        parentIds.push(element.id);
      }
      element = element.parentElement;
    }
    return parentIds;
  }

  function openCurrentAccordion(ids: string[]) {
    for (const id of ids) {
      if (currDocSlug.slug) {
        if (id === slugify(currDocSlug.slug)) {
          let parentIds = findParentIdsWithClass(id, 'hs-accordion');
          parentIds.forEach((parentId) => {
            // @ts-ignore
            HSAccordion.show(document.querySelector('#' + parentId));
          });
        }
      }
    }
  }

  function showDraftBadge(doc: Doc): string {
    if (doc.draft) {
      return '<span class="badge badge-sm badge-error">Draft</span>';
    }
    return '';
  }

  $effect.pre(() => {
    tick().then(() => {
      sidebarListIds = getSidebarListIds();
      openCurrentAccordion(sidebarListIds);
    });
  });
</script>

<ul class={shift ? 'ps-3 pt-1' : ''}>
  {#each docs as menu}
    {#if menu.children.length > 0}
      {#if !shift && menu.section}
        <div class="text-base-content my-2! px-2 text-sm font-semibold">{menu.title}</div>
        <SidebarAccordionList docs={menu.children} shift={true} />
      {:else}
        <li class="hs-accordion sidebar-list" id={slugify(menu.slug)}>
          <a
            href="/{joinPath(config.docsPath, menu.slug)}"
            class="{currDocSlug.slug === menu.slug
              ? activeLink
              : ''} hs-accordion-toggle text-base-content/80 hover:bg-primary hover:text-primary-content rounded-box flex w-full items-center gap-x-3.5 p-[0.35rem] text-start text-sm"
          >
            {menu.title}
            {@html showDraftBadge(menu)}

            <ChevronUp class="hs-accordion-active:block ms-auto hidden size-4" />
            <ChevronDown class="hs-accordion-active:hidden ms-auto block size-4" />
          </a>

          <div
            id="{slugify(menu.slug)}-jdfsl"
            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          >
            <SidebarAccordionList docs={menu.children} shift={true} />
          </div>
        </li>
      {/if}
    {:else}
      <li class="sidebar-list" id={slugify(menu.slug)}>
        <a
          class="{currDocSlug.slug === menu.slug
            ? activeLink
            : ''} text-base-content/80 hover:bg-primary hover:text-primary-content rounded-box flex items-center gap-x-3 px-2 py-2 text-sm"
          href="/{joinPath(config.docsPath, menu.slug)}"
        >
          {menu.title}
          {@html showDraftBadge(menu)}
        </a>
      </li>
    {/if}
  {/each}
</ul> -->
