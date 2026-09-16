(function(){
  // cache busting: GitHub Pages lets browsers keep a page for ten minutes and assets far longer.
  // Ask for the current build id uncached; if this page is older, reload once so the fresh HTML (with new asset hashes) is fetched.
  var mine=document.documentElement.getAttribute('data-build'); if(!mine||location.protocol==='file:') return;
  fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(v){
    if(!v.build||v.build===mine) return;
    var k='nhg-reloaded-'+v.build; try{ if(sessionStorage.getItem(k)) return; sessionStorage.setItem(k,'1'); }catch(e){}
    location.reload();
  }).catch(function(){});
})();

(function(){
  var root=document.documentElement;
  var NAV={en:[["Injury","injury.html"],["Employment","employment.html"],["Results","results.html"],["Reviews","reviews.html"],["Attorneys","attorneys.html"],["Contact","contact.html"]],
           es:[["Lesiones","injury.html"],["Trabajo","employment.html"],["Resultados","results.html"],["Opiniones","reviews.html"],["Abogados","attorneys.html"],["Contacto","contact.html"]]};
  var ACT={en:["Call 516-228-5100","Text 516-362-2613"],es:["Llame al 516-228-5100","Texto al 516-362-2613"]};
  function show(l){
    ['page','desk','mob'].forEach(function(k){
      var en=document.getElementById(k+'-en'), es=document.getElementById(k+'-es');
      if(en&&es){ if(k==='page'){ en.style.display=l==='en'?'':'none'; es.style.display=l==='es'?'':'none'; } }
    });
  }
  function setLang(l){
    root.setAttribute('data-lang',l); root.setAttribute('lang',l);
    setTimeout(function(){ var c=document.querySelector('#page-'+l+' .hero .cta'); if(c){ var r=c.getBoundingClientRect(); root.classList.toggle('past-hero', r.bottom<0); } },50);
    try{localStorage.setItem('nhg-lang',l)}catch(e){}
    show(l);
    document.querySelectorAll('.pill').forEach(function(p){
      var sp=p.querySelectorAll(':scope > button, :scope > span'); if(sp.length!==2) return;
      var a=sp[0].textContent.trim(), b=sp[1].textContent.trim();
      if((a==='EN'||a==='ES')&&(b==='EN'||b==='ES')){ sp.forEach(function(s){ var on=s.textContent.trim().toLowerCase()===l; s.classList.toggle('on', on); if(s.tagName==='BUTTON') s.setAttribute('aria-pressed', on?'true':'false'); }); }
    });
    var L={en:{menu:'Menu',close:'Close',lang:'Language',skip:'Skip to content',tab:'Contact us','reach-eyebrow':'Free case review','reach-title':'Reach us the way you prefer','reach-lead':'Call, text, or send a message. Someone from this office replies, in English or Spanish.','reach-call':'Call','reach-text':'Text','reach-msg':'Send a message','reach-msg-sub':'We reply during business hours'},
           es:{menu:'Menú',close:'Cerrar',lang:'Idioma',skip:'Ir al contenido',tab:'Contáctenos','reach-eyebrow':'Revisión gratis de su caso','reach-title':'Comuníquese como prefiera','reach-lead':'Llame, envíe un texto o un mensaje. Alguien de esta oficina le responde, en español o en inglés.','reach-call':'Llamar','reach-text':'Texto','reach-msg':'Enviar un mensaje','reach-msg-sub':'Respondemos en horario de oficina'}}[l];
    document.querySelectorAll('[data-l]').forEach(function(e){ if(L[e.getAttribute('data-l')]) e.textContent=L[e.getAttribute('data-l')]; });
    var rt=document.querySelector('.reach-tab'); if(rt) rt.textContent=L.tab;
    var rc=document.querySelector('#reach .close'); if(rc) rc.setAttribute('aria-label',L.close);
    var rm=document.querySelector('#reach .reach-msg'); if(rm){ var local=document.querySelector('#page-'+l+' #intake'+(l==='es'?'-es':'')); rm.href=local?('#intake'+(l==='es'?'-es':'')):('contact.html#intake'+(l==='es'?'-es':'')); }
    document.querySelectorAll('.menu-btn').forEach(function(b){ b.setAttribute('aria-label',L.menu); });
    var cl=document.querySelector('#sheet .close'); if(cl) cl.setAttribute('aria-label',L.close);
    var sh=document.getElementById('sheet'); if(sh) sh.setAttribute('aria-label',L.menu);
    document.querySelectorAll('.pill[role=group]').forEach(function(p){ p.setAttribute('aria-label',L.lang); });
    document.querySelectorAll('.skip').forEach(function(a){ a.textContent=L.skip; });
    var nav=document.querySelector('#sheet nav'); if(nav){ nav.innerHTML=''; NAV[l].forEach(function(t){ var a=document.createElement('a'); a.href=t[1]; a.textContent=t[0]; nav.appendChild(a); }); }
    var acts=document.querySelector('#sheet .acts'); if(acts){ acts.innerHTML=''; var c=document.createElement('a'); c.className='btn primary'; c.href='tel:+15162285100'; c.textContent=ACT[l][0]; var t=document.createElement('a'); t.className='btn outline'; t.href='sms:+15163622613'; t.textContent=ACT[l][1]; acts.appendChild(c); acts.appendChild(t); }
  }
  var lastTrigger=null;
  function pages(){ return document.querySelectorAll('#page-en, #page-es, .tag'); }
  function openDlg(id,btn){ var sh=document.getElementById(id); sh.classList.add('open'); root.classList.add('dlg-open'); lastTrigger=btn; if(btn) btn.setAttribute('aria-expanded','true'); pages().forEach(function(p){ p.setAttribute('inert',''); }); var c=sh.querySelector('.close'); if(c) c.focus(); }
  function closeDlg(id){ var sh=document.getElementById(id); sh.classList.remove('open'); root.classList.remove('dlg-open'); pages().forEach(function(p){ p.removeAttribute('inert'); }); if(lastTrigger){ lastTrigger.setAttribute('aria-expanded','false'); lastTrigger.focus(); } }
  function openSheet(btn){ openDlg('sheet',btn); } function closeSheet(){ closeDlg('sheet'); }
  function openDialog(){ return document.querySelector('#sheet.open, .dlg.open'); }
  document.addEventListener('keydown',function(e){ var sh=openDialog(); if(e.key!=='Tab'||!sh) return; var f=sh.querySelectorAll('button, a[href]'); if(!f.length) return; var first=f[0], last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); } });
  document.addEventListener('keydown',function(e){ var sh=openDialog(); if(e.key==='Escape' && sh) closeDlg(sh.id); });
  document.addEventListener('click',function(e){ var t=e.target.closest('.reach-tab'); if(t){ openDlg('reach',t); return; } var c=e.target.closest('#reach .close'); if(c){ closeDlg('reach'); return; } if(e.target.id==='reach'){ closeDlg('reach'); return; } var a=e.target.closest('#reach a[href^="#"]'); if(a){ closeDlg('reach'); } });
  // results: show the first 10 rows, the rest behind "Show all"
  document.querySelectorAll('[id^=allrows]').forEach(function(a){ if(!document.querySelector('[id^=showall]')) return; a.querySelectorAll('.row').forEach(function(r,i){ if(i>=10) r.classList.add('hid'); }); });
  document.addEventListener('click',function(e){
    var fp=e.target.closest('.formpill button'); if(fp){ e.preventDefault(); fp.parentElement.querySelectorAll('button').forEach(function(b){ var on=b===fp; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false'); b.style.background=on?'var(--ink)':'transparent'; b.style.color=on?'var(--paper)':'var(--ink)'; }); return; }
    var s=e.target.closest('.pill button, .pill span');
    if(s){ var t=s.textContent.trim(); if(t==='EN'||t==='ES'){ e.preventDefault(); setLang(t.toLowerCase()); } return; }
    if(e.target.closest('.menu-btn')){ e.preventDefault(); openSheet(e.target.closest('.menu-btn')); return; }
    if(e.target.closest('#sheet .close')){ e.preventDefault(); closeSheet(); return; }
    if(e.target.closest('[id^=showall]')){ e.preventDefault(); var w=e.target.closest('[lang]')||document; w.querySelectorAll('[id^=allrows] .row').forEach(function(r){r.classList.remove('hid')}); e.target.closest('[id^=showall]').style.display='none'; return; }
    var send=e.target.closest('.send'); if(send){ e.preventDefault(); var box=send.parentElement.parentElement.querySelector('.sent'); if(box){ box.hidden=false; box.focus && box.focus(); } return; }
    var fp=e.target.closest('.formpill button'); if(fp){ e.preventDefault(); fp.parentElement.querySelectorAll('button').forEach(function(b){ var on=b===fp; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false'); b.style.background=on?'var(--ink)':'transparent'; b.style.color=on?'var(--paper)':'var(--ink)'; }); return; }
    var chip=e.target.closest('.chip[data-filter]');
    if(chip){ e.preventDefault(); var f=chip.getAttribute('data-filter'); var wrap=chip.closest('[lang]')||document;
      wrap.querySelectorAll('.chip[data-filter]').forEach(function(c){ var on=c===chip; c.classList.toggle('on',on); c.setAttribute('aria-pressed',on?'true':'false'); });
      wrap.querySelectorAll('.row.hid').forEach(function(r){r.classList.remove('hid')}); var sa=wrap.querySelector('[id^=showall]'); if(sa) sa.style.display='none';
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
  // mobile sticky bar: hidden while the hero's own buttons are on screen.
  // The first time they scroll away, the two buttons travel down into the bar (once per page; plain slide under reduced motion).
  (function(){
    var flown=false, reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function fly(){
      var lang=root.getAttribute('data-lang')||'en';
      var page=document.getElementById('page-'+lang)||document; var hero=page.querySelector('.hero .cta'); var bar=page.querySelector('.sticky');
      if(!hero||!bar||window.innerWidth>899) return false;
      var from=[hero.querySelector('.btn.act'),hero.querySelector('.btn.ghost')], to=[bar.querySelector('.btn.act'),bar.querySelector('.btn.ghost')];
      if(from.some(function(b){return !b})||to.some(function(b){return !b})) return false;
      bar.style.transition='none'; root.classList.add('past-hero'); bar.style.visibility='hidden';
      var toR=to.map(function(b){return b.getBoundingClientRect()}); var fromR=from.map(function(b){return b.getBoundingClientRect()});
      var clones=from.map(function(b,i){ var c=b.cloneNode(true); c.className+=' fly'; c.setAttribute('aria-hidden','true'); c.style.left=fromR[i].left+'px'; c.style.top=fromR[i].top+'px'; c.style.width=fromR[i].width+'px'; c.style.height=fromR[i].height+'px'; document.body.appendChild(c); return c; });
      clones.forEach(function(c){ c.getBoundingClientRect(); });
      requestAnimationFrame(function(){ clones.forEach(function(c,i){ c.style.left=toR[i].left+'px'; c.style.top=toR[i].top+'px'; c.style.width=toR[i].width+'px'; c.style.height=toR[i].height+'px'; c.style.fontSize=getComputedStyle(to[i]).fontSize; c.style.opacity='.92'; }); });
      setTimeout(function(){ bar.style.visibility=''; bar.style.transition=''; clones.forEach(function(c){ c.remove(); }); }, 620);
      return true;
    }
    var ctas=document.querySelectorAll('.hero .cta'); if(!ctas.length){ root.classList.add('no-hero'); return; }
    if(!('IntersectionObserver' in window)){ root.classList.add('past-hero'); return; }
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){
      if(e.target.offsetParent===null) return; // the hidden language's hero
      var gone=!e.isIntersecting && e.boundingClientRect.top<0;
      if(gone && !flown && !reduce){ flown=true; if(fly()) return; }
      root.classList.toggle('past-hero', gone);
    }); },{threshold:0}); ctas.forEach(function(c){ io.observe(c); });
  })();
  var fit=function(){ var z=Math.min(1,window.innerWidth/1440); document.querySelectorAll('.desk').forEach(function(d){d.style.zoom=z}); };
  fit(); window.addEventListener('resize',fit);
})();
