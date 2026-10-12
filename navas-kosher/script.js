(function(){
  var nav=document.getElementById('nav');
  function onScroll(){nav.classList.toggle('scrolled',window.scrollY>30)}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null;
  document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in')});

  // gentle float on the round plate
  var fl=document.querySelector('[data-float]');
  if(fl&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    window.addEventListener('scroll',function(){var y=Math.min(window.scrollY,800);fl.style.transform='translateY('+(-y*0.08)+'px) rotate('+(y*0.01)+'deg)'},{passive:true});
  }

  // hours in America/New_York: [open,close] in minutes; 0=Sun
  var H={0:null,1:[660,1020],2:[660,1020],3:[660,1020],4:[660,1020],5:[600,960],6:null};
  var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function fmt(m){var h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(mm?':'+(mm<10?'0':'')+mm:'')+' '+ap}
  var now;
  try{var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var o={};p.forEach(function(x){o[x.type]=x.value});
    var wd=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday);now={d:wd,m:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)};
  }catch(e){var d=new Date();now={d:d.getDay(),m:d.getHours()*60+d.getMinutes()}}
  var t=H[now.d],open=!!(t&&now.m>=t[0]&&now.m<t[1]),msg;
  if(open){msg='Open now · until '+fmt(t[1])}
  else{
    if(t&&now.m<t[0]){msg='Closed · opens today '+fmt(t[0])}
    else{for(var i=1;i<=7;i++){var dd=(now.d+i)%7;if(H[dd]){msg='Closed · opens '+(i===1?'tomorrow':names[dd])+' '+fmt(H[dd][0]);break}}}
  }
  var line=document.querySelector('[data-open-line]'),dot=document.querySelector('[data-open-dot]'),pill=document.querySelector('[data-open-pill]');
  if(line)line.textContent=msg;
  if(dot&&open)dot.classList.add('open');
  if(pill){pill.textContent=open?'Open now':'Closed now';pill.classList.add(open?'open':'closed')}
  var row=document.querySelector('.hours tr[data-row="'+now.d+'"]');if(row)row.classList.add('now');
  document.querySelectorAll('.day').forEach(function(el){if(el.getAttribute('data-day').split(',').indexOf(String(now.d))>-1)el.classList.add('today')});
})();
