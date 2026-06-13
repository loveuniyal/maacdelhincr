/* =================================================================
   MAAC Delhi NCR — blogs.js
   Lightweight JS for blog hubs, category pages, and articles.
   Handles nav scroll, mobile drawer, smooth scroll & reveal anims.
   ================================================================= */

const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

function initNav(){
  const nav = $("#nav"), burger=$("#burger"), drawer=$("#drawer");
  if(!nav || !burger || !drawer) return;
  
  const onScroll = ()=> nav.classList.toggle("scrolled", window.scrollY>30);
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});
  
  burger.addEventListener("click",()=>{
    const open = drawer.classList.toggle("open");
    burger.classList.toggle("open", open);
    document.body.style.overflow = open? "hidden":"";
  });
}

function closeDrawer(){
  $("#drawer")?.classList.remove("open");
  $("#burger")?.classList.remove("open");
  document.body.style.overflow="";
}

function initScroll(){
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lenis;
  if(!reduce && window.Lenis){
    lenis = new Lenis({ lerp:0.1, wheelMultiplier:1, smoothWheel:true });
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if(window.ScrollTrigger){ lenis.on("scroll", ScrollTrigger.update); }
  }
  window.__lenis = lenis;

  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",e=>{
      const id = a.getAttribute("href");
      if(id.length>1){
        const t = $(id);
        if(t){ e.preventDefault(); closeDrawer();
          if(lenis) lenis.scrollTo(t, { offset:-70, duration:1.1 });
          else t.scrollIntoView({block:"start"});
        }
      }
    });
  });
}

function initReveal(){
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){ $$(".reveal,[data-stagger]").forEach(n=>n.classList.add("in")); return; }
  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    $$(".reveal").forEach(n=>{
      ScrollTrigger.create({ trigger:n, start:"top 88%", once:true, onEnter:()=>n.classList.add("in") });
    });
    $$("[data-stagger]").forEach(group=>{
      const kids = [...group.children];
      ScrollTrigger.create({ trigger:group, start:"top 84%", once:true, onEnter:()=>{
        group.classList.add("in");
        kids.forEach((k,i)=> k.style.transitionDelay = (i*0.07)+"s");
      }});
    });
  } else {
    const io = new IntersectionObserver((ents)=>ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:0.15});
    $$(".reveal,[data-stagger]").forEach(n=>io.observe(n));
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  const yearEl = $("#year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  initNav();
  initScroll();
  initReveal();
});
