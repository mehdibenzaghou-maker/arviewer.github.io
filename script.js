// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
  })
});

// animate fade-up elements when in viewport
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); e.target.style.opacity=1; e.target.style.transform='none'; } });
},{threshold:0.12});
document.querySelectorAll('.fade-up').forEach(el=>{ obs.observe(el); el.style.transition='all .6s ease'; });

// Reserve CTA behaviour
document.querySelectorAll('.btn-primary').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const c=document.querySelector('#contact');
    if(c){ c.scrollIntoView({behavior:'smooth'}); }
  });
});

// Model viewer: when user taps/clicks the element, open AR mode if available
window.addEventListener('DOMContentLoaded',()=>{
  const mv = document.getElementById('mv');
  if(!mv) return;

  // On click/tap, request AR if supported
  mv.addEventListener('click', async (ev) => {
    try {
      if (mv.canActivateAR) {
        // model-viewer provides canActivateAR promise-ish behavior; call enterAR()
        await mv.enterAR();
      } else {
        // fallback: try enterAR anyway (some builds support it)
        if (typeof mv.enterAR === 'function') {
          await mv.enterAR();
        }
      }
    } catch (err) {
      // ignore errors - user will still be able to rotate/zoom the model in browser
      console.log('AR not available or blocked:', err);
    }
  });
});
