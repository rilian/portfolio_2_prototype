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
  });

  $('#navbar-menu').on('shown.bs.collapse', function () {
    var collapseHeight = $('.collapse.in').height();
    $('#control-buttons').css('transform', 'translateY(' + collapseHeight + 'px)');
  })

  $('#navbar-menu').on('hidden.bs.collapse', function () {
    $('#control-buttons').css('transform', 'translateY(0)');
  })

});