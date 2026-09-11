
(function(){
  var root=document.documentElement;
  var NAV={en:[["Employment","employment.html"],["Injury","injury.html"],["Results","results.html"],["Reviews","reviews.html"],["Attorneys","attorneys.html"],["Contact","contact.html"]],
           es:[["Trabajo","employment.html"],["Lesiones","injury.html"],["Resultados","results.html"],["Opiniones","reviews.html"],["Abogados","attorneys.html"],["Contacto","contact.html"]]};
  var ACT={en:["Call 516-228-5100","Text us"],es:["Llame al 516-228-5100","Envíenos un texto"]};
  function show(l){
    ['page','desk','mob'].forEach(function(k){
      var en=document.getElementById(k+'-en'), es=document.getElementById(k+'-es');
      if(en&&es){ if(k==='page'){ en.style.display=l==='en'?'':'none'; es.style.display=l==='es'?'':'none'; } }
    });
  }
  function setLang(l){
    root.setAttribute('data-lang',l); root.setAttribute('lang',l);
    try{localStorage.setItem('nhg-lang',l)}catch(e){}
    show(l);
    document.querySelectorAll('.pill').forEach(function(p){
      var sp=p.querySelectorAll('button, span'); if(sp.length!==2) return;
      var a=sp[0].textContent.trim(), b=sp[1].textContent.trim();
      if((a==='EN'||a==='ES')&&(b==='EN'||b==='ES')){ sp.forEach(function(s){ var on=s.textContent.trim().toLowerCase()===l; s.classList.toggle('on', on); if(s.tagName==='BUTTON') s.setAttribute('aria-pressed', on?'true':'false'); }); }
    });
    var nav=document.querySelector('#sheet nav'); if(nav){ nav.innerHTML=''; NAV[l].forEach(function(t){ var a=document.createElement('a'); a.href=t[1]; a.textContent=t[0]; nav.appendChild(a); }); }
    var acts=document.querySelector('#sheet .acts'); if(acts){ acts.innerHTML=''; var c=document.createElement('a'); c.className='btn primary'; c.href='tel:+15162285100'; c.textContent=ACT[l][0]; var t=document.createElement('a'); t.className='btn outline'; t.href='#'; t.textContent=ACT[l][1]; acts.appendChild(c); acts.appendChild(t); }
  }
  var lastTrigger=null;
  function openSheet(btn){ var sh=document.getElementById('sheet'); sh.classList.add('open'); lastTrigger=btn; if(btn) btn.setAttribute('aria-expanded','true'); var c=sh.querySelector('.close'); if(c) c.focus(); }
  function closeSheet(){ var sh=document.getElementById('sheet'); sh.classList.remove('open'); if(lastTrigger){ lastTrigger.setAttribute('aria-expanded','false'); lastTrigger.focus(); } }
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && document.getElementById('sheet').classList.contains('open')) closeSheet(); });
  // results: show the first 10 rows, the rest behind "Show all"
  document.querySelectorAll('#allrows').forEach(function(a){ a.querySelectorAll('.row').forEach(function(r,i){ if(i>=10) r.classList.add('hid'); }); });
  document.addEventListener('click',function(e){
    var s=e.target.closest('.pill button, .pill span');
    if(s){ var t=s.textContent.trim(); if(t==='EN'||t==='ES'){ e.preventDefault(); setLang(t.toLowerCase()); } return; }
    if(e.target.closest('.menu-btn')){ e.preventDefault(); openSheet(e.target.closest('.menu-btn')); return; }
    if(e.target.closest('#sheet .close')){ e.preventDefault(); closeSheet(); return; }
    if(e.target.closest('#showall')){ e.preventDefault(); var w=e.target.closest('[lang]')||document; w.querySelectorAll('#allrows .row').forEach(function(r){r.classList.remove('hid')}); e.target.closest('#showall').style.display='none'; return; }
    var chip=e.target.closest('.chip[data-filter]');
    if(chip){ e.preventDefault(); var f=chip.getAttribute('data-filter'); var wrap=chip.closest('[lang]')||document;
      wrap.querySelectorAll('.chip[data-filter]').forEach(function(c){c.classList.toggle('on',c===chip)});
      wrap.querySelectorAll('.row.hid').forEach(function(r){r.classList.remove('hid')}); var sa=wrap.querySelector('#showall'); if(sa) sa.style.display='none';
      wrap.querySelectorAll('[data-practice]').forEach(function(r){ r.style.display=(f==='all'||r.getAttribute('data-practice')===f)?'':'none'; });
      return; }
  });
  var stored=null; try{stored=localStorage.getItem('nhg-lang')}catch(e){}
  var q=new URLSearchParams(location.search).get('lang');
  setLang(q==='es'||q==='en'?q:(stored||'en'));
  if(!stored && !q && /^es/i.test(navigator.language||'')){
    var bar=document.getElementById('esbar'); if(bar){ bar.style.display='flex';
      document.getElementById('esyes').onclick=function(ev){ev.preventDefault(); setLang('es'); bar.style.display='none';};
      document.getElementById('esno').onclick=function(){ bar.style.display='none'; try{localStorage.setItem('nhg-lang','en')}catch(e){} }; }
  }
  var fit=function(){ var z=Math.min(1,window.innerWidth/1440); document.querySelectorAll('.desk').forEach(function(d){d.style.zoom=z}); };
  fit(); window.addEventListener('resize',fit);
})();
