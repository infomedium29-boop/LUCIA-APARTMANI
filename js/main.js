// Lucia Biograd | Vanilla JS. No cookie-tracking, no frameworks.
// Configure with a real Web3Forms key before accepting live website inquiries.
const WEB3FORMS_ACCESS_KEY = '';
const CONTACT_EMAIL='apartmenthouse.lucia@gmail.com';
const WHATSAPP='https://wa.me/385912404046';
const lang=document.body.dataset.lang||'hr';
const messages={
 hr:{demo:'Slanje putem obrasca trenutno nije aktivno. Pošaljite upit e-mailom ili WhatsAppom.',sending:'Slanje upita...',success:'Upit je poslan. Domaćin će vam odgovoriti na navedenu e-mail adresu.',error:'Upit nije poslan. Pokušajte ponovno ili se javite putem WhatsAppa.',invalid:'Provjerite podatke i datume. Odlazak mora biti nakon dolaska.',month:['siječanj','veljača','ožujak','travanj','svibanj','lipanj','srpanj','kolovoz','rujan','listopad','studeni','prosinac'],days:['Po','Ut','Sr','Če','Pe','Su','Ne'],selected:'Odabrani datumi (potrebna potvrda)'},
 en:{demo:'The form is in demo mode. Please contact us by WhatsApp or email.',sending:'Sending inquiry...',success:'Inquiry sent. Your host will reply by email.',error:'Inquiry not sent. Please try again or use WhatsApp.',invalid:'Please check your dates and details. Check-out must be after check-in.',month:['January','February','March','April','May','June','July','August','September','October','November','December'],days:['Mo','Tu','We','Th','Fr','Sa','Su'],selected:'Selected dates (subject to confirmation)'},
 de:{demo:'Das Formular befindet sich im Demo-Modus. Bitte kontaktieren Sie uns per WhatsApp oder E-Mail.',sending:'Anfrage wird gesendet...',success:'Ihre Anfrage wurde versendet. Ihr Gastgeber antwortet per E-Mail.',error:'Anfrage nicht versendet. Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp.',invalid:'Bitte prüfen Sie Ihre Angaben. Die Abreise muss nach der Anreise liegen.',month:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],days:['Mo','Di','Mi','Do','Fr','Sa','So'],selected:'Gewählte Daten (Bestätigung erforderlich)'}
}[lang];
const header=document.getElementById('siteHeader');
const menuToggle=document.getElementById('menuToggle');
const menu=document.getElementById('mobileMenu');
const mobileBar=document.getElementById('mobileQuick');
let hero=document.querySelector('#hero');
function onScroll(){header?.classList.toggle('is-scrolled',window.scrollY>80);if(mobileBar)mobileBar.classList.toggle('is-visible',window.scrollY>(hero?.offsetHeight||250)+120&&!document.body.classList.contains('menu-open'));}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
function setMenu(open){if(!menu||!menuToggle)return;menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);onScroll();if(open){menu.querySelector('a')?.focus()}else{menuToggle.focus()}}
menuToggle?.addEventListener('click',()=>setMenu(menu.hidden));
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(!menu.hidden){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}}));
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu?.hidden)setMenu(false)});
// Only animate while JS is active. No-JS visitors see fully visible content.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.documentElement.classList.add('js-reveal');
 const els=[...document.querySelectorAll('.reveal')];
 const obs=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;target.classList.remove('is-before');target.classList.add('is-visible');obs.unobserve(target)})},{threshold:.15,rootMargin:'0px 0px 8px 0px'});
 els.forEach((el,i)=>{if(el.getBoundingClientRect().top>window.innerHeight+60){el.classList.add('is-before');el.style.transitionDelay=`${(i%4)*60}ms`;obs.observe(el)}else{el.classList.add('is-visible')}});
}
// Public listing photos are temporary remote sources for review only; local AVIF fallback is explicitly marked as a placeholder.
// Fallback chain: direct listing image -> one known confirmed public cover -> neutral brand placeholder.
// Never substitute another apartment's interior or AI room photo.
function photoFallback(img){
 const stage=Number(img.dataset.fallbackStage||0);
 const next=img.dataset.fallback;
 if(stage===0 && next && img.getAttribute('src')!==next){img.dataset.fallbackStage='1';img.src=next;return;}
 if(stage<2){img.dataset.fallbackStage='2';img.src='/assets/img/foto-privremeno-nedostupna.svg';return;}
 img.closest('.gallery-tile,.hero__picture,.page-hero__visual,.real-gallery__item')?.classList.add('has-placeholder');
}
document.querySelectorAll('img.remote-photo').forEach(img=>{
 img.addEventListener('error',()=>photoFallback(img));
 if(img.complete && img.naturalWidth===0)photoFallback(img);
});
function getFormUrlData(){const p=new URLSearchParams(location.search);return {apartment:p.get('apartment')||'',arrival:p.get('arrival')||'',departure:p.get('departure')||'',guests:p.get('guests')||''}}
const currentValues=getFormUrlData();
for(const form of document.querySelectorAll('[data-inquiry-form]')){
 const apt=form.elements.namedItem('apartment'),arrival=form.elements.namedItem('arrival'),departure=form.elements.namedItem('departure');
 if(currentValues.apartment&&apt&&!apt.value)apt.value=currentValues.apartment;
 if(currentValues.arrival&&arrival)arrival.value=currentValues.arrival;
 if(currentValues.departure&&departure)departure.value=currentValues.departure;
 const guestField=form.elements.namedItem('guests');if(currentValues.guests&&guestField&&[...guestField.options].some(o=>o.value===currentValues.guests))guestField.value=currentValues.guests;
 const localDay=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
 if(arrival){arrival.min=localDay;arrival.addEventListener('change',()=>{if(departure){departure.min=arrival.value||localDay;if(departure.value&&departure.value<=arrival.value)departure.value=''}updateWhatsApp()})}
 if(departure)departure.min=arrival?.value&&arrival.value>localDay?arrival.value:localDay;
 apt?.addEventListener('change',updateWhatsApp);form.elements.namedItem('guests')?.addEventListener('change',updateWhatsApp);
 function updateWhatsApp(){const unit=apt?.value||'',start=arrival?.value||'',end=departure?.value||'',guests=form.elements.namedItem('guests')?.value||'';
  const msg=lang==='hr'?`Pozdrav, zanima me apartman ${unit||'u objektu Lucia'}${start&&end?`, od ${start} do ${end}`:''}, za ${guests} gostiju. Možete li potvrditi dostupnost i cijenu?`:lang==='en'?`Hello, I am interested in apartment ${unit||'at Lucia'}${start&&end?`, from ${start} to ${end}`:''}, for ${guests} guests. Could you confirm availability and price?`:`Guten Tag, ich interessiere mich für die Ferienwohnung ${unit||'bei Lucia'}${start&&end?`, vom ${start} bis ${end}`:''}, für ${guests} Gäste. Könnten Sie Verfügbarkeit und Preis bestätigen?`;
  form.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=WHATSAPP+'?text='+encodeURIComponent(msg));}
 updateWhatsApp();
 form.addEventListener('submit',async e=>{e.preventDefault();const status=form.querySelector('[data-form-status]');status.dataset.type='error';
  if(!form.checkValidity()||!arrival.value||!departure.value||departure.value<=arrival.value||arrival.value<localDay){status.textContent=messages.invalid;form.reportValidity();return}
  if(form.elements.namedItem('botcheck')?.value){return}
  if(!WEB3FORMS_ACCESS_KEY){status.textContent=messages.demo;return}
  const button=form.querySelector('button[type="submit"]');button.disabled=true;status.textContent=messages.sending;status.dataset.type='';
  const fd=new FormData(form);fd.append('access_key',WEB3FORMS_ACCESS_KEY);fd.append('subject','Lucia Biograd — inquiry / '+(apt.value||'any unit'));fd.append('from_name','Apartmani Lucia web');fd.append('replyto',form.elements.namedItem('email').value);
  try{const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:fd,headers:{Accept:'application/json'}});const data=await response.json();if(!response.ok||!data.success)throw new Error(data.message||'Failed');status.dataset.type='success';status.textContent=messages.success;form.reset();updateWhatsApp()}catch(error){status.dataset.type='error';status.textContent=messages.error}finally{button.disabled=false}
 });
}
// Lightbox keyboard, swipe, close and focus restoration.
const galleryButtons=[...document.querySelectorAll('[data-open-image]')],lightbox=document.getElementById('lightbox');
if(lightbox&&galleryButtons.length){let ix=0,returnFocus=null,touchX=null;const img=document.getElementById('lightboxImage'),count=document.getElementById('lightboxCount');
 function display(){const source=galleryButtons[ix].querySelector('img');img.src=source.currentSrc||source.src;img.alt=source.alt;count.textContent=`${ix+1} / ${galleryButtons.length}`}
 function close(){lightbox.hidden=true;document.body.classList.remove('lightbox-open');returnFocus?.focus()}
 function open(i,b){ix=i;returnFocus=b;display();lightbox.hidden=false;document.body.classList.add('lightbox-open');lightbox.querySelector('[data-lightbox-close]').focus()}
 galleryButtons.forEach((b,i)=>b.addEventListener('click',()=>open(i,b)));
 lightbox.querySelector('[data-lightbox-close]').addEventListener('click',close);
 lightbox.querySelector('[data-lightbox-next]').addEventListener('click',()=>{ix=(ix+1)%galleryButtons.length;display()});
 lightbox.querySelector('[data-lightbox-prev]').addEventListener('click',()=>{ix=(ix-1+galleryButtons.length)%galleryButtons.length;display()});
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});
 lightbox.addEventListener('touchstart',e=>{touchX=e.touches[0]?.clientX||null},{passive:true});
 lightbox.addEventListener('touchend',e=>{if(touchX===null)return;const x=e.changedTouches[0]?.clientX;const dx=x-touchX;if(Math.abs(dx)>55){ix=(ix+(dx<0?1:galleryButtons.length-1))%galleryButtons.length;display()}touchX=null},{passive:true});
 window.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight'){ix=(ix+1)%galleryButtons.length;display()}if(e.key==='ArrowLeft'){ix=(ix-1+galleryButtons.length)%galleryButtons.length;display()}if(e.key==='Tab'){const nodes=[...lightbox.querySelectorAll('button')];const n=nodes.indexOf(document.activeElement);if(e.shiftKey&&n===0){e.preventDefault();nodes[nodes.length-1].focus()}else if(!e.shiftKey&&n===nodes.length-1){e.preventDefault();nodes[0].focus()}}});
}
// Calendar shows UNKNOWN availability, never invents bookable dates.
const cal=document.querySelector('[data-calendar]');
if(cal){const title=cal.querySelector('[data-cal-title]'),weekdays=cal.querySelector('[data-cal-weekdays]'),days=cal.querySelector('[data-cal-days]');const prev=cal.querySelector('[data-cal-prev]'),next=cal.querySelector('[data-cal-next]'),cta=cal.querySelector('[data-cal-cta]');
 const today=new Date();today.setHours(0,0,0,0);const first=new Date(today.getFullYear(),today.getMonth(),1);let month=new Date(first),selected=[],availability={units:{}};const calUnit=cal.querySelector('[data-cal-unit]');
 fetch('/data/availability.json').then(r=>r.ok?r.json():null).then(data=>{if(data&&data.units){availability=data;render()}}).catch(()=>{});
 weekdays.innerHTML=messages.days.map(x=>`<span>${x}</span>`).join('');
 function iso(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
 function render(){title.textContent=messages.month[month.getMonth()]+' '+month.getFullYear();prev.disabled=month<=first;let offset=(new Date(month.getFullYear(),month.getMonth(),1).getDay()+6)%7;const max=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();days.innerHTML=Array(offset).fill('<span aria-hidden="true"></span>').join('');for(let day=1;day<=max;day++){const date=new Date(month.getFullYear(),month.getMonth(),day),str=iso(date);const b=document.createElement('button');b.type='button';b.textContent=day;b.title=messages.selected;b.dataset.date=str;const blocked=(calUnit?.value&&availability.units?.[calUnit.value]?.unavailable||[]).includes(str);b.disabled=date<today||blocked;b.setAttribute('aria-label',`${str} — ${blocked?'Unavailable':messages.selected}`);if(blocked)b.classList.add('is-unavailable');if(selected.includes(str))b.classList.add('is-selected');else if(selected.length===2&&str>selected[0]&&str<selected[1])b.classList.add('is-in-range');b.addEventListener('click',()=>{if(selected.length===0||selected.length===2)selected=[str];else if(str<=selected[0])selected=[str];else selected.push(str);render()});days.appendChild(b)}let u=new URL(cta.getAttribute('href'),'https://example.invalid');if(selected[0])u.searchParams.set('arrival',selected[0]);if(selected[1])u.searchParams.set('departure',selected[1]);if(calUnit?.value)u.searchParams.set('apartment',calUnit.value);else u.searchParams.delete('apartment');cta.href=u.pathname+u.search;}
 calUnit?.addEventListener('change',()=>{selected=[];render()});prev.addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()-1,1);render()});next.addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()+1,1);render()});render();
}

