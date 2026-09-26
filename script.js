setTimeout(() => {
  const splash = document.getElementById("creatorSplash");
  if (splash) splash.remove();
}, 5000);

const params = new URLSearchParams(location.search);

const name = params.get("name") || "Dear Friend";
const intro = params.get("intro") || "Today is all about celebrating you.";
const message = params.get("message") ||
  "May your day be filled with laughter, wonderful memories, and lots of happiness. Keep smiling and keep shining! ❤️";
const note = params.get("note") ||
  "You deserve all the good things life has to offer. Have an amazing year ahead!";

document.getElementById("name").textContent = name;
document.getElementById("intro").textContent = intro;
document.getElementById("message").textContent = message;
document.getElementById("note").textContent = note;

const openBtn = document.getElementById("openBtn");
const surprise = document.getElementById("surprise");
const music = document.getElementById("music");

openBtn.addEventListener("click", () => {
  document.getElementById("hero").style.display = "none";
  surprise.classList.remove("hidden");
  music.play().catch(() => {});
  celebrate();
});

document.getElementById("celebrateBtn").addEventListener("click", celebrate);

function celebrate(){
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth; canvas.height = innerHeight;
  const pieces = Array.from({length: 180}, () => ({
    x: innerWidth/2, y: innerHeight*.35,
    vx:(Math.random()-.5)*12, vy:Math.random()*-11-3,
    g:.25+Math.random()*.2, size:4+Math.random()*6,
    life:120+Math.random()*80
  }));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.life--;
      ctx.fillStyle=`hsl(${(frame*4+p.x)%360},90%,65%)`;
      ctx.fillRect(p.x,p.y,p.size,p.size);
    });
    frame++;
    if(pieces.some(p=>p.life>0)) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

function makeHeart(){
  const h=document.createElement("div");
  h.className="heart"; h.textContent=["❤","💖","💕","✨"][Math.floor(Math.random()*4)];
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=(12+Math.random()*24)+"px";
  h.style.animationDuration=(5+Math.random()*6)+"s";
  document.getElementById("hearts").appendChild(h);
  setTimeout(()=>h.remove(),12000);
}
setInterval(makeHeart,450);

const birthdayParam = params.get("date");
const target = birthdayParam ? new Date(birthdayParam) : new Date(Date.now()+24*60*60*1000);

function updateCountdown(){
  const diff=Math.max(0,target-Date.now());
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60;
  const s=Math.floor(diff/1000)%60;
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);
