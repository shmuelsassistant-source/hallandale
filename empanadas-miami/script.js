(function(){
var nav=document.getElementById('nav');
function onS(){nav.classList.toggle('scrolled',window.scrollY>30)}
onS();addEventListener('scroll',onS,{passive:true});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
// tabs
var tabs=document.querySelectorAll('.tabs button');
tabs.forEach(function(b){b.addEventListener('click',function(){
  tabs.forEach(function(x){x.setAttribute('aria-selected',x===b)});
  document.querySelectorAll('.panel').forEach(function(p){var on=p.dataset.panel===b.dataset.tab;p.hidden=!on;if(on)p.querySelectorAll('.reveal').forEach(function(r){r.classList.add('in')})});
})});
// counters
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,t=parseFloat(el.dataset.count),d=+(el.dataset.decimals||0),s=performance.now();cio.unobserve(el);
 (function f(n){var k=Math.min(1,(n-s)/1200),v=t*(1-Math.pow(1-k,3));el.textContent=v.toFixed(d);if(k<1)requestAnimationFrame(f)})(s)})},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el)});
// open now (America/New_York)
var H={0:[8,14],1:[7,17],2:[7,17],3:[7,17],4:[7,17],5:[7,17],6:[8,14]};
var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function fmt(h){return (h%12||12)+(h<12?' AM':' PM')}
try{
 var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
 var wd={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[p.find(function(x){return x.type==='weekday'}).value];
 var hr=+p.find(function(x){return x.type==='hour'}).value%24, mn=+p.find(function(x){return x.type==='minute'}).value, now=hr+mn/60;
 var row=document.querySelector('#hours tr[data-day="'+wd+'"]'); if(row) row.classList.add('today');
 var h=H[wd], open=now>=h[0]&&now<h[1], txt;
 if(open){txt='Open now · until '+fmt(h[1])}
 else if(now<h[0]){txt='Closed · opens '+fmt(h[0])+' today'}
 else{var n=(wd+1)%7;txt='Closed · opens '+fmt(H[n][0])+' '+(n===((wd+1)%7)?'tomorrow':names[n])}
 document.querySelectorAll('[data-open-dot]').forEach(function(d){d.classList.toggle('open',open)});
 var t=document.querySelector('[data-open-text]'); if(t) t.textContent=txt;
 var l=document.querySelector('[data-open-label]'); if(l) l.textContent=open?'Open now':'Venezuelan café';
}catch(e){}
})();