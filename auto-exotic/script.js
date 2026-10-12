(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('solid',window.scrollY>30)};onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('[data-count]').forEach(function(el){var t=parseFloat(el.dataset.count),d=parseInt(el.dataset.decimals||'0',10),s=false;var run=function(){if(s)return;s=true;var t0=null;var st=function(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1300,1);el.textContent=(t*(1-Math.pow(1-p,3))).toFixed(d);if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)};if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){run();o.disconnect()}}).observe(el)}else run()});
  // tabs
  var tabs=[].slice.call(document.querySelectorAll('[role=tab]'));
  tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(k){var n=tabs[(i+k+tabs.length)%tabs.length];n.focus();sel(n)}})});
  function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on})}
  // open now (America/New_York)
  var H={0:null,1:[8,18],2:[8,18],3:[8,18],4:[8,18],5:[8,18],6:null};
  try{
    var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var g=function(k){return (parts.find(function(p){return p.type===k})||{}).value};
    var day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday'));var h=parseInt(g('hour'),10)%24+parseInt(g('minute'),10)/60;
    var row=document.querySelector('.hours tr[data-day="'+day+'"]');if(row)row.classList.add('today');
    var st=document.getElementById('status'),tx=st.querySelector('.status-text'),r=H[day];
    var fmt=function(x){return (x>12?x-12:x)+(x>=12?' PM':' AM')};
    if(r&&h>=r[0]&&h<r[1]){st.classList.add('open');tx.textContent='Open now · until '+fmt(r[1])}
    else{var nd=day,nh=null;for(var i=0;i<8;i++){var dd=(day+i)%7,rr=H[dd];if(rr&&(i>0||h<rr[0])){nd=dd;nh=rr[0];break}}tx.textContent='Closed now · opens '+(nd===day?'today':nd===(day+1)%7?'tomorrow':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][nd])+' '+fmt(nh)}
  }catch(e){}
})();
