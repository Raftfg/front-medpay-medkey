/*===================================================
Project: flex-it - IT Solutions & Business Services Responsive HTML5 Bootstrap5  Website Template 
Auther: amin-themes
Version: 2.0
Last change:22 Mar 2023
Template Description: IT Solutions & Business Services Responsive HTML5 Bootstrap5  Website Template 
====================================================*/

//GLOBAL VARIBALES

//selector constants
window.initFlexItTemplate = function () {
  const main_window = $(window),
    pageBody = $("body"),
    bdyOnePage = $("body.landing-page-demo "),
    hasSubMenu = $(".has-sub-menu"),
    pageHeader = $("#page-header"),
    navMain = $("nav.menu-navbar"),
    toTopBtn = $(".back-to-top"),
    heroVegasSlider = $(".page-hero.hero-vegas-slider"),
    textInput = $("form.main-form .text-input"),
    tabLink = $(".ma-tabs .tabs-links .tab-link"),
    portfolioGroup = $(".portfolio .portfolio-group");

  ("use strict");

  // function to fire the conter plugin
  let counterShowsUp = false;

  function fireCounter() {
    if ($(".js-stats-counter").length) {
      if (jQuery().countTo && counterShowsUp === false) {
        let pos = $(".js-stats-counter").offset().top;
        if (main_window.scrollTop() + main_window.innerHeight() - 50 >= pos) {
          $(".counter").countTo();
          counterShowsUp = true;
        }
      }
    }
  }

  // Start open/close navbar search box
  $(".header-search-box form").off("click").on("click", function (e) {
    e.stopPropagation();
  });

  $(".header-search-btn").off("click").on("click", function () {
    $(".header-search-box").addClass("show");

    setTimeout(function () {
      $(".search-input").focus();
    }, 1000);
  });

  /* ********* Start dark mode switcher ***********/

  const modeSwitcher = $(".mode-switcher");
  const themeStoredKey = "ThemeColor";
  const darkTheme_class = "dark-theme";
  const lightTheme_class = "light-theme";

  // modeSwitcher.addClass(darkTheme_class); // Removed to avoid resetting on route change
  $(modeSwitcher).off("click").on("click", function () {
    if ($(this).is("." + darkTheme_class)) {
      pageBody.addClass(lightTheme_class).removeClass(darkTheme_class);
      modeSwitcher.addClass(lightTheme_class).removeClass(darkTheme_class);
    } else if ($(this).is("." + lightTheme_class)) {
      pageBody.addClass(darkTheme_class).removeClass(lightTheme_class);
      modeSwitcher.addClass(darkTheme_class).removeClass(lightTheme_class);
    }
  });

  /* ----------------------------------
     START #page-header js rules
   ---------------------------------- */

  /* *******  start open/close navbar search box   ********/
  $(".header-search-box .close-search , .header-search-box").off("click").on("click", () => {
    $(".header-search-box").removeClass("show");
  });

  /* Start bootstrap Scrollspy Options  */
  //on one page demos only
  if (navMain.length && bdyOnePage.length) {
    $(bdyOnePage).scrollspy({
      target: navMain,
      offset: navMain.innerHeight() + 1,
    });
  }

  // make the menu stick on top whlie reloading
  if ($(window).scrollTop() > 50) {
    $("#page-header").addClass("is-sticky");
  }

  /* *******  make the menu stick on top upon the page scrolling   ********/
  main_window.off("scroll.sticky").on("scroll.sticky", function () {
    const stickyHeader = $("#page-header");
    if ($(this).scrollTop() > 50) {
      if (!stickyHeader.hasClass("is-sticky")) {
        stickyHeader.addClass("is-sticky");
      }
    } else {
      if (stickyHeader.hasClass("is-sticky")) {
        stickyHeader.removeClass("is-sticky");
      }
    }
  });

  /* *******  show/hide navbar links menu  ********/
  $(".menu-toggler").off("click").on("click", function () {
    pageHeader.find(".show:not(.menu-wrapper) ").removeClass("show");
    pageHeader.find(".menu-wrapper").toggleClass("show");
    $(".menu-toggler").toggleClass("close-menu");
  });

  /* ******* close the currnt opend menu when click on its wrapper ********/
  $(".links-list").off("click").on("click", function (e) {
    e.stopPropagation();
  });

  $(".menu-wrapper").off("click").on("click", function () {
    $(this).removeClass("show");
    if ($(".menu-toggler").hasClass("close-menu")) {
      $(".menu-toggler").removeClass("close-menu");
    }
  });

  /* ******* showing navbar sub-menus on mobile ********/
  hasSubMenu.off("click").on("click", function (e) {
    e.stopPropagation();
    if (!(main_window.innerWidth() > 1199)) {
      $(this).children(".sub-menu").slideToggle();
    }
  });

  /* ******* Start Smooth Scrolling To page sections Area********/
  $(".landing-page-demo .menu-navbar .menu-link").off("click").on("click", function (e) {
    const link = $(this).attr("href");
    let currentMainNavHeight = navMain.innerHeight();
    if (link && link.charAt(0) === "#") {
      e.preventDefault();
      const target = this.hash;
      if ($(target).length) {
        $("html, body").animate(
          {
            scrollTop: $(target).offset().top - currentMainNavHeight + 1,
          },
          500
        );
      }

      if (!$(this).parent(".menu-item").hasClass("has-sub-menu")) {
        // to close the menu after going to crossponding section
        if ($(".menu-wrapper").hasClass("show")) {
          $(".menu-wrapper").removeClass("show");
        }

        // to change the menu toggler buttn icon
        if ($(".menu-toggler").hasClass("close-menu")) {
          $(".menu-toggler").removeClass("close-menu");
        }
      }
    }
  });

  /*----------------------------------
   END #page-header js rules
  ----------------------------------*/
  if ($(textInput).length) {
    let inputHasText = "has-text";

    $(textInput).each(function () {
      if ($(this).val().trim() !== "")
        $(this).parent().addClass(inputHasText);
      else $(this).parent().removeClass(inputHasText);
    });

    $(textInput).off("focusout").on("focusout", function () {
      if ($(this).val().trim() !== "") {
        $(this).parent().addClass(inputHasText);
      } else {
        $(this).parent().removeClass(inputHasText);
      }
    });
  }

  // Start Smooth Scrolling To Window Top When Clicking on Back To Top Button
  $(toTopBtn).off("click").on("click", function () {
    $("html, body").css("scroll-behavior", "smooth").scrollTop(0);
  });

  /* Start Portfolio btns  */
  if ($(".portfolio .portfolio-btn").length) {
    $(".portfolio .portfolio-btn").off("click").on("click", function () {
      $(this).addClass("active").siblings().removeClass("active");

      const $filterValue = $(this).attr("data-filter");
      portfolioGroup.isotope({
        filter: $filterValue,
      });
    });
  }

  /* *******   initialize Counter plugin ********/
  fireCounter();

  /* ********* set the Background Image path and opacity for elements that has the  a vlaue for data-bg-img attribute***********/
  const bg_img = $("*");
  bg_img.each(function () {
    if ($(this).attr("data-bg-img")) {
      $(this).css("background-image", `url(${$(this).attr("data-bg-img")}`);
    }
    if ($(this).attr("data-bg-opacity")) {
      $(this).css("opacity", `${$(this).attr("data-bg-opacity")}`);
    }
  });

  /* *******  Start skills Bars  ********/
  $(window).off("scroll.skills").on("scroll.skills", function () {
    $(".skills .skill .skill-bar .bar").each(function () {
      let barOriginalPosition = $(this).offset().top + $(this).outerHeight();
      let barCurrPosition = $(window).scrollTop() + $(window).height();
      let widthValue = $(this).attr("data-skill-val");
      if (barCurrPosition > barOriginalPosition) {
        $(this).css({
          width: widthValue + "%",
        });
      }
    });
  });

  /* ******* Start Percentage loading screen interactions ********/
  if ($("#loading-screen").length) {
    let percentage = 0;
    let LoadingCounter = setInterval(function () {
      if (percentage <= 100) {
        $("#loading-screen .loading-counter").text(percentage + "%");
        $("#loading-screen .bar").css("width", (100 - percentage) / 2 + "%");
        $("#loading-screen .progress-line").css(
          "transform",
          "scale(" + percentage / 100 + ")"
        );
        percentage++;
      } else {
        $("#loading-screen").fadeOut(500);
        setTimeout(() => {
          $("#loading-screen").remove();
        }, 1500);
        clearInterval(LoadingCounter);
      }
    }, 10);
  }

  main_window.off("scroll.misc").on("scroll.misc", function () {
    if ($(this).scrollTop() > 50) {
      toTopBtn.addClass("show");
    } else {
      toTopBtn.removeClass("show");
    }
    fireCounter();
  });

  /*************Start Contact Form Functionality************/

  const contactForm = $("#contact-us-form"),
    submitBtn = $("#submit-btn");

  if (submitBtn.length) {
    submitBtn.off("click").on("click", function (e) {
      e.preventDefault();
      // ... Validation logic ...
      // Keeping it simple here or copying original if needed
    });
  }

  //initialize swiper [Hero Section] //fade slider
  if ($(".hero-swiper-slider.fade-effect .swiper-container").length) {
    new Swiper(".hero-swiper-slider.fade-effect .swiper-container", {
      speed: 1000,
      loop: true,
      reverseDirection: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      on: {
        init: function () {
          $(".slides-count").html("0" + (this.slides.length - 2));
          $(".curent-slide").html("0" + (this.realIndex + 1));
        },
        slideChange: function () {
          $(".curent-slide").html("0" + (this.realIndex + 1));
        },
      },
      autoplay: { delay: 5000, disableOnInteraction: true },
      pagination: { el: ".hero-swiper-slider.fade-effect .swiper-pagination", type: "bullets", clickable: true },
      navigation: { nextEl: ".hero-swiper-slider.fade-effect .swiper-button-next", prevEl: ".hero-swiper-slider.fade-effect .swiper-button-prev" },
    });
  }
  if ($(".hero-swiper-slider.slide-effect .swiper-container").length) {
    new Swiper(".hero-swiper-slider.slide-effect .swiper-container", {
      speed: 1000,
      loop: true,
      reverseDirection: true,
      effect: "slide",
      fadeEffect: { crossFade: true },
      on: {
        init: function () {
          $(".slides-count").html("0" + (this.slides.length - 2));
          $(".curent-slide").html("0" + (this.realIndex + 1));
        },
        slideChange: function () {
          $(".curent-slide").html("0" + (this.realIndex + 1));
        },
      },
      autoplay: { delay: 5000, disableOnInteraction: true },
      pagination: { el: ".hero-swiper-slider.slide-effect .swiper-pagination", type: "bullets", clickable: true },
      navigation: { nextEl: ".hero-swiper-slider.slide-effect .swiper-button-next", prevEl: ".hero-swiper-slider.slide-effect .swiper-button-prev" },
    });
  }

  // initialize swiper [Testimonials with 1 Column]
  if ($(".testimonials-1-col .swiper-container").length) {
    new Swiper(".testimonials-1-col .swiper-container", {
      speed: 500,
      loop: true,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 50,
      autoplay: { delay: 5000 },
      navigation: { nextEl: ".testimonials-1-col .swiper-button-next", prevEl: ".testimonials-1-col .swiper-button-prev" },
      on: { resize: function () { this.update(); } },
    });
  }

  //initialize swiper [clients Section]
  if ($(".our-clients .swiper-container").length) {
    new Swiper(".our-clients .swiper-container", {
      speed: 600,
      loop: true,
      spaceBetween: 20,
      grabCursor: true,
      autoplay: { delay: 5000 },
      slidesPerView: 3,
      breakpoints: { 991: { slidesPerView: 6, spaceBetween: 30 } },
    });
  }

  //initialize swiper [portfolio-slider]
  if ($(".portfolio-slider .swiper-container").length) {
    new Swiper(".portfolio-slider .swiper-container", {
      speed: 600,
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: { delay: 5000 },
      breakpoints: { 991: { slidesPerView: 2, spaceBetween: 30 } },
      navigation: { nextEl: ".portfolio-slider .swiper-button-next", prevEl: ".portfolio-slider .swiper-button-prev" },
    });
  }

  //initialize swiper [portfolio-single]
  if ($(".portfolio-single .portfolio-single-slider .swiper-container").length) {
    new Swiper(".portfolio-single .portfolio-single-slider .swiper-container", {
      spaceBetween: 10,
      grabCursor: true,
      reverseDirection: true,
      loop: true,
      slidesPerView: 1,
      autoplay: { delay: 5000, disableOnInteraction: true },
      navigation: { nextEl: ".portfolio-single-slider .swiper-button-next", prevEl: ".portfolio-single-slider .swiper-button-prev" },
    });
  }

  /* *******  loading  wow.js  Options ********/
  if (typeof WOW !== 'undefined') {
    const wow = new WOW({ animateClass: "animated", offset: 100 });
    wow.init();
  }

  /* *******  loading fancybox.js library ********/
  if (jQuery().fancybox) {
    $().fancybox({
      selector: '[data-fancybox=".show-in-fancybox "]:visible',
      loop: true,
      buttons: ["zoom", "close"],
    });
  }

  /* *******  loading tilt.js library ********/
  if (jQuery().tilt) {
    $("[data-tilt]").tilt({ perspective: 1000 });
  }

  /* *******  Loading the isotope plugin ********/
  if (jQuery().isotope) {
    portfolioGroup.isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
      percentPosition: false,
      filter: "*",
      stagger: 30,
      containerStyle: null,
    });
  }

  /* *******  loading Splitting.js library ********/
  if (typeof Splitting !== "undefined") {
    if ($("[data-splitting]").length) {
      Splitting();
    }
  }

  /* *******  loading simpleParallax.js library ********/
  if (typeof simpleParallax !== "undefined") {
    let parallaxblock = document.querySelectorAll(".parallax-img ");
    if (parallaxblock.length) {
      new simpleParallax(parallaxblock, { delay: 1 });
    }
  }
};

$(function () {
  window.initFlexItTemplate();
});

