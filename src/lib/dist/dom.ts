export const addCopyCodeBtn = () => {
  for (const node of document.querySelectorAll('pre > code')) {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'code-copy-button';

    button.onclick = () => {
      navigator.clipboard.writeText(node.textContent ?? '');
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    };

    node.parentNode?.prepend(button);
  }
};

export function openHref(event: Event) {
  event.preventDefault();
  const anchor = event.currentTarget as HTMLAnchorElement;
  window.location.href = anchor.href;
}

export function addResourceIfNotPresent(type: string, url: string) {
  // Check if the resource is already present
  let isPresent = false;

  if (type === 'css') {
    isPresent = Array.from(document.getElementsByTagName('link')).some(
      (link) => link.rel === 'stylesheet' && link.href.includes(url)
    );
  } else if (type === 'js') {
    isPresent = Array.from(document.getElementsByTagName('script')).some((script) =>
      script.src.includes(url)
    );
  }

  // If the resource is not present, add it
  if (!isPresent) {
    let element;
    if (type === 'css') {
      element = document.createElement('link');
      element.rel = 'stylesheet';
      element.href = url;
    } else if (type === 'js') {
      element = document.createElement('script');
      element.src = url;
    }

    if (element) {
      document.head.appendChild(element);
    }
  }
}
