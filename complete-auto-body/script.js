(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav=document.getElementById('nav');
  if(nav){var onS=function(){nav.classList.toggle('solid',window.scrollY>30)};onS();addEventListener('scroll',onS,{passive:true});}
  var par=document.querySelectorAll('[data-parallax]');
  if(par.length&&!reduce){addEventListener('scroll',function(){var y=scrollY;if(y<innerHeight*1.5)par.forEach(function(p){var k=parseFloat(p.getAttribute('data-parallax'))||0.15;p.style.transform='translate3d(0,'+(y*k)+'px,0)'})},{passive:true});}
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -5% 0px'});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('in')})}
  var HOURS=window.HOURS||{};
  var now=new Date(),day=now.getDay(),mins=now.getHours()*60+now.getMinutes();
  try{var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(now);var dm={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},h=0,m=0;parts.forEach(function(p){if(p.type==='weekday')day=dm[p.value];if(p.type==='hour')h=parseInt(p.value,10)%24;if(p.type==='minute')m=parseInt(p.value,10)});mins=h*60+m}catch(e){}
  var fmt=function(x){var h=Math.floor(x/60),m=x%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(m?':'+(m<10?'0':'')+m:'')+' '+ap};
  var names=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var t=HOURS[day],open=!!(t&&mins>=t[0]&&mins<t[1]),msg;
  if(open)msg='Open now · until '+fmt(t[1]);
  else if(t&&mins<t[0])msg='Closed · opens today '+fmt(t[0]);
  else{msg='Closed';for(var i=1;i<=7;i++){var d=(day+i)%7;if(HOURS[d]){msg='Closed · opens '+(i===1?'tomorrow':names[d])+' '+fmt(HOURS[d][0]);break}}}
  document.querySelectorAll('[data-status]').forEach(function(el){el.textContent=msg;el.classList.toggle('is-open',open)});
  var row=document.querySelector('[data-day="'+day+'"]');if(row)row.classList.add('today');
})();
