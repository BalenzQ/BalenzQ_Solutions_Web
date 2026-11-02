(() => {
  const root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  let saved = null;
  try { saved = localStorage.getItem('balenzq-theme'); } catch (e) {}
  if (saved) root.dataset.theme = saved;

  const btn = document.querySelector('.theme-toggle');
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  const paint = () => {
    if (!btn) return;
    const dark = isDark();
    btn.innerHTML = dark ? '☀' : '◐';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  if (btn) {
    paint();
    btn.addEventListener('click', () => {
      root.dataset.theme = isDark() ? 'light' : 'dark';
      try { localStorage.setItem('balenzq-theme', root.dataset.theme); } catch (e) {}
      paint();
    });
  }

  /* ---------- Scroll reveal ---------- */
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ---------- Enquiry form -> Google Apps Script (Sheet + Slack) ---------- */
  document.querySelectorAll('form[data-enquiry]').forEach(form => {
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('button[type="submit"]');
    const endpoint = form.dataset.endpoint || '';
    const say = (msg, ok) => {
      if (!status) return;
      status.textContent = msg;
      status.style.color = ok ? '#16c9bb' : '#e5484d';
    };

    form.addEventListener('submit', async e => {
      e.preventDefault();

      if (!/^https:\/\/script\.google\.com\//.test(endpoint)) {
        say('The enquiry form is not connected yet. Please email us directly.', false);
        return;
      }

      const original = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Sending…';
      say('', true);

      try {
        const body = new URLSearchParams(new FormData(form));
        // no-cors: Apps Script does not send CORS headers; the request still arrives.
        await fetch(endpoint, { method: 'POST', mode: 'no-cors', body });
        form.reset();
        say('Thank you — your enquiry has been received. We will be in touch soon.', true);
      } catch (err) {
        say('Something went wrong. Please check your connection and try again.', false);
      } finally {
        submit.disabled = false;
        submit.textContent = original;
      }
    });
  });
})();
