// Custom cursor
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mx=0,my=0,fx=0,fy=0;
document.addEventListener("mousemove",e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx-5+"px"; cursor.style.top=my-5+"px";
});
function animFollower(){
  fx+=(mx-fx)*0.12; fy+=(my-fy)*0.12;
  follower.style.left=fx-18+"px"; follower.style.top=fy-18+"px";
  requestAnimationFrame(animFollower);
}
animFollower();
document.querySelectorAll("a,button,.skill-card,.project-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>{cursor.style.transform="scale(2)";follower.style.transform="scale(1.5)";});
  el.addEventListener("mouseleave",()=>{cursor.style.transform="scale(1)";follower.style.transform="scale(1)";});
});

// Scroll progress bar
const scrollBar = document.getElementById("scrollProgress");
window.addEventListener("scroll",()=>{
  const pct = window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
  scrollBar.style.width=pct+"%";
});

// Navbar shrink on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled", window.scrollY>60);
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a, .nav-mobile a");
window.addEventListener("scroll",()=>{
  let cur="";
  sections.forEach(s=>{
    if(window.scrollY>=s.offsetTop-120) cur=s.getAttribute("id");
  });
  navAnchors.forEach(a=>{
    a.classList.toggle("active", a.getAttribute("href")==="#"+cur);
  });
});

// Fade-in + skill bar animation on scroll
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("visible");
      const bar = e.target.querySelector(".skill-bar");
      if(bar){
        const pct = e.target.getAttribute("data-pct");
        bar.style.width=pct+"%";
      }
    }
  });
},{threshold:0.1});
document.querySelectorAll(".fade-in").forEach(el=>observer.observe(el));

// Trigger hero section immediately
setTimeout(()=>{
  document.querySelectorAll("#home .fade-in").forEach(el=>el.classList.add("visible"));
},100);

// Mobile hamburger menu
function toggleMenu(){
  document.getElementById("navMobile").classList.toggle("open");
}
function closeMenu(){
  document.getElementById("navMobile").classList.remove("open");
}

// Contact form submit
function handleSubmit(e){
  e.preventDefault();
  const btn = e.target.querySelector("button");
  btn.textContent="Message Sent! ✓";
  btn.style.background="#2d7a4f";
  setTimeout(()=>{
    btn.innerHTML="Send Message &nbsp;<i class=\'fas fa-paper-plane\'></i>";
    btn.style.background="";
  },3000);
}