
(function(){
  var nav=document.querySelector('.nav');
  var onScroll=function(){ nav.classList.toggle('scrolled', window.scrollY>40); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // today's hours
  var d=new Date().getDay();
  var row=document.querySelector('.hours tr[data-day="'+d+'"]'); if(row) row.classList.add('today');

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=document.querySelectorAll('.reveal, .reveal-clip');
  if(reduce || !('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in');}); return; }

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        var el=en.target, parent=el.parentElement;
        var sibs=parent?Array.prototype.filter.call(parent.children,function(c){return c.classList.contains('reveal')||c.classList.contains('reveal-clip');}):[];
        var i=sibs.indexOf(el); el.style.transitionDelay=(Math.min(i,6)*90)+'ms';
        el.classList.add('in'); io.unobserve(el);
      }
    });
  },{rootMargin:'0px 0px -8% 0px', threshold:0.08});
  els.forEach(function(e){ io.observe(e); });
  // hero reveals immediately
  document.querySelectorAll('.hero .reveal').forEach(function(e,i){ setTimeout(function(){e.classList.add('in');}, 250+i*140); });

  // gentle hero parallax
  var media=document.querySelector('[data-parallax]');
  if(media){
    var tick=false;
    window.addEventListener('scroll',function(){
      if(tick) return; tick=true;
      requestAnimationFrame(function(){ var y=window.scrollY; if(y<window.innerHeight*1.2){ media.style.transform='translate3d(0,'+(y*0.18)+'px,0)'; } tick=false; });
    },{passive:true});
  }
})();
