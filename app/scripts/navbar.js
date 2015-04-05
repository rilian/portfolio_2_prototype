$( document ).ready(function() {

  window.makeVisibleNav = function () {
    $(".navbar-fixed-top").addClass('visible-nav');
    $(".navbar-fixed-top").removeClass('hidden-nav');
    $("button.portfolio").addClass('visible');
    $("button.portfolio").removeClass('hidden');
    $("button.calc").addClass('visible');
    $("button.calc").removeClass('hidden');
  };

  window.makeHiddenNav = function () {
    $(".navbar-fixed-top").addClass('hidden-nav');
    $(".navbar-fixed-top").removeClass('visible-nav');
    $("button.portfolio").addClass('hidden');
    $("button.portfolio").removeClass('visible');
    $("button.calc").addClass('hidden');
    $("button.calc").removeClass('visible');
  };

  $(".menu-trigger").on('click', function () {
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
  });

  $('#navbar-menu').on('hide.bs.collapse', function () {
    $('.portfolio').removeClass('collapsed');
    $('.calc').removeClass('collapsed');
    window.makeHiddenNav();
  })
});
