
(()=>{
const H=[null, [600, 1140], [600, 1140], [600, 1140], [600, 1140], [600, 1140], [600, 1140]]; const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function nowET(){const s=new Date().toLocaleString('en-US',{timeZone:'America/New_York'});return new Date(s);}
function fmt(m){let h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(mm?':'+String(mm).padStart(2,'0'):'')+' '+ap;}
function status(){const d=nowET(),day=d.getDay(),m=d.getHours()*60+d.getMinutes(),t=H[day];
 if(t&&m>=t[0]&&m<t[1])return{open:true,text:'Open now · until '+fmt(t[1])};
 if(t&&m<t[0])return{open:false,text:'Closed · opens '+fmt(t[0])+' today'};
 for(let i=1;i<8;i++){const n=(day+i)%7;if(H[n])return{open:false,text:'Closed · opens '+fmt(H[n][0])+' '+(i===1?'tomorrow':days[n])};}
 return{open:false,text:'Closed'};}
const st=status();
document.querySelectorAll('[data-open]').forEach(el=>{el.textContent=st.text;el.classList.toggle('is-open',st.open);});
const today=nowET().getDay();
document.querySelectorAll('[data-day]').forEach(el=>{if(+el.dataset.day===today)el.classList.add('today');});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const hdr=document.querySelector('header');addEventListener('scroll',()=>hdr&&hdr.classList.toggle('scrolled',scrollY>40),{passive:true});
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
})();
