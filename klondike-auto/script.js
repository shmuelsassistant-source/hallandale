(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var media=document.querySelector('[data-parallax]');
  if(media&&!reduce){window.addEventListener('scroll',function(){var y=window.scrollY;if(y<window.innerHeight*1.2)media.style.transform='translate3d(0,'+(y*0.28)+'px,0)'},{passive:true});}
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseFloat(el.getAttribute('data-count')),dec=parseInt(el.getAttribute('data-decimals')||'0',10),started=false;
    var run=function(){if(started)return;started=true;if(reduce){el.textContent=target.toFixed(dec);return}var t0=null;var step=function(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1500,1);var v=target*(1-Math.pow(1-p,3));el.textContent=v.toFixed(dec);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
    if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run();
  });
  // live hours (shop is in America/New_York)
  var hours={1:[9,18],2:[9,18],3:[9,18],4:[9,18],5:[9,18],6:[9,14],0:null};
  var now=new Date();var parts;
  try{parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',hour12:false}).formatToParts(now)}catch(e){parts=null}
  var dayMap={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};var day=now.getDay(),hour=now.getHours();
  if(parts){parts.forEach(function(p){if(p.type==='weekday')day=dayMap[p.value];if(p.type==='hour')hour=parseInt(p.value,10)%24})}
  var row=document.querySelector('.hours tr[data-day="'+day+'"]');if(row)row.classList.add('today');
  var h=hours[day],open=h&&hour>=h[0]&&hour<h[1];
  var fmt=function(x){return (x>12?x-12:x)+(x>=12?' PM':' AM')};
  var next=function(){for(var i=1;i<=7;i++){var d=(day+i)%7;if(hours[d])return (i===1?'tomorrow':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d])+' '+fmt(hours[d][0])}return ''};
  var s1=document.getElementById('open-status');if(s1)s1.textContent=open?'Open now':'Closed now';
  var hc=document.querySelector('.hours-card h2');
  if(hc){hc.innerHTML=open?'Open now <span>· until '+fmt(h[1])+'</span>':(h&&hour<h[0]?'Opens today <span>at '+fmt(h[0])+'</span>':'Closed <span>· opens '+next()+'</span>')}
})();