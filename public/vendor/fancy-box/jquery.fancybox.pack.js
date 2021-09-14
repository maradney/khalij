/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function (r, G, f, v) {
  const J = f('html'); const n = f(r); const p = f(G); var b = f.fancybox = function () { b.open.apply(this, arguments); }; const I = navigator.userAgent.match(/msie/i); let B = null; const s = G.createTouch !== v; const t = function (a) { return a && a.hasOwnProperty && a instanceof f; }; const q = function (a) { return a && f.type(a) === 'string'; }; const E = function (a) { return q(a) && a.indexOf('%') > 0; }; const l = function (a, d) { let e = parseInt(a, 10) || 0; d && E(a) && (e *= b.getViewport()[d] / 100); return Math.ceil(e); }; const w = function (a, b) { return `${l(a, b)}px`; }; f.extend(b, {
    version: '2.1.5',
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !0,
      autoCenter: !s,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: 0.5,
      leftRatio: 0.5,
      scrolling: 'auto',
      wrapCSS: '',
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3E3,
      preload: 3,
      modal: !1,
      loop: !0,
      ajax: { dataType: 'html', headers: { 'X-fancyBox': !0 } },
      iframe: { scrolling: 'auto', preload: !0 },
      swf: { wmode: 'transparent', allowfullscreen: 'true', allowscriptaccess: 'always' },
      keys: {
        next: {
          13: 'left', 34: 'up', 39: 'left', 40: 'up',
        },
        prev: {
          8: 'right', 33: 'down', 37: 'right', 38: 'down',
        },
        close: [27],
        play: [32],
        toggle: [70],
      },
      direction: { next: 'left', prev: 'right' },
      scrollOutside: !0,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: `<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen${
          I ? ' allowtransparency="true"' : ''}></iframe>`,
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
      },
      openEffect: 'fade',
      openSpeed: 250,
      openEasing: 'swing',
      openOpacity: !0,
      openMethod: 'zoomIn',
      closeEffect: 'fade',
      closeSpeed: 250,
      closeEasing: 'swing',
      closeOpacity: !0,
      closeMethod: 'zoomOut',
      nextEffect: 'elastic',
      nextSpeed: 250,
      nextEasing: 'swing',
      nextMethod: 'changeIn',
      prevEffect: 'elastic',
      prevSpeed: 250,
      prevEasing: 'swing',
      prevMethod: 'changeOut',
      helpers: { overlay: !0, title: !0 },
      onCancel: f.noop,
      beforeLoad: f.noop,
      afterLoad: f.noop,
      beforeShow: f.noop,
      afterShow: f.noop,
      beforeChange: f.noop,
      beforeClose: f.noop,
      afterClose: f.noop,
    },
    group: {},
    opts: {},
    previous: null,
    coming: null,
    current: null,
    isActive: !1,
    isOpen: !1,
    isOpened: !1,
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: { timer: null, isActive: !1 },
    ajaxLoad: null,
    imgPreload: null,
    transitions: {},
    helpers: {},
    open(a, d) {
      if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) {
        return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, (e, c) => {
          let k = {}; let g; let h; let j; let m; let l; f.type(c) === 'object' && (c.nodeType && (c = f(c)), t(c) ? (k = {
            href: c.data('fancybox-href') || c.attr('href'), title: c.data('fancybox-title') || c.attr('title'), isDom: !0, element: c,
          }, f.metadata && f.extend(!0, k,
            c.metadata())) : k = c); g = d.href || k.href || (q(c) ? c : null); h = d.title !== v ? d.title : k.title || ''; m = (j = d.content || k.content) ? 'html' : d.type || k.type; !m && k.isDom && (m = c.data('fancybox-type'), m || (m = (m = c.prop('class').match(/fancybox\.(\w+)/)) ? m[1] : null)); q(g) && (m || (b.isImage(g) ? m = 'image' : b.isSWF(g) ? m = 'swf' : g.charAt(0) === '#' ? m = 'inline' : q(c) && (m = 'html', j = c)), m === 'ajax' && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift())); j || (m === 'inline' ? g ? j = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, '') : g) : k.isDom && (j = c) : m === 'html' ? j = g : !m && (!g
&& k.isDom) && (m = 'inline', j = c)); f.extend(k, {
            href: g, type: m, content: j, title: h, selector: l,
          }); a[e] = k;
        }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== v && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index);
      }
    },
    cancel() {
      const a = b.coming; a && !1 !== b.trigger('onCancel') && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger('onReset').remove(), b.coming = null, b.current
|| b._afterZoomOut(a));
    },
    close(a) { b.cancel(); !1 !== b.trigger('beforeClose') && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f('.fancybox-wrap').stop(!0).trigger('onReset').remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f('.fancybox-item, .fancybox-nav').remove(), b.wrap.stop(!0, !0).removeClass('fancybox-opened'), b.transitions[b.current.closeMethod]()))); },
    play(a) {
      const d = function () { clearTimeout(b.player.timer); }; const e = function () {
        d(); b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed));
      }; const c = function () { d(); p.unbind('.player'); b.player.isActive = !1; b.trigger('onPlayEnd'); }; if (!0 === a || !b.player.isActive && !1 !== a) { if (b.current && (b.current.loop || b.current.index < b.group.length - 1))b.player.isActive = !0, p.bind({ 'onCancel.player beforeClose.player': c, 'onUpdate.player': e, 'beforeLoad.player': d }), e(), b.trigger('onPlayStart'); } else c();
    },
    next(a) { const d = b.current; d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, 'next')); },
    prev(a) {
      const d = b.current;
      d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, 'prev'));
    },
    jumpto(a, d, e) { const c = b.current; c && (a = l(a), b.direction = d || c.direction[a >= c.index ? 'next' : 'prev'], b.router = e || 'jumpto', c.loop && (a < 0 && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== v && (b.cancel(), b._start(a))); },
    reposition(a, d) { const e = b.current; const c = e ? e.wrap : null; let k; c && (k = b._getPosition(d), a && a.type === 'scroll' ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({}, e.dim, k))); },
    update(a) {
      const d = a && a.type; const e = !d || d === 'orientationchange'; e && (clearTimeout(B), B = null); b.isOpen && !B && (B = setTimeout(() => { const c = b.current; c && !b.isClosing && (b.wrap.removeClass('fancybox-tmp'), (e || d === 'load' || d === 'resize' && c.autoResize) && b._setDimension(), d === 'scroll' && c.canShrink || b.reposition(a), b.trigger('onUpdate'), B = null); }, e && !s ? 0 : 300));
    },
    toggle(a) {
      b.isOpen && (b.current.fitToView = f.type(a) === 'boolean' ? a : !b.current.fitToView, s && (b.wrap.removeAttr('style').addClass('fancybox-tmp'), b.trigger('onUpdate')),
      b.update());
    },
    hideLoading() { p.unbind('.loading'); f('#fancybox-loading').remove(); },
    showLoading() { let a; let d; b.hideLoading(); a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo('body'); p.bind('keydown.loading', (a) => { if ((a.which || a.keyCode) === 27)a.preventDefault(), b.cancel(); }); b.defaults.fixed || (d = b.getViewport(), a.css({ position: 'absolute', top: 0.5 * d.h + d.y, left: 0.5 * d.w + d.x })); },
    getViewport() {
      const a = b.current && b.current.locked || !1; const d = {
        x: n.scrollLeft(),
        y: n.scrollTop(),
      }; a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && r.innerWidth ? r.innerWidth : n.width(), d.h = s && r.innerHeight ? r.innerHeight : n.height()); return d;
    },
    unbindEvents() { b.wrap && t(b.wrap) && b.wrap.unbind('.fb'); p.unbind('.fb'); n.unbind('.fb'); },
    bindEvents() {
      const a = b.current; let d; a && (n.bind(`orientationchange.fb${s ? '' : ' resize.fb'}${a.autoCenter && !a.locked ? ' scroll.fb' : ''}`, b.update), (d = a.keys) && p.bind('keydown.fb', (e) => {
        const c = e.which || e.keyCode; const k = e.target || e.srcElement;
        if (c === 27 && b.coming) return !1; !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is('[contenteditable]'))) && f.each(d, (d, k) => { if (a.group.length > 1 && k[c] !== v) return b[d](k[c]), e.preventDefault(), !1; if (f.inArray(c, k) > -1) return b[d](), e.preventDefault(), !1; });
      }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind('mousewheel.fb', (d, c, k, g) => {
        for (var h = f(d.target || null), j = !1; h.length && !j && !h.is('.fancybox-skin') && !h.is('.fancybox-wrap');) {
          j = h[0] && !(h[0].style.overflow && h[0].style.overflow === 'hidden')
&& (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
        } if (c !== 0 && !j && b.group.length > 1 && !a.canShrink) { if (g > 0 || k > 0)b.prev(g > 0 ? 'down' : 'left'); else if (g < 0 || k < 0)b.next(g < 0 ? 'up' : 'right'); d.preventDefault(); }
      }));
    },
    trigger(a, d) {
      let e; const c = d || b.coming || b.current; if (c) {
        f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1))); if (!1 === e) return !1; c.helpers && f.each(c.helpers, (d, e) => {
          if (e && b.helpers[d] && f.isFunction(b.helpers[d][a])) {
            b.helpers[d][a](f.extend(!0,
              {}, b.helpers[d].defaults, e), c);
          }
        }); p.trigger(a);
      }
    },
    isImage(a) { return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i); },
    isSWF(a) { return q(a) && a.match(/\.(swf)((\?|#).*)?$/i); },
    _start(a) {
      let d = {}; let e; let c; a = l(a); e = b.group[a] || null; if (!e) return !1; d = f.extend(!0, {}, b.opts, e); e = d.margin; c = d.padding; f.type(e) === 'number' && (d.margin = [e, e, e, e]); f.type(c) === 'number' && (d.padding = [c, c, c, c]); d.modal && f.extend(!0, d, {
        closeBtn: !1,
        closeClick: !1,
        nextClick: !1,
        arrows: !1,
        mouseWheel: !1,
        keys: null,
        helpers: { overlay: { closeClick: !1 } },
      }); d.autoSize && (d.autoWidth = d.autoHeight = !0); d.width === 'auto' && (d.autoWidth = !0); d.height === 'auto' && (d.autoHeight = !0); d.group = b.group; d.index = a; b.coming = d; if (!1 === b.trigger('beforeLoad'))b.coming = null; else {
        c = d.type; e = d.href; if (!c) return b.coming = null, b.current && b.router && b.router !== 'jumpto' ? (b.current.index = a, b[b.router](b.direction)) : !1; b.isActive = !0; if (c === 'image' || c === 'swf')d.autoHeight = d.autoWidth = !1, d.scrolling = 'visible'; c === 'image' && (d.aspectRatio = !0); c === 'iframe' && s && (d.scrolling = 'scroll'); d.wrap = f(d.tpl.wrap).addClass(`fancybox-${s ? 'mobile' : 'desktop'} fancybox-type-${c} fancybox-tmp ${d.wrapCSS}`).appendTo(d.parent || 'body'); f.extend(d, { skin: f('.fancybox-skin', d.wrap), outer: f('.fancybox-outer', d.wrap), inner: f('.fancybox-inner', d.wrap) }); f.each(['Top', 'Right', 'Bottom', 'Left'], (a, b) => { d.skin.css(`padding${b}`, w(d.padding[a])); }); b.trigger('onReady'); if (c === 'inline' || c === 'html') { if (!d.content || !d.content.length) return b._error('content'); } else if (!e) return b._error('href');
        c === 'image' ? b._loadImage() : c === 'ajax' ? b._loadAjax() : c === 'iframe' ? b._loadIframe() : b._afterLoad();
      }
    },
    _error(a) {
      f.extend(b.coming, {
        type: 'html', autoWidth: !0, autoHeight: !0, minWidth: 0, minHeight: 0, scrolling: 'no', hasError: a, content: b.coming.tpl.error,
      }); b._afterLoad();
    },
    _loadImage() {
      const a = b.imgPreload = new Image(); a.onload = function () { this.onload = this.onerror = null; b.coming.width = this.width / b.opts.pixelRatio; b.coming.height = this.height / b.opts.pixelRatio; b._afterLoad(); }; a.onerror = function () {
        this.onload = this.onerror = null; b._error('image');
      }; a.src = b.coming.href; !0 !== a.complete && b.showLoading();
    },
    _loadAjax() { const a = b.coming; b.showLoading(); b.ajaxLoad = f.ajax(f.extend({}, a.ajax, { url: a.href, error(a, e) { b.coming && e !== 'abort' ? b._error('ajax', a) : b.hideLoading(); }, success(d, e) { e === 'success' && (a.content = d, b._afterLoad()); } })); },
    _loadIframe() {
      const a = b.coming; const d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date()).getTime())).attr('scrolling', s ? 'auto' : a.iframe.scrolling).attr('src', a.href);
      f(a.wrap).bind('onReset', function () {
        try {
          f(this).find('iframe').hide().attr('src', '//about:blank')
            .end()
            .empty();
        } catch (a) {}
      }); a.iframe.preload && (b.showLoading(), d.one('load', function () {
        f(this).data('ready', 1); s || f(this).bind('load.fb', b.update); f(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp')
          .show(); b._afterLoad();
      })); a.content = d.appendTo(a.inner); a.iframe.preload || b._afterLoad();
    },
    _preloadImages() {
      const a = b.group; const d = b.current; const e = a.length; const c = d.preload ? Math.min(d.preload,
        e - 1) : 0; let f; let g; for (g = 1; g <= c; g += 1)f = a[(d.index + g) % e], f.type === 'image' && f.href && ((new Image()).src = f.href);
    },
    _afterLoad() {
      const a = b.coming; const d = b.current; let e; let c; let k; let g; let h; b.hideLoading(); if (a && !1 !== b.isActive) {
        if (!1 === b.trigger('afterLoad', a, d))a.wrap.stop(!0).trigger('onReset').remove(), b.coming = null; else {
          d && (b.trigger('beforeChange', d), d.wrap.stop(!0).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove()); b.unbindEvents(); e = a.content; c = a.type; k = a.scrolling; f.extend(b, {
            wrap: a.wrap,
            skin: a.skin,
            outer: a.outer,
            inner: a.inner,
            current: a,
            previous: d,
          }); g = a.href; switch (c) {
            case 'inline': case 'ajax': case 'html': a.selector ? e = f('<div>').html(e).find(a.selector) : t(e) && (e.data('fancybox-placeholder') || e.data('fancybox-placeholder', f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind('onReset', function () { f(this).find(e).length && e.hide().replaceAll(e.data('fancybox-placeholder')).data('fancybox-placeholder', !1); })); break; case 'image': e = a.tpl.image.replace('{href}',
              g); break; case 'swf': e = `<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="${g}"></param>`, h = '', f.each(a.swf, (a, b) => { e += `<param name="${a}" value="${b}"></param>`; h += ` ${a}="${b}"`; }), e += `<embed src="${g}" type="application/x-shockwave-flash" width="100%" height="100%"${h}></embed></object>`;
          }(!t(e) || !e.parent().is(a.inner)) && a.inner.append(e); b.trigger('beforeShow'); a.inner.css('overflow', k === 'yes' ? 'scroll'
            : k === 'no' ? 'hidden' : k); b._setDimension(); b.reposition(); b.isOpen = !1; b.coming = null; b.bindEvents(); if (b.isOpened) { if (d.prevMethod)b.transitions[d.prevMethod](); } else {
            f('.fancybox-wrap').not(a.wrap).stop(!0).trigger('onReset')
              .remove();
          } b.transitions[b.isOpened ? a.nextMethod : a.openMethod](); b._preloadImages();
        }
      }
    },
    _setDimension() {
      let a = b.getViewport(); let d = 0; var e = !1; var c = !1; var e = b.wrap; const k = b.skin; const g = b.inner; const h = b.current; var c = h.width; let j = h.height; let m = h.minWidth; let u = h.minHeight; let n = h.maxWidth; let p = h.maxHeight; const s = h.scrolling; const q = h.scrollOutside
        ? h.scrollbarWidth : 0; let x = h.margin; let y = l(x[1] + x[3]); let r = l(x[0] + x[2]); let v; let z; let t; let C; let A; let F; let B; let D; let H; e.add(k).add(g).width('auto').height('auto')
        .removeClass('fancybox-tmp'); x = l(k.outerWidth(!0) - k.width()); v = l(k.outerHeight(!0) - k.height()); z = y + x; t = r + v; C = E(c) ? (a.w - z) * l(c) / 100 : c; A = E(j) ? (a.h - t) * l(j) / 100 : j; if (h.type === 'iframe') { if (H = h.content, h.autoHeight && H.data('ready') === 1) try { H[0].contentWindow.document.location && (g.width(C).height(9999), F = H.contents().find('body'), q && F.css('overflow-x', 'hidden'), A = F.outerHeight(!0)); } catch (G) {} } else if (h.autoWidth
|| h.autoHeight)g.addClass('fancybox-tmp'), h.autoWidth || g.width(C), h.autoHeight || g.height(A), h.autoWidth && (C = g.width()), h.autoHeight && (A = g.height()), g.removeClass('fancybox-tmp'); c = l(C); j = l(A); D = C / A; m = l(E(m) ? l(m, 'w') - z : m); n = l(E(n) ? l(n, 'w') - z : n); u = l(E(u) ? l(u, 'h') - t : u); p = l(E(p) ? l(p, 'h') - t : p); F = n; B = p; h.fitToView && (n = Math.min(a.w - z, n), p = Math.min(a.h - t, p)); z = a.w - y; r = a.h - r; h.aspectRatio ? (c > n && (c = n, j = l(c / D)), j > p && (j = p, c = l(j * D)), c < m && (c = m, j = l(c / D)), j < u && (j = u, c = l(j * D))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight
&& h.type !== 'iframe' && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, p))); if (h.fitToView) if (g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(), h.aspectRatio) for (;(a > z || y > r) && (c > m && j > u) && !(d++ > 19);)j = Math.max(u, Math.min(p, j - 10)), c = l(j * D), c < m && (c = m, j = l(c / D)), c > n && (c = n, j = l(c / D)), g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(); else c = Math.max(m, Math.min(c, c - (a - z))), j = Math.max(u, Math.min(j, j - (y - r))); q && (s === 'auto' && j < A && c + x + q < z) && (c += q); g.width(c).height(j); e.width(c + x); a = e.width();
      y = e.height(); e = (a > z || y > r) && c > m && j > u; c = h.aspectRatio ? c < F && j < B && c < C && j < A : (c < F || j < B) && (c < C || j < A); f.extend(h, {
        dim: { width: w(a), height: w(y) }, origWidth: C, origHeight: A, canShrink: e, canExpand: c, wPadding: x, hPadding: v, wrapSpace: y - k.outerHeight(!0), skinSpace: k.height() - j,
      }); !H && (h.autoHeight && j > u && j < p && !c) && g.height('auto');
    },
    _getPosition(a) {
      const d = b.current; const e = b.getViewport(); var c = d.margin; const f = b.wrap.width() + c[1] + c[3]; const g = b.wrap.height() + c[0] + c[2]; var c = { position: 'absolute', top: c[0], left: c[3] }; d.autoCenter && d.fixed
&& !a && g <= e.h && f <= e.w ? c.position = 'fixed' : d.locked || (c.top += e.y, c.left += e.x); c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio)); c.left = w(Math.max(c.left, c.left + (e.w - f) * d.leftRatio)); return c;
    },
    _afterZoomIn() {
      const a = b.current; a && (b.isOpen = b.isOpened = !0, b.wrap.css('overflow', 'visible').addClass('fancybox-opened'), b.update(), (a.closeClick || a.nextClick && b.group.length > 1) && b.inner.css('cursor', 'pointer').bind('click.fb', (d) => {
        !f(d.target).is('a') && !f(d.target).parent().is('a') && (d.preventDefault(),
        b[a.closeClick ? 'close' : 'next']());
      }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind('click.fb', (a) => { a.preventDefault(); b.close(); }), a.arrows && b.group.length > 1 && ((a.loop || a.index > 0) && f(a.tpl.prev).appendTo(b.outer).bind('click.fb', b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind('click.fb', b.next)), b.trigger('afterShow'), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()));
    },
    _afterZoomOut(a) {
      a = a || b.current; f('.fancybox-wrap').trigger('onReset').remove(); f.extend(b, {
        group: {}, opts: {}, router: !1, current: null, isActive: !1, isOpened: !1, isOpen: !1, isClosing: !1, wrap: null, skin: null, outer: null, inner: null,
      }); b.trigger('afterClose', a);
    },
  }); b.transitions = {
    getOrigPosition() {
      const a = b.current; const d = a.element; let e = a.orig; let c = {}; let f = 50; let g = 50; const h = a.hPadding; const j = a.wPadding; const m = b.getViewport(); !e && (a.isDom && d.is(':visible')) && (e = d.find('img:first'), e.length || (e = d)); t(e) ? (c = e.offset(), e.is('img') && (f = e.outerWidth(), g = e.outerHeight()))
        : (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio); if (b.wrap.css('position') === 'fixed' || a.locked)c.top -= m.y, c.left -= m.x; return c = {
        top: w(c.top - h * a.topRatio), left: w(c.left - j * a.leftRatio), width: w(f + j), height: w(g + h),
      };
    },
    step(a, d) {
      let e; let c; const f = d.prop; c = b.current; const g = c.wrapSpace; const h = c.skinSpace; if (f === 'width' || f === 'height') {
        e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = f === 'width' ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l(f === 'width' ? c : c - g * e)), b.inner[f](l(f
=== 'width' ? c : c - g * e - h * e));
      }
    },
    zoomIn() {
      const a = b.current; let d = a.pos; const e = a.openEffect; const c = e === 'elastic'; const k = f.extend({ opacity: 1 }, d); delete k.position; c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : e === 'fade' && (d.opacity = 0.1); b.wrap.css(d).animate(k, {
        duration: e === 'none' ? 0 : a.openSpeed, easing: a.openEasing, step: c ? this.step : null, complete: b._afterZoomIn,
      });
    },
    zoomOut() {
      const a = b.current; const d = a.closeEffect; const e = d === 'elastic'; let c = { opacity: 0.1 }; e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1)); b.wrap.animate(c,
        {
          duration: d === 'none' ? 0 : a.closeSpeed, easing: a.closeEasing, step: e ? this.step : null, complete: b._afterZoomOut,
        });
    },
    changeIn() { const a = b.current; const d = a.nextEffect; const e = a.pos; const c = { opacity: 1 }; const f = b.direction; let g; e.opacity = 0.1; d === 'elastic' && (g = f === 'down' || f === 'up' ? 'top' : 'left', f === 'down' || f === 'right' ? (e[g] = w(l(e[g]) - 200), c[g] = '+=200px') : (e[g] = w(l(e[g]) + 200), c[g] = '-=200px')); d === 'none' ? b._afterZoomIn() : b.wrap.css(e).animate(c, { duration: a.nextSpeed, easing: a.nextEasing, complete: b._afterZoomIn }); },
    changeOut() {
      const a = b.previous; const d = a.prevEffect; const e = { opacity: 0.1 }; const c = b.direction; d === 'elastic' && (e[c === 'down' || c === 'up' ? 'top' : 'left'] = `${c === 'up' || c === 'left' ? '-' : '+'}=200px`); a.wrap.animate(e, { duration: d === 'none' ? 0 : a.prevSpeed, easing: a.prevEasing, complete() { f(this).trigger('onReset').remove(); } });
    },
  }; b.helpers.overlay = {
    defaults: {
      closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !s, fixed: !0,
    },
    overlay: null,
    fixed: !1,
    el: f('html'),
    create(a) {
      a = f.extend({}, this.defaults, a); this.overlay && this.close(); this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent); this.fixed = !1; a.fixed && b.defaults.fixed && (this.overlay.addClass('fancybox-overlay-fixed'), this.fixed = !0);
    },
    open(a) {
      const d = this; a = f.extend({}, this.defaults, a); this.overlay ? this.overlay.unbind('.overlay').width('auto').height('auto') : this.create(a); this.fixed || (n.bind('resize.overlay', f.proxy(this.update, this)), this.update()); a.closeClick && this.overlay.bind('click.overlay', (a) => {
        if (f(a.target).hasClass('fancybox-overlay')) {
          return b.isActive
            ? b.close() : d.close(), !1;
        }
      }); this.overlay.css(a.css).show();
    },
    close() { let a; let b; n.unbind('resize.overlay'); this.el.hasClass('fancybox-lock') && (f('.fancybox-margin').removeClass('fancybox-margin'), a = n.scrollTop(), b = n.scrollLeft(), this.el.removeClass('fancybox-lock'), n.scrollTop(a).scrollLeft(b)); f('.fancybox-overlay').remove().hide(); f.extend(this, { overlay: null, fixed: !1 }); },
    update() {
      let a = '100%'; let b; this.overlay.width(a).height('100%'); I ? (b = Math.max(G.documentElement.offsetWidth, G.body.offsetWidth),
      p.width() > b && (a = p.width())) : p.width() > n.width() && (a = p.width()); this.overlay.width(a).height(p.height());
    },
    onReady(a, b) { const e = this.overlay; f('.fancybox-overlay').stop(!0, !0); e || this.create(a); a.locked && (this.fixed && b.fixed) && (e || (this.margin = p.height() > n.height() ? f('html').css('margin-right').replace('px', '') : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1); !0 === a.showEarly && this.beforeShow.apply(this, arguments); },
    beforeShow(a, b) {
      let e; let c; b.locked && (!1 !== this.margin && (f('*').filter(function () {
        return f(this).css('position')
=== 'fixed' && !f(this).hasClass('fancybox-overlay') && !f(this).hasClass('fancybox-wrap');
      }).addClass('fancybox-margin'), this.el.addClass('fancybox-margin')), e = n.scrollTop(), c = n.scrollLeft(), this.el.addClass('fancybox-lock'), n.scrollTop(e).scrollLeft(c)); this.open(a);
    },
    onUpdate() { this.fixed || this.update(); },
    afterClose(a) { this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this)); },
  }; b.helpers.title = {
    defaults: { type: 'float', position: 'bottom' },
    beforeShow(a) {
      let d = b.current; let e = d.title; let c = a.type; f.isFunction(e) && (e = e.call(d.element, d)); if (q(e) && f.trim(e) !== '') { d = f(`<div class="fancybox-title fancybox-title-${c}-wrap">${e}</div>`); switch (c) { case 'inside': c = b.skin; break; case 'outside': c = b.wrap; break; case 'over': c = b.inner; break; default: c = b.skin, d.appendTo('body'), I && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css('margin-bottom'))); }d[a.position === 'top' ? 'prependTo' : 'appendTo'](c); }
    },
  }; f.fn.fancybox = function (a) {
    let d;
    const e = f(this); const c = this.selector || ''; const k = function (g) { let h = f(this).blur(); let j = d; let k; let l; !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is('.fancybox-wrap') && (k = a.groupAttr || 'data-fancybox-group', l = h.attr(k), l || (k = 'rel', l = h.get(0)[k]), l && (l !== '' && l !== 'nofollow') && (h = c.length ? f(c) : e, h = h.filter(`[${k}="${l}"]`), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault()); }; a = a || {}; d = a.index || 0; !c || !1 === a.live ? e.unbind('click.fb-start').bind('click.fb-start', k) : p.undelegate(c, 'click.fb-start').delegate(`${c
    }:not('.fancybox-item, .fancybox-nav')`, 'click.fb-start', k); this.filter('[data-fancybox-start=1]').trigger('click'); return this;
  }; p.ready(() => {
    let a; let d; f.scrollbarWidth === v && (f.scrollbarWidth = function () { const a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'); var b = a.children(); var b = b.innerWidth() - b.height(99).innerWidth(); a.remove(); return b; }); if (f.support.fixedPosition === v) {
      a = f.support; d = f('<div style="position:fixed;top:20px;"></div>').appendTo('body'); const e = d[0].offsetTop
=== 20 || d[0].offsetTop === 15; d.remove(); a.fixedPosition = e;
    }f.extend(b.defaults, { scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f('body') }); a = f(r).width(); J.addClass('fancybox-lock-test'); d = f(r).width(); J.removeClass('fancybox-lock-test'); f(`<style type='text/css'>.fancybox-margin{margin-right:${d - a}px;}</style>`).appendTo('head');
  });
}(window, document, jQuery));