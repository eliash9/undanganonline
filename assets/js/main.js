/* Main interactivity for the wedding invitation */
(function(){
  const CFG = window.INVITATION_CONFIG || null;
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Open Invitation & Music control
  const bgm = $('#bg-music');
  const musicBtn = $('#music-toggle');
  const openBtn = $('#open-invitation');
  let musicOn = false;
  function toggleMusic(force){
    if(!bgm) return;
    const shouldPlay = typeof force==='boolean' ? force : !musicOn;
    if(shouldPlay){
      bgm.play().then(()=>{musicOn=true; musicBtn.textContent='⏸';}).catch(()=>{});
    }else{
      bgm.pause(); musicOn=false; musicBtn.textContent='🔊';
    }
  }
  openBtn?.addEventListener('click', ()=>{
    document.getElementById('cover')?.scrollIntoView({behavior:'smooth'});
    toggleMusic(true);
  });
  musicBtn?.addEventListener('click', ()=> toggleMusic());

  // Apply dynamic configuration
  (function applyConfig(){
    if(!CFG) return;
    // SEO and share
    if(CFG.seo?.title) document.title = CFG.seo.title;
    if(CFG.seo?.description) {
      const d = $("meta[name='description']"); if(d) d.setAttribute('content', CFG.seo.description);
    }
    if(CFG.media?.ogImage){ const og = $("meta[property='og:image']"); og?.setAttribute('content', CFG.media.ogImage); }
    const ogt = $("meta[property='og:title']"); if(ogt && CFG.seo?.title) ogt.setAttribute('content', CFG.seo.title);
    const ogd = $("meta[property='og:description']"); if(ogd && CFG.seo?.description) ogd.setAttribute('content', CFG.seo.description);

    // Names
    if(CFG.couple){
      if(CFG.couple.bride?.shortName) $('#brideName').textContent = CFG.couple.bride.shortName;
      if(CFG.couple.groom?.shortName) $('#groomName').textContent = CFG.couple.groom.shortName;
      if(CFG.couple.bride?.fullName) $('#brideFullName')?.replaceChildren(document.createTextNode(CFG.couple.bride.fullName));
      if(CFG.couple.bride?.parents) $('#brideParents')?.replaceChildren(document.createTextNode(CFG.couple.bride.parents));
      if(CFG.couple.bride?.origin) $('#brideOrigin')?.replaceChildren(document.createTextNode(CFG.couple.bride.origin));
      if(CFG.couple.groom?.fullName) $('#groomFullName')?.replaceChildren(document.createTextNode(CFG.couple.groom.fullName));
      if(CFG.couple.groom?.parents) $('#groomParents')?.replaceChildren(document.createTextNode(CFG.couple.groom.parents));
      if(CFG.couple.groom?.origin) $('#groomOrigin')?.replaceChildren(document.createTextNode(CFG.couple.groom.origin));
      if(CFG.couple.bride?.photoUrl) $('#bridePhoto')?.setAttribute('src', CFG.couple.bride.photoUrl);
      if(CFG.couple.groom?.photoUrl) $('#groomPhoto')?.setAttribute('src', CFG.couple.groom.photoUrl);
    }

    // Date and countdown
    if(CFG.event){
      if(CFG.event.dateText) $('#weddingDateText').textContent = CFG.event.dateText;
      if(CFG.event.countdownTarget) $('#countdownGrid')?.setAttribute('data-target-date', CFG.event.countdownTarget);

      // Event details
      if(CFG.event.akad){
        $('#akadDate')?.replaceChildren(document.createTextNode(CFG.event.akad.dateText||''));
        $('#akadTime')?.replaceChildren(document.createTextNode(CFG.event.akad.timeText||''));
        $('#akadPlace')?.replaceChildren(document.createTextNode(CFG.event.akad.place||''));
        $('#akadNote')?.replaceChildren(document.createTextNode(CFG.event.akad.note||''));
      }
      if(CFG.event.resepsi){
        $('#resepsiDate')?.replaceChildren(document.createTextNode(CFG.event.resepsi.dateText||''));
        $('#resepsiTime')?.replaceChildren(document.createTextNode(CFG.event.resepsi.timeText||''));
        $('#resepsiPlace')?.replaceChildren(document.createTextNode(CFG.event.resepsi.place||''));
        $('#resepsiNote')?.replaceChildren(document.createTextNode(CFG.event.resepsi.note||''));
      }
      if(CFG.event.venueAddress) $('#venueAddress')?.replaceChildren(document.createTextNode(CFG.event.venueAddress));
    }

    // Map
    if(CFG.map){
      if(CFG.map.embedSrc) $('#mapFrame')?.setAttribute('src', CFG.map.embedSrc);
      if(CFG.map.mapLink) $('#mapLink')?.setAttribute('href', CFG.map.mapLink);
    }

    // Media
    if(CFG.media){
      // Cover background
      if(CFG.media.coverImage){
        const cover = $('#cover');
        const gradient = 'linear-gradient(180deg, #efe7df, #fff)';
        cover && (cover.style.backgroundImage = `${gradient}, url('${CFG.media.coverImage}')`);
      }
      if(CFG.media.musicUrl){ bgm?.setAttribute('src', CFG.media.musicUrl); }
      if(CFG.media.videoUrl){ $('#videoFrame')?.setAttribute('src', CFG.media.videoUrl); }
      if(CFG.media.liveUrl){ $('#liveFrame')?.setAttribute('src', CFG.media.liveUrl); }
      if(Array.isArray(CFG.media.gallery)){
        const grid = $('#galleryGrid'); if(grid){ grid.innerHTML='';
          CFG.media.gallery.forEach(img=>{
            const a = document.createElement('a'); a.href = img.src;
            const i = document.createElement('img'); i.src = img.thumb || img.src; i.alt = img.alt || '';
            i.loading='lazy'; a.appendChild(i); grid.appendChild(a);
          });
        }
      }
    }

    // Love story
    if(Array.isArray(CFG.loveStory)){
      const tl = $('#timeline'); if(tl){ tl.innerHTML='';
        CFG.loveStory.forEach(ev=>{
          const wrap = document.createElement('div'); wrap.className='event';
          const dot = document.createElement('span'); dot.className='dot';
          const cont = document.createElement('div'); cont.className='content';
          const h4 = document.createElement('h4'); h4.textContent = ev.title || '';
          const time = document.createElement('time'); time.textContent = ev.time || '';
          const p = document.createElement('p'); p.textContent = ev.text || '';
          cont.append(h4, time, p); wrap.append(dot, cont); tl.appendChild(wrap);
        });
      }
    }

    // Footer contact/credit
    if(CFG.contact){
      if(CFG.contact.footerText) $('#footerContact')?.replaceChildren(document.createTextNode(CFG.contact.footerText));
      if(CFG.contact.credit) $('#footerCredit')?.replaceChildren(document.createTextNode(CFG.contact.credit));
    }
  })();

  // Countdown
  (function initCountdown(){
    const wrap = $('.countdown-grid'); if(!wrap) return;
    const target = new Date(wrap.getAttribute('data-target-date'));
    const d=$('#d',wrap), h=$('#h',wrap), m=$('#m',wrap), s=$('#s',wrap);
    function pad(n){return String(n).padStart(2,'0')}
    function tick(){
      const now = new Date();
      let diff = Math.max(0, target-now);
      const sec = Math.floor(diff/1000)%60;
      const min = Math.floor(diff/1000/60)%60;
      const hr  = Math.floor(diff/1000/60/60)%24;
      const day = Math.floor(diff/1000/60/60/24);
      d.textContent=pad(day); h.textContent=pad(hr); m.textContent=pad(min); s.textContent=pad(sec);
    }
    tick(); setInterval(tick, 1000);
  })();

  // Intersection reveal
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
  },{threshold:.15});
  $$('.reveal').forEach(el=> io.observe(el));

  // Floating nav active state (scroll spy)
  (function initFloatingNav(){
    const links = $$('.floating-nav a'); if(!links.length) return;
    const map = new Map(links.map(a=>[a.getAttribute('data-target'), a]));
    links.forEach(a=>{
      a.addEventListener('click', (e)=>{
        // default anchor behavior already smooth via CSS; keep for robustness
        const id = a.getAttribute('data-target'); const sec = document.getElementById(id);
        if(sec){ e.preventDefault(); sec.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    });
    const sections = Array.from(map.keys()).map(id=> document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const id = entry.target.id;
          links.forEach(l=> l.classList.toggle('active', l.getAttribute('data-target')===id));
        }
      });
    },{rootMargin:'-40% 0px -55% 0px', threshold:0.01});
    sections.forEach(sec=> obs.observe(sec));
  })();

  // Back to top
  $('#backToTop')?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // Banner toggle
  const banner = $('#health-banner');
  const bannerDismissed = localStorage.getItem('bannerDismissed');
  if(!bannerDismissed) banner?.classList.remove('hidden');
  $('#close-banner')?.addEventListener('click', ()=>{ banner?.classList.add('hidden'); localStorage.setItem('bannerDismissed','1'); });

  // Google Calendar link & ICS download
  (function initCalendar(){
    const g = $('#gcal-link'); const icsBtn = $('#ics-download'); if(!g||!icsBtn) return;
    const title = (CFG?.event?.calendar?.title) || 'Akad & Resepsi';
    const details = (CFG?.event?.calendar?.details) || '';
    const location = (CFG?.event?.calendar?.location) || '';
    const start = new Date((CFG?.event?.calendar?.startISO) || new Date());
    const end   = new Date((CFG?.event?.calendar?.endISO)   || new Date());
    function toGCalDate(dt){
      // YYYYMMDDTHHMMSSZ (convert to UTC)
      const utc = new Date(dt.getTime() - (dt.getTimezoneOffset()*60000));
      return utc.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/, 'Z');
    }
    const gcalUrl = new URL('https://www.google.com/calendar/render');
    gcalUrl.searchParams.set('action','TEMPLATE');
    gcalUrl.searchParams.set('text', title);
    gcalUrl.searchParams.set('details', details);
    gcalUrl.searchParams.set('location', location);
    gcalUrl.searchParams.set('dates', `${toGCalDate(start)}/${toGCalDate(end)}`);
    g.href = gcalUrl.toString();

    icsBtn.addEventListener('click', ()=>{
      function icsFormat(dt){
        const utc = new Date(dt.getTime() - (dt.getTimezoneOffset()*60000));
        return utc.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/, 'Z');
      }
      const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Undangan Online//ID\nBEGIN:VEVENT\nUID:${Date.now()}@undangan.local\nDTSTAMP:${icsFormat(new Date())}\nDTSTART:${icsFormat(start)}\nDTEND:${icsFormat(end)}\nSUMMARY:${title}\nDESCRIPTION:${details}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([ics], {type:'text/calendar'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='undangan.ics'; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 1000);
    });
  })();

  // Gallery lightbox
  (function initLightbox(){
    const grid = $('#galleryGrid'); if(!grid) return;
    const modal = $('#lightbox'); const img = $('#lightboxImg'); const close=$('#lightboxClose');
    grid.addEventListener('click', (e)=>{
      const a = e.target.closest('a'); if(!a) return; e.preventDefault();
      img.src = a.getAttribute('href'); modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    });
    function hide(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); img.removeAttribute('src'); }
    close.addEventListener('click', hide);
    modal.addEventListener('click', (e)=>{ if(e.target===modal) hide(); });
    window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hide(); });
  })();

  // RSVP (localStorage) + WA share
  (function initRSVP(){
    const form = $('#rsvpForm'); if(!form) return;
    const status = $('#rsvpStatus'); const list = $('#rsvpList'); const clear = $('#clearRsvp'); const waShare = $('#wa-share-rsvp');
    const KEY='rsvpEntries';
    function load(){ try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]} }
    function save(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }
    function render(){ list.innerHTML=''; load().forEach(x=>{ const li=document.createElement('li'); li.textContent=`${x.name} (${x.attendance}) • ${x.guests} tamu${x.note?` – ${x.note}`:''}`; list.appendChild(li); }); }
    render();
    form.addEventListener('submit', (e)=>{
      e.preventDefault(); const fd=new FormData(form);
      const data={ name:fd.get('name').toString().trim(), contact:fd.get('contact').toString().trim(), guests:+fd.get('guests')||1, attendance:fd.get('attendance'), note:fd.get('note').toString().trim(), ts:Date.now() };
      if(!data.name||!data.contact){ status.textContent='Nama dan kontak wajib diisi.'; return; }
      const arr=load(); arr.unshift(data); save(arr); render(); status.textContent='RSVP tersimpan di perangkat ini.'; form.reset();
    });
    clear?.addEventListener('click', ()=>{ if(confirm('Hapus seluruh data RSVP lokal?')){ localStorage.removeItem(KEY); render(); }});
    waShare?.addEventListener('click', (e)=>{
      const fd = new FormData(form);
      const msg = `RSVP Undangan\nNama: ${fd.get('name')||''}\nKontak: ${fd.get('contact')||''}\nJumlah: ${fd.get('guests')||1}\nStatus: ${fd.get('attendance')||'hadir'}\nCatatan: ${fd.get('note')||''}`;
      const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
      waShare.href = url;
    });
  })();

  // Guestbook / Wishes (localStorage)
  (function initWishes(){
    const form = $('#wishForm'); if(!form) return;
    const list = $('#wishes'); const status = $('#wishStatus'); const KEY='guestbookEntries';
    function load(){ try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]} }
    function save(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }
    function render(){
      list.innerHTML='';
      load().forEach(x=>{
        const li=document.createElement('li');
        const meta=document.createElement('div'); meta.className='meta';
        const who = [x.name, x.from?`• ${x.from}`:''].filter(Boolean).join(' ');
        const when = new Date(x.ts).toLocaleString('id-ID',{dateStyle:'medium', timeStyle:'short'});
        meta.textContent = `${who} — ${when}`;
        const p=document.createElement('p'); p.textContent=x.message;
        li.appendChild(meta); li.appendChild(p); list.appendChild(li);
      });
    }
    render();
    form.addEventListener('submit', (e)=>{
      e.preventDefault(); const fd = new FormData(form);
      const data = { name:fd.get('name').toString().trim(), from:fd.get('from').toString().trim(), message:fd.get('message').toString().trim(), ts:Date.now() };
      if(!data.name||!data.message){ status.textContent='Nama dan ucapan wajib diisi.'; return; }
      const arr = load(); arr.unshift(data); save(arr); form.reset(); render(); status.textContent='Ucapan tersimpan di perangkat ini.';
    });
  })();

  // Share buttons
  (function initShare(){
    const shareBtn = $('#shareBtn'); const waBtn = $('#waShareBtn'); const copyBtn = $('#copyLinkBtn');
    const url = window.location.href; const title = (CFG?.share?.title) || document.title; const text = (CFG?.share?.text) || 'Undangan pernikahan. Mohon doa restu.';
    waBtn.href = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
    shareBtn?.addEventListener('click', async()=>{
      if(navigator.share){ try{ await navigator.share({title, text, url}); }catch(_){} }
      else{ await navigator.clipboard.writeText(url); shareBtn.textContent='Link tersalin ✓'; setTimeout(()=>shareBtn.textContent='Bagikan', 2000); }
    });
    copyBtn?.addEventListener('click', async()=>{
      await navigator.clipboard.writeText(url); copyBtn.textContent='Tersalin ✓'; setTimeout(()=>copyBtn.textContent='Salin Link', 2000);
    });
  })();

  // Year
  const y = $('#year'); if(y) y.textContent = new Date().getFullYear();
})();
