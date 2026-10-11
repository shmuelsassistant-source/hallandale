(function(){
  var nav=document.getElementById('nav');
  var hero=document.querySelector('.hero');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>(hero?hero.offsetHeight-80:80))};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var media=document.querySelector('[data-parallax]');
  if(media&&!reduced){window.addEventListener('scroll',function(){var y=window.scrollY;if(y<window.innerHeight*1.2)media.style.transform='translateY('+(y*0.28)+'px)'},{passive:true});}
  var band=document.querySelector('[data-parallax-2]');
  if(band&&!reduced){var sec=band.parentElement;window.addEventListener('scroll',function(){var r=sec.getBoundingClientRect();if(r.bottom>0&&r.top<window.innerHeight){var p=(r.top+r.height/2-window.innerHeight/2)/window.innerHeight;band.style.transform='translateY('+(p*-60)+'px)'}},{passive:true});}
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
    var sweep=function(){var vh=window.innerHeight;els.forEach(function(el){if(!el.classList.contains('in')&&el.getBoundingClientRect().top<vh*0.96)el.classList.add('in')})};window.addEventListener('scroll',sweep,{passive:true});window.addEventListener('load',sweep);
  }else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target=parseFloat(el.getAttribute('data-count')),dec=parseInt(el.getAttribute('data-decimals')||'0',10),started=false;
    var run=function(){if(started)return;started=true;var t0=null;var step=function(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1400,1);var v=target*(1-Math.pow(1-p,3));el.textContent=v.toFixed(dec);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
    if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run();
  });
  // live hours (America/New_York)
  var hours={1:[9,17],2:[9,17],3:[9,17],4:[9,17],5:[9,17.5]};
  try{
    var now=new Date();var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(now);
    var map={};parts.forEach(function(p){map[p.type]=p.value});
    var days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};var d=days[map.weekday];var h=parseInt(map.hour,10)%24+parseInt(map.minute,10)/60;
    var row=document.querySelector('.hours tr[data-day="'+d+'"]');if(row)row.classList.add('today');
    var note=document.getElementById('open-now');var todayH=hours[d];var msg;
    if(todayH&&h>=todayH[0]&&h<todayH[1]){msg='<strong>Open now</strong> · closes at '+(todayH[1]===17.5?'5:30 PM':'5 PM');}
    else{var n=d,steps=0;while(!hours[n]||(n===d&&h>=hours[n][0])){n=(n+1)%7;steps++;if(steps>7)break;}var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];msg='<strong>Closed now</strong> · opens 9 AM '+(steps===1&&h>=17?'tomorrow':(n===d&&h<9?'today':names[n]));}
    if(note)note.innerHTML=msg+' · Hours as listed on Google.';
  }catch(e){}
})();