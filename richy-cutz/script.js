(function(){
var nav=document.getElementById('nav');
function onS(){if(nav)nav.classList.toggle('solid',scrollY>30)}onS();addEventListener('scroll',onS,{passive:true});
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
var px=document.querySelector('[data-parallax]');
if(px&&!matchMedia('(prefers-reduced-motion: reduce)').matches){addEventListener('scroll',function(){var y=scrollY;if(y<innerHeight*1.2)px.style.transform='translateY('+(y*0.15)+'px) scale(1.05)'},{passive:true})}
document.querySelectorAll('[data-count]').forEach(function(el){var t=parseFloat(el.dataset.count),d=+(el.dataset.dec||0),go=false;function run(){if(go)return;go=true;var s=null;function st(ts){if(!s)s=ts;var p=Math.min((ts-s)/1300,1);el.textContent=(t*(1-Math.pow(1-p,3))).toFixed(d);if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st)}if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run()});
var H=window.HOURS||{};
try{var f=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());var wd={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[f.find(function(p){return p.type==='weekday'}).value];var h=+f.find(function(p){return p.type==='hour'}).value%24,m=+f.find(function(p){return p.type==='minute'}).value;var now=h+m/60;
document.querySelectorAll('[data-day="'+wd+'"]').forEach(function(r){r.classList.add('today')});
function fmt(x){var hh=Math.floor(x),mm=Math.round((x-hh)*60),ap=hh>=12?'PM':'AM',h12=hh%12||12;return h12+(mm?':'+String(mm).padStart(2,'0'):'')+' '+ap}
function nextOpen(){for(var k=0;k<8;k++){var d=(wd+k)%7,r=H[d];if(r&&(k>0||now<r[0]))return [k,d,r]}return null}
var r=H[wd],open=r&&now>=r[0]&&now<r[1],txt;
if(open){txt='Open now · until '+fmt(r[1])}else{var n=nextOpen();var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];txt=n?('Closed now · opens '+(n[0]===0?'today ':n[0]===1?'tomorrow ':names[n[1]]+' ')+fmt(n[2][0])):'Closed now'}
document.querySelectorAll('[data-open]').forEach(function(el){el.classList.add(open?'is-open':'is-closed');var t=el.querySelector('[data-open-text]');if(t)t.textContent=txt;else el.textContent=txt});
}catch(e){}
})();
