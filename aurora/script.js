(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>30)};onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('in')})}
  // hours in America/New_York; minutes from midnight, close may pass 1440
  var H={0:[780,1590],1:[780,1590],2:[780,1590],3:[780,1590],4:[780,1590],5:[780,1740],6:[780,1740]};
  var now=new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));
  var d=now.getDay(),m=now.getHours()*60+now.getMinutes(),prev=(d+6)%7;
  var open=false,closeAt=null;
  if(m>=H[d][0]&&m<H[d][1]){open=true;closeAt=H[d][1]}
  else if(m+1440<H[prev][1]){open=true;closeAt=H[prev][1]-1440;d=prev}
  function fmt(x){x=x%1440;var h=Math.floor(x/60),mm=x%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(mm?':'+(mm<10?'0':'')+mm:'')+' '+ap}
  var pill=document.querySelector('[data-open-pill]'),line=document.querySelector('[data-open-line]');
  var txt=open?'Open now · until '+fmt(closeAt):'Opens today at 1 PM';
  if(pill){pill.textContent=txt;if(!open)pill.classList.add('closed')}
  if(line){line.textContent=open?'Open now — until '+fmt(closeAt)+'.':'Closed right now — opens at 1 PM.';if(!open)line.classList.add('closed')}
  var row=document.querySelector('.hours tr[data-day="'+d+'"]');if(row)row.classList.add('today');
})();
