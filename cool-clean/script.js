(function(){
  var nav=document.getElementById('nav');var f=function(){nav.classList.toggle('solid',window.scrollY>30)};f();window.addEventListener('scroll',f,{passive:true});
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('in')})}
  var H={0:null,1:[480,1110],2:[480,1110],3:[480,1110],4:[480,1110],5:[480,1110],6:[540,960]};
  var now=new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));
  var d=now.getDay(),m=now.getHours()*60+now.getMinutes();
  function fmt(x){var h=Math.floor(x/60),mm=x%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(mm?':'+(mm<10?'0':'')+mm:'')+' '+ap}
  var t=H[d],open=t&&m>=t[0]&&m<t[1],msg;
  if(open){msg='Open now · until '+fmt(t[1])}
  else{var nd=d,nt=null;if(t&&m<t[0]){nt=t}else{for(var i=1;i<8;i++){nd=(d+i)%7;if(H[nd]){nt=H[nd];break}}}
    var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    msg='Closed now · opens '+(nd===d?'today':(nd===(d+1)%7?'tomorrow':names[nd]))+' at '+fmt(nt[0])}
  var pill=document.querySelector('[data-open-pill]'),line=document.querySelector('[data-open-line]');
  if(pill){pill.textContent=msg;if(!open)pill.classList.add('closed')}
  if(line){line.textContent=msg;if(!open)line.classList.add('closed')}
  var row=document.querySelector('.hours tr[data-day="'+d+'"]');if(row)row.classList.add('today');
})();
