$(document).ready(function(){
	
	   $('.go-to-top').click(function(){
            $('html, body').animate({scrollTop : 0},800);return false;});
        $('.go-to-bottom').click(function(){
            $('html, body').animate({'scrollTop':$('#page-footer').offset().top },800);});});
			
	   $(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
	
	
});