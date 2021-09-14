/*!
 * Bootstrap-select v1.10.0 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2016 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(['jquery'], (a0) => (factory(a0)));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(this, (jQuery) => {
  (function ($) {
    $.fn.selectpicker.defaults = {
      noneSelectedText: 'Válasszon!',
      noneResultsText: 'Nincs találat {0}',
      countSelectedText(numSelected, numTotal) {
        return '{0} elem kiválasztva';
      },
      maxOptionsText(numAll, numGroup) {
        return [
          'Legfeljebb {n} elem választható',
          'A csoportban legfeljebb {n} elem választható',
        ];
      },
      selectAllText: 'Mind',
      deselectAllText: 'Egyik sem',
      multipleSeparator: ', ',
    };
  }(jQuery));
}));
