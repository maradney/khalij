/*
 * jQuery.appear
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
*/
(function ($) {
  $.fn.appear = function (f, o) { const s = $.extend({ one: true }, o); return this.each(function () { const t = $(this); t.appeared = false; if (!f) { t.trigger('appear', s.data); return; } const w = $(window); const c = function () { if (!t.is(':visible')) { t.appeared = false; return; } const a = w.scrollLeft(); const b = w.scrollTop(); const o = t.offset(); const x = o.left; const y = o.top; if (y + t.height() >= b && y <= b + w.height() && x + t.width() >= a && x <= a + w.width()) { if (!t.appeared)t.trigger('appear', s.data); } else { t.appeared = false; } }; const m = function () { t.appeared = true; if (s.one) { w.unbind('scroll', c); const i = $.inArray(c, $.fn.appear.checks); if (i >= 0)$.fn.appear.checks.splice(i, 1); }f.apply(this, arguments); }; if (s.one)t.one('appear', s.data, m); else t.bind('appear', s.data, m); w.scroll(c); $.fn.appear.checks.push(c); (c)(); }); }; $.extend($.fn.appear, {
    checks: [], timeout: null, checkAll() { let l = $.fn.appear.checks.length; if (l > 0) while (l--)($.fn.appear.checks[l])(); }, run() { if ($.fn.appear.timeout)clearTimeout($.fn.appear.timeout); $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20); },
  }); $.each(['append', 'prepend', 'after', 'before', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'remove', 'css', 'show', 'hide'], (i, n) => { const u = $.fn[n]; if (u) { $.fn[n] = function () { const r = u.apply(this, arguments); $.fn.appear.run(); return r; }; } });
}(jQuery));
