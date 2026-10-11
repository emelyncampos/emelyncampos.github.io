document.querySelectorAll('.language').forEach(a=>a.addEventListener('click',()=>{a.href=a.href.split('#')[0]+location.hash}));

const choices=[...document.querySelectorAll('[data-story]')];
const details=[...document.querySelectorAll('[data-detail]')];
const careItems=[...document.querySelectorAll('[data-care]')];
const careStage=document.querySelector('.care-stage');
const careSection=document.querySelector('[data-motion-care]');
const stageIndex=document.querySelector('.stage-index');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let activeStory=0;
let careTrigger=null;

function setCareMode(index,{animate=true}={}){
  if(!choices.length)return;
  const next=Math.max(0,Math.min(choices.length-1,index));
  const mode=next<2?'consultation':'routine';
  const previousMode=activeStory<2?'consultation':'routine';
  activeStory=next;

  choices.forEach((choice,i)=>choice.setAttribute('aria-pressed',String(i===next)));
  details.forEach((detail,i)=>{detail.hidden=i!==next});
  if(stageIndex)stageIndex.textContent=String(next+1).padStart(2,'0')+' / 04';

  const swap=()=>{
    careItems.forEach(item=>{item.hidden=item.dataset.care!==mode});
  };

  const gs=window.gsap;
  if(animate&&!reduceMotion.matches&&gs&&careStage){
    const visible=[...careItems].filter(item=>!item.hidden);
    const tl=gs.timeline({defaults:{ease:'power2.out'}});
    careStage.classList.add('is-changing');
    tl.to(visible,{y:-12,opacity:0,duration:.16,stagger:.015})
      .add(swap)
      .fromTo([...careItems].filter(item=>!item.hidden),
        {y:18,opacity:0,scale:.985},
        {y:0,opacity:1,scale:1,duration:.38,stagger:.035},
        '>-0.02')
      .call(()=>careStage.classList.remove('is-changing'));
    if(mode===previousMode){
      tl.fromTo('.care-paper:not([hidden])',{rotation:-7},{rotation:-5,duration:.32},0);
    }
  }else{
    swap();
  }

  document.querySelectorAll('.care-scroll-progress span').forEach((dot,i)=>dot.classList.toggle('is-active',i===next));
}

choices.forEach((button,index)=>button.addEventListener('click',()=>{
  if(careTrigger&&window.innerWidth>=900&&!reduceMotion.matches){
    const span=careTrigger.end-careTrigger.start;
    const target=careTrigger.start+span*((index+.12)/choices.length);
    window.scrollTo({top:target,behavior:'smooth'});
  }else{
    setCareMode(index);
    if(window.innerWidth<900&&!reduceMotion.matches&&window.gsap&&careStage){
      const d=careStage.querySelector('.care-device:not([hidden])');
      const cp=careStage.querySelector('.care-paper:not([hidden])');
      const ctx=careStage.querySelector('.care-context');
      if(d)window.gsap.fromTo(d,
        {x:index%2===0?-22:22,y:18,rotation:index%2===0?-5:4,scale:.965},
        {x:0,y:0,rotation:index%2===0?-2.2:1.8,scale:1,duration:.52,ease:'power3.out'});
      if(cp)window.gsap.fromTo(cp,
        {x:index%2===0?16:-16,y:10,opacity:.35},
        {x:0,y:0,opacity:1,duration:.45,ease:'power2.out'});
      if(ctx)window.gsap.fromTo(ctx,
        {x:index%2===0?-10:10,opacity:.7},
        {x:0,opacity:1,duration:.5,ease:'power2.out'});
    }
  }
}));

