(() => {
  const saved = localStorage.getItem('theme');
  document.documentElement.dataset.theme = saved || 'light';
})();
