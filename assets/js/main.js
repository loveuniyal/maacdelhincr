/* =================================================================
   MAAC Delhi — main.js
   Content is data-driven below so it's easy to edit.
   Libraries: GSAP + ScrollTrigger, Lenis (smooth scroll)
   ================================================================= */

/* -----------------------------------------------------------------
   0. EDIT-ME DATA
   ----------------------------------------------------------------- */
const WHATSAPP_NUMBER = "919773819545";   // country code + number, no +
const EMAIL           = "maacgzb@gmail.com";

/* image + video helpers (verified stock URLs) */
const IMG = (id, w=900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;
const VIDEO = {
  showreel: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4", // colourful ink / abstract
  studio:   "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4"  // city / tech timelapse
};

// icons (simple line glyphs)
const ICON = {
  cube:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M12 2v20M3 7l9 5 9-5"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/></svg>',
  pen:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/></svg>',
  layout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  film:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 7h5M2 12h20M2 17h5M17 7h5M17 17h5"/></svg>',
  game:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="6"/><path d="M7 12h4M9 10v4"/><circle cx="16" cy="11" r="1" fill="currentColor"/><circle cx="18.5" cy="13.5" r="1" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 22l5-3 5 3-1.5-9.5"/></svg>',
  brief: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>'
};

/* 6 detailed courses */
const COURSES = [
  {
    icon:"cube", name:"3D Animation", img:"1620712943543-bcc4688e7485",
    dur:"24 Months", level:"Career Program", soft:["Autodesk Maya","ZBrush","Substance","Arnold"],
    blurb:"Become a character & 3D animation artist for film, TV and advertising — master the full studio pipeline from modelling to final render.",
    learn:["Digital sculpting & 3D modelling","Character rigging & skinning","Body mechanics & acting for animation","Texturing, shading & lighting","Rendering & look development","Industry-standard demo-reel production"],
    careers:["3D Animator","Character Artist","Modelling Artist","Lighting Artist","Rigging Artist"],
    elig:"10+2 or any graduate. No prior art experience required."
  },
  {
    icon:"spark", name:"VFX", img:"1485846234645-a62644f84728",
    dur:"18 Months", level:"Career Program", soft:["Nuke","Houdini","Mocha","After Effects"],
    blurb:"Create the impossible. Blend live-action footage with CG to build seamless visual effects for movies, web series and commercials.",
    learn:["Rotoscopy, paint & clean-up","Matchmoving & camera tracking","Keying & multi-layer compositing","Particle, fluid & dynamics FX","Set extensions & matte painting","CG integration & grading"],
    careers:["Compositor","Roto / Paint Artist","FX Artist","Matchmove Artist","VFX Generalist"],
    elig:"10+2 or any graduate. Basic computer familiarity helps."
  },
  {
    icon:"pen", name:"Graphic Design", img:"1626785774573-4b799315345d",
    dur:"12 Months", level:"Diploma", soft:["Photoshop","Illustrator","InDesign","CorelDRAW"],
    blurb:"Design that communicates. Build a strong foundation in visual design, branding and layout across print and digital media.",
    learn:["Design principles & colour theory","Typography & visual hierarchy","Logo & brand identity systems","Print, packaging & publication design","Social media & digital graphics","Portfolio development"],
    careers:["Graphic Designer","Brand / Visual Designer","Visualizer","Layout Artist","DTP Artist"],
    elig:"10+2 or any graduate. Open to creative beginners."
  },
  {
    icon:"layout", name:"UI/UX Design", img:"1559028012-481c04fa702d",
    dur:"9 Months", level:"Diploma", soft:["Figma","Adobe XD","Photoshop","ProtoPie"],
    blurb:"Design products people love to use. Learn research, interaction design and prototyping to craft intuitive digital experiences.",
    learn:["UX research, personas & journeys","Information architecture","Wireframing & interactive prototyping","Visual & interaction design","Design systems & components","Usability testing & handoff"],
    careers:["UI Designer","UX Designer","Product Designer","Interaction Designer","UX Researcher"],
    elig:"10+2 or any graduate. Designers & career-switchers welcome."
  },
  {
    icon:"film", name:"Video Editing", img:"1574717024653-61fd2cf4d44d",
    dur:"9 Months", level:"Diploma", soft:["Premiere Pro","DaVinci Resolve","After Effects","Audition"],
    blurb:"Tell stories that hold attention. Master editing, colour, sound and motion graphics for films, ads and social content.",
    learn:["Editing theory & visual storytelling","Multi-cam & timeline editing","Colour correction & grading","Motion graphics & title design","Sound design & audio mixing","Export, formats & delivery"],
    careers:["Video Editor","Colourist","Motion Designer","Content Creator","Post-production Artist"],
    elig:"10+2 or any graduate. Perfect for content creators."
  },
  {
    icon:"game", name:"Gaming", img:"1542751371-adc38448a05e",
    dur:"18 Months", level:"Career Program", soft:["Unreal Engine","Unity","Maya","Substance"],
    blurb:"Build interactive worlds. Learn game art, environment design and real-time pipelines to create assets for modern games.",
    learn:["Game art fundamentals","3D asset & prop creation","PBR texturing workflows","Environment & level design","Real-time engines & lighting","Game-ready portfolio build"],
    careers:["Game Artist","Environment Artist","Level Designer","Prop Artist","Technical Artist"],
    elig:"10+2 or any graduate. Gamers & artists welcome."
  }
];

const PARTNERS = ["Pixel Forge","Lumen Studios","Northlight VFX","Polygon Labs","Cinegraph","Rabbithole Games","Studio Aurora","Frame51","Vermillion FX","Bytecraft","Maya Works","Indigo Pictures"];

const TESTIMONIALS = [
  { quote:"The mentors at MAAC Delhi push you like a real studio would. My showreel got me hired before I even finished the course.", name:"Aman Rao", role:"3D Artist · Pixel Forge", from:"3D Animation", img:"1500648767791-00dcc994a43e" },
  { quote:"I came in knowing nothing about Nuke. I left compositing shots for an actual ad campaign. That's the MAAC Delhi difference.", name:"Riya Sharma", role:"Compositor · Northlight VFX", from:"VFX", img:"1494790108377-be9c29b29330" },
  { quote:"The placement cell didn't just hand me a list — they prepped my portfolio and lined up the interviews.", name:"Sahil Khan", role:"Motion Designer · Frame51", from:"Video Editing", img:"1507003211169-0a1dd7228f2d" },
  { quote:"Real briefs, real deadlines, real feedback. It felt less like a class and more like my first design job.", name:"Neha Gupta", role:"UI Designer · Bytecraft", from:"UI/UX Design", img:"1438761681033-6461ffad8d80" },
  { quote:"Game art felt impossible until a mentor who actually ships titles walked me through every single step.", name:"Dev Mehta", role:"Env Artist · Rabbithole", from:"Gaming", img:"1506794778202-cad84cf45f1d" },
  { quote:"From a small town to a creative studio in NCR — MAAC Delhi gave me the skills and the confidence to get there.", name:"Pooja Verma", role:"Graphic Designer · Cinegraph", from:"Graphic Design", img:"1534528741775-53994a69daeb" }
];

const WHY = [
  { icon:"badge", title:"Industry-aligned curriculum", text:"Built with studios and refreshed every year to match exactly what's hiring." },
  { icon:"spark", title:"Mentors who ship work", text:"Every faculty member at MAAC Delhi is a working professional, not just a teacher." },
  { icon:"cube",  title:"Portfolio-first approach", text:"You graduate with a showreel engineered to land interviews." },
  { icon:"layout",title:"Modern labs & tools", text:"Workstations, render power and licensed software you'll use on the job." },
  { icon:"clock", title:"Flexible batches", text:"Weekday, weekend & fast-track options that fit around your life." },
  { icon:"check", title:"100% placement support", text:"Dedicated cell, mock interviews & direct studio referrals until you're placed." }
];

const BRANCHES = [
  {
    tag:"Flagship", name:"Ghaziabad Centre",
    address:"Plot No. 135, First Floor, Model Town East, Near Opulent Mall, New Gandhi Nagar, Nehru Nagar 3, Ghaziabad, UP – 201001",
    phone:"+91 97738 19545", phoneRaw:"919773819545", email:"maacgzb@gmail.com",
    map:"https://www.google.com/maps?q=Model%20Town%20East%20Nehru%20Nagar%20Ghaziabad&output=embed"
  },
  {
    tag:"Centre", name:"Noida Extension Centre",
    address:"4th Floor, Galaxy Diamond Plaza, FB401, C-1A, Greater Noida W Rd, Near Gaur Chowk, Sector-4, UP – 201009",
    phone:"+91 70110 98633", phoneRaw:"917011098633", email:"maacnoidaextension@gmail.com",
    map:"https://www.google.com/maps?q=Galaxy%20Diamond%20Plaza%20Gaur%20Chowk%20Greater%20Noida%20West&output=embed"
  }
];

const FAQ = [
  { q:"Do I need prior experience or an art background?", a:"Not at all. Most MAAC Delhi students start from scratch. Our foundation modules build your fundamentals before you specialise, so passion matters far more than a portfolio on day one." },
  { q:"Are the courses recognised, and do they help with placement?", a:"Yes. Every career program includes 100% placement assistance — portfolio reviews, mock interviews and direct referrals to our network of 40+ hiring studios across NCR and beyond." },
  { q:"What are the batch timings?", a:"We run weekday, weekend and fast-track batches. Tell your counsellor your schedule and we'll fit a batch around your college or job." },
  { q:"Can I pay the fees in instalments?", a:"Absolutely. Flexible EMI and instalment options are available, along with early-bird and merit scholarships for 2026 admissions." },
  { q:"Which software will I learn?", a:"Industry-standard tools — Maya, Houdini, Nuke, Unreal, the full Adobe suite, Figma and more — depending on your chosen track. You train on licensed software in our labs." },
  { q:"Can I visit the campus before enrolling?", a:"Please do. Book a free campus tour at either MAAC Delhi centre, meet the mentors, see the labs and sit in on a session before you decide." }
];

const PORTFOLIO = [
  { img:"1620712943543-bcc4688e7485", title:"Ronin", tag:"3D Animation", h:340 },
  { img:"1485846234645-a62644f84728", title:"Storm Sequence", tag:"VFX", h:240 },
  { img:"1561070791-2526d30994b5", title:"Aurora Coffee", tag:"Graphic Design", h:280 },
  { img:"1593508512255-86ab42a8e620", title:"Sunken City", tag:"Gaming", h:360 },
  { img:"1559028012-481c04fa702d", title:"Finflow App", tag:"UI/UX", h:250 },
  { img:"1574717024653-61fd2cf4d44d", title:"Neon Nights", tag:"Video Editing", h:300 },
  { img:"1633356122544-f134324a6cee", title:"The Hollow", tag:"3D Animation", h:300 },
  { img:"1626785774573-4b799315345d", title:"Issue 04", tag:"Graphic Design", h:240 }
];

const GALLERY = [
  { img:"1522202176988-66273c2fd55f", cls:"g-tall", label:"Collaboration studio" },
  { img:"1517694712202-14dd9538aa97", cls:"", label:"Animation lab" },
  { img:"1581291518633-83b4ebd1d83e", cls:"", label:"Design desk" },
  { img:"1551434678-e076c223a692", cls:"g-wide", label:"Mentor review" },
  { img:"1497366216548-37526070297c", cls:"", label:"Campus" },
  { img:"1542751371-adc38448a05e", cls:"g-tall", label:"Gaming zone" },
  { img:"1498050108023-c5249f4df085", cls:"g-wide", label:"Editing suite" },
  { img:"1547658719-da2b51169166", cls:"", label:"Workstations" }
];

/* -----------------------------------------------------------------
   1. UTILITIES + RENDER
   ----------------------------------------------------------------- */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => { const n=document.createElement(tag); if(cls)n.className=cls; if(html!=null)n.innerHTML=html; return n; };

// hero showcase cards (all 6 courses)
function renderShowcase(){
  const stack = $("#scStack"), dots = $("#scDots");
  COURSES.forEach((c,i)=>{
    const card = el("div","sc-card"+(i===0?" active":""));
    card.innerHTML = `
      <img class="sc-img" src="${IMG(c.img,1100)}" alt="${c.name} at MAAC Delhi" loading="${i<2?'eager':'lazy'}" />
      <div class="sc-card-grad"></div>
      <div class="sc-card-body">
        <span class="sc-tag">0${i+1} · ${c.level}</span>
        <h3>${c.name}</h3>
        <div class="sc-meta">
          <div><b>Duration</b>${c.dur}</div>
          <div><b>Tools</b>${c.soft.slice(0,2).join(", ")}</div>
        </div>
        <div class="sc-soft">${c.soft.map(s=>`<span>${s}</span>`).join("")}</div>
      </div>`;
    stack.appendChild(card);
    const d = el("button","sc-dot"+(i===0?" on":"")); d.setAttribute("aria-label",c.name);
    d.addEventListener("click",()=>goShowcase(i));
    dots.appendChild(d);
  });
}

// courses grid (cards with image header; click = detail modal)
function renderCourses(){
  const grid = $("#coursesGrid");
  COURSES.forEach((c,i)=>{
    const card = el("article","course");
    card.innerHTML = `
      <div class="course-media">
        <img src="${IMG(c.img,800)}" alt="${c.name} course at MAAC Delhi" loading="lazy" />
        <span class="num">0${i+1}</span>
        <div class="course-ico">${ICON[c.icon]}</div>
      </div>
      <div class="course-pad">
        <div class="course-top"><h3>${c.name}</h3><span class="lvl">${c.level}</span></div>
        <p>${c.blurb}</p>
        <div class="course-soft">${c.soft.slice(0,3).map(s=>`<span>${s}</span>`).join("")}<span class="more">+${c.soft.length-3} more</span></div>
        <div class="course-foot">
          <span class="dur">${ICON.clock}<b>${c.dur}</b></span>
          <button class="link-arrow" data-course="${i}">View details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>`;
    card.querySelector(".course-media").addEventListener("click",()=>openCourse(i));
    card.querySelector("[data-course]").addEventListener("click",(e)=>{e.stopPropagation();openCourse(i);});
    grid.appendChild(card);
  });
}

// course detail modal
function openCourse(i){
  const c = COURSES[i];
  const m = $("#courseModal"), body = $("#courseModalBody");
  body.innerHTML = `
    <div class="cm-hero">
      <img src="${IMG(c.img,1200)}" alt="${c.name} at MAAC Delhi" />
      <button class="cm-close" aria-label="Close">&times;</button>
      <div class="cm-hero-body">
        <span class="cm-tag">${c.level}</span>
        <h3>${c.name}</h3>
      </div>
    </div>
    <div class="cm-content">
      <div class="cm-stats">
        <div><span>${ICON.clock}</span><div><small>Duration</small><b>${c.dur}</b></div></div>
        <div><span>${ICON.badge}</span><div><small>Format</small><b>${c.level}</b></div></div>
        <div><span>${ICON.brief}</span><div><small>Eligibility</small><b>${c.elig}</b></div></div>
      </div>
      <p class="cm-overview">${c.blurb}</p>
      <div class="cm-cols">
        <div>
          <h4>What you'll learn</h4>
          <ul class="cm-list">${c.learn.map(l=>`<li>${ICON.check}<span>${l}</span></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Career opportunities</h4>
          <ul class="cm-list">${c.careers.map(l=>`<li>${ICON.check}<span>${l}</span></li>`).join("")}</ul>
          <h4 style="margin-top:26px;">Software covered</h4>
          <div class="cm-soft">${c.soft.map(s=>`<span>${s}</span>`).join("")}</div>
        </div>
      </div>
      <div class="cm-actions">
        <button class="btn btn--red btn--lg" data-wa="Hi MAAC Delhi! I'm interested in the ${c.name} course. Please share fees, batch dates & details.">Enquire about ${c.name}
          <svg class="btn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
        <button class="btn btn--ghost btn--lg cm-close-2">Close</button>
      </div>
    </div>`;
  body.querySelector(".cm-close").addEventListener("click",closeCourse);
  body.querySelector(".cm-close-2").addEventListener("click",closeCourse);
  m.classList.add("open"); document.body.style.overflow="hidden";
}
function closeCourse(){ $("#courseModal").classList.remove("open"); document.body.style.overflow=""; }

// partner marquee
function renderPartners(){
  const track = $("#partnerTrack");
  const make = ()=> PARTNERS.map(p=>`<div class="partner-chip"><span>${p}</span></div>`).join("");
  track.innerHTML = make()+make();
}

// testimonials — visible responsive grid with photos
function renderTestimonials(){
  const grid = $("#testiGrid");
  TESTIMONIALS.forEach(t=>{
    const n = el("article","testi");
    n.innerHTML = `
      <span class="testi-role">${t.from}</span>
      <p class="quote">${t.quote}</p>
      <div class="testi-person">
        <img class="pic" src="${IMG(t.img,160)}" alt="${t.name}, MAAC Delhi graduate" loading="lazy" />
        <div><b>${t.name}</b><small>${t.role}</small></div>
      </div>`;
    grid.appendChild(n);
  });
}

// why us
function renderWhy(){
  const grid = $("#whyGrid");
  WHY.forEach(w=>{
    const n = el("div","why");
    n.innerHTML = `<div class="why-ico">${ICON[w.icon]}</div><div><h3>${w.title}</h3><p>${w.text}</p></div>`;
    grid.appendChild(n);
  });
}

// portfolio
function renderPortfolio(){
  const grid = $("#portfolioGrid");
  PORTFOLIO.forEach(p=>{
    const n = el("div","pf-item");
    n.innerHTML = `<img src="${IMG(p.img,700)}" alt="${p.title} — ${p.tag} student work at MAAC Delhi" loading="lazy" style="height:${p.h}px;width:100%;object-fit:cover;display:block;" />
      <div class="pf-meta"><b>${p.title}</b><small>${p.tag}</small></div>`;
    grid.appendChild(n);
  });
}

// gallery
function renderGallery(){
  const grid = $("#galleryGrid");
  GALLERY.forEach(g=>{
    const n = el("figure","g-item "+g.cls);
    n.innerHTML = `<img src="${IMG(g.img,800)}" alt="${g.label} — MAAC Delhi campus" loading="lazy" /><figcaption>${g.label}</figcaption>`;
    grid.appendChild(n);
  });
}

// branches
function renderBranches(){
  const grid = $("#branchesGrid");
  BRANCHES.forEach(b=>{
    const n = el("div","branch");
    n.innerHTML = `
      <div class="branch-map">
        <span class="branch-tag">${b.tag}</span>
        <iframe loading="lazy" src="${b.map}" title="${b.name} map"></iframe>
      </div>
      <div class="branch-body">
        <h3>${b.name}</h3>
        <div class="branch-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${b.address}</span></div>
        <div class="branch-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.4-1.2a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/></svg><a href="tel:${b.phoneRaw}">${b.phone}</a></div>
        <div class="branch-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg><a href="mailto:${b.email}">${b.email}</a></div>
        <div class="branch-actions">
          <a class="btn btn--red" href="https://wa.me/${b.phoneRaw}?text=${encodeURIComponent("Hi MAAC Delhi ("+b.name+"), I'd like to know about admissions & a campus tour.")}" target="_blank" rel="noopener">Enquire now</a>
          <a class="btn btn--ghost" href="${b.map.replace("&output=embed","")}" target="_blank" rel="noopener">Get directions</a>
        </div>
      </div>`;
    grid.appendChild(n);
  });
}

// faq
function renderFaq(){
  const list = $("#faqList");
  FAQ.forEach(f=>{
    const item = el("div","faq-item");
    item.innerHTML = `
      <button class="faq-q" aria-expanded="false">${f.q}<span class="faq-sign"></span></button>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>`;
    list.appendChild(item);
    const btn = $(".faq-q", item), ans = $(".faq-a", item);
    btn.addEventListener("click",()=>{
      const open = item.classList.contains("open");
      $$(".faq-item", list).forEach(it=>{ it.classList.remove("open"); $(".faq-a",it).style.height="0px"; $(".faq-q",it).setAttribute("aria-expanded","false"); });
      if(!open){ item.classList.add("open"); ans.style.height = ans.firstElementChild.offsetHeight+"px"; btn.setAttribute("aria-expanded","true"); }
    });
  });
}

// course select in form
function renderCourseSelect(){
  const sel = $("#f-course");
  COURSES.forEach(c=> sel.appendChild(el("option", null, c.name)) );
  sel.appendChild(el("option", null, "Still deciding"));
}

/* -----------------------------------------------------------------
   2. HERO SHOWCASE ROTATOR
   ----------------------------------------------------------------- */
let scIndex = 0, scTimer = null;
function goShowcase(i){
  const cards = $$(".sc-card"), dots = $$(".sc-dot");
  if(!cards.length) return;
  scIndex = (i+cards.length)%cards.length;
  cards.forEach((c,n)=>c.classList.toggle("active", n===scIndex));
  dots.forEach((d,n)=>d.classList.toggle("on", n===scIndex));
  restartShowcase();
}
function restartShowcase(){ clearInterval(scTimer); scTimer = setInterval(()=>goShowcase(scIndex+1), 3400); }

/* -----------------------------------------------------------------
   3. VIDEO LIGHTBOX (showreel)
   ----------------------------------------------------------------- */
function initShowreel(){
  const lb = $("#showreel"), v = $("#showreelVideo");
  const open = ()=>{ lb.classList.add("open"); document.body.style.overflow="hidden"; v.play().catch(()=>{}); };
  const close = ()=>{ lb.classList.remove("open"); document.body.style.overflow=""; v.pause(); };
  $$("[data-showreel]").forEach(b=> b.addEventListener("click",e=>{ e.preventDefault(); open(); }));
  $("#showreelClose").addEventListener("click",close);
  lb.addEventListener("click",e=>{ if(e.target===lb) close(); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ close(); closeCourse(); } });
}

/* -----------------------------------------------------------------
   4. SMOOTH SCROLL + GSAP
   ----------------------------------------------------------------- */
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
    gsap.to("#showcase", { yPercent:-6, ease:"none", scrollTrigger:{ trigger:"#hero", start:"top top", end:"bottom top", scrub:true } });
  } else {
    const io = new IntersectionObserver((ents)=>ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:0.15});
    $$(".reveal,[data-stagger]").forEach(n=>io.observe(n));
  }
}

function initMarquees(){
  if(!window.gsap) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const t=$("#partnerTrack"); if(t) gsap.to(t, { xPercent:-50, duration:32, ease:"none", repeat:-1 });
}

/* -----------------------------------------------------------------
   5. COUNTERS
   ----------------------------------------------------------------- */
function initCounters(){
  const nodes = $$("[data-count]");
  const run = (n)=>{
    const target = parseFloat(n.dataset.count);
    const dec = parseInt(n.dataset.decimals||"0");
    const suffix = n.dataset.suffix||"";
    let start = null; const dur = 1600;
    const step = (t)=>{
      if(!start) start=t;
      const p = Math.min((t-start)/dur,1);
      const eased = 1-Math.pow(1-p,3);
      const val = target*eased;
      n.textContent = (dec? val.toFixed(dec) : Math.round(val).toLocaleString("en-IN")) + suffix;
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((ents)=>ents.forEach(e=>{ if(e.isIntersecting){ run(e.target); io.unobserve(e.target); } }), {threshold:0.5});
  nodes.forEach(n=>io.observe(n));
}

/* -----------------------------------------------------------------
   6. COUNTDOWN
   ----------------------------------------------------------------- */
function initCountdown(){
  const wrap = $("#countdown"); if(!wrap) return;
  const now = new Date();
  let target = new Date(now.getFullYear(), now.getMonth()+1, 1, 9, 0, 0);
  const tick = ()=>{
    let diff = Math.max(0, target - new Date());
    const d = Math.floor(diff/864e5); diff-=d*864e5;
    const h = Math.floor(diff/36e5);  diff-=h*36e5;
    const m = Math.floor(diff/6e4);   diff-=m*6e4;
    const s = Math.floor(diff/1e3);
    const set=(k,v)=>{ const e=wrap.querySelector(`[data-cd="${k}"]`); if(e) e.textContent=String(v).padStart(2,"0"); };
    set("days",d); set("hours",h); set("mins",m); set("secs",s);
  };
  tick(); setInterval(tick,1000);
}

/* -----------------------------------------------------------------
   7. NAV
   ----------------------------------------------------------------- */
function initNav(){
  const nav = $("#nav"), burger=$("#burger"), drawer=$("#drawer");
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

/* -----------------------------------------------------------------
   8. WHATSAPP
   ----------------------------------------------------------------- */
function waLink(text){ return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`; }
function initWhatsApp(){
  const f = $("#waFloat");
  if(f) f.href = waLink("Hi MAAC Delhi! I'd like to know more about your courses and 2026 admissions.");
  document.addEventListener("click",e=>{
    const t = e.target.closest("[data-wa]");
    if(t){ e.preventDefault(); window.open(waLink(t.dataset.wa), "_blank","noopener"); }
  });
}

/* -----------------------------------------------------------------
   9. LEAD FORM
   ----------------------------------------------------------------- */
function initForm(){
  const form = $("#leadForm"); if(!form) return;
  const success = $("#formSuccess");
  const setErr = (field, on)=> field.closest(".field").classList.toggle("err", on);
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const name = $("#f-name"), phone=$("#f-phone"), email=$("#f-email"), course=$("#f-course"), msg=$("#f-msg");
    let ok = true;
    if(!name.value.trim()){ setErr(name,true); ok=false; } else setErr(name,false);
    const digits = phone.value.replace(/\D/g,"");
    if(digits.length<10){ setErr(phone,true); ok=false; } else setErr(phone,false);
    if(email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ setErr(email,true); ok=false; } else setErr(email,false);
    if(!course.value){ setErr(course,true); ok=false; } else setErr(course,false);
    if(!ok){ form.querySelector(".field.err input,.field.err select")?.focus(); return; }
    const text =
`New enquiry — MAAC Delhi
Name: ${name.value.trim()}
Phone: ${digits}
Email: ${email.value.trim()||"—"}
Course: ${course.value}
Message: ${msg.value.trim()||"—"}`;
    window.open(waLink(text), "_blank", "noopener");
    form.dataset.mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Course enquiry — "+name.value.trim())}&body=${encodeURIComponent(text)}`;
    form.style.display="none";
    success.classList.add("show");
    if(window.gsap) gsap.from(success, {opacity:0, y:20, duration:.6, ease:"power2.out"});
  });
}

/* -----------------------------------------------------------------
   10. MAGNETIC BUTTONS
   ----------------------------------------------------------------- */
function initMagnetic(){
  if(window.matchMedia("(pointer: coarse)").matches) return;
  $$(".btn--red").forEach(b=>{
    b.addEventListener("mousemove",e=>{
      const r=b.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
      b.style.transform=`translate(${x*0.16}px, ${y*0.26}px)`;
    });
    b.addEventListener("mouseleave",()=> b.style.transform="");
  });
}

/* -----------------------------------------------------------------
   INIT
   ----------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded",()=>{
  $("#year").textContent = new Date().getFullYear();
  renderShowcase(); renderCourses(); renderPartners(); renderTestimonials();
  renderWhy(); renderPortfolio(); renderGallery(); renderBranches(); renderFaq(); renderCourseSelect();
  initNav(); initScroll(); initReveal(); initMarquees();
  initCounters(); initCountdown(); initWhatsApp(); initForm(); initMagnetic();
  initShowreel(); restartShowcase();
  if(window.ScrollTrigger) setTimeout(()=>ScrollTrigger.refresh(), 400);
});