function setupMotion(){
  const gs=window.gsap;
  const ScrollTrigger=window.ScrollTrigger;
  if(!gs||!ScrollTrigger||reduceMotion.matches)return;
  gs.registerPlugin(ScrollTrigger);
  document.body.classList.add('motion-ready');

  const hero=document.querySelector('[data-motion-hero]');
  if(hero){
    const heroTl=gs.timeline({defaults:{ease:'power3.out'}});
    heroTl
      .from('.site-header .wordmark,.site-header nav,.site-header .langs',{y:-14,opacity:0,duration:.65,stagger:.06})
      .from('.opening-copy .eyebrow',{y:18,opacity:0,duration:.5},'-=.3')
      .from('.hero-line',{y:42,opacity:0,duration:.72,stagger:.11},'-=.26')
      .from('.opening-lead',{y:22,opacity:0,duration:.58},'-=.38')
      .from('.opening-actions',{y:16,opacity:0,duration:.5},'-=.34')
      .from('.opening-photo .mother',{clipPath:'inset(0 0 100% 0 round 50% 50% 2px 2px)',scale:1.045,duration:1.05,ease:'power3.inOut'},'-=.9')
      .from('.opening-photo figcaption',{x:-24,y:20,opacity:0,rotation:-2,duration:.6},'-=.42')
      .from('.photo-side',{y:24,opacity:0,duration:.45},'-=.38')
      .from('.hero-shape,.hero-spark',{scale:.65,opacity:0,duration:.6,stagger:.06},'-=.55');

    gs.to('.opening-copy',{y:-55,opacity:.58,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.7}});
    gs.to('.opening-photo .mother',{y:-28,scale:1.025,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.8}});
    gs.to('.opening-photo figcaption',{y:-58,rotation:-1.5,ease:'none',scrollTrigger:{trigger:hero,start:'top 15%',end:'bottom top',scrub:.75}});
    gs.to('.hero-shape--lavender',{x:22,y:-70,rotation:9,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.9}});
    gs.to('.hero-shape--apricot',{x:-18,y:-35,rotation:-8,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}});
    gs.to('.hero-shape--sage',{x:15,y:-48,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.85}});
  }

  const thought=document.querySelector('.thought');
  if(thought){
    gs.from('.thought>img,.thought h2,.thought p',{y:26,opacity:0,duration:.8,stagger:.1,ease:'power2.out',scrollTrigger:{trigger:thought,start:'top 78%',once:true}});
  }

  if(careSection&&choices.length&&window.innerWidth>=900){
    const progress=document.createElement('div');
    progress.className='care-scroll-progress';
    progress.setAttribute('aria-hidden','true');
    choices.forEach((_,i)=>{const dot=document.createElement('span');if(i===0)dot.classList.add('is-active');progress.appendChild(dot)});
    careSection.appendChild(progress);

    const orbit=document.querySelector('.stage-orbit');
    const context=document.querySelector('.care-context');
    const paper=()=>document.querySelector('.care-paper:not([hidden])');

    careTrigger=ScrollTrigger.create({
      trigger:careSection,
      start:'top top',
      end:'+=2100',
      pin:true,
      pinSpacing:true,
      anticipatePin:1,
      invalidateOnRefresh:true,
      onUpdate:self=>{
        const next=Math.min(choices.length-1,Math.floor(Math.min(.9999,self.progress)*choices.length));
        if(next!==activeStory)setCareMode(next,{animate:true});
        const segment=Math.min(3,Math.floor(Math.min(.9999,self.progress)*4));
        const local=(self.progress*4)-segment;
        const wave=Math.sin(Math.max(0,Math.min(1,local))*Math.PI);
        const device=careStage.querySelector('.care-device:not([hidden])');
        const stateX=[-18,34,-30,24][segment];
        const stateY=[10,-24,16,-14][segment];
        const stateR=[-4.2,2.8,-2.8,3.2][segment];
        const stateS=[.985,1.055,.975,1.04][segment];

        if(device)gs.set(device,{
          x:stateX + wave*(segment%2===0?12:-10),
          y:stateY - wave*12,
          rotation:stateR + wave*(segment%2===0?1.1:-1),
          scale:stateS + wave*.012
        });
        if(orbit)gs.set(orbit,{
          rotation:4+self.progress*5-wave*1.4,
          y:self.progress*-10+wave*5,
          scale:1+wave*.012
        });
        if(context)gs.set(context,{
          x:-stateX*.22,
          y:self.progress*-24+wave*9,
          rotation:7-self.progress*3-wave*.8,
          scale:1+wave*.01
        });
        const currentPaper=paper();
        if(currentPaper)gs.set(currentPaper,{
          x:-stateX*.18,
          y:Math.sin(self.progress*Math.PI*4)*4-wave*5,
          rotation:-5+wave*(segment%2===0?1.2:-1)
        });
        careSection.style.backgroundColor=gs.utils.interpolate('#eee7de','#f2edf1',self.progress*.55);
      }
    });

    gs.from('.life-intro>*',{y:22,opacity:0,stagger:.07,duration:.6,ease:'power2.out',scrollTrigger:{trigger:careSection,start:'top 72%',once:true}});
    gs.from('.story-choice',{x:-18,opacity:0,stagger:.06,duration:.55,ease:'power2.out',scrollTrigger:{trigger:careSection,start:'top 70%',once:true}});
    gs.from('.care-stage',{x:35,opacity:0,duration:.75,ease:'power2.out',scrollTrigger:{trigger:careSection,start:'top 70%',once:true}});
  }

  if(careSection&&choices.length&&window.innerWidth<900){
    const mobileDevice=()=>careStage?.querySelector('.care-device:not([hidden])');
    const mobileContext=careStage?.querySelector('.care-context');
    const mobilePaper=()=>careStage?.querySelector('.care-paper:not([hidden])');

    if(careStage){
      gs.from(careStage,{
        y:46,opacity:0,duration:.8,ease:'power3.out',
        scrollTrigger:{trigger:careStage,start:'top 86%',once:true}
      });

      ScrollTrigger.create({
        trigger:careStage,
        start:'top 92%',
        end:'bottom 18%',
        scrub:.58,
        onUpdate:self=>{
          const p=self.progress;
          const d=mobileDevice();
          const cp=mobilePaper();
          if(d)gs.set(d,{
            y:48-(p*96),
            x:(p-.5)*54,
            rotation:-5.5+(p*8.5),
            scale:.92+(p*.14)
          });
          if(mobileContext)gs.set(mobileContext,{
            y:24-(p*50),
            x:(.5-p)*30,
            rotation:8.5-(p*5.5),
            scale:.97+(p*.055)
          });
          if(cp)gs.set(cp,{
            y:28-(p*56),
            x:(p-.5)*32,
            rotation:-8+(p*6),
            scale:.95+(p*.07)
          });
        }
      });
    }
  }


  setupHorizontalCareMotion(gs,ScrollTrigger);
  setupMemoryMotion(gs,ScrollTrigger);
  setupBookMotion(gs,ScrollTrigger);
  setupFaqMotion(gs,ScrollTrigger);
  setupClosingMotion(gs,ScrollTrigger);

  ScrollTrigger.refresh();
}

