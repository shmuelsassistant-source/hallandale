(function(){
var nav=document.getElementById('nav');
function onS(){nav.classList.toggle('solid',scrollY>30)}onS();addEventListener('scroll',onS,{passive:true});
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
var px=document.querySelector('[data-parallax] img');
if(px&&!matchMedia('(prefers-reduced-motion: reduce)').matches){addEventListener('scroll',function(){var y=scrollY;if(y<innerHeight*1.2)px.style.transform='translateY('+(-y*0.08)+'px)'},{passive:true})}
document.querySelectorAll('[data-count]').forEach(function(el){var t=parseFloat(el.dataset.count),d=+(el.dataset.dec||0),go=false;function run(){if(go)return;go=true;var s=null;function st(ts){if(!s)s=ts;var p=Math.min((ts-s)/1300,1);el.textContent=(t*(1-Math.pow(1-p,3))).toFixed(d);if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st)}if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run()});
/*tabs*/[].slice.call([]).forEach(function(b){b.addEventListener('click',function(){/*tabs*/[].slice.call([]).forEach(function(x){x.setAttribute('aria-selected',x===b)});document.querySelectorAll('.panel').forEach(function(p){p.classList.toggle('on',p.id===b.dataset.tab);if(p.id===b.dataset.tab)p.querySelectorAll('.reveal').forEach(function(r){r.classList.add('in')})})})});
// live hours, America/New_York
var H=window.HOURS||{0:[8,22],1:[8,22],2:[8,22],3:[8,22],4:[8,22],5:[8,22],6:[8,22]};
try{var f=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());var wd={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[f.find(function(p){return p.type==='weekday'}).value];var h=+f.find(function(p){return p.type==='hour'}).value%24,m=+f.find(function(p){return p.type==='minute'}).value;var now=h+m/60;
var row=document.querySelector('.hours tr[data-day="'+wd+'"]');if(row)row.classList.add('today');
var dot=document.getElementById('openDot'),tx=document.getElementById('openText'),r=H[wd];
function fmt(x){var hh=Math.floor(x),mm=Math.round((x-hh)*60),ap=hh>=12?'PM':'AM',h12=hh%12||12;return h12+(mm?':'+String(mm).padStart(2,'0'):'')+' '+ap}
if(dot&&tx&&r){if(now>=r[0]&&now<r[1]){dot.className='dot open';tx.textContent='Open now · until '+fmt(r[1])}else{dot.className='dot closed';var nd=now<r[0]?wd:(wd+1)%7,n=H[nd];tx.textContent='Closed now · opens '+(nd===wd?'':'tomorrow ')+fmt(n[0])}}}catch(e){}
})();
(function(){
var t=document.getElementById('tape');if(t){var h='';for(var k=0;k<2;k++)for(var i=1;i<=60;i++)h+='<div class="in"><b>'+i+'</b></div>';t.innerHTML=h}
var tp=document.getElementById('tp');addEventListener('scroll',function(){var m=document.documentElement.scrollHeight-innerHeight;tp.style.width=(m>0?scrollY/m*100:0)+'%'},{passive:true});
var s=document.getElementById('slider');document.querySelectorAll('.slide-nav button').forEach(function(b){b.addEventListener('click',function(){s.scrollBy({left:(+b.dataset.dir)*Math.min(540,s.clientWidth*.85),behavior:'smooth'})})});
})();