//  Theme Custom jquery file,
// Project:        Fokir-Charity and Fundraising HTML template.
// Version:        1.0
// Last change:    23/04/2018.
// Designed:       Unifytheme
// Developed:      Unifytheme

// Prealoder
function prealoader() {
  if ($('#loader').length) {
    $('#loader').fadeOut(); // will first fade out the loading animation
    $('#loader-wrapper').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({ overflow: 'visible' });
  }
}

// WOW animation
function wowAnimation() {
  if ($('.wow').length) {
    const wow = new WOW(
      {
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 80, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
      },
    );
    wow.init();
  }
}

// placeholder remove
function removePlaceholder() {
  if ($('input,textarea').length) {
    $('input,textarea').each(
      function () {
        $(this).data('holder', $(this).attr('placeholder'));
        $(this).on('focusin', function () {
          $(this).attr('placeholder', '');
        });
        $(this).on('focusout', function () {
          $(this).attr('placeholder', $(this).data('holder'));
        });
      },
    );
  }
}

// Theme Search Box
function searchBox() {
  const search = $('#search-button');
  const mainSearch = $('#searchWrapper');
  const close = $('#close-button');
  if (search.length) {
    search.on('click', () => {
      mainSearch.addClass('show-box');
    });
    close.on('click', () => {
      mainSearch.removeClass('show-box');
    });
  }
}

// Charity banner slider
function BannerSliderFour() {
  const banner = $('#charity-main-banner');
  if (banner.length) {
    banner.revolution({
      sliderType: 'standard',
      sliderLayout: 'auto',
      loops: true,
      delay: 7000,
      navigation: {
        bullets: {
          enable: true,
          hide_onmobile: false,
          style: 'uranus',
          hide_onleave: false,
          direction: 'horizontal',
          h_align: 'center',
          v_align: 'bottom',
          h_offset: 0,
          v_offset: 30,
          space: 10,
          tmp: '<span class="tp-bullet-inner"></span>',
        },

      },
      responsiveLevels: [2220, 1183, 975, 751],
      gridwidth: [1170, 970, 770, 320],
      gridheight: [960, 960, 900, 800],
      shadow: 0,
      spinner: 'off',
      autoHeight: 'off',
      disableProgressBar: 'on',
      hideThumbsOnMobile: 'off',
      hideSliderAtLimit: 0,
      hideCaptionAtLimit: 0,
      hideAllCaptionAtLilmit: 0,
      debugMode: false,
      fallbacks: {
        simplifyAll: 'off',
        disableFocusListener: false,
      },
    });
  }
}

Window.BannerSliderFour = BannerSliderFour;

// Main Menu Function
function themeMenu() {
  const menu = $('#mega-menu-holder');
  if (menu.length) {
    menu.slimmenu({
      resizeWidth: '991',
      animSpeed: 'medium',
      indentChildren: true,
    });
  }
}

