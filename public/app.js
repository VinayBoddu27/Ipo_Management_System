// app.js - keep in public/app.js
// Simple client-side logic: generates decorative bars, handles submit, shows inline result

// create left decorative bars
(function createLeftBars(){
  const chart = document.getElementById('leftChart');
  if (!chart) return;
  for (let i=0; i<40; i++){
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.left = (i * 10) + 'px';
    bar.style.height = (40 + Math.random() * 140) + 'px';
    bar.style.animation = `barsUpDown ${1.2 + Math.random()*0.8}s ${Math.random()*0.8}s infinite ease-in-out`;
    if (Math.random() > 0.6) bar.style.background = 'linear-gradient(180deg,#ff4b5c,#ffb347)';
    chart.appendChild(bar);
  }
  // keyframes added dynamically for compatibility
  const style = document.createElement('style');
  style.innerHTML = '@keyframes barsUpDown{0%,100%{transform:scaleY(0.5)}50%{transform:scaleY(1.1)}} .bar{transform-origin:bottom center;}';
  document.head.appendChild(style);
})();

// element refs
const submitBtn = document.getElementById('submitBtn');
const resultInlineArea = document.getElementById('resultInlineArea');
const movedChartPlaceholder = document.getElementById('movedChartPlaceholder');
const leftVisuals = document.getElementById('leftVisuals');

submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(){
  const ipo = document.getElementById('ipo').value.trim();
  const pan = document.getElementById('pan').value.trim();

  if (!ipo || !pan) {
    alert('Please select IPO and enter PAN');
    return;
  }

  // hide left visuals (so nothing shows through)
  document.body.classList.add('hide-visuals'); // css class defined in index if required
  if (leftVisuals) leftVisuals.style.display = 'none';

  // create a small preview below the result
  showSmallPreview();

  // fake allotment rule: Groww => success, others fail (demo)
  const success = ipo.toLowerCase() === 'groww';
  renderInlineResult(success, ipo, pan);
}

function renderInlineResult(success, ipo, pan){
  resultInlineArea.setAttribute('aria-hidden', 'false');
  resultInlineArea.innerHTML = ''; // clear

  const card = document.createElement('div');
  card.className = 'card';

  if (success) {
    card.innerHTML = `
      <div class="tick" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#00ff9f">
          <path d="M9 16.17 4.83 12 3.41 13.41 9 19l12-12L19.59 5.59z"/>
        </svg>
      </div>
      <h3 style="text-align:center;color:#baffd4">Congratulations — you got an allotment!</h3>
      <div style="text-align:center;color:#dff9ef;margin-top:8px">
        Your application for <strong>${escapeHtml(ipo)}</strong> with PAN <strong>${escapeHtml(pan)}</strong> has been allotted.
      </div>
      <div class="btn-row">
        <button id="viewBtn">View Details</button>
        <button id="closeBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.06);color:#fff">Close</button>
      </div>
    `;
    resultInlineArea.appendChild(card);
    document.getElementById('viewBtn').addEventListener('click', ()=> alert('Open allotment details (demo)'));
    document.getElementById('closeBtn').addEventListener('click', restoreUI);
    // small celebration
    launchConfetti();
  } else {
    card.innerHTML = `
      <div class="sad" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#ff7b8a">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9 11c.83 0 1.5.67 1.5 1.5S9.83 14 9 14 7.5 13.33 7.5 12.5 8.17 11 9 11z"/>
        </svg>
      </div>
      <h3 style="text-align:center;color:#ffb6bd">Better luck next time</h3>
      <div style="text-align:center;color:#dff9ef;margin-top:8px">
        Unfortunately, <strong>${escapeHtml(ipo)}</strong> did not result in an allotment for PAN <strong>${escapeHtml(pan)}</strong>.
      </div>
      <div class="btn-row">
        <button id="tryBtn">Try Another IPO</button>
        <button id="closeFail" style="background:transparent;border:1px solid rgba(255,255,255,0.06);color:#fff">Close</button>
      </div>
    `;
    resultInlineArea.appendChild(card);
    document.getElementById('tryBtn').addEventListener('click', ()=> { restoreUI(true); document.getElementById('ipo').focus(); });
    document.getElementById('closeFail').addEventListener('click', restoreUI);
  }

  // ensure result visible
  card.scrollIntoView({behavior:'smooth',block:'center'});
}

function showSmallPreview(){
  movedChartPlaceholder.setAttribute('aria-hidden', 'false');
  movedChartPlaceholder.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.style.display = 'block';

  // small decorative chart
  const smallChart = document.createElement('div');
  smallChart.style.height = '120px';
  smallChart.style.position = 'relative';
  smallChart.style.overflow = 'hidden';
  for (let i=0;i<18;i++){
    const b = document.createElement('div');
    b.className = 'bar';
    b.style.left = (i * 10) + 'px';
    b.style.height = (30 + Math.random()*90)+'px';
    b.style.bottom = '0';
    b.style.width = '6px';
    b.style.position = 'absolute';
    if (Math.random()>0.6) b.style.background='linear-gradient(180deg,#ff4b5c,#ffb347)';
    smallChart.appendChild(b);
  }
  wrap.appendChild(smallChart);

  // optional preview image (if you have an uploaded asset)
  /* Uncomment and set path if you have an image available:
  const img = document.createElement('img');
  img.src = '/path/to/preview.png';
  img.alt = 'preview';
  img.style.width = '100%';
  img.style.marginTop = '8px';
  img.style.borderRadius = '6px';
  wrap.appendChild(img);
  */

  movedChartPlaceholder.appendChild(wrap);
}

function restoreUI(keepPreview){
  // show left visuals again
  if (leftVisuals) leftVisuals.style.display = '';
  resultInlineArea.innerHTML = '';
  resultInlineArea.setAttribute('aria-hidden','true');
  if (!keepPreview) {
    movedChartPlaceholder.innerHTML = '';
    movedChartPlaceholder.setAttribute('aria-hidden','true');
    document.body.classList.remove('hide-visuals');
  }
}

// very small confetti
function launchConfetti(){
  const colors = ['#00ff9f','#00d4ff','#ffdd57','#ff7b8a','#9b8cff'];
  for (let i=0;i<40;i++){
    const el = document.createElement('div');
    el.style.position='fixed';
    el.style.left = Math.random()*window.innerWidth+'px';
    el.style.top = (-10-Math.random()*200)+'px';
    el.style.width = (6+Math.random()*10)+'px';
    el.style.height = (8+Math.random()*12)+'px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.opacity = '0.95';
    el.style.zIndex = '9999';
    el.style.borderRadius = '2px';
    document.body.appendChild(el);
    const dur = 1200 + Math.random()*1400;
    animateConfetti(el, dur);
  }
  setTimeout(()=>document.querySelectorAll('body > div[style*="position: fixed"]').forEach(n=>n.remove()), 4000);
}
function animateConfetti(el, dur){
  const start = performance.now();
  const startX = parseFloat(el.style.left);
  const endY = window.innerHeight + 200;
  function frame(now){
    const t = Math.min(1, (now-start)/dur);
    const ease = 1 - Math.pow(1-t,3);
    const x = startX + Math.sin(t * Math.PI * 2) * (20 + Math.random()*30);
    const y = (parseFloat(el.style.top) || -50) + endY * ease;
    el.style.transform = `translate(${x-startX}px, ${y}px) rotate(${t*720}deg)`;
    el.style.opacity = `${1-t*0.95}`;
    if (t < 1) requestAnimationFrame(frame); else el.remove();
  }
  requestAnimationFrame(frame);
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}
