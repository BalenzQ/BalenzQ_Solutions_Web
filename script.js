(()=>{
 const root=document.documentElement;
 let saved=null;try{saved=localStorage.getItem('balenzq-theme')}catch(e){}
 if(saved)root.dataset.theme=saved;
 const btn=document.querySelector('.theme-toggle');
 const isDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
 const paint=()=>{if(btn){btn.textContent=isDark()?'☀':'◐';btn.setAttribute('aria-label',isDark()?'Switch to light mode':'Switch to dark mode')}};
 if(btn){paint();btn.addEventListener('click',()=>{root.dataset.theme=isDark()?'light':'dark';try{localStorage.setItem('balenzq-theme',root.dataset.theme)}catch(e){}paint()})}
 // Current page state
 const page=document.body.dataset.page||location.pathname.split('/').pop().replace('.html','')||'index';
 document.querySelectorAll('.nav nav a').forEach(a=>{const target=a.getAttribute('href').split('#')[0].replace('.html','')||'index';if(target===page){a.classList.add('active');a.setAttribute('aria-current','page')}});
 // Passive scroll work is throttled by requestAnimationFrame.
 const header=document.querySelector('.site-header');let ticking=false;
 const progress=document.querySelector('.scroll-progress');
 const updateScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?scrollY/max*100:0;if(progress)progress.style.width=pct+'%';header?.classList.toggle('is-scrolled',scrollY>24);ticking=false};
 addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});updateScroll();
 // Reveal on entry; unobserve after the first reveal to keep scroll work minimal.
 document.querySelectorAll('main > section .wrap, main > section .wrap > .section-head, main > section .wrap > .grid, main > section .wrap > .service-list, main > section .wrap > .split, main > section .wrap > .band, main > section .wrap > form').forEach(el=>el.classList.add('reveal'));
 const revealItems=document.querySelectorAll('.reveal');
 if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});revealItems.forEach((el,i)=>{el.style.transitionDelay=(i%4)*65+'ms';obs.observe(el)})}else revealItems.forEach(el=>el.classList.add('visible'));
 // Gentle pointer response on desktop only. No continuous animation loop.
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.card,.service-item').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--pointer-x',(((e.clientX-r.left)/r.width-.5)*3).toFixed(1)+'px');card.style.setProperty('--pointer-y',(((e.clientY-r.top)/r.height-.5)*3).toFixed(1)+'px')},{passive:true});card.addEventListener('pointerleave',()=>{card.style.removeProperty('--pointer-x');card.style.removeProperty('--pointer-y')})})}
 // Enquiry form -> Google Apps Script (saves to Google Sheet and posts to Slack).
 document.querySelectorAll('form[data-enquiry]').forEach(form=>{
  const status=form.querySelector('.form-status');
  const submit=form.querySelector('button[type="submit"]');
  const endpoint=form.dataset.endpoint||'';
  const say=(msg,ok)=>{if(!status)return;status.textContent=msg;status.style.color=ok?'var(--accent-strong)':'#e5484d'};
  form.addEventListener('submit',async e=>{
   e.preventDefault();
   if(!/^https:\/\/script\.google\.com\//.test(endpoint)){say('The enquiry form is not connected yet. Please email us directly.',false);return}
   const original=submit.textContent;
   submit.disabled=true;submit.textContent='Sending…';say('',true);
   try{
    const body=new URLSearchParams(new FormData(form));
    // no-cors: Apps Script sends no CORS headers; the request still arrives.
    await fetch(endpoint,{method:'POST',mode:'no-cors',body});
    form.reset();
    say('Thank you — your enquiry has been received. We will be in touch soon.',true);
   }catch(err){
    say('Something went wrong. Please check your connection and try again.',false);
   }finally{
    submit.disabled=false;submit.textContent=original;
   }
  });
 });
})();
