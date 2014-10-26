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
    resize: true,
    css3: true,
    scrollingSpeed: 1,
    onLeave: function(index, nextIndex, direction){
      if(index < 10) {
        $(".next-photo-button").addClass('visible');
        setTimeout(function(){
          $(".next-photo-button").removeClass('visible');
        }, 1000)
      }
      if(index == 2 && direction == 'up'){
        makeVisibleNav();
      }
      else  {
        makeHiddenNav();
      }
    }
  });
  $(".next-photo-button").on('click', function(){
    $.fn.fullpage.moveSectionDown();
  });
  $(".menu-triger").on('click', function () {
    if ($('.navbar-fixed-top').hasClass('visible-nav')) {
      makeHiddenNav();
    } else {
      makeVisibleNav();
    }
  });
  setTimeout(function(){
    $(".next-photo-button").removeClass('visible');
  }, 2000)
  $window = $(window);
  $('.section').on('click', function(e){

  })

});
