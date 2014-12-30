$( document ).ready(function() {
  $('#fullpage').fullpage({
    css3: true,
    scrollingSpeed: 500,
    autoScrolling: true,
    scrollBar: false,
    easing: 'easeInQuart',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: false,
    touchSensitivity: 15,
    resize: false,

    onLeave: function (index, nextIndex, direction) {
      if (index > 2 && direction == 'up') {
        $(".previous-photo-button").addClass('visible');
        setTimeout(function () {
          $(".previous-photo-button").removeClass('visible');
        }, 1000)
      }
      else if (direction == 'down') {
        $(".next-photo-button").addClass('visible');
        setTimeout(function () {
          $(".next-photo-button").removeClass('visible');
        }, 1000)
      }

      if (index == 2 && direction == 'up' && $(window).width() > 995) {
        window.makeVisibleNav();
      }
      else {
        window.makeHiddenNav();
      }
      var current_section = $('.section').eq((index - 1));
      if (current_section.find('.fp-slides').length) {
        $.fn.fullpage.scrollSlider(current_section, 0);
      }
    },
    onSlideLeave: function (anchorLink, index, slideIndex, direction) {
      $('.section.fp-section.active').children('.fp-controlArrow.fp-prev').show();
      $('.section.fp-section.active').children('.fp-controlArrow.fp-next').show();
      if (slideIndex == 1 && direction == 'left') {
        $('.section.fp-section.active').children('.fp-controlArrow.fp-prev').hide();
      }
      var numberOfSlidesForCurrentSection = $('.section.fp-section.active').children('.fp-slides').children('.fp-slidesContainer').children('.fp-slide').size();

      if (slideIndex == numberOfSlidesForCurrentSection - 2 && direction == 'right') {
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
  setTimeout(function(){
    $(".next-photo-button").removeClass('visible');
  }, 2000);
  $('.fp-controlArrow.fp-prev').hide();
});