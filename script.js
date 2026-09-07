(() => {
  'use strict';
  const destination = new URL(window.BIOFY_CONFIG.checkoutUrl);
  const incoming = new URLSearchParams(window.location.search);
  const existing = new Set([...destination.searchParams.keys()].map(key => key.toLowerCase()));
  for (const [key, value] of incoming) {
    if (/^utm_[a-z0-9_]+$/i.test(key) && !existing.has(key.toLowerCase())) {
      destination.searchParams.append(key, value);
    }
  }
  document.querySelectorAll('[data-checkout]').forEach(link => {
    link.href = destination.href;
    link.target = '_self';
  });
  const first = document.getElementById('first-cta');
  const sticky = document.querySelector('.sticky');
  const mobile = window.matchMedia('(max-width: 760px)');
  function updateSticky() {
    sticky.hidden = !(mobile.matches && first.getBoundingClientRect().bottom <= 0);
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(updateSticky, {threshold: [0, 1]}).observe(first);
  window.addEventListener('scroll', updateSticky, {passive: true});
  window.addEventListener('resize', updateSticky, {passive: true});
  updateSticky();
})();
