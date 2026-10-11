(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){ if(window.scrollY>40){nav.classList.add('is-scrolled')} else {nav.classList.remove('is-scrolled')} };
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  // scroll reveals
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }

  // gentle hero parallax
  var media=document.querySelector('[data-parallax]');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(media && !reduce){
    var ticking=false;
    window.addEventListener('scroll',function(){
      if(ticking) return; ticking=true;
      requestAnimationFrame(function(){ var y=Math.min(window.scrollY,window.innerHeight); media.style.transform='translate3d(0,'+(y*0.18)+'px,0)'; ticking=false; });
    },{passive:true});
  }

  // today's hours
  var d=new Date().getDay();
  var row=document.querySelector('.hours tr[data-day="'+d+'"]');
  if(row) row.classList.add('is-today');
})();
