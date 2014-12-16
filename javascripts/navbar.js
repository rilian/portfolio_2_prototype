$( document ).ready(function() {

  window.makeVisibleNav = function () {
    $(".navbar-fixed-top").addClass('visible-nav');
    $(".navbar-fixed-top").removeClass('hidden-nav');
    $(".menu-triger").addClass('hidden');
    $(".menu-triger").removeClass('visible');
  }

  window.makeHiddenNav = function () {
    $(".navbar-fixed-top").addClass('hidden-nav');
    $(".navbar-fixed-top").removeClass('visible-nav');
    $(".menu-triger").addClass('visible');
    $(".menu-triger").removeClass('hidden');
  }

  $(".menu-triger").on('click', function () {
    if ($('.navbar-fixed-top').hasClass('visible-nav')) {
      window.makeHiddenNav();
    } else {
      window.makeVisibleNav();
    }
    if ($(window).width() < 995){
      $('#navbar-menu').collapse('toggle');
    }
  });

  $('#navbar-menu').on('show.bs.collapse', function () {
    $('.portfolio').addClass('collapsed');
    $('.calc').addClass('collapsed');
  })

  $('#navbar-menu').on('hide.bs.collapse', function () {
    $('.portfolio').removeClass('collapsed');
    $('.calc').removeClass('collapsed');
    window.makeHiddenNav();
  })

});