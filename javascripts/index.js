$( document ).ready(function() {

  var makeVisibleNav = function() {
    $(".navbar-fixed-top").addClass('visible-nav');
    $(".navbar-fixed-top").removeClass('hidden-nav');
    $(".menu-triger").addClass('hidden');
    $(".menu-triger").removeClass('visible');
  }

  var makeHiddenNav = function() {
    $(".navbar-fixed-top").addClass('hidden-nav');
    $(".navbar-fixed-top").removeClass('visible-nav');
    $(".menu-triger").addClass('visible');
    $(".menu-triger").removeClass('hidden');
  }

  $('#fullpage').fullpage({
    resize: false,
    css3: true,
    scrollingSpeed: 0,
    onLeave: function(index, nextIndex, direction){
      
      if(index == 2 && direction == 'up'){
        makeVisibleNav();
      }
      else  {
        makeHiddenNav();
      }
    }
  });
  $(".menu-triger").on('click', function () {
    if ($('.navbar-fixed-top').hasClass('visible-nav')) {
      makeHiddenNav();
    } else {
      makeVisibleNav();
    }
  });

});