// Rates: show the compact inquiry panel until ALL seasonal values are confirmed.
// When the host completes data/prices.json, reveal the existing semantic price table.
fetch('/data/prices.json')
 .then(response=>response.ok?response.json():null)
 .then(data=>{
  if(!data||!Array.isArray(data.seasons))return;
  const isComplete=data.seasons.length>=3&&data.seasons.slice(0,3).every(s=>
   typeof s.start==='string'&&s.start.trim()&&
   typeof s.end==='string'&&s.end.trim()&&
   typeof s.nightlyEUR==='number'&&Number.isFinite(s.nightlyEUR)&&s.nightlyEUR>0&&
   Number.isInteger(s.minNights)&&s.minNights>0
  );
  if(!isComplete)return;
  for(const section of document.querySelectorAll('[data-price-section]')){
   const table=section.querySelector('.price-table');
   const wrap=section.querySelector('[data-price-table]');
   const pending=section.querySelector('[data-price-pending]');
   if(!table||!wrap||!pending)continue;
   const rows=[...(table.tBodies[0]?.rows||[])];
   if(rows.length<3)continue;
   const locale=lang==='hr'?'hr-HR':lang==='de'?'de-DE':'en-GB';
   const formatSeasonDate=iso=>new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',year:'numeric'}).format(new Date(iso+'T12:00:00'));
   data.seasons.slice(0,3).forEach((season,i)=>{
    rows[i].cells[1].textContent=formatSeasonDate(season.start)+' – '+formatSeasonDate(season.end);
    rows[i].cells[2].textContent=new Intl.NumberFormat(locale,{
     style:'currency',currency:'EUR',maximumFractionDigits:0
    }).format(season.nightlyEUR);
    rows[i].cells[3].textContent=String(season.minNights);
   });
   wrap.hidden=false;
   pending.hidden=true;
  }
 }).catch(()=>{});

