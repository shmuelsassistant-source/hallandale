window.HOURS=[[600,1020],[480,1200],[480,1200],[480,1200],[480,1200],[480,1200],[480,1200]];

(function(){
  var d=document;
  var io='IntersectionObserver' in window ? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'}) : null;
  d.querySelectorAll('.reveal').forEach(function(el){ io?io.observe(el):el.classList.add('in'); });
  var nav=d.getElementById('nav');
  function onS(){ if(nav) nav.classList.toggle('scrolled', window.scrollY>40); var p=d.getElementById('prog'); if(p){var h=d.documentElement.scrollHeight-innerHeight; p.style.setProperty('--p',(h>0?scrollY/h:0).toFixed(4));} }
  window.addEventListener('scroll',onS,{passive:true}); onS();
  var H=window.HOURS;
  function nyNow(){ return new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'})); }
  function fmt(m){ var h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM'; h=h%12||12; return h+(mm?':'+String(mm).padStart(2,'0'):'')+' '+ap; }
  var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function status(){
    var n=nyNow(), day=n.getDay(), m=n.getHours()*60+n.getMinutes(), t=H[day];
    if(t && t[0]===0 && t[1]===1440) return {open:true,short:'Open now · 24 hours today',long:'Open now — open 24 hours today'};
    if(t && m>=t[0] && m<t[1]) return {open:true,short:'Open now · until '+fmt(t[1]),long:'Open now — closes '+fmt(t[1])};
    if(t && m<t[0]) return {open:false,short:'Closed · opens '+fmt(t[0]),long:'Closed now — opens today at '+fmt(t[0])};
    for(var i=1;i<8;i++){ var dd=(day+i)%7; if(H[dd]){ var o=H[dd][0]===0?'12 AM':fmt(H[dd][0]); return {open:false,short:'Closed · opens '+(i===1?'tomorrow':names[dd].slice(0,3))+' '+o,long:'Closed now — opens '+(i===1?'tomorrow':names[dd])+' at '+o}; } }
    return {open:false,short:'Closed',long:'Closed'};
  }
  if(H){ var st=status();
    d.querySelectorAll('[data-open]').forEach(function(el){ el.textContent=st.short; el.classList.toggle('is-open',st.open); el.classList.toggle('is-closed',!st.open); });
    d.querySelectorAll('[data-open-long]').forEach(function(el){ el.textContent=st.long; el.classList.toggle('is-open',st.open); el.classList.toggle('is-closed',!st.open); });
    var today=nyNow().getDay(); d.querySelectorAll('[data-day]').forEach(function(el){ if(+el.getAttribute('data-day')===today) el.classList.add('today'); });
  }
})();

(function(){
  var el=document.getElementById('seg'); if(!el||window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var L=[['CHECKING ▸ SUB-ZERO SEAL','SUB-ZERO SEAL ▸ OK'],['CHECKING ▸ ICE MAKER','ICE MAKER ▸ OK'],['CHECKING ▸ DRYER','DRYER ▸ OK'],['CHECKING ▸ DISHWASHER','DISHWASHER ▸ OK']], i=0;
  function type(t,cls,cb){ el.className='seg'+(cls?' '+cls:''); var n=0; (function s(){ el.textContent=t.slice(0,++n)+(n<t.length?'_':''); if(n<t.length) setTimeout(s,38); else cb&&cb(); })(); }
  function run(){ var p=L[i%L.length]; type(p[0],'warn',function(){ setTimeout(function(){ type(p[1],'',function(){ i++; setTimeout(run,2600); }); },1100); }); }
  setTimeout(run,1400);
})();
