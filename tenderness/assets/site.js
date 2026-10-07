document.querySelectorAll('.language').forEach(a=>a.addEventListener('click',()=>{a.href=a.href.split('#')[0]+location.hash}));
const choices=[...document.querySelectorAll('[data-story]')];
const details=[...document.querySelectorAll('[data-detail]')];
choices.forEach(button=>button.addEventListener('click',()=>{
 choices.forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
 details.forEach(detail=>{detail.hidden=detail.dataset.detail!==button.dataset.story});
 const active=Number(button.dataset.story)<2?"consultation":"routine";
 document.querySelectorAll("[data-care]").forEach(item=>{item.hidden=item.dataset.care!==active});
 const index=document.querySelector(".stage-index");if(index)index.textContent=active==="consultation"?"01 / 02":"02 / 02";
}));
