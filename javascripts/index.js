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
    scrollingSpeed: 1,
    onLeave: function(index, nextIndex, direction){
      if(index > 2 && direction == 'up') {
        $(".previous-photo-button").addClass('visible');
        setTimeout(function(){
          $(".previous-photo-button").removeClass('visible');
        }, 1000)
      }
      else if(direction == 'down') {
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
    },
    onSlideLeave: function( anchorLink, index, slideIndex, direction){
      $('.section.fp-section.active').children('.fp-controlArrow.fp-prev').show();
      $('.section.fp-section.active').children('.fp-controlArrow.fp-next').show();
      if(slideIndex == 1 && direction == 'left'){
        $('.section.fp-section.active').children('.fp-controlArrow.fp-prev').hide();
      }
      var numberOfSlidesForCurrentSection = $('.section.fp-section.active').children('.fp-slides').children('.fp-slidesContainer').children('.fp-slide').size();

      if(slideIndex == numberOfSlidesForCurrentSection - 2 && direction == 'right'){
        $('.section.fp-section.active').children('.fp-controlArrow.fp-next').hide();
      }
    }
  });
  $(".next-photo-button").on('click', function(){
    $.fn.fullpage.moveSectionDown();
  });
  $(".previous-photo-button").on('click', function(){
    $.fn.fullpage.moveSectionUp();
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
  $("img").load(function() {
      $.each($(this), function(i,val){
        if ($(window).width()/$(window).height() < $(this).width()/$(this).height()) {
          $(this).removeClass('img-full-height');
          $(this).addClass('img-full-width');
        }
      });

    });
  $('.portfolio-modal').on('show.bs.modal',function(){
    $.fn.fullpage.setAllowScrolling(false);
  })
  $('.portfolio-modal').on('hide.bs.modal',function(){
    $.fn.fullpage.setAllowScrolling(true);
  })
  $('.fp-controlArrow.fp-prev').hide();

});
