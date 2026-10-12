(function(){
var H={0:null,1:[9,17],2:[9,17],3:[9,17],4:[9,17],5:[9,17],6:[10,13]};
function ny(){var s=new Date().toLocaleString("en-US",{timeZone:"America/New_York"});return new Date(s);}
var n=ny(),d=n.getDay(),h=n.getHours()+n.getMinutes()/60,t=H[d],open=!!(t&&h>=t[0]&&h<t[1]);
var dot=document.getElementById("hdot"),hs=document.getElementById("hstatus"),ts=document.getElementById("tstatus");
function fmt(x){var p=x>=12?"PM":"AM",k=x%12||12;return k+" "+p;}
var msg;
if(open){msg="Open now · until "+fmt(t[1]);}
else{var nd=d,i=0,nx;do{if(i>0||!(t&&h<t[0])){nd=(nd+1)%7;}nx=H[nd];i++;}while(!nx&&i<8);
 var lab=(nd===d)?"today":(nd===(d+1)%7?"tomorrow":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][nd]);
 msg="Closed · opens "+lab+" "+fmt(nx[0]);}
if(dot)dot.className="dot "+(open?"open":"closed");
if(hs)hs.textContent=msg+" · North Miami Beach";
if(ts){ts.textContent=open?"Open now":"Closed now";ts.className="mono "+(open?"open":"closed");}
var r=document.querySelector('#hours tr[data-d="'+d+'"]');if(r)r.classList.add("today");
var els=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12,rootMargin:"0px 0px -40px 0px"});els.forEach(function(e){io.observe(e);});}
else els.forEach(function(e){e.classList.add("in");});
})();