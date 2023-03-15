/*===================================*/
/* ANIMACIÓN CUANDO SE HACE SCROLL
/*===================================*/

$( document ).ready(function() {
	new WOW().init();
  });


/*========================================================*/
/* QUERY SCROLL PARA VISUALIZAR LA FLECHA DE SCROLL UP y MORE INFO
/*========================================================*/

function upDownSee(element){
	if(document.querySelector(element)){
		$(window).scroll(function(event) {
			var scrollTop = $(window).scrollTop();
			if (scrollTop >= 1000){
				document.querySelector(element).classList.remove('oculto');
				document.querySelector(element).classList.add('visible');
			} else if(scrollTop < 1000){
				document.querySelector(element).classList.remove('visible');
				document.querySelector(element).classList.add('oculto');
			}
		});
	}
}
upDownSee('.scroll-top-arrow')
upDownSee('.btn-fijo-mobile')


/*========================================================*/
/* ANIMACIÓN TODOS LOS BOTONES, ESTO SUSTITUYE LAS ANCLAS
/*========================================================*/

$(document).ready(function(){	
    $('.scroll-top-arrow').click(function(){ //FLECHA SCROLL UP
		
        $('body, html').animate({
            scrollTop: '0px'
        }, 500);
    });

});