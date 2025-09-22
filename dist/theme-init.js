(() => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
  } else {
    initializeTheme();
  }

  function initializeTheme() {
    const saved = localStorage.getItem('theme');
    const theme = saved || 'light';
    document.documentElement.dataset.theme = theme;
    console.log('Theme initialized:', theme, 'data-theme:', document.documentElement.dataset.theme);
  }
})();