$( document ).ready(function() {
  $("img").load(function() {
    $.each($(this), function(i,val){
      if ($(window).width()/$(window).height() < $(this).width()/$(this).height()) {
        $(this).removeClass('img-full-height');
        $(this).addClass('img-full-width');
      }
    });
  });
  if ($(window).width() < 995){
    window.makeHiddenNav();
  }
});
