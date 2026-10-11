(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var media=document.querySelector('[data-parallax]');
  if(media&&!reduce){
    var tick=false;
    window.addEventListener('scroll',function(){
      if(tick)return;tick=true;
      requestAnimationFrame(function(){var y=window.scrollY;if(y<window.innerHeight)media.style.transform='translateY('+(y*0.28)+'px)';tick=false});
    },{passive:true});
  }
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){var d=Array.prototype.indexOf.call(e.target.parentNode.children,e.target);e.target.style.transitionDelay=(Math.min(d,5)*70)+'ms';e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseFloat(el.getAttribute('data-count')),dec=parseInt(el.getAttribute('data-decimals')||'0',10),started=false;
    var run=function(){if(started)return;started=true;if(reduce){el.textContent=target.toFixed(dec);return}var t0=null;var step=function(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1500,1);var v=target*(1-Math.pow(1-p,3));el.textContent=v.toFixed(dec);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
    if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run();
  });
  // Hours (America/New_York): Mon-Fri 8:30-18:00, Sat 9:00-17:00, Sun closed
  var hours={1:[510,1080],2:[510,1080],3:[510,1080],4:[510,1080],5:[510,1080],6:[540,1020],0:null};
  var now=new Date();var parts;
  try{parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(now)}catch(e){parts=null}
  var day=now.getDay(),mins=now.getHours()*60+now.getMinutes();
  if(parts){var m={};parts.forEach(function(p){m[p.type]=p.value});day={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[m.weekday];mins=(parseInt(m.hour,10)%24)*60+parseInt(m.minute,10)}
  var row=document.querySelector('.hours tr[data-day="'+day+'"]');if(row)row.classList.add('today');
  var st=document.getElementById('open-status');
  if(st){
    var fmt=function(t){var h=Math.floor(t/60),mm=t%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(mm?':'+(mm<10?'0':'')+mm:'')+' '+ap};
    var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var h=hours[day];
    if(h&&mins>=h[0]&&mins<h[1]){st.textContent='Open now · closes '+fmt(h[1]);st.classList.add('open')}
    else{
      var d=day,n=0,next=null;
      if(h&&mins<h[0]){next={d:day,t:h[0]}}
      else{do{d=(d+1)%7;n++;if(hours[d]){next={d:d,t:hours[d][0]};break}}while(n<7)}
      st.textContent='Closed now · opens '+(next.d===day?'':(next.d===(day+1)%7?'tomorrow ':names[next.d]+' '))+fmt(next.t);st.classList.add('closed');
    }
  }
})();
