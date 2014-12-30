$( document ).ready(function() {
  $('.portfolio-modal').on('show.bs.modal',function(){
    $.fn.fullpage.setAllowScrolling(false);
  })
  $('.portfolio-modal').on('hide.bs.modal',function(){
    $.fn.fullpage.setAllowScrolling(true);
  })
})
