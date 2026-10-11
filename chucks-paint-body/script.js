
(function(){
  var nav=document.querySelector('.nav');
  var onScroll=function(){nav.classList.toggle('scrolled',window.scrollY>40);};
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  // reveals
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  var h1=document.querySelector('.hero h1'); if(h1){setTimeout(function(){h1.classList.add('in');},120);}

  // parallax (hero + band), skipped under reduced motion
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var px=[].slice.call(document.querySelectorAll('[data-parallax]'));
  if(!rm&&px.length){
    var tick=false;
    var move=function(){
      px.forEach(function(el){
        var r=el.getBoundingClientRect(); var vh=window.innerHeight;
        if(r.bottom<0||r.top>vh) return;
        var p=(r.top+r.height/2-vh/2)/vh; // -1..1
        var img=el.tagName==='IMG'?el:el.querySelector('img');
        var y=el.tagName==='IMG'?p*-60:p*-40;
        if(img) img.style.transform='translate3d(0,'+y.toFixed(1)+'px,0)'+(el.classList.contains('hero-media')?' scale(1.06)':'');
      }); tick=false;
    };
    window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(move);}},{passive:true});
    // hero img has a keyframe animation; let it finish before parallax takes transform over
    var hi=document.querySelector('.hero-media img'); if(hi){hi.addEventListener('animationend',function(){hi.style.animation='none';move();});}
  }

  // before/after
  var range=document.getElementById('compareRange'), bw=document.getElementById('compareBefore'), hd=document.getElementById('compareHandle'), cmp=document.getElementById('compare');
  if(range){
    var set=function(v){bw.style.width=v+'%';hd.style.left=v+'%';};
    range.addEventListener('input',function(){set(range.value);});
    // keep the "before" image the same size as the container so it does not squish
    var size=function(){var img=bw.querySelector('img');img.style.width=cmp.clientWidth+'px';};
    size(); window.addEventListener('resize',size);
    set(50);
    // idle nudge once, so people notice it moves
    setTimeout(function(){if(range.value==='50'){var t=0,id=setInterval(function(){t++;var v=50+Math.sin(t/8)*10;range.value=v;set(v);if(t>50){clearInterval(id);range.value=50;set(50);}},16);}},1800);
  }

  // live hours (America/New_York): Mon-Sat 9-5, Sun closed
  var now=new Date();
  var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(now);
  var map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}; var day=0,hour=0,min=0;
  parts.forEach(function(p){if(p.type==='weekday')day=map[p.value];if(p.type==='hour')hour=+p.value%24;if(p.type==='minute')min=+p.value;});
  var row=document.querySelector('.hours tr[data-day="'+day+'"]'); if(row)row.classList.add('today');
  var el=document.getElementById('openNow');
  if(el){
    var t=hour+min/60; var openDay=day!==0;
    if(openDay&&t>=9&&t<17){el.textContent='Open now · closes 5 PM';el.className='open-now yes';}
    else if(openDay&&t<9){el.textContent='Opens today at 9 AM';el.className='open-now';}
    else{var next=day===6?'Monday':(day===0?'tomorrow':'tomorrow');el.textContent='Closed now · opens '+next+' at 9 AM';el.className='open-now no';}
  }
})();
