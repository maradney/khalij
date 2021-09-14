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
  // <editor-fold desc="Shims">
    if (!String.prototype.includes) {
      (function () {
        // needed to support `apply`/`call` with `undefined`/`null`
        const { toString } = {};
        const defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            const object = {};
            const $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {
          }
          return result;
        }());
        const { indexOf } = '';
        const includes = function (search) {
          if (this == null) {
            throw new TypeError();
          }
          const string = String(this);
          if (search && toString.call(search) == '[object RegExp]') {
            throw new TypeError();
          }
          const stringLength = string.length;
          const searchString = String(search);
          const searchLength = searchString.length;
          const position = arguments.length > 1 ? arguments[1] : undefined;
          // `ToInteger`
          let pos = position ? Number(position) : 0;
          if (pos != pos) { // better `isNaN`
            pos = 0;
          }
          const start = Math.min(Math.max(pos, 0), stringLength);
          // Avoid the `indexOf` call if no match is possible
          if (searchLength + start > stringLength) {
            return false;
          }
          return indexOf.call(string, searchString, pos) != -1;
        };
        if (defineProperty) {
          defineProperty(String.prototype, 'includes', {
            value: includes,
            configurable: true,
            writable: true,
          });
        } else {
          String.prototype.includes = includes;
        }
      }());
    }

    if (!String.prototype.startsWith) {
      (function () {
        // needed to support `apply`/`call` with `undefined`/`null`
        const defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            const object = {};
            const $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {
          }
          return result;
        }());
        const { toString } = {};
        const startsWith = function (search) {
          if (this == null) {
            throw new TypeError();
          }
          const string = String(this);
          if (search && toString.call(search) == '[object RegExp]') {
            throw new TypeError();
          }
          const stringLength = string.length;
          const searchString = String(search);
          const searchLength = searchString.length;
          const position = arguments.length > 1 ? arguments[1] : undefined;
          // `ToInteger`
          let pos = position ? Number(position) : 0;
          if (pos != pos) { // better `isNaN`
            pos = 0;
          }
          const start = Math.min(Math.max(pos, 0), stringLength);
          // Avoid the `indexOf` call if no match is possible
          if (searchLength + start > stringLength) {
            return false;
          }
          let index = -1;
          while (++index < searchLength) {
            if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
              return false;
            }
          }
          return true;
        };
        if (defineProperty) {
          defineProperty(String.prototype, 'startsWith', {
            value: startsWith,
            configurable: true,
            writable: true,
          });
        } else {
          String.prototype.startsWith = startsWith;
        }
      }());
    }

    if (!Object.keys) {
      Object.keys = function (
        o, // object
        k, // key
        r, // result array
      ) {
      // initialize object and result
        r = [];
        // iterate over object keys
        for (k in o)
        // fill result array with non-prototypical keys
        { r.hasOwnProperty.call(o, k) && r.push(k); }
        // return result
        return r;
      };
    }

    $.fn.triggerNative = function (eventName) {
      const el = this[0];
      let event;

      if (el.dispatchEvent) {
        if (typeof Event === 'function') {
        // For modern browsers
          event = new Event(eventName, {
            bubbles: true,
          });
        } else {
        // For IE since it doesn't support Event constructor
          event = document.createEvent('Event');
          event.initEvent(eventName, true, false);
        }

        el.dispatchEvent(event);
      } else {
        if (el.fireEvent) {
          event = document.createEventObject();
          event.eventType = eventName;
          el.fireEvent(`on${eventName}`, event);
        }

        this.trigger(eventName);
      }
    };
    // </editor-fold>

    // Case insensitive contains search
    $.expr[':'].icontains = function (obj, index, meta) {
      const $obj = $(obj);
      const haystack = ($obj.data('tokens') || $obj.text()).toUpperCase();
      return haystack.includes(meta[3].toUpperCase());
    };

    // Case insensitive begins search
    $.expr[':'].ibegins = function (obj, index, meta) {
      const $obj = $(obj);
      const haystack = ($obj.data('tokens') || $obj.text()).toUpperCase();
      return haystack.startsWith(meta[3].toUpperCase());
    };

    // Case and accent insensitive contains search
    $.expr[':'].aicontains = function (obj, index, meta) {
      const $obj = $(obj);
      const haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toUpperCase();
      return haystack.includes(meta[3].toUpperCase());
    };

    // Case and accent insensitive begins search
    $.expr[':'].aibegins = function (obj, index, meta) {
      const $obj = $(obj);
      const haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toUpperCase();
      return haystack.startsWith(meta[3].toUpperCase());
    };

    /**
   * Remove all diatrics from the given text.
   * @access private
   * @param {String} text
   * @returns {String}
   */
    function normalizeToBase(text) {
      const rExps = [
        { re: /[\xC0-\xC6]/g, ch: 'A' },
        { re: /[\xE0-\xE6]/g, ch: 'a' },
        { re: /[\xC8-\xCB]/g, ch: 'E' },
        { re: /[\xE8-\xEB]/g, ch: 'e' },
        { re: /[\xCC-\xCF]/g, ch: 'I' },
        { re: /[\xEC-\xEF]/g, ch: 'i' },
        { re: /[\xD2-\xD6]/g, ch: 'O' },
        { re: /[\xF2-\xF6]/g, ch: 'o' },
        { re: /[\xD9-\xDC]/g, ch: 'U' },
        { re: /[\xF9-\xFC]/g, ch: 'u' },
        { re: /[\xC7-\xE7]/g, ch: 'c' },
        { re: /[\xD1]/g, ch: 'N' },
        { re: /[\xF1]/g, ch: 'n' },
      ];
      $.each(rExps, function () {
        text = text.replace(this.re, this.ch);
      });
      return text;
    }

    function htmlEscape(html) {
      const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
      };
      const source = `(?:${Object.keys(escapeMap).join('|')})`;
      const testRegexp = new RegExp(source);
      const replaceRegexp = new RegExp(source, 'g');
      const string = html == null ? '' : `${html}`;
      return testRegexp.test(string) ? string.replace(replaceRegexp, (match) => escapeMap[match]) : string;
    }

    var Selectpicker = function (element, options, e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      this.$element = $(element);
      this.$newElement = null;
      this.$button = null;
      this.$menu = null;
      this.$lis = null;
      this.options = options;

      // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
      // data-attribute)
      if (this.options.title === null) {
        this.options.title = this.$element.attr('title');
      }

      // Expose public methods
      this.val = Selectpicker.prototype.val;
      this.render = Selectpicker.prototype.render;
      this.refresh = Selectpicker.prototype.refresh;
      this.setStyle = Selectpicker.prototype.setStyle;
      this.selectAll = Selectpicker.prototype.selectAll;
      this.deselectAll = Selectpicker.prototype.deselectAll;
      this.destroy = Selectpicker.prototype.destroy;
      this.remove = Selectpicker.prototype.remove;
      this.show = Selectpicker.prototype.show;
      this.hide = Selectpicker.prototype.hide;

      this.init();
    };

    Selectpicker.VERSION = '1.10.0';

    // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
    Selectpicker.DEFAULTS = {
      noneSelectedText: 'Nothing selected',
      noneResultsText: 'No results matched {0}',
      countSelectedText(numSelected, numTotal) {
        return (numSelected == 1) ? '{0} item selected' : '{0} items selected';
      },
      maxOptionsText(numAll, numGroup) {
        return [
          (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
          (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)',
        ];
      },
      selectAllText: 'Select All',
      deselectAllText: 'Deselect All',
      doneButton: false,
      doneButtonText: 'Close',
      multipleSeparator: ', ',
      styleBase: 'btn',
      style: 'btn-default',
      size: 'auto',
      title: null,
      selectedTextFormat: 'values',
      width: false,
      container: false,
      hideDisabled: false,
      showSubtext: false,
      showIcon: true,
      showContent: true,
      dropupAuto: true,
      header: false,
      liveSearch: false,
      liveSearchPlaceholder: null,
      liveSearchNormalize: false,
      liveSearchStyle: 'contains',
      actionsBox: false,
      iconBase: 'glyphicon',
      tickIcon: 'glyphicon-ok',
      showTick: false,
      template: {
        caret: '<span class="caret"></span>',
      },
      maxOptions: false,
      mobile: false,
      selectOnTab: false,
      dropdownAlignRight: false,
    };

    Selectpicker.prototype = {

      constructor: Selectpicker,

      init() {
        const that = this;
        const id = this.$element.attr('id');

        this.$element.addClass('bs-select-hidden');

        // store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
        // allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
        this.liObj = {};
        this.multiple = this.$element.prop('multiple');
        this.autofocus = this.$element.prop('autofocus');
        this.$newElement = this.createView();
        this.$element
          .after(this.$newElement)
          .appendTo(this.$newElement);
        this.$button = this.$newElement.children('button');
        this.$menu = this.$newElement.children('.dropdown-menu');
        this.$menuInner = this.$menu.children('.inner');
        this.$searchbox = this.$menu.find('input');

        this.$element.removeClass('bs-select-hidden');

        if (this.options.dropdownAlignRight) { this.$menu.addClass('dropdown-menu-right'); }

        if (typeof id !== 'undefined') {
          this.$button.attr('data-id', id);
          $(`label[for="${id}"]`).click((e) => {
            e.preventDefault();
            that.$button.focus();
          });
        }

        this.checkDisabled();
        this.clickListener();
        if (this.options.liveSearch) this.liveSearchListener();
        this.render();
        this.setStyle();
        this.setWidth();
        if (this.options.container) this.selectPosition();
        this.$menu.data('this', this);
        this.$newElement.data('this', this);
        if (this.options.mobile) this.mobile();

        this.$newElement.on({
          'hide.bs.dropdown': function (e) {
            that.$element.trigger('hide.bs.select', e);
          },
          'hidden.bs.dropdown': function (e) {
            that.$element.trigger('hidden.bs.select', e);
          },
          'show.bs.dropdown': function (e) {
            that.$element.trigger('show.bs.select', e);
          },
          'shown.bs.dropdown': function (e) {
            that.$element.trigger('shown.bs.select', e);
          },
        });

        if (that.$element[0].hasAttribute('required')) {
          this.$element.on('invalid', () => {
            that.$button
              .addClass('bs-invalid')
              .focus();

            that.$element.on({
              'focus.bs.select': function () {
                that.$button.focus();
                that.$element.off('focus.bs.select');
              },
              'shown.bs.select': function () {
                that.$element
                  .val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                  .off('shown.bs.select');
              },
              'rendered.bs.select': function () {
              // if select is no longer invalid, remove the bs-invalid class
                if (this.validity.valid) that.$button.removeClass('bs-invalid');
                that.$element.off('rendered.bs.select');
              },
            });
          });
        }

        setTimeout(() => {
          that.$element.trigger('loaded.bs.select');
        });
      },

      createDropdown() {
      // Options
      // If we are multiple or showTick option is set, then add the show-tick class
        const showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '';
        const inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '';
        const autofocus = this.autofocus ? ' autofocus' : '';
        // Elements
        const header = this.options.header ? `<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>${this.options.header}</div>` : '';
        const searchbox = this.options.liveSearch
          ? `${'<div class="bs-searchbox">'
      + '<input type="text" class="form-control" autocomplete="off"'}${
            this.options.liveSearchPlaceholder === null ? '' : ` placeholder="${htmlEscape(this.options.liveSearchPlaceholder)}"`}>`
      + '</div>'
          : '';
        const actionsbox = this.multiple && this.options.actionsBox
          ? `${'<div class="bs-actionsbox">'
      + '<div class="btn-group btn-group-sm btn-block">'
      + '<button type="button" class="actions-btn bs-select-all btn btn-default">'}${
            this.options.selectAllText
          }</button>`
      + `<button type="button" class="actions-btn bs-deselect-all btn btn-default">${
        this.options.deselectAllText
      }</button>`
      + '</div>'
      + '</div>'
          : '';
        const donebutton = this.multiple && this.options.doneButton
          ? `${'<div class="bs-donebutton">'
      + '<div class="btn-group btn-block">'
      + '<button type="button" class="btn btn-sm btn-default">'}${
            this.options.doneButtonText
          }</button>`
      + '</div>'
      + '</div>'
          : '';
        const drop = `<div class="btn-group bootstrap-select${showTick}${inputGroup}">`
          + `<button type="button" class="${this.options.styleBase} dropdown-toggle" data-toggle="dropdown"${autofocus}>`
          + '<span class="filter-option pull-left"></span>&nbsp;'
          + `<span class="bs-caret">${
            this.options.template.caret
          }</span>`
          + '</button>'
          + `<div class="dropdown-menu open">${
            header
          }${searchbox
          }${actionsbox
          }<ul class="dropdown-menu inner" role="menu">`
          + `</ul>${
            donebutton
          }</div>`
          + '</div>';

        return $(drop);
      },

      createView() {
        const $drop = this.createDropdown();
        const li = this.createLi();

        $drop.find('ul')[0].innerHTML = li;
        return $drop;
      },

      reloadLi() {
      // Remove all children.
        this.destroyLi();
        // Re build
        const li = this.createLi();
        this.$menuInner[0].innerHTML = li;
      },

      destroyLi() {
        this.$menu.find('li').remove();
      },

      createLi() {
        const that = this;
        const _li = [];
        let optID = 0;
        const titleOption = document.createElement('option');
        let liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure liObj is correct

        // Helper functions
        /**
       * @param content
       * @param [index]
       * @param [classes]
       * @param [optgroup]
       * @returns {string}
       */
        const generateLI = function (content, index, classes, optgroup) {
          return `<li${
            (typeof classes !== 'undefined' & classes !== '') ? ` class="${classes}"` : ''
          }${(typeof index !== 'undefined' & index !== null) ? ` data-original-index="${index}"` : ''
          }${(typeof optgroup !== 'undefined' & optgroup !== null) ? `data-optgroup="${optgroup}"` : ''
          }>${content}</li>`;
        };

        /**
       * @param text
       * @param [classes]
       * @param [inline]
       * @param [tokens]
       * @returns {string}
       */
        const generateA = function (text, classes, inline, tokens) {
          return `<a tabindex="0"${
            typeof classes !== 'undefined' ? ` class="${classes}"` : ''
          }${typeof inline !== 'undefined' ? ` style="${inline}"` : ''
          }${that.options.liveSearchNormalize ? ` data-normalized-text="${normalizeToBase(htmlEscape(text))}"` : ''
          }${typeof tokens !== 'undefined' || tokens !== null ? ` data-tokens="${tokens}"` : ''
          }>${text
          }<span class="${that.options.iconBase} ${that.options.tickIcon} check-mark"></span>`
            + '</a>';
        };

        if (this.options.title && !this.multiple) {
        // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
        // since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
          liIndex--;

          if (!this.$element.find('.bs-title-option').length) {
          // Use native JS to prepend option (faster)
            const element = this.$element[0];
            titleOption.className = 'bs-title-option';
            titleOption.appendChild(document.createTextNode(this.options.title));
            titleOption.value = '';
            element.insertBefore(titleOption, element.firstChild);
            // Check if selected attribute is already set on an option. If not, select the titleOption option.
            if ($(element.options[element.selectedIndex]).attr('selected') === undefined) titleOption.selected = true;
          }
        }

        this.$element.find('option').each(function (index) {
          const $this = $(this);

          liIndex++;

          if ($this.hasClass('bs-title-option')) return;

          // Get the class and text for the option
          const optionClass = this.className || '';
          const inline = this.style.cssText;
          let text = $this.data('content') ? $this.data('content') : $this.html();
          const tokens = $this.data('tokens') ? $this.data('tokens') : null;
          const subtext = typeof $this.data('subtext') !== 'undefined' ? `<small class="text-muted">${$this.data('subtext')}</small>` : '';
          let icon = typeof $this.data('icon') !== 'undefined' ? `<span class="${that.options.iconBase} ${$this.data('icon')}"></span> ` : '';
          const isOptgroup = this.parentNode.tagName === 'OPTGROUP';
          const isDisabled = this.disabled || (isOptgroup && this.parentNode.disabled);

          if (icon !== '' && isDisabled) {
            icon = `<span>${icon}</span>`;
          }

          if (that.options.hideDisabled && isDisabled && !isOptgroup) {
            liIndex--;
            return;
          }

          if (!$this.data('content')) {
          // Prepend any icon and append any subtext to the main text.
            text = `${icon}<span class="text">${text}${subtext}</span>`;
          }

          if (isOptgroup && $this.data('divider') !== true) {
            const optGroupClass = ` ${this.parentNode.className}` || '';

            if ($this.index() === 0) { // Is it the first option of the optgroup?
              optID += 1;

              // Get the opt group label
              let { label } = this.parentNode;
              const labelSubtext = typeof $this.parent().data('subtext') !== 'undefined' ? `<small class="text-muted">${$this.parent().data('subtext')}</small>` : '';
              const labelIcon = $this.parent().data('icon') ? `<span class="${that.options.iconBase} ${$this.parent().data('icon')}"></span> ` : '';

              label = `${labelIcon}<span class="text">${label}${labelSubtext}</span>`;

              if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
                liIndex++;
                _li.push(generateLI('', null, 'divider', `${optID}div`));
              }
              liIndex++;
              _li.push(generateLI(label, null, `dropdown-header${optGroupClass}`, optID));
            }

            if (that.options.hideDisabled && isDisabled) {
              liIndex--;
              return;
            }

            _li.push(generateLI(generateA(text, `opt ${optionClass}${optGroupClass}`, inline, tokens), index, '', optID));
          } else if ($this.data('divider') === true) {
            _li.push(generateLI('', index, 'divider'));
          } else if ($this.data('hidden') === true) {
            _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, 'hidden is-hidden'));
          } else {
            if (this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP') {
              liIndex++;
              _li.push(generateLI('', null, 'divider', `${optID}div`));
            }
            _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
          }

          that.liObj[index] = liIndex;
        });

        // If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
        if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
          this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
        }

        return _li.join('');
      },

      findLis() {
        if (this.$lis == null) this.$lis = this.$menu.find('li');
        return this.$lis;
      },

      /**
     * @param [updateLi] defaults to true
     */
      render(updateLi) {
        const that = this;
        let notDisabled;

        // Update the LI to match the SELECT
        if (updateLi !== false) {
          this.$element.find('option').each(function (index) {
            const $lis = that.findLis().eq(that.liObj[index]);

            that.setDisabled(index, this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled, $lis);
            that.setSelected(index, this.selected, $lis);
          });
        }

        this.tabIndex();

        const selectedItems = this.$element.find('option').map(function () {
          if (this.selected) {
            if (that.options.hideDisabled && (this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled)) return;

            const $this = $(this);
            const icon = $this.data('icon') && that.options.showIcon ? `<i class="${that.options.iconBase} ${$this.data('icon')}"></i> ` : '';
            let subtext;

            if (that.options.showSubtext && $this.data('subtext') && !that.multiple) {
              subtext = ` <small class="text-muted">${$this.data('subtext')}</small>`;
            } else {
              subtext = '';
            }
            if (typeof $this.attr('title') !== 'undefined') {
              return $this.attr('title');
            } if ($this.data('content') && that.options.showContent) {
              return $this.data('content');
            }
            return icon + $this.html() + subtext;
          }
        }).toArray();

        // Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
        // Convert all the values into a comma delimited string
        let title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

        // If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
        if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
          const max = this.options.selectedTextFormat.split('>');
          if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
            notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
            const totalCount = this.$element.find('option').not(`[data-divider="true"], [data-hidden="true"]${notDisabled}`).length;
            const tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
            title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
          }
        }

        if (this.options.title == undefined) {
          this.options.title = this.$element.attr('title');
        }

        if (this.options.selectedTextFormat == 'static') {
          title = this.options.title;
        }

        // If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
        if (!title) {
          title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
        }

        // strip all html-tags and trim the result
        this.$button.attr('title', $.trim(title.replace(/<[^>]*>?/g, '')));
        this.$button.children('.filter-option').html(title);

        this.$element.trigger('rendered.bs.select');
      },

      /**
     * @param [style]
     * @param [status]
     */
      setStyle(style, status) {
        if (this.$element.attr('class')) {
          this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
        }

        const buttonClass = style || this.options.style;

        if (status == 'add') {
          this.$button.addClass(buttonClass);
        } else if (status == 'remove') {
          this.$button.removeClass(buttonClass);
        } else {
          this.$button.removeClass(this.options.style);
          this.$button.addClass(buttonClass);
        }
      },

      liHeight(refresh) {
        if (!refresh && (this.options.size === false || this.sizeInfo)) return;

        const newElement = document.createElement('div');
        const menu = document.createElement('div');
        const menuInner = document.createElement('ul');
        const divider = document.createElement('li');
        const li = document.createElement('li');
        const a = document.createElement('a');
        const text = document.createElement('span');
        const header = this.options.header && this.$menu.find('.popover-title').length > 0 ? this.$menu.find('.popover-title')[0].cloneNode(true) : null;
        const search = this.options.liveSearch ? document.createElement('div') : null;
        const actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null;
        const doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

        text.className = 'text';
        newElement.className = `${this.$menu[0].parentNode.className} open`;
        menu.className = 'dropdown-menu open';
        menuInner.className = 'dropdown-menu inner';
        divider.className = 'divider';

        text.appendChild(document.createTextNode('Inner text'));
        a.appendChild(text);
        li.appendChild(a);
        menuInner.appendChild(li);
        menuInner.appendChild(divider);
        if (header) menu.appendChild(header);
        if (search) {
        // create a span instead of input as creating an input element is slower
          const input = document.createElement('span');
          search.className = 'bs-searchbox';
          input.className = 'form-control';
          search.appendChild(input);
          menu.appendChild(search);
        }
        if (actions) menu.appendChild(actions);
        menu.appendChild(menuInner);
        if (doneButton) menu.appendChild(doneButton);
        newElement.appendChild(menu);

        document.body.appendChild(newElement);

        const liHeight = a.offsetHeight;
        const headerHeight = header ? header.offsetHeight : 0;
        const searchHeight = search ? search.offsetHeight : 0;
        const actionsHeight = actions ? actions.offsetHeight : 0;
        const doneButtonHeight = doneButton ? doneButton.offsetHeight : 0;
        const dividerHeight = $(divider).outerHeight(true);
        // fall back to jQuery if getComputedStyle is not supported
        const menuStyle = typeof getComputedStyle === 'function' ? getComputedStyle(menu) : false;
        const $menu = menuStyle ? null : $(menu);
        const menuPadding = parseInt(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop'))
                        + parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom'))
                        + parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth'))
                        + parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth'));
        const menuExtras = menuPadding
                        + parseInt(menuStyle ? menuStyle.marginTop : $menu.css('marginTop'))
                        + parseInt(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2;

        document.body.removeChild(newElement);

        this.sizeInfo = {
          liHeight,
          headerHeight,
          searchHeight,
          actionsHeight,
          doneButtonHeight,
          dividerHeight,
          menuPadding,
          menuExtras,
        };
      },

      setSize() {
        this.findLis();
        this.liHeight();

        if (this.options.header) this.$menu.css('padding-top', 0);
        if (this.options.size === false) return;

        const that = this;
        const { $menu } = this;
        const { $menuInner } = this;
        const $window = $(window);
        const selectHeight = this.$newElement[0].offsetHeight;
        const { liHeight } = this.sizeInfo;
        const { headerHeight } = this.sizeInfo;
        const { searchHeight } = this.sizeInfo;
        const { actionsHeight } = this.sizeInfo;
        const { doneButtonHeight } = this.sizeInfo;
        const divHeight = this.sizeInfo.dividerHeight;
        const { menuPadding } = this.sizeInfo;
        const { menuExtras } = this.sizeInfo;
        const notDisabled = this.options.hideDisabled ? '.disabled' : '';
        let menuHeight;
        let getHeight;
        let selectOffsetTop;
        let selectOffsetBot;
        const posVert = function () {
          selectOffsetTop = that.$newElement.offset().top - $window.scrollTop();
          selectOffsetBot = $window.height() - selectOffsetTop - selectHeight;
        };

        posVert();

        if (this.options.size === 'auto') {
          const getSize = function () {
            let minHeight;
            const hasClass = function (className, include) {
              return function (element) {
                if (include) {
                  return (element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                }
                return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
              };
            };
            const lis = that.$menuInner[0].getElementsByTagName('li');
            const lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass('hidden', false)) : that.$lis.not('.hidden');
            const optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass('dropdown-header', true)) : lisVisible.filter('.dropdown-header');

            posVert();
            menuHeight = selectOffsetBot - menuExtras;

            if (that.options.container) {
              if (!$menu.data('height')) $menu.data('height', $menu.height());
              getHeight = $menu.data('height');
            } else {
              getHeight = $menu.height();
            }

            if (that.options.dropupAuto) {
              that.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras) < getHeight);
            }
            if (that.$newElement.hasClass('dropup')) {
              menuHeight = selectOffsetTop - menuExtras;
            }

            if ((lisVisible.length + optGroup.length) > 3) {
              minHeight = liHeight * 3 + menuExtras - 2;
            } else {
              minHeight = 0;
            }

            $menu.css({
              'max-height': `${menuHeight}px`,
              overflow: 'hidden',
              'min-height': `${minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight}px`,
            });
            $menuInner.css({
              'max-height': `${menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding}px`,
              'overflow-y': 'auto',
              'min-height': `${Math.max(minHeight - menuPadding, 0)}px`,
            });
          };
          getSize();
          this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
          $window.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', getSize);
        } else if (this.options.size && this.options.size != 'auto' && this.$lis.not(notDisabled).length > this.options.size) {
          const optIndex = this.$lis.not('.divider').not(notDisabled).children().slice(0, this.options.size)
            .last()
            .parent()
            .index();
          const divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
          menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;

          if (that.options.container) {
            if (!$menu.data('height')) $menu.data('height', $menu.height());
            getHeight = $menu.data('height');
          } else {
            getHeight = $menu.height();
          }

          if (that.options.dropupAuto) {
          // noinspection JSUnusedAssignment
            this.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras) < getHeight);
          }
          $menu.css({
            'max-height': `${menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight}px`,
            overflow: 'hidden',
            'min-height': '',
          });
          $menuInner.css({
            'max-height': `${menuHeight - menuPadding}px`,
            'overflow-y': 'auto',
            'min-height': '',
          });
        }
      },

      setWidth() {
        if (this.options.width === 'auto') {
          this.$menu.css('min-width', '0');

          // Get correct width if element is hidden
          const $selectClone = this.$menu.parent().clone().appendTo('body');
          const $selectClone2 = this.options.container ? this.$newElement.clone().appendTo('body') : $selectClone;
          const ulWidth = $selectClone.children('.dropdown-menu').outerWidth();
          const btnWidth = $selectClone2.css('width', 'auto').children('button').outerWidth();

          $selectClone.remove();
          $selectClone2.remove();

          // Set width to whatever's larger, button title or longest option
          this.$newElement.css('width', `${Math.max(ulWidth, btnWidth)}px`);
        } else if (this.options.width === 'fit') {
        // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '').addClass('fit-width');
        } else if (this.options.width) {
        // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', this.options.width);
        } else {
        // Remove inline min-width/width so width can be changed
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '');
        }
        // Remove fit-width class if width is changed programmatically
        if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
          this.$newElement.removeClass('fit-width');
        }
      },

      selectPosition() {
        this.$bsContainer = $('<div class="bs-container" />');

        const that = this;
        let pos;
        let actualHeight;
        const getPlacement = function ($element) {
          that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
          pos = $element.offset();
          actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;
          that.$bsContainer.css({
            top: pos.top + actualHeight,
            left: pos.left,
            width: $element[0].offsetWidth,
          });
        };

        this.$button.on('click', function () {
          const $this = $(this);

          if (that.isDisabled()) {
            return;
          }

          getPlacement(that.$newElement);

          that.$bsContainer
            .appendTo(that.options.container)
            .toggleClass('open', !$this.hasClass('open'))
            .append(that.$menu);
        });

        $(window).on('resize scroll', () => {
          getPlacement(that.$newElement);
        });

        this.$element.on('hide.bs.select', () => {
          that.$menu.data('height', that.$menu.height());
          that.$bsContainer.detach();
        });
      },

      setSelected(index, selected, $lis) {
        if (!$lis) {
          $lis = this.findLis().eq(this.liObj[index]);
        }

        $lis.toggleClass('selected', selected);
      },

      setDisabled(index, disabled, $lis) {
        if (!$lis) {
          $lis = this.findLis().eq(this.liObj[index]);
        }

        if (disabled) {
          $lis.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1);
        } else {
          $lis.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0);
        }
      },

      isDisabled() {
        return this.$element[0].disabled;
      },

      checkDisabled() {
        const that = this;

        if (this.isDisabled()) {
          this.$newElement.addClass('disabled');
          this.$button.addClass('disabled').attr('tabindex', -1);
        } else {
          if (this.$button.hasClass('disabled')) {
            this.$newElement.removeClass('disabled');
            this.$button.removeClass('disabled');
          }

          if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
            this.$button.removeAttr('tabindex');
          }
        }

        this.$button.click(() => !that.isDisabled());
      },

      tabIndex() {
        if (this.$element.data('tabindex') !== this.$element.attr('tabindex')
        && (this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98')) {
          this.$element.data('tabindex', this.$element.attr('tabindex'));
          this.$button.attr('tabindex', this.$element.data('tabindex'));
        }

        this.$element.attr('tabindex', -98);
      },

      clickListener() {
        const that = this;
        const $document = $(document);

        this.$newElement.on('touchstart.dropdown', '.dropdown-menu', (e) => {
          e.stopPropagation();
        });

        $document.data('spaceSelect', false);

        this.$button.on('keyup', (e) => {
          if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
            e.preventDefault();
            $document.data('spaceSelect', false);
          }
        });

        this.$button.on('click', () => {
          that.setSize();
        });

        this.$element.on('shown.bs.select', () => {
          if (!that.options.liveSearch && !that.multiple) {
            that.$menuInner.find('.selected a').focus();
          } else if (!that.multiple) {
            const selectedIndex = that.liObj[that.$element[0].selectedIndex];

            if (typeof selectedIndex !== 'number' || that.options.size === false) return;

            // scroll to selected option
            let offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
            offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2;
            that.$menuInner[0].scrollTop = offset;
          }
        });

        this.$menuInner.on('click', 'li a', function (e) {
          const $this = $(this);
          const clickedIndex = $this.parent().data('originalIndex');
          const prevValue = that.$element.val();
          const prevIndex = that.$element.prop('selectedIndex');

          // Don't close on multi choice menu
          if (that.multiple) {
            e.stopPropagation();
          }

          e.preventDefault();

          // Don't run if we have been disabled
          if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
            const $options = that.$element.find('option');
            const $option = $options.eq(clickedIndex);
            const state = $option.prop('selected');
            const $optgroup = $option.parent('optgroup');
            const { maxOptions } = that.options;
            const maxOptionsGrp = $optgroup.data('maxOptions') || false;

            if (!that.multiple) { // Deselect all others if not multi select box
              $options.prop('selected', false);
              $option.prop('selected', true);
              that.$menuInner.find('.selected').removeClass('selected');
              that.setSelected(clickedIndex, true);
            } else { // Toggle the one we have chosen if we are multi select.
              $option.prop('selected', !state);
              that.setSelected(clickedIndex, !state);
              $this.blur();

              if (maxOptions !== false || maxOptionsGrp !== false) {
                const maxReached = maxOptions < $options.filter(':selected').length;
                const maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

                if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                  if (maxOptions && maxOptions == 1) {
                    $options.prop('selected', false);
                    $option.prop('selected', true);
                    that.$menuInner.find('.selected').removeClass('selected');
                    that.setSelected(clickedIndex, true);
                  } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                    $optgroup.find('option:selected').prop('selected', false);
                    $option.prop('selected', true);
                    const optgroupID = $this.parent().data('optgroup');
                    that.$menuInner.find(`[data-optgroup="${optgroupID}"]`).removeClass('selected');
                    that.setSelected(clickedIndex, true);
                  } else {
                    const maxOptionsArr = (typeof that.options.maxOptionsText === 'function')
                      ? that.options.maxOptionsText(maxOptions, maxOptionsGrp) : that.options.maxOptionsText;
                    let maxTxt = maxOptionsArr[0].replace('{n}', maxOptions);
                    let maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp);
                    const $notify = $('<div class="notify"></div>');
                    // If {var} is set in array, replace it
                    /** @deprecated */
                    if (maxOptionsArr[2]) {
                      maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                      maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                    }

                    $option.prop('selected', false);

                    that.$menu.append($notify);

                    if (maxOptions && maxReached) {
                      $notify.append($(`<div>${maxTxt}</div>`));
                      that.$element.trigger('maxReached.bs.select');
                    }

                    if (maxOptionsGrp && maxReachedGrp) {
                      $notify.append($(`<div>${maxTxtGrp}</div>`));
                      that.$element.trigger('maxReachedGrp.bs.select');
                    }

                    setTimeout(() => {
                      that.setSelected(clickedIndex, false);
                    }, 10);

                    $notify.delay(750).fadeOut(300, function () {
                      $(this).remove();
                    });
                  }
                }
              }
            }

            if (!that.multiple) {
              that.$button.focus();
            } else if (that.options.liveSearch) {
              that.$searchbox.focus();
            }

            // Trigger select 'change'
            if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
            // $option.prop('selected') is current option state (selected/unselected). state is previous option state.
              that.$element
                .trigger('changed.bs.select', [clickedIndex, $option.prop('selected'), state])
                .triggerNative('change');
            }
          }
        });

        this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
          if (e.currentTarget == this) {
            e.preventDefault();
            e.stopPropagation();
            if (that.options.liveSearch && !$(e.target).hasClass('close')) {
              that.$searchbox.focus();
            } else {
              that.$button.focus();
            }
          }
        });

        this.$menuInner.on('click', '.divider, .dropdown-header', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }
        });

        this.$menu.on('click', '.popover-title .close', () => {
          that.$button.click();
        });

        this.$searchbox.on('click', (e) => {
          e.stopPropagation();
        });

        this.$menu.on('click', '.actions-btn', function (e) {
          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }

          e.preventDefault();
          e.stopPropagation();

          if ($(this).hasClass('bs-select-all')) {
            that.selectAll();
          } else {
            that.deselectAll();
          }
        });

        this.$element.change(() => {
          that.render(false);
        });
      },

      liveSearchListener() {
        const that = this;
        const $no_results = $('<li class="no-results"></li>');

        this.$button.on('click.dropdown.data-api touchstart.dropdown.data-api', () => {
          that.$menuInner.find('.active').removeClass('active');
          if (that.$searchbox.val()) {
            that.$searchbox.val('');
            that.$lis.not('.is-hidden').removeClass('hidden');
            if ($no_results.parent().length) $no_results.remove();
          }
          if (!that.multiple) that.$menuInner.find('.selected').addClass('active');
          setTimeout(() => {
            that.$searchbox.focus();
          }, 10);
        });

        this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', (e) => {
          e.stopPropagation();
        });

        this.$searchbox.on('input propertychange', function () {
          if (that.$searchbox.val()) {
            let $searchBase = that.$lis.not('.is-hidden').removeClass('hidden').children('a');
            if (that.options.liveSearchNormalize) {
              $searchBase = $searchBase.not(`:a${that._searchStyle()}("${normalizeToBase(that.$searchbox.val())}")`);
            } else {
              $searchBase = $searchBase.not(`:${that._searchStyle()}("${that.$searchbox.val()}")`);
            }
            $searchBase.parent().addClass('hidden');

            that.$lis.filter('.dropdown-header').each(function () {
              const $this = $(this);
              const optgroup = $this.data('optgroup');

              if (that.$lis.filter(`[data-optgroup=${optgroup}]`).not($this).not('.hidden').length === 0) {
                $this.addClass('hidden');
                that.$lis.filter(`[data-optgroup=${optgroup}div]`).addClass('hidden');
              }
            });

            const $lisVisible = that.$lis.not('.hidden');

            // hide divider if first or last visible, or if followed by another divider
            $lisVisible.each(function (index) {
              const $this = $(this);

              if ($this.hasClass('divider') && (
                $this.index() === $lisVisible.first().index()
              || $this.index() === $lisVisible.last().index()
              || $lisVisible.eq(index + 1).hasClass('divider'))) {
                $this.addClass('hidden');
              }
            });

            if (!that.$lis.not('.hidden, .no-results').length) {
              if ($no_results.parent().length) {
                $no_results.remove();
              }
              $no_results.html(that.options.noneResultsText.replace('{0}', `"${htmlEscape(that.$searchbox.val())}"`)).show();
              that.$menuInner.append($no_results);
            } else if ($no_results.parent().length) {
              $no_results.remove();
            }
          } else {
            that.$lis.not('.is-hidden').removeClass('hidden');
            if ($no_results.parent().length) {
              $no_results.remove();
            }
          }

          that.$lis.filter('.active').removeClass('active');
          if (that.$searchbox.val()) {
            that.$lis.not('.hidden, .divider, .dropdown-header').eq(0).addClass('active').children('a')
              .focus();
          }
          $(this).focus();
        });
      },

      _searchStyle() {
        const styles = {
          begins: 'ibegins',
          startsWith: 'ibegins',
        };

        return styles[this.options.liveSearchStyle] || 'icontains';
      },

      val(value) {
        if (typeof value !== 'undefined') {
          this.$element.val(value);
          this.render();

          return this.$element;
        }
        return this.$element.val();
      },

      changeAll(status) {
        if (typeof status === 'undefined') status = true;

        this.findLis();

        const $options = this.$element.find('option');
        const $lisVisible = this.$lis.not('.divider, .dropdown-header, .disabled, .hidden').toggleClass('selected', status);
        const lisVisLen = $lisVisible.length;
        const selectedOptions = [];

        for (let i = 0; i < lisVisLen; i++) {
          const origIndex = $lisVisible[i].getAttribute('data-original-index');
          selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
        }

        $(selectedOptions).prop('selected', status);

        this.render(false);

        this.$element
          .trigger('changed.bs.select')
          .triggerNative('change');
      },

      selectAll() {
        return this.changeAll(true);
      },

      deselectAll() {
        return this.changeAll(false);
      },

      toggle(e) {
        e = e || window.event;

        if (e) e.stopPropagation();

        this.$button.trigger('click');
      },

      keydown(e) {
        const $this = $(this);
        let $parent = $this.is('input') ? $this.parent().parent() : $this.parent();
        let $items;
        const that = $parent.data('this');
        let index;
        let next;
        let first;
        let last;
        let prev;
        let nextPrev;
        let prevIndex;
        let isActive;
        const selector = ':not(.disabled, .hidden, .dropdown-header, .divider)';
        const keyCodeMap = {
          32: ' ',
          48: '0',
          49: '1',
          50: '2',
          51: '3',
          52: '4',
          53: '5',
          54: '6',
          55: '7',
          56: '8',
          57: '9',
          59: ';',
          65: 'a',
          66: 'b',
          67: 'c',
          68: 'd',
          69: 'e',
          70: 'f',
          71: 'g',
          72: 'h',
          73: 'i',
          74: 'j',
          75: 'k',
          76: 'l',
          77: 'm',
          78: 'n',
          79: 'o',
          80: 'p',
          81: 'q',
          82: 'r',
          83: 's',
          84: 't',
          85: 'u',
          86: 'v',
          87: 'w',
          88: 'x',
          89: 'y',
          90: 'z',
          96: '0',
          97: '1',
          98: '2',
          99: '3',
          100: '4',
          101: '5',
          102: '6',
          103: '7',
          104: '8',
          105: '9',
        };

        if (that.options.liveSearch) $parent = $this.parent().parent();

        if (that.options.container) $parent = that.$menu;

        $items = $('[role=menu] li', $parent);

        isActive = that.$newElement.hasClass('open');

        if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
          if (!that.options.container) {
            that.setSize();
            that.$menu.parent().addClass('open');
            isActive = true;
          } else {
            that.$button.trigger('click');
          }
          that.$searchbox.focus();
        }

        if (that.options.liveSearch) {
          if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && that.$menu.find('.active').length === 0) {
            e.preventDefault();
            that.$menu.parent().removeClass('open');
            if (that.options.container) that.$newElement.removeClass('open');
            that.$button.focus();
          }
          // $items contains li elements when liveSearch is enabled
          $items = $(`[role=menu] li${selector}`, $parent);
          if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
            if ($items.filter('.active').length === 0) {
              $items = that.$menuInner.find('li');
              if (that.options.liveSearchNormalize) {
                $items = $items.filter(`:a${that._searchStyle()}(${normalizeToBase(keyCodeMap[e.keyCode])})`);
              } else {
                $items = $items.filter(`:${that._searchStyle()}(${keyCodeMap[e.keyCode]})`);
              }
            }
          }
        }

        if (!$items.length) return;

        if (/(38|40)/.test(e.keyCode.toString(10))) {
          index = $items.index($items.find('a').filter(':focus').parent());
          first = $items.filter(selector).first().index();
          last = $items.filter(selector).last().index();
          next = $items.eq(index).nextAll(selector).eq(0).index();
          prev = $items.eq(index).prevAll(selector).eq(0).index();
          nextPrev = $items.eq(next).prevAll(selector).eq(0).index();

          if (that.options.liveSearch) {
            $items.each(function (i) {
              if (!$(this).hasClass('disabled')) {
                $(this).data('index', i);
              }
            });
            index = $items.index($items.filter('.active'));
            first = $items.first().data('index');
            last = $items.last().data('index');
            next = $items.eq(index).nextAll().eq(0).data('index');
            prev = $items.eq(index).prevAll().eq(0).data('index');
            nextPrev = $items.eq(next).prevAll().eq(0).data('index');
          }

          prevIndex = $this.data('prevIndex');

          if (e.keyCode == 38) {
            if (that.options.liveSearch) index--;
            if (index != nextPrev && index > prev) index = prev;
            if (index < first) index = first;
            if (index == prevIndex) index = last;
          } else if (e.keyCode == 40) {
            if (that.options.liveSearch) index++;
            if (index == -1) index = 0;
            if (index != nextPrev && index < next) index = next;
            if (index > last) index = last;
            if (index == prevIndex) index = first;
          }

          $this.data('prevIndex', index);

          if (!that.options.liveSearch) {
            $items.eq(index).children('a').focus();
          } else {
            e.preventDefault();
            if (!$this.hasClass('dropdown-toggle')) {
              $items.removeClass('active').eq(index).addClass('active').children('a')
                .focus();
              $this.focus();
            }
          }
        } else if (!$this.is('input')) {
          const keyIndex = [];
          let count;
          let prevKey;

          $items.each(function () {
            if (!$(this).hasClass('disabled')) {
              if ($.trim($(this).children('a').text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
                keyIndex.push($(this).index());
              }
            }
          });

          count = $(document).data('keycount');
          count++;
          $(document).data('keycount', count);

          prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

          if (prevKey != keyCodeMap[e.keyCode]) {
            count = 1;
            $(document).data('keycount', count);
          } else if (count >= keyIndex.length) {
            $(document).data('keycount', 0);
            if (count > keyIndex.length) count = 1;
          }

          $items.eq(keyIndex[count - 1]).children('a').focus();
        }

        // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
        if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
          if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
          if (!that.options.liveSearch) {
            const elem = $(':focus');
            elem.click();
            // Bring back focus for multiselects
            elem.focus();
            // Prevent screen from scrolling if the user hit the spacebar
            e.preventDefault();
            // Fixes spacebar selection of dropdown items in FF & IE
            $(document).data('spaceSelect', true);
          } else if (!/(32)/.test(e.keyCode.toString(10))) {
            that.$menuInner.find('.active a').click();
            $this.focus();
          }
          $(document).data('keycount', 0);
        }

        if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
          that.$menu.parent().removeClass('open');
          if (that.options.container) that.$newElement.removeClass('open');
          that.$button.focus();
        }
      },

      mobile() {
        this.$element.addClass('mobile-device');
      },

      refresh() {
        this.$lis = null;
        this.liObj = {};
        this.reloadLi();
        this.render();
        this.checkDisabled();
        this.liHeight(true);
        this.setStyle();
        this.setWidth();
        if (this.$lis) this.$searchbox.trigger('propertychange');

        this.$element.trigger('refreshed.bs.select');
      },

      hide() {
        this.$newElement.hide();
      },

      show() {
        this.$newElement.show();
      },

      remove() {
        this.$newElement.remove();
        this.$element.remove();
      },

      destroy() {
        this.$newElement.before(this.$element).remove();

        if (this.$bsContainer) {
          this.$bsContainer.remove();
        } else {
          this.$menu.remove();
        }

        this.$element
          .off('.bs.select')
          .removeData('selectpicker')
          .removeClass('bs-select-hidden selectpicker');
      },
    };

    // SELECTPICKER PLUGIN DEFINITION
    // ==============================
    function Plugin(option, event) {
    // get the args of the outer function..
      const args = arguments;
      // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
      // to get lost/corrupted in android 2.3 and IE9 #715 #775
      const _option = option;
      const _event = event;
      [].shift.apply(args);

      let value;
      const chain = this.each(function () {
        const $this = $(this);
        if ($this.is('select')) {
          let data = $this.data('selectpicker');
          const options = typeof _option === 'object' && _option;

          if (!data) {
            const config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
            config.template = $.extend({}, Selectpicker.DEFAULTS.template, ($.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}), $this.data().template, options.template);
            $this.data('selectpicker', (data = new Selectpicker(this, config, _event)));
          } else if (options) {
            for (const i in options) {
              if (options.hasOwnProperty(i)) {
                data.options[i] = options[i];
              }
            }
          }

          if (typeof _option === 'string') {
            if (data[_option] instanceof Function) {
              value = data[_option].apply(data, args);
            } else {
              value = data.options[_option];
            }
          }
        }
      });

      if (typeof value !== 'undefined') {
      // noinspection JSUnusedAssignment
        return value;
      }
      return chain;
    }

    const old = $.fn.selectpicker;
    $.fn.selectpicker = Plugin;
    $.fn.selectpicker.Constructor = Selectpicker;

    // SELECTPICKER NO CONFLICT
    // ========================
    $.fn.selectpicker.noConflict = function () {
      $.fn.selectpicker = old;
      return this;
    };

    $(document)
      .data('keycount', 0)
      .on('keydown.bs.select', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', Selectpicker.prototype.keydown)
      .on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', (e) => {
        e.stopPropagation();
      });

    // SELECTPICKER DATA-API
    // =====================
    $(window).on('load.bs.select.data-api', () => {
      $('.selectpicker').each(function () {
        const $selectpicker = $(this);
        Plugin.call($selectpicker, $selectpicker.data());
      });
    });
  }(jQuery));
}));
