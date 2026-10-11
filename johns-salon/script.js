
(() => {
  const top = document.querySelector('.top');
  const onScroll = () => top.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // scroll reveals
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { e.target.style.transitionDelay = `${Math.min(i * 70, 350)}ms`; e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  } else { els.forEach(el => el.classList.add('in')); }

  // subtle hero parallax
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY; if (y < window.innerHeight) heroImg.style.translate = `0 ${y * 0.18}px`;
    }, { passive: true });
  }

  // live hours: open 8 AM - 5 PM every day, shop time America/New_York
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(now);
    const get = t => parts.find(p => p.type === t)?.value;
    const dayIdx = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(get('weekday'));
    const h = parseInt(get('hour'), 10) % 24, m = parseInt(get('minute'), 10);
    const mins = h * 60 + m;
    const row = document.querySelector(`.hours tr[data-day="${dayIdx}"]`);
    if (row) row.classList.add('today');
    const line = document.getElementById('today-line');
    if (line) {
      if (mins >= 8 * 60 && mins < 17 * 60) {
        const left = 17 * 60 - mins;
        line.textContent = left <= 60 ? `Open now · closing at 5 PM` : `Open now · until 5 PM today`;
      } else if (mins < 8 * 60) {
        line.textContent = `Closed · opens today at 8 AM`;
      } else {
        line.textContent = `Closed · opens tomorrow at 8 AM`;
      }
    }
  } catch (e) { const line = document.getElementById('today-line'); if (line) line.textContent = 'Open daily 8 AM – 5 PM'; }
})();
