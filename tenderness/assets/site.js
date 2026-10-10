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
        if(orbit)gs.set(orbit,{rotation:4+self.progress*5,y:self.progress*-10});
        if(context)gs.set(context,{y:self.progress*-24,rotation:7-self.progress*3});
        const currentPaper=paper();
        if(currentPaper)gs.set(currentPaper,{y:Math.sin(self.progress*Math.PI*4)*4});
        careSection.style.backgroundColor=gs.utils.interpolate('#eee7de','#f2edf1',self.progress*.55);
      }
    });

    gs.from('.life-intro>*',{y:22,opacity:0,stagger:.07,duration:.6,ease:'power2.out',scrollTrigger:{trigger:careSection,start:'top 72%',once:true}});
    gs.from('.story-choice',{x:-18,opacity:0,stagger:.06,duration:.55,ease:'power2.out',scrollTrigger:{trigger:careSection,start:'top 70%',once:true}});
    gs.from('.care-stage',{x:35,opacity:0,duration:.75,ease:'power2.out',scrollTrigger:{trigger:careSection,start:'top 70%',once:true}});
  }

  ScrollTrigger.refresh();
}

setCareMode(0,{animate:false});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupMotion,{once:true});
else setupMotion();

reduceMotion.addEventListener?.('change',()=>location.reload());
