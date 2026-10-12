(function(){
var nav=document.getElementById('nav');
function onScroll(){nav.classList.toggle('scrolled',window.scrollY>20)}
onScroll();window.addEventListener('scroll',onScroll,{passive:true});
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);count(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'}):null;
document.querySelectorAll('.reveal,.card').forEach(function(el){io?io.observe(el):el.classList.add('in')});
function count(root){(root.matches('[data-count]')?[root]:[]).concat([].slice.call(root.querySelectorAll('[data-count]'))).forEach(function(el){
 if(el.dataset.done)return;el.dataset.done=1;var t=parseFloat(el.dataset.count),d=+(el.dataset.decimals||0),s=performance.now(),D=1300;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){return}
 (function f(n){var p=Math.min(1,(n-s)/D),v=t*(1-Math.pow(1-p,3));el.textContent=v.toFixed(d);if(p<1)requestAnimationFrame(f)})(s)})}
/* open now, in shop time (America/New_York) */
var H={0:null,1:[8,17],2:[8,17],3:[8,17],4:[8,17],5:[8,17],6:[10,15]};
var N=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function fmt(h){var s=h>=12?'PM':'AM',x=h%12||12;return x+' '+s}
try{
 var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
 var g={};parts.forEach(function(p){g[p.type]=p.value});
 var day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g.weekday),hr=(parseInt(g.hour,10)%24)+parseInt(g.minute,10)/60;
 var today=H[day],open=today&&hr>=today[0]&&hr<today[1],msg;
 if(open){msg='Open now · until '+fmt(today[1])}
 else{var k=day,n=0,label;if(today&&hr<today[0]){msg='Closed · opens '+fmt(today[0])+' today'}else{do{k=(k+1)%7;n++}while(!H[k]&&n<8);msg='Closed · opens '+fmt(H[k][0])+' '+(n===1?'tomorrow':N[k])}}
 var st=document.getElementById('status');if(st){st.classList.toggle('open',!!open);st.querySelector('b').textContent=msg}
 var vs=document.getElementById('vstatus');if(vs){vs.textContent=msg;vs.classList.toggle('open',!!open)}
 var row=document.querySelector('.hours tr[data-d="'+day+'"]');if(row)row.classList.add('today');
}catch(e){}
})();
