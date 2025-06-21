import { browser } from '$app/environment';

const userTheme = browser && localStorage.getItem('theme');

function themeState() {
  let theme = $state(userTheme);

  return {
    get value() {
      return theme;
    },
    toggle() {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      theme = newTheme;
    },
  };
}

export const theme = themeState();