setCareMode(0,{animate:false});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupMotion,{once:true});
else setupMotion();

reduceMotion.addEventListener?.('change',()=>location.reload());


function setupMemoryMotion(gs,ScrollTrigger){
  const section=document.querySelector('[data-motion-memory]');
  if(!section)return;

  gs.from(section.querySelectorAll('.memory-top>*'),{
    y:28,opacity:0,duration:.72,stagger:.09,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 76%',once:true}
  });
  gs.from(section.querySelector('.memory-photo'),{
    y:48,opacity:0,rotation:-1.5,duration:.9,ease:'power3.out',
    scrollTrigger:{trigger:section,start:'top 72%',once:true}
  });
  gs.from(section.querySelector('.memory-photo figcaption'),{
    x:-34,y:26,opacity:0,rotation:-6,duration:.65,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 62%',once:true}
  });
  gs.from(section.querySelectorAll('.memory-details article'),{
    x:-22,opacity:0,duration:.58,stagger:.1,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 54%',once:true}
  });
  gs.from(section.querySelectorAll('.memory-tape,.memory-spark'),{
    scale:.55,opacity:0,duration:.55,stagger:.07,ease:'back.out(1.4)',
    scrollTrigger:{trigger:section,start:'top 66%',once:true}
  });

  const photo=section.querySelector('.memory-photo img');
  const caption=section.querySelector('.memory-photo figcaption');
  const tape=section.querySelector('.memory-tape');
  if(photo)gs.to(photo,{y:-30,scale:1.025,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:.8}});
  if(caption)gs.to(caption,{y:-28,rotation:-1.5,ease:'none',scrollTrigger:{trigger:section,start:'top 75%',end:'bottom 20%',scrub:.9}});
  if(tape)gs.to(tape,{y:-16,rotation:-1,ease:'none',scrollTrigger:{trigger:section,start:'top 70%',end:'bottom 20%',scrub:1}});
}

