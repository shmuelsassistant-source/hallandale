(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var media=document.querySelector('[data-parallax]');
  if(media&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    window.addEventListener('scroll',function(){var y=window.scrollY;if(y<window.innerHeight)media.style.transform='translateY('+(y*0.25)+'px)'},{passive:true});
  }
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseFloat(el.getAttribute('data-count')),dec=parseInt(el.getAttribute('data-decimals')||'0',10),started=false;
    var run=function(){if(started)return;started=true;var t0=null;var step=function(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1400,1);var v=target*(1-Math.pow(1-p,3));el.textContent=v.toFixed(dec);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
    if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run();
  });
  var today=new Date().getDay();var row=document.querySelector('.hours tr[data-day="'+today+'"]');if(row)row.classList.add('today');
})();