export function handleToc(_: HTMLElement, showToc: boolean) {
  if (showToc) {
    let tocGroup = document.querySelector('#toc-group') as HTMLElement;
    let tocContent = document.querySelector('#toc-content') as HTMLElement;
    let tocUl = document.querySelector('#toc-ul') as HTMLElement;

    if (tocUl && tocContent) {
      tocContent.appendChild(tocUl);
      tocUl.style.display = 'block';
      tocGroup.style.display = 'block';
    }
    if (!tocContent || tocContent.children.length <= 0) {
      tocGroup.style.display = 'none';
    }
  }
}
