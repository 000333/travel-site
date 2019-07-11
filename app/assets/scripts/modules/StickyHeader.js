// uses https://gist.github.com/ohiosveryown/93015ccc1f43437db6169dbfb18196fa

import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

let scrollpos = window.scrollY;
var oB = $("#our-beginning").offset().top;
var fF = $("#features").offset().top;
var tT = $("#testimonials").offset().top;

window.addEventListener('scroll', function() {
  scrollpos = window.scrollY;

  if (scrollpos >= 160) {
    $(".site-header").addClass("site-header--dark")
  } else {
    $(".site-header").removeClass("site-header--dark")
  };

  if (scrollpos <= 320) {
    $("#OB-link").removeClass("is-current-link");
    $("#T-link").removeClass("is-current-link");
    $("#F-link").removeClass("is-current-link");
  } else if (scrollpos >= (tT + 320)) {
    $("#T-link").addClass("is-current-link");
    $("#F-link").removeClass("is-current-link");
    $("#OB-link").removeClass("is-current-link");
  } else if (scrollpos >= (fF + 320)) {
    $("#F-link").addClass("is-current-link");
    $("#T-link").removeClass("is-current-link");
    $("#OB-link").removeClass("is-current-link");
  } else if (scrollpos >= (oB + 320)) {
    $("#OB-link").addClass("is-current-link");
    $("#T-link").removeClass("is-current-link");
    $("#F-link").removeClass("is-current-link");
  }
});

$('.primary-nav a').smoothScroll();
