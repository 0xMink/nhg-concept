(()=>{
document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle');
const nav=document.getElementById('site-navigation');
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});nav.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');menu.focus();}});}
const demo=document.getElementById('demo-request');
if(demo){demo.addEventListener('click',()=>{document.getElementById('demo-status').textContent='Preview complete. No information was submitted or saved. For an actual consultation, please call the office.';});}

})();