// Fancybox
function FancypopUp() {
  const popBox = $('.fancybox');
  if (popBox.length) {
    popBox.fancybox({
      openEffect: 'elastic',
      closeEffect: 'elastic',
      helpers: {
        overlay: {
          css: {
            background: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    });
  }
}

// Counter function
function CounterNumberChanger() {
  const timer = $('.timer');
  if (timer.length) {
    timer.appear(() => {
      timer.countTo();
    });
  }
}

// RoundCircle Progress
function roundCircleProgress() {
  const rounderContainer = $('.piechart');
  if (rounderContainer.length) {
    rounderContainer.each(function () {
      const Self = $(this);
      const value = Self.data('value');
      const size = Self.parent().width();
      const color = Self.data('border-color');

      Self.find('span').each(function () {
        const expertCount = $(this);
        expertCount.appear(() => {
          expertCount.countTo({
            from: 1,
            to: value * 100,
            speed: 2000,
          });
        });
      });
      Self.appear(() => {
        Self.circleProgress({
          value,
          size: 80,
          thickness: 8,
          emptyFill: 'rgba(243,243,243,1)',
          animation: {
            duration: 2000,
          },
          fill: {
            color,
          },
        });
      });
    });
  }
}

// Partner Logo Footer
function partnersLogo() {
  const pSlider = $('#partner-logo');
  if (pSlider.length) {
    pSlider.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplaySpeed: 900,
      lazyLoad: true,
      dragEndSpeed: 1000,
      responsive: {
        0: {
          items: 2,
        },
        700: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }
}

// Progress Bar
function bootstrapProgress() {
  const smartskill = $('.skills');
  if (smartskill.length) {
    smartskill.skill();
  }
}

// Charity Cause SLider
function causeSlider() {
  const cSlider = $('.similer-casue-slider');
  if (cSlider.length) {
    cSlider.owlCarousel({
      loop: true,
      nav: true,
      navText: ['', ''],
      dots: false,
      autoplay: true,
      autoplayTimeout: 9000,
      autoplaySpeed: 1000,
      lazyLoad: true,
      dragEndSpeed: 1000,
      navSpeed: 1500,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }
}

// Donation amount
function donateAmount() {
  if ($('.donate-price').length) {
    $('.donate-price').on('click', function () {
      const text = $(this).text();
      $('.donate-amount-handelar').val(text);
    });
  }
}

// Product Slider
function productSlider() {
  const nSlider = $('.related-product-slider');
  if (nSlider.length) {
    nSlider.owlCarousel({
      loop: true,
      nav: true,
      navText: ['', ''],
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1300,
      lazyLoad: true,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
    });
  }
}

// shop price ranger
function priceRanger() {
  if ($('.price-ranger').length) {
    $('.price-ranger #slider-range').slider({
      range: true,
      min: 0,
      max: 1200,
      values: [99, 1035],
      slide(event, ui) {
        $('.price-ranger .ranger-min-max-block .min').val(`$${ui.values[0]}`);
        $('.price-ranger .ranger-min-max-block .max').val(`$${ui.values[1]}`);
      },
    });
    $('.price-ranger .ranger-min-max-block .min').val(`$${$('.price-ranger #slider-range').slider('values', 0)}`);
    $('.price-ranger .ranger-min-max-block .max').val(`$${$('.price-ranger #slider-range').slider('values', 1)}`);
  }
}

// Scroll to top
function scrollToTop() {
  const scrollTop = $('.scroll-top');
  if (scrollTop.length) {
    // Check to see if the window is top if not then display button
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 200) {
        scrollTop.fadeIn();
      } else {
        scrollTop.fadeOut();
      }
    });

    // Click event to scroll to top
    scrollTop.on('click', () => {
      $('html, body').animate({ scrollTop: 0 }, 1500);
      return false;
    });
  }
}

// Contact Form Validation
function contactFormValidation() {
  const activeform = $('.form-validation');
  if (activeform.length) {
    activeform.validate({ // initialize the plugin
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        message: {
          required: true,
        },
        phone: {
          required: true,
        },
      },
      submitHandler(form) {
        $(form).ajaxSubmit({
          success() {
            $('.form-validation :input').attr('disabled', 'disabled');
            activeform.fadeTo('slow', 1, function () {
              $(this).find(':input').attr('disabled', 'disabled');
              $(this).find('label').css('cursor', 'default');
              $('#alert-success').fadeIn();
            });
          },
          error() {
            activeform.fadeTo('slow', 1, () => {
              $('#alert-error').fadeIn();
            });
          },
        });
      },
    });
  }
}

// Close suddess Alret
function closeSuccessAlert() {
  const closeButton = $('.closeAlert');
  if (closeButton.length) {
    closeButton.on('click', () => {
      $('.alert-wrapper').fadeOut();
    });
    closeButton.on('click', () => {
      $('.alert-wrapper').fadeOut();
    });
  }
}

// Sticky header
function stickyHeader() {
  const sticky = $('.charity-header');
  const scroll = $(window).scrollTop();

  if (sticky.length) {
    if (scroll >= 190) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  }
}

// Disable Right Click And Copy paste
function disableCopy() {
  if ($('body').length) {
    $('body').on('contextmenu', (e) => false);

    $('body').bind('cut copy paste', (e) => {
      e.preventDefault();
    });
  }
}

// Accordion panel
function themeAccrodion() {
  if ($('.theme-accordion > .panel').length) {
    $('.theme-accordion > .panel').on('show.bs.collapse', function (e) {
      const heading = $(this).find('.panel-heading');
      heading.addClass('active-panel');
    });

    $('.theme-accordion > .panel').on('hidden.bs.collapse', function (e) {
      const heading = $(this).find('.panel-heading');
      heading.removeClass('active-panel');
      // setProgressBar(heading.get(0).id);
    });

    $('.panel-heading a').on('click', function (e) {
      if ($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
        e.stopPropagation();
      }
    });
  }
}

// Mixitup gallery
function mixitupGallery() {
  if ($('#mixitUp-item').length) {
    $('#mixitUp-item').mixItUp();
  }
}

// Event Slider
function eventSlider() {
  const nSlider = $('.related-event-slider');
  if (nSlider.length) {
    nSlider.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1300,
      lazyLoad: true,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
      },
    });
  }
}

// DOM ready function
jQuery(document).on('ready', () => {
  (function ($) {
	   removePlaceholder();
    searchBox();
    BannerSliderFour();
    themeMenu();
    wowAnimation();
    FancypopUp();
    CounterNumberChanger();
    partnersLogo();
    bootstrapProgress();
    causeSlider();
    donateAmount();
    productSlider();
    priceRanger();
    scrollToTop();
    contactFormValidation();
    closeSuccessAlert();
    themeAccrodion();
    mixitupGallery();
    eventSlider();
    // disableCopy ()
  }(jQuery));
});

// Window load function
jQuery(window).on('load', () => {
  (function ($) {
		  prealoader();
    roundCircleProgress();
  }(jQuery));
});

// Window scroll function
jQuery(window).on('scroll', () => {
  (function ($) {
    stickyHeader();
  }(jQuery));
});
