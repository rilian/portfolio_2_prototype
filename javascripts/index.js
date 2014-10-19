
	$( '#dl-menu' ).dlmenu();
  $(".navbar-fixed-top").autoHidingNavbar();

  $window = $(window);
  $(window).scroll(function() {

    if ($(this).scrollTop()>0)
     {
       if ($('.menu-area').css('display') == 'none')
        $('.menu-area').show();
     }
    else
     {
       if ($('.menu-area').css('display') != 'none')
         $('.menu-area').hide();
     }
 });
