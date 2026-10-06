document.querySelectorAll('.language').forEach(a=>a.addEventListener('click',()=>{a.href=a.href.split('#')[0]+location.hash}));
const choices=[...document.querySelectorAll('[data-story]')];
const details=[...document.querySelectorAll('[data-detail]')];
choices.forEach(button=>button.addEventListener('click',()=>{
 choices.forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
 details.forEach(detail=>{detail.hidden=detail.dataset.detail!==button.dataset.story});
}));