// Premium cinematic intro: session-only and fully skippable.
// Content is never hidden by default; no JavaScript means no intro overlay.
(function initLuciaIntro(){
 const intro=document.getElementById('introLayer');
 if(!intro)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let already=false;try{already=sessionStorage.getItem('lucia_intro_seen')==='yes'}catch(e){already=false}
 if(reduced||already||location.hash==='#provjeri-dostupnost')return;
 document.body.classList.add('intro-visible');
 const skip=document.getElementById('introSkip');
 let closed=false;
 function close(){
  if(closed)return;closed=true;try{sessionStorage.setItem('lucia_intro_seen','yes')}catch(e){}
  intro.classList.add('is-leaving');
  setTimeout(()=>{document.body.classList.remove('intro-visible');intro.remove()},760);
 }
 skip?.addEventListener('click',close);
 document.addEventListener('keydown',function key(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',key)}},{once:false});
 setTimeout(close,2600);
})();


// Horizontal inquiry search below the home hero. Never claims live inventory.
for(const booking of document.querySelectorAll('[data-booking-bar]')){
 const start=booking.elements.namedItem('arrival');
 const end=booking.elements.namedItem('departure');
 const localToday=()=>{const now=new Date();const local=new Date(now.getTime()-now.getTimezoneOffset()*60000);return local.toISOString().slice(0,10)};
 const today=localToday();start.min=today;end.min=today;
 start.addEventListener('change',()=>{end.min=start.value||today;if(end.value&&end.value<=start.value)end.value=''});
 booking.addEventListener('submit',event=>{
  // User chooses a date range and goes to the existing detailed inquiry form.
  // No availability is fabricated and no reservation is created here.
  if(!start.value||!end.value||start.value<today||end.value<=start.value){
   event.preventDefault();
   if(!start.value||start.value<today){start.setCustomValidity(lang==='hr'?'Odaberite valjani datum dolaska.':lang==='de'?'Bitte wählen Sie ein gültiges Anreisedatum.':'Please choose a valid check-in date.');start.reportValidity();start.addEventListener('input',()=>start.setCustomValidity(''),{once:true})}
   else {end.setCustomValidity(lang==='hr'?'Odlazak mora biti nakon dolaska.':lang==='de'?'Die Abreise muss nach der Anreise liegen.':'Check-out must be after check-in.');end.reportValidity();end.addEventListener('input',()=>end.setCustomValidity(''),{once:true})}
  }
 });
}

// Close the mobile header language selector on outside tap or Escape.
const headerLanguageDropdown=document.querySelector('.mobile-lang-control--header .mobile-lang-dropdown');
if(headerLanguageDropdown){
  document.addEventListener('pointerdown',event=>{if(!headerLanguageDropdown.contains(event.target))headerLanguageDropdown.open=false;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&headerLanguageDropdown.open){headerLanguageDropdown.open=false;headerLanguageDropdown.querySelector('summary')?.focus();}});
}
