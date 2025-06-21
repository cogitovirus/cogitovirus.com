// @ts-nocheck
import { visit, SKIP } from 'unist-util-visit';

export function remarkAddTocHeading() {
  return (tree) => {
    let inserted = false;

    visit(tree, 'heading', (node, index, parent) => {
      if (!inserted) {
        // Create the "## Table of Contents" node
        const tableOfContents = {
          type: 'heading',
          depth: 2,
          children: [
            {
              type: 'text',
              value: 'Table of Contents',
            },
          ],
        };

        // Insert the Table of Contents node before the first heading
        parent.children.splice(index, 0, tableOfContents);
        inserted = true;
      }
    });
  };
}

export function rehypeUnwrapImages() {
  function containsImage(node) {
    return (
      node.tagName === 'p' &&
      node.children.some((child) => {
        if (child.type === 'element') {
          return child.tagName === 'img';
        }
      })
    );
  }

  return (tree) => {
    visit(tree, containsImage, (node, index, parent) => {
      if (node.type === 'element') {
        parent.children.splice(index, 1, ...node.children);
        return [SKIP, index];
      }
    });
  };
}

export function rehypeHideDefaultToc() {
  return (tree) => {
    let visitCount = 0;
    let found = false;

    visit(tree, 'element', (node) => {
      visitCount++;
      if (!found && node.tagName === 'h2' && node.properties.id === 'table-of-contents') {
        node.properties.style = 'display: none;';
        visitCount = 0;
        found = true;
      } else if (found && node.tagName === 'ul' && visitCount === 3) {
        node.properties.style = 'display: none;';
        node.properties.id = 'toc-ul';
      }
    });
  };
}
