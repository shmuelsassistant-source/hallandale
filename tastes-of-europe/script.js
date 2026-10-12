(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40)};onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var media=document.querySelector('[data-parallax]');
  if(media&&!matchMedia('(prefers-reduced-motion: reduce)').matches){window.addEventListener('scroll',function(){var y=window.scrollY;if(y<window.innerHeight)media.style.transform='translateY('+(y*0.22)+'px)'},{passive:true})}
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -5% 0px'});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('[data-count]').forEach(function(el){var t=parseFloat(el.getAttribute('data-count')),dec=parseInt(el.getAttribute('data-decimals')||'0',10),s=false;var run=function(){if(s)return;s=true;var t0=null;var st=function(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1400,1);el.textContent=(t*(1-Math.pow(1-p,3))).toFixed(dec);if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)};if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run()});
  // open now, in the bakery's own time zone (America/New_York). Tue–Sat 8:00–16:00.
  try{
    var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var g=function(t){return (parts.find(function(p){return p.type===t})||{}).value};
    var days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};var d=days[g('weekday')],h=parseInt(g('hour'),10)%24,m=parseInt(g('minute'),10),mins=h*60+m;
    var openDay=d>=2&&d<=6,isOpen=openDay&&mins>=480&&mins<960;
    var row=document.querySelector('.hours tr[data-day="'+d+'"]');if(row)row.classList.add('today');
    var st=document.getElementById('status'),tx=st.querySelector('.status-text');
    var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if(isOpen){st.classList.add('open');tx.textContent='Open now · until 4 PM'+(d===6&&mins>=600?' · Lángos today':'')}
    else{st.classList.add('closed');var nd=d,first=true;
      if(openDay&&mins<480){tx.textContent='Closed · opens 8 AM today'}
      else{do{nd=(nd+1)%7}while(nd<2);tx.textContent='Closed · opens 8 AM '+(nd===(d+1)%7?'tomorrow':names[nd])}}
  }catch(e){}
})();
