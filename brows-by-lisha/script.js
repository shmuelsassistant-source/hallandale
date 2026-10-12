(function(){
var H=[[660,960],[600,1080],[600,1080],[600,1080],[600,1080],[600,1080],[600,1080]];var DN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var nav=document.getElementById('nav');var onS=function(){nav&&nav.classList.toggle('solid',window.scrollY>40)};onS();window.addEventListener('scroll',onS,{passive:true});
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('in')})}
var path=document.getElementById('threadPath');
if(path&&path.getTotalLength&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var L=path.getTotalLength();path.style.strokeDasharray=L;path.style.strokeDashoffset=L;var upd=function(){var h=document.documentElement.scrollHeight-innerHeight;var p=h>0?Math.min(1,scrollY/h):0;path.style.strokeDashoffset=L*(1-p)};upd();addEventListener('scroll',upd,{passive:true})}
function fmt(m){var h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(mm?':'+(mm<10?'0':'')+mm:'')+' '+ap}
function ny(){var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());var o={};p.forEach(function(x){o[x.type]=x.value});var d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday);return{d:d,m:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)}}
try{var n=ny(),t=H[n.d],msg,open=false;
if(t&&n.m>=t[0]&&n.m<t[1]){open=true;msg='Open now · until '+fmt(t[1])}
else{var k=0,d=n.d;if(t&&n.m<t[0]){msg='Closed now · opens '+fmt(t[0])+' today'}else{for(k=1;k<8;k++){d=(n.d+k)%7;if(H[d])break}msg='Closed now · opens '+(k===1?'tomorrow':DN[d])+' '+fmt(H[d][0])}}
document.querySelectorAll('[data-open]').forEach(function(el){el.textContent=msg;el.classList.toggle('is-open',open)});
document.querySelectorAll('.open-line .dot').forEach(function(el){el.classList.toggle('on',open)});
document.querySelectorAll('[data-day]').forEach(function(el){if(+el.getAttribute('data-day')===n.d)el.classList.add('today')});}catch(e){}
})();
