/* Hallandale Websites · "claim this site" bar.
   Config lives on this script tag in index.html:
     data-enabled="false"  -> nothing renders (the site looks exactly as before)
     data-enabled="true"   -> bar shows for everyone (needs data-pay)
     data-pay="https://pay.mrsalesforce.com/<id>"
   Preview without enabling: add ?claim=1 to the URL. */
(function () {
  var me = document.currentScript || document.querySelector('script[data-claim]');
  if (!me) return;
  var cfg = me.dataset || {};
  var pay = (cfg.pay || '').trim();
  var preview = /[?&]claim=1(?:&|$)/.test(location.search);
  var enabled = cfg.enabled === 'true' && /^https:\/\//.test(pay);
  if (!enabled && !preview) return;
  try { if (sessionStorage.getItem('hbClaimHidden') === '1' && !preview) return; } catch (e) {}

  function start() {
    var header = document.querySelector('header.nav, #nav');
    var dock = document.querySelector(cfg.dock || '.mbar, .dock, .sticky-bar');
    var cta = header && header.lastElementChild && header.lastElementChild.tagName === 'A' ? header.lastElementChild : (header && header.querySelector('a.btn:last-of-type'));
    var navEl = header && header.querySelector('nav');
    var cs = function (el) { return el ? getComputedStyle(el) : null; };
    var solidBg = function (c) { var m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return false; var p = m[1].split(','); return p.length < 4 || parseFloat(p[3]) > 0.35; };

    var rgb = function (c) { var m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; var p = m[1].split(',').map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
    var opaque = function (c) { var x = rgb(c); return x ? 'rgb(' + x.r + ',' + x.g + ',' + x.b + ')' : c; };
    var lum = function (c) { var x = rgb(c); if (!x) return 0; var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(x.r) + 0.7152 * f(x.g) + 0.0722 * f(x.b); };
    var contrast = function (a, b) { var l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    // ---- theme from the site's own computed styles ----
    var dcs = cs(dock), ccs = cs(cta), bcs = cs(document.body), hcs = cs(header);
    var dockBtn = null;
    if (dock) { var as = dock.querySelectorAll('a'); for (var i = 0; i < as.length; i++) { var a = cs(as[i]); if (solidBg(a.backgroundColor) || /gradient/.test(a.backgroundImage)) { dockBtn = as[i]; break; } } }
    var btnEl = dockBtn || cta, btcs = cs(btnEl);
    var t = {
      barBg: dcs && solidBg(dcs.backgroundColor) ? dcs.backgroundColor : (btcs ? btcs.color : '#111'),
      barFg: dock && dock.querySelector('a') ? cs(dock.querySelector('a')).color : '#fff',
      radius: dcs ? dcs.borderRadius : '16px',
      btnBg: btcs ? (solidBg(btcs.backgroundColor) ? btcs.backgroundColor : '') : '#fff',
      btnImg: btcs && /gradient/.test(btcs.backgroundImage) ? btcs.backgroundImage : 'none',
      btnFg: btcs ? btcs.color : '#111',
      font: bcs.fontFamily,
      ctaFont: ccs ? ccs.fontFamily : bcs.fontFamily,
      ctaBg: ccs && solidBg(ccs.backgroundColor) ? ccs.backgroundColor : (ccs ? ccs.color : '#111'),
      ctaImg: ccs && /gradient/.test(ccs.backgroundImage) ? ccs.backgroundImage : 'none',
      ctaFg: ccs ? ccs.color : '#fff'
    };
    t.barBg = opaque(t.barBg);
    if (contrast(t.barFg, t.barBg) < 4.5) {
      var cands = [ccs && ccs.color, btcs && btcs.color, hcs && hcs.color, bcs.color, '#141414', '#ffffff'];
      for (var ci = 0; ci < cands.length; ci++) { if (cands[ci] && contrast(cands[ci], t.barBg) >= 4.5) { t.barFg = cands[ci]; break; } }
    }
    if (!t.btnBg && t.btnImg === 'none') { t.btnBg = t.barFg; t.btnFg = t.barBg; }
    if (t.btnImg === 'none' && t.btnBg && contrast(t.btnBg, t.barBg) < 1.35) { t.btnBg = t.barFg; t.btnFg = t.barBg; t.btnImg = 'none'; }

    var css = '' +
      '.hbc-bar{position:fixed;z-index:59;display:flex;align-items:center;gap:10px;padding:7px 7px 7px 16px;box-sizing:border-box;' +
      'background:' + t.barBg + ';color:' + t.barFg + ';border-radius:' + t.radius + ';font-family:' + t.font + ';' +
      'box-shadow:0 10px 30px -14px rgba(0,0,0,.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
      'transform:translateY(12px);opacity:0;transition:opacity .35s,transform .35s;pointer-events:none}' +
      '.hbc-bar.on{opacity:1;transform:none;pointer-events:auto}' +
      '.hbc-bar .hbc-t{flex:1;min-width:0;line-height:1.15}' +
      '.hbc-bar .hbc-t b{display:block;font-size:14px;font-weight:700;letter-spacing:.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.hbc-bar .hbc-t small{display:block;font-size:11px;opacity:.78;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.hbc-bar .hbc-go{flex:none;display:inline-flex;align-items:center;gap:6px;padding:10px 15px;border-radius:999px;text-decoration:none;font:700 13px/1 ' + t.ctaFont + ';letter-spacing:.02em;white-space:nowrap;' +
      'background:' + (t.btnBg || 'transparent') + ';background-image:' + t.btnImg + ';color:' + t.btnFg + '}' +
      '.hbc-bar .hbc-x{flex:none;width:26px;height:26px;border:0;background:none;color:inherit;opacity:.55;font:400 18px/1 sans-serif;cursor:pointer;padding:0}' +
      '.hbc-pill{position:absolute;top:50%;transform:translateY(-50%);z-index:2;display:inline-flex;align-items:center;gap:8px;padding:8px 14px 8px 12px;border-radius:999px;' +
      'text-decoration:none;white-space:nowrap;font:600 13px/1 ' + t.ctaFont + ';letter-spacing:.02em;color:inherit;' +
      'border:1px solid currentColor;opacity:0;transition:opacity .3s,background .25s,color .25s,border-color .25s}' +
      '.hbc-pill.on{opacity:.92}' +
      '.hbc-pill:hover,.hbc-pill:focus-visible{opacity:1;background:' + t.ctaBg + ';background-image:' + t.ctaImg + ';color:' + t.ctaFg + ';border-color:transparent}' +
      '.hbc-pill i{width:7px;height:7px;border-radius:50%;background:' + t.ctaBg + ';background-image:' + t.ctaImg + ';flex:none}' +
      '.hbc-pill:hover i{background:currentColor}' +
      '.hbc-pill .hbc-s{display:none}' +
      '.hbc-pill.hang{top:calc(100% + 10px);transform:none;background:' + t.ctaBg + ';background-image:' + t.ctaImg + ';color:' + t.ctaFg + ';border-color:transparent;box-shadow:0 10px 24px -12px rgba(0,0,0,.5);padding:9px 15px}' +
      '.hbc-pill.hang i{background:currentColor;opacity:.7}' +
      '.hbc-pill.hang.on{opacity:1}' +
      '.hbc-pill.short .hbc-l{display:none}.hbc-pill.short .hbc-s{display:inline}' +
      '@media (prefers-reduced-motion:reduce){.hbc-bar,.hbc-pill{transition:none}}';
    var st = document.createElement('style'); st.setAttribute('data-hb-claim', ''); st.textContent = css; document.head.appendChild(st);

    var href = /^https:\/\//.test(pay) ? pay : '#';
    var tip = '$99 for the first year, domain included.';
    function track(where) {
      try {
        var m = location.pathname.match(/\/hallandale\/([^\/]+)/), biz = m ? m[1] : 'site';
        if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: '/' + biz + '/claim-click', title: biz + ' · claim-click (' + where + ')', event: true });
      } catch (e) {}
    }
    function onClick(where) { return function (e) { track(where); if (href === '#') { e.preventDefault(); alert('Preview: the pay link for this shop is not set yet.'); } }; }

    var bar = document.createElement('div');
    bar.className = 'hbc-bar'; bar.setAttribute('role', 'complementary'); bar.setAttribute('aria-label', 'Claim this website');
    bar.innerHTML = '<div class="hbc-t"><b>This site could be yours</b><small>$99 first year, domain included</small></div>' +
      '<a class="hbc-go" target="_blank" rel="noopener">Claim it · $99</a><button class="hbc-x" type="button" aria-label="Hide">×</button>';
    var go = bar.querySelector('.hbc-go'); go.href = href; go.title = tip; go.addEventListener('click', onClick('bar'));
    bar.querySelector('.hbc-x').addEventListener('click', function () { bar.remove(); pill && pill.remove(); document.body.style.paddingBottom = basePad; try { sessionStorage.setItem('hbClaimHidden', '1'); } catch (e) {} });
    document.body.appendChild(bar);

    var pill = null;
    if (header && getComputedStyle(header).position !== 'static') {
      pill = document.createElement('a');
      pill.className = 'hbc-pill'; pill.href = href; pill.target = '_blank'; pill.rel = 'noopener'; pill.title = tip;
      pill.innerHTML = '<i></i><span class="hbc-l">This could be yours — claim it for $99</span><span class="hbc-s">Claim it · $99</span>';
      pill.addEventListener('click', onClick('header'));
      header.appendChild(pill);
    }

    var basePad = document.body.style.paddingBottom || '';
    var basePadPx = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    var raf = 0;
    function visible(el) { if (!el || !el.isConnected) return false; var s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden') return false; var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; }
    function layout() {
      raf = 0;
      if (!bar.isConnected) return;
      var mobile = visible(dock) && window.innerWidth < 1100;
      if (mobile) {
        var r = dock.getBoundingClientRect();
        bar.style.left = Math.max(8, r.left) + 'px';
        bar.style.width = Math.min(window.innerWidth - 16, r.width) + 'px';
        bar.style.bottom = Math.max(8, window.innerHeight - r.top + 8) + 'px';
        bar.style.display = ''; bar.classList.add('on');
        if (pill) pill.classList.remove('on');
        document.body.style.paddingBottom = (basePadPx + bar.offsetHeight + 10) + 'px';
        return;
      }
      bar.classList.remove('on'); bar.style.display = 'none';
      document.body.style.paddingBottom = basePad;
      if (!pill) return;
      // place the pill just left of the header's call button, only where there is clear room
      var hr = header.getBoundingClientRect(), cr = visible(cta) ? cta.getBoundingClientRect() : null;
      var rightEdge = cr ? cr.left - 14 : hr.right - 24;
      var leftLimit = 0, kids = header.children;
      for (var i = 0; i < kids.length; i++) { var k = kids[i]; if (k === pill || k === cta || !visible(k)) continue; var kr = k.getBoundingClientRect(); if (kr.right < rightEdge) leftLimit = Math.max(leftLimit, kr.right); }
      if (navEl && visible(navEl)) { var as = navEl.querySelectorAll('a'); for (var j = 0; j < as.length; j++) { var ar = as[j].getBoundingClientRect(); if (ar.width && ar.right < rightEdge + 1) leftLimit = Math.max(leftLimit, ar.right); } }
      pill.style.right = (hr.right - rightEdge) + 'px';
      pill.classList.remove('short');
      var room = rightEdge - leftLimit - 20;
      if (pill.offsetWidth > room) pill.classList.add('short');
      pill.classList.remove('hang');
      if (pill.offsetWidth > room) { pill.classList.remove('short'); pill.classList.add('hang'); pill.style.right = (hr.right - (cr ? cr.right : hr.right - 24)) + 'px'; }
      pill.style.visibility = ''; pill.classList.add('on');
    }
    function q() { if (!raf) raf = requestAnimationFrame(layout); }
    window.addEventListener('resize', q); window.addEventListener('scroll', q, { passive: true });
    if (window.ResizeObserver) { var ro = new ResizeObserver(q); header && ro.observe(header); dock && ro.observe(dock); }
    setTimeout(q, 60); setTimeout(q, 700); q();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
