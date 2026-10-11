(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var media=document.querySelector('[data-parallax]');
  if(media&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    window.addEventListener('scroll',function(){var y=window.scrollY;if(y<window.innerHeight)media.style.transform='translateY('+(y*0.22)+'px)'},{passive:true});
  }
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseFloat(el.getAttribute('data-count')),dec=parseInt(el.getAttribute('data-decimals')||'0',10),started=false;
    var run=function(){if(started)return;started=true;var t0=null;var step=function(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1300,1);var v=target*(1-Math.pow(1-p,3));el.textContent=v.toFixed(dec);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
    setTimeout(run,500);
  });
  // hours: Mon-Fri 8-17, shop local time (America/New_York)
  try{
    var now=new Date();var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',hour12:false}).formatToParts(now);
    var wd={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[parts.find(function(p){return p.type==='weekday'}).value];
    var hr=parseInt(parts.find(function(p){return p.type==='hour'}).value,10)%24;
    var row=document.querySelector('.hours tr[data-day="'+wd+'"]');if(row)row.classList.add('today');
    var pill=document.getElementById('openPill');var open=wd>=1&&wd<=5&&hr>=8&&hr<17;
    var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var nextOpen=wd===0||wd===6?'Monday':(wd===5&&hr>=17?'Monday':(hr<8?'today':'tomorrow'));
    if(pill){pill.textContent=open?'Open now · until 5 PM':'Closed · opens 8 AM '+nextOpen;pill.classList.add(open?'open':'closed')}
  }catch(e){}
})();