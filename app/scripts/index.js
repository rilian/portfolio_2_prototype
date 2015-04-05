$( document ).ready(function() {
  function makeFullHeight(img) {
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

  $.each($("img#gallery-photo"), function(){
    if ($(window).width()/$(window).height() < $(this).width()/$(this).height()) {
      makeFullWidth($(this));
    }
    else {
      makeFullHeight($(this));
    }
  });

  $( window ).resize(function() {
    $("img#gallery-photo").each(function(i){
      if ($(window).width()/$(window).height() < $(this).width()/$(this).height()) {
        makeFullWidth($(this));
      }
      else {
        makeFullHeight($(this));
      }
    });
  });
});
