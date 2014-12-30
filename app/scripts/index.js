$( document ).ready(function() {
  function makeFullHeidht(img) {
    if (!img.hasClass('img-full-height')) {
      img.addClass('img-full-height');
      img.removeClass('img-full-width');
    }
  }
  function makeFullWidth(img) {
    if (!img.hasClass('img-full-width')) {
      img.addClass('img-full-width');
      img.removeClass('img-full-height');
    }
  }
  $("img#gallery-photo").load(function() {
    $.each($(this), function(i,val){
      if ($(window).width()/$(window).height() < $(this).width()/$(this).height()) {
        makeFullWidth($(this));
      }
      else {
        makeFullHeidht($(this));
      }
    });
  });
  $( window ).resize(function() {
    $("img#gallery-photo").each(function(i){
      if ($(window).width()/$(window).height() < $(this).width()/$(this).height()) {
        makeFullWidth($(this));
      }
      else {
        makeFullHeidht($(this));
      }
    });
  });
});