function setupBookMotion(gs,ScrollTrigger){
  const section=document.querySelector('[data-motion-book]');
  if(!section)return;
  const steps=[...section.querySelectorAll('[data-book-step]')];
  const paper=section.querySelector('.memory-paper');
  const device=section.querySelector('.memory-device');
  const snapshot=section.querySelector('.memory-snapshot');
  const label=section.querySelector('.memory-label');
  const caption=section.querySelector('.memory-composition figcaption');
  let active=-1;

  const setStep=index=>{
    const next=Math.max(0,Math.min(steps.length-1,index));
    if(next===active)return;
    active=next;
    steps.forEach((step,i)=>step.classList.toggle('is-active',i===next));
  };

  if(window.innerWidth>=900){
    const progress=document.createElement('div');
    progress.className='book-scroll-progress';
    progress.setAttribute('aria-hidden','true');
    progress.innerHTML='<span></span>';
    section.appendChild(progress);

    gs.set(section.querySelectorAll(':scope > div > .eyebrow,:scope > div > h2,:scope > div > p'),{y:24,opacity:0});
    gs.set(paper,{x:85,y:35,rotation:13,scale:.86,opacity:0});
    gs.set(device,{x:55,y:90,rotation:9,scale:.88,opacity:0});
    gs.set(snapshot,{x:-90,y:55,rotation:-15,scale:.9,opacity:0});
    gs.set(label,{y:30,opacity:0});
    gs.set(caption,{y:18,opacity:0});
    setStep(0);

    const trigger=ScrollTrigger.create({
      trigger:section,start:'top top',end:'+=1450',pin:true,pinSpacing:true,anticipatePin:1,
      invalidateOnRefresh:true,
      onUpdate:self=>{
        const p=self.progress;
        const idx=p<.36?0:p<.68?1:2;
        setStep(idx);
        gs.set(progress.firstElementChild,{scaleX:p});
      }
    });

    const tl=gs.timeline({scrollTrigger:{
      trigger:section,start:'top top',end:()=>trigger.end,scrub:.62
    }});
    tl.to(section.querySelectorAll(':scope > div > .eyebrow,:scope > div > h2,:scope > div > p'),{y:0,opacity:1,stagger:.035,duration:.13},0)
      .to(paper,{x:0,y:0,rotation:6,scale:1,opacity:1,duration:.18},.05)
      .to(device,{x:0,y:0,rotation:3,scale:1,opacity:1,duration:.22},.14)
      .to(label,{y:0,opacity:1,duration:.1},.18)
      .to(snapshot,{x:0,y:0,rotation:-9,scale:1,opacity:1,duration:.2},.28)
      .to(caption,{y:0,opacity:1,duration:.12},.33)
      .to(snapshot,{x:46,y:-48,rotation:-3.5,scale:1.035,duration:.2,ease:'none'},.48)
      .to(device,{x:-18,y:-34,rotation:.6,scale:1.045,duration:.22,ease:'none'},.48)
      .to(paper,{x:-24,y:18,rotation:3.2,scale:1.018,duration:.24,ease:'none'},.47)
      .to(snapshot,{x:18,y:-24,rotation:-6.5,scale:1,duration:.18,ease:'none'},.70)
      .to(device,{x:22,y:-15,rotation:3.8,scale:1.025,duration:.18,ease:'none'},.70)
      .to(paper,{x:10,y:4,rotation:6.5,scale:1,duration:.18,ease:'none'},.70)
      .to(snapshot,{x:4,y:-10,rotation:-8,scale:.985,duration:.16,ease:'none'},.86)
      .to(device,{x:0,y:-4,rotation:2.2,scale:1.008,duration:.16,ease:'none'},.86)
      .to(paper,{x:0,y:0,rotation:6,scale:1,duration:.16,ease:'none'},.86);
  }else{
    gs.from(section.querySelectorAll(':scope > div > .eyebrow,:scope > div > h2,:scope > div > p'),{
      y:24,opacity:0,duration:.7,stagger:.08,ease:'power2.out',
      scrollTrigger:{trigger:section,start:'top 78%',once:true}
    });
    gs.from([paper,device,snapshot].filter(Boolean),{
      y:35,opacity:0,duration:.75,stagger:.11,ease:'power2.out',
      scrollTrigger:{trigger:section,start:'top 62%',once:true}
    });
    gs.from(steps,{
      x:-16,opacity:0,duration:.5,stagger:.09,ease:'power2.out',
      scrollTrigger:{trigger:section,start:'top 52%',once:true}
    });
    if(device)gs.fromTo(device,
      {y:42,x:18,rotation:6,scale:.93},
      {y:-34,x:-14,rotation:-1.5,scale:1.045,ease:'none',
       scrollTrigger:{trigger:section,start:'top 82%',end:'bottom 18%',scrub:.75}}
    );
    if(snapshot)gs.fromTo(snapshot,
      {x:-34,y:34,rotation:-13,scale:.92},
      {x:22,y:-22,rotation:-4.5,scale:1.035,ease:'none',
       scrollTrigger:{trigger:section,start:'top 78%',end:'bottom 18%',scrub:.85}}
    );
    if(paper)gs.fromTo(paper,
      {x:24,y:20,rotation:9,scale:.96},
      {x:-14,y:-8,rotation:4.5,scale:1.02,ease:'none',
       scrollTrigger:{trigger:section,start:'top 80%',end:'bottom 18%',scrub:.9}}
    );
  }
}


function setupFaqMotion(gs,ScrollTrigger){
  const section=document.querySelector('[data-motion-faq]');
  if(!section)return;
  const heading=section.querySelectorAll(':scope > div:first-child > *');
  const items=[...section.querySelectorAll('.faq-list details')];

  gs.from(heading,{
    y:24,opacity:0,duration:.65,stagger:.08,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 78%',once:true}
  });
  gs.from(items,{
    y:18,opacity:0,duration:.52,stagger:.07,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 72%',once:true}
  });

  items.forEach(item=>{
    item.addEventListener('toggle',()=>{
      if(!item.open||reduceMotion.matches)return;
      const content=item.querySelector('p');
      if(content)gs.fromTo(content,{y:-8,opacity:0},{y:0,opacity:1,duration:.34,ease:'power2.out'});
    });
  });
}

function setupClosingMotion(gs,ScrollTrigger){
  const section=document.querySelector('[data-motion-closing]');
  if(!section)return;
  const content=section.querySelectorAll(':scope > img,:scope > .eyebrow,:scope > h2,:scope > p:not(.eyebrow),:scope > .store-row,:scope > .closing-support');
  const lavender=section.querySelector('.closing-shape--lavender');
  const apricot=section.querySelector('.closing-shape--apricot');
  const sparks=section.querySelectorAll('.closing-spark');

  gs.from(content,{
    y:28,opacity:0,duration:.72,stagger:.075,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 76%',once:true}
  });
  gs.from([lavender,apricot,...sparks].filter(Boolean),{
    scale:.65,opacity:0,duration:.72,stagger:.08,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 80%',once:true}
  });

  if(lavender)gs.to(lavender,{
    x:28,y:-38,rotation:7,ease:'none',
    scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:.9}
  });
  if(apricot)gs.to(apricot,{
    x:-24,y:30,rotation:-6,ease:'none',
    scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1}
  });
}


