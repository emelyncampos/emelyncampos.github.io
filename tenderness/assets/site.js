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
      end:'+=2600',
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
        const stateX=[0,-24,20,-14][segment];
        const stateY=[0,-16,12,-10][segment];
        const stateR=[-3,1.2,-2.2,2.2][segment];
        const stateS=[1,1.035,.985,1.025][segment];

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


  setupMemoryMotion(gs,ScrollTrigger);
  setupBookMotion(gs,ScrollTrigger);

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
      trigger:section,start:'top top',end:'+=1900',pin:true,pinSpacing:true,anticipatePin:1,
      invalidateOnRefresh:true,
      onUpdate:self=>{
        const p=self.progress;
        const idx=p<.39?0:p<.69?1:2;
        setStep(idx);
        gs.set(progress.firstElementChild,{scaleX:p});
      }
    });

    const tl=gs.timeline({scrollTrigger:{
      trigger:section,start:'top top',end:()=>trigger.end,scrub:.75
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
    if(device)gs.to(device,{
      y:-18,rotation:1.5,scale:1.012,ease:'none',
      scrollTrigger:{trigger:section,start:'top 70%',end:'bottom 20%',scrub:.8}
    });
    if(snapshot)gs.to(snapshot,{
      x:10,y:-12,rotation:-6.5,ease:'none',
      scrollTrigger:{trigger:section,start:'top 68%',end:'bottom 18%',scrub:.9}
    });
  }
}
