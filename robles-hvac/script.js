window.HOURS='all';
(function(){
  var d=document;
  // reveal
  var io='IntersectionObserver' in window ? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'}) : null;
  d.querySelectorAll('.reveal').forEach(function(el){ io?io.observe(el):el.classList.add('in'); });
  // nav
  var nav=d.getElementById('nav');
  function onS(){ if(nav) nav.classList.toggle('scrolled', window.scrollY>40); }
  window.addEventListener('scroll',onS,{passive:true}); onS();
  // open now (America/New_York); HOURS: [sun..sat] arrays of [openMin, closeMin] or null; 'all' = 24h
  var H=window.HOURS;
  function nyNow(){ var s=new Date().toLocaleString('en-US',{timeZone:'America/New_York'}); return new Date(s); }
  function fmt(m){ var h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM'; h=h%12||12; return h+(mm?':'+String(mm).padStart(2,'0'):'')+' '+ap; }
  var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function status(){
    if(H==='all') return {open:true,short:'Open now · 24 hours',long:'Open now — 24 hours, 7 days'};
    var n=nyNow(), day=n.getDay(), m=n.getHours()*60+n.getMinutes(), t=H[day];
    if(t && m>=t[0] && m<t[1]) return {open:true,short:'Open now · until '+fmt(t[1]),long:'Open now — closes '+fmt(t[1])};
    if(t && m<t[0]) return {open:false,short:'Closed · opens '+fmt(t[0]),long:'Closed now — opens today at '+fmt(t[0])};
    for(var i=1;i<8;i++){ var dd=(day+i)%7; if(H[dd]) return {open:false,short:'Closed · opens '+(i===1?'tomorrow':names[dd].slice(0,3))+' '+fmt(H[dd][0]),long:'Closed now — opens '+(i===1?'tomorrow':names[dd])+' at '+fmt(H[dd][0])}; }
    return {open:false,short:'Closed',long:'Closed'};
  }
  if(H){ var st=status();
    d.querySelectorAll('[data-open]').forEach(function(el){ el.textContent=st.short; el.classList.toggle('is-open',st.open); el.classList.toggle('is-closed',!st.open); });
    d.querySelectorAll('[data-open-long]').forEach(function(el){ el.textContent=st.long; el.classList.toggle('is-open',st.open); });
    if(H!=='all'){ var today=nyNow().getDay(); d.querySelectorAll('[data-day]').forEach(function(el){ if(+el.getAttribute('data-day')===today) el.classList.add('today'); }); }
  }
  // before/after
  var ba=d.getElementById('ba'), r=d.getElementById('baRange');
  if(ba&&r){ var set=function(){ ba.style.setProperty('--pos', r.value+'%'); }; r.addEventListener('input',set); set(); }
  // year
  d.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear();});
})();

(function(){
  var g=document.querySelector('.dial .ticks'); if(!g) return;
  var ns='http://www.w3.org/2000/svg', s='';
  for(var i=0;i<60;i++){ var a=(i/60)*Math.PI*2-Math.PI/2, r1=i%5?86:82, r2=92; s+='<line x1="'+(120+r1*Math.cos(a)).toFixed(1)+'" y1="'+(120+r1*Math.sin(a)).toFixed(1)+'" x2="'+(120+r2*Math.cos(a)).toFixed(1)+'" y2="'+(120+r2*Math.sin(a)).toFixed(1)+'"/>'; }
  g.innerHTML=s;
  var t=document.getElementById('temp'), m=document.getElementById('mode'), ring=document.querySelector('.dial .ring');
  var from=91,to=72,cur=from;
  function step(){ if(cur>to){ cur--; t.textContent=cur; ring.style.strokeDashoffset=(100-((cur-60)/40)*100).toFixed(1); setTimeout(step, 120+ (from-cur)*12); } else { m.textContent='COMFORT'; m.classList.add('ok'); } }
  ring.style.strokeDashoffset=(100-((from-60)/40)*100).toFixed(1);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ t.textContent=to; m.textContent='COMFORT'; ring.style.strokeDashoffset=(100-((to-60)/40)*100); return; }
  setTimeout(step,900);
})();