function setupHorizontalCareMotion(gs,ScrollTrigger){
  const section=document.querySelector('[data-motion-care-horizontal]');
  if(!section)return;
  const stage=section.querySelector('.care-horizontal-stage');
  const track=section.querySelector('.care-horizontal-track');
  const slides=[...section.querySelectorAll('[data-care-slide]')];
  const progress=section.querySelector('.care-h-progress span');
  const hint=section.querySelector('.care-h-hint');
  if(!stage||!track||!slides.length)return;

  const setActive=index=>{
    const next=Math.max(0,Math.min(slides.length-1,index));
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===next));
  };

  gs.from(section.querySelectorAll('.care-horizontal-intro>*'),{
    y:24,opacity:0,duration:.68,stagger:.08,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 78%',once:true}
  });

  if(window.innerWidth>=900){
    const distance=()=>Math.max(0,track.scrollWidth-stage.clientWidth);
    const tween=gs.to(track,{
      x:()=>-distance(),
      ease:'none',
      scrollTrigger:{
        trigger:stage,
        start:'top top',
        end:()=>'+='+Math.max(1700,distance()*1.08),
        pin:true,
        pinSpacing:true,
        scrub:.65,
        anticipatePin:1,
        invalidateOnRefresh:true,
        onUpdate:self=>{
          const idx=Math.min(slides.length-1,Math.floor(Math.min(.9999,self.progress)*slides.length));
          setActive(idx);
          if(progress)gs.set(progress,{scaleX:self.progress});
          if(hint)gs.set(hint,{opacity:1-Math.min(1,self.progress*4)});
        }
      }
    });

    slides.forEach((slide,index)=>{
      const device=slide.querySelector('.care-h-device');
      const note=slide.querySelector('.care-h-note');
      const shape=slide.querySelector('.care-h-shape');
      if(device)gs.fromTo(device,
        {y:36,rotation:index%2===0?-4:4,scale:.955},
        {y:-18,rotation:index%2===0?1:-1.5,scale:1.025,ease:'none',
         scrollTrigger:{trigger:slide,containerAnimation:tween,start:'left 90%',end:'right 20%',scrub:.8}}
      );
      if(note)gs.fromTo(note,
        {x:index%2===0?-18:18,y:20,opacity:.65},
        {x:index%2===0?16:-16,y:-12,opacity:1,ease:'none',
         scrollTrigger:{trigger:slide,containerAnimation:tween,start:'left 92%',end:'right 25%',scrub:.9}}
      );
      if(shape)gs.fromTo(shape,
        {rotation:index%2===0?-4:5,scale:.96},
        {rotation:index%2===0?4:-3,scale:1.035,ease:'none',
         scrollTrigger:{trigger:slide,containerAnimation:tween,start:'left 95%',end:'right 20%',scrub:1}}
      );
    });
  }else{
    if(hint)hint.textContent=document.documentElement.lang.startsWith('pt')?'Deslize para ver →':'Swipe to explore →';

    // Mobile: leave horizontal movement entirely to the browser/iOS.
    // No GSAP transforms or ScrollTrigger on the track/slides.
    gs.set(track,{clearProps:'transform,x'});
    gs.set(slides,{clearProps:'transform,opacity,x,y,scale,rotation'});

    let raf=0;
    const syncMobileProgress=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const max=Math.max(1,stage.scrollWidth-stage.clientWidth);
        const p=Math.max(0,Math.min(1,stage.scrollLeft/max));
        const idx=Math.min(slides.length-1,Math.round(p*(slides.length-1)));
        setActive(idx);
        if(progress)progress.style.transform='scaleX('+p+')';
      });
    };
    stage.addEventListener('scroll',syncMobileProgress,{passive:true});
    syncMobileProgress();
  }
}
