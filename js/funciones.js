// JavaScript Document
var load = 0, fake = 0;
document.onreadystatechange = function(e){
if(document.readyState=="interactive"){
	$('html').addClass('loading');
	var int = setInterval(function(){
			var prev = parseInt($('.num').text());
			if(prev >= 100){
				clearInterval(int);
				show();
			} else {
				var num = Math.floor((Math.random() * 5) + 1);
				var res = prev+num;
				if(res > 100){
					res = 100;
					if(load == 1){
						show();
					} else {
						fake = 1;
					}
				}
				$('.per').css('height', res + '%');
				$('.num').text(res + '%');
			}
		},100);
	}
}
function show(){
	$('#loader').fadeOut(400, 'easeInQuint',function(){
		iniciar();			
	});
}
$(window).scroll(function(){
	var $st = $(window).width();
	navMainScroll();
	progressBar();
	if($st > 1000)
		windowScroll()
});
$(window).load(function(){
	load = 1;
	
	//Scroll	
	$(function(){
      $('#lima_city div').slimScroll({
          height: '240px'
      });
      $('#num_pers div').slimScroll({
          height: '240px'
      });
	}); 
	
	if(fake){
		show();
		console.log('fake');
	};
	
	$('.input.drop ul').hide();
	 //apear
	$('#cuenta').appear().on('appear', function() {
			playKm();
	});
});
$(document).ready(function(e) {
	navMainScroll();
	progressBar();
	cargaUl();
	cargaCity();
	//nav
	$("nav li").on('click', function(e){
		e.preventDefault();
		var volver  = "#"+$(this).data("link");
		$('html, body').animate({
			scrollTop: $(volver).offset().top
		}, 800, 'easeInQuint');
	});
	//btancla
	$(".bt-ancla, .nav-main a").on('click', function(e){
		e.preventDefault();
		var volver  = $(this).attr("href");
		$('html, body').animate({
			scrollTop: $(volver).offset().top
		}, 500, 'easeInQuint');
	});
	//btmenu
	$('.bt-menu').on('click', function(e){
		e.preventDefault();
		
		if($(this).hasClass('open')){
			cerrarMenu();
		}else{
			abrirMenu();
		}
		$(this).toggleClass('open');
	});
	
	//drop	
	$('.input').click(function(e) {
        $(this).removeClass('error');
    });
	$('.input.drop').on('click', function(){
		$(this).find('ul').slideToggle(400, 'easeInQuint', function(){
			var input = $(this).parents('.input').find('input').val();
			if(input != ''){
				$(this).parents('.input').find('input').removeAttr('disabled');	
			}
			
		})
	});
	$('.input.drop').on('click', 'li',function(){
		var val = $(this).html();
		$(this).parents('.input.drop').find('ul').stop(true, true);
		$(this).parents('.input.drop').find('input').val(val);
	});
	//DATEPICKER
	$.datepicker.regional['es'] = {
	 closeText: 'Cerrar',
	 prevText: '<Ant',
	 nextText: 'Sig>',
	 currentText: 'Hoy',
	 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
	 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
	 dayNamesMin: ['D','L','M','M','J','V','S'],
	 weekHeader: 'Sm',
	 dateFormat: 'dd/mm/y',
	 firstDay: 1,
	 isRTL: false,
	 showMonthAfterYear: false,
	 yearSuffix: ''
	 };
	 $.datepicker.setDefaults($.datepicker.regional['es']);
     $(function () {
		$("#datepicker").datepicker();
	 });
	 
	
});

/////FUNCIONES
//botones
function navMainScroll(){	
	var scrol = $(window).scrollTop();
	// nav lateral
	$(".nav-main").each(function(e,i){
		var sec = $("#"+$(this).data("section"));
		    secClass =$(this).data("section");
		
		if (!sec.offset()) return

			if( (scrol+$(window).height()/2) >= sec.offset().top && (sec.offset().top+sec.height()) > scrol && !sec.hasClass("active")){

			$(".nav-main").removeClass("active");
			$("nav li").removeClass("active");

			$(this).addClass("active");
			$("nav li."+secClass).addClass("active");
		}
	});	
}
//progressbar
function progressBar(){
var scrol = $(window).scrollTop();
    sec = $('.nav-main.active').data('section');
	secOf = $('#'+sec).offset().top;
	
	winHeight = $(window).height() / 2;
	docHeight = $('#'+sec).height();

	maxi = docHeight - winHeight;
	value = scrol - ( secOf - winHeight);
	
	width = (value/maxi) * 100;
	if(sec == 'inicio'){
		width = width - 50;	
	}
	width = width + '%';
	$('.nav-main.active em').css('height',width);
	
	/*secH = ($('#'+sec+' em').offset().top - scrol) - ($(window).height() / 2);
	if(sec == 'hablemos'){
		secH = ($('#'+sec+' em').offset().top - scrol) - ($(window).height() / 1.1);
	}
	percent = secH / 10;
	percent = 108 - percent
	$('.nav-main.active em').css('height',percent+'%');*/
}
//Abre
function abrirMenu(){	
	$('header').addClass('op');
var menu = $('nav');
	btMenu = $('.bt-menu');
	li = menu.find('li');
	li.removeClass('view');
	btMenu.animate({'left':220}, 200, 'easeOutQuart', function(){
		menu.animate({'left': 0}, 300, 'easeOutQuart', function(){
			var i = 0;
			var menuX = setInterval(function() {
					li.eq(i).addClass('view')
					i++;
					if(i > li.length){
						clearInterval(menuX);	
					}
				}, 100);	
		});	
	});
}
//Cierra
function cerrarMenu(){
	$('header').removeClass('op');
var menu = $('nav');
	btMenu = $('.bt-menu');
	li = menu.find('li');		
	li.each(function(index, element) {
		$(this).removeClass('view');
	});
	menu.animate({'left':'-250px'}, 300, 'easeInQuart');
	btMenu.animate({'left': '23px'}, 100, 'easeInQuart');
}
//inicia
function iniciar(){
	$('#inicio img.espatula').removeClass('vx');
	setTimeout(function(){
	$('#inicio img.sarten').removeClass('vx');
	}, 500);
	setTimeout(function(){
	$('#inicio img.vino').removeClass('vx');
	}, 300);
	setTimeout(function(){
		$('#inicio .wp').animate({
			'left': 0	
		}, 200);
		$('#inicio .wp').css('opacity',1);
	}, 500);
	
} 
//carga
var lima_city = ['Ate','Barranco','Bellavista','Breña','Carmen de la Legua','Cercado Callao','Cercado de Lima','Chorrillos','Comas','El Agustino','Independencia','Jesús María','La Molina','La Perla','La Punta','La Victoria','Lince','Los Olivos','Magdalena del Mar','Miraflores','Pueblo Libre','Puente Piedra','Rimac','San Borja','San Isidro','San Juan de Lurigancho','San Juan de Miraflores','San Luis','San Martin de Porres','San Miguel','Santa Anita','Santa Rosa','Santiago de Surco','Surquillo','Ventanilla','Villa El Savador','Villa María del Triunfo'];
function cargaUl(){
	var i = 100;
	$('#num_pers').html('<div><li>+100</></div>');
	for(i; i <= 100 && i >= 1; i--){
		$('#num_pers div').prepend('<li>'+i+'</li>')	
	}
}
function cargaCity(){
	$('#lima_city').html('<div></div>');
	$.each( lima_city, function( i, val ) {
		$('#lima_city div').append('<li>'+val+'</li>')
	});
}
//paralax
var cuchillo = 100;
var panceta = 350;
var tenedor = 250;
var plato = -200;
function windowScroll(){
    var st = $(window).scrollTop();

	$("#inicio .sarten").css({"top": 0 - st * 0.15 + "px"});
	$("#inicio .espatula").css({"top": 0 - st * 0.15 + "px"});
	$("#inicio .vino").css({"bottom": 0 + st * 0.15 + "px"});
	$("#inicio .romero").css({"top": 85 - st * 0.15 + "px"});
	$("#inicio .wp").css({"top": 0 - st * 0.4 + "px"});
	
	$("#historia .copy").css({"top": 200 - st * 0.2 + "px"});
	
	if(st >= ($('.sobrinos').offset().top - $(window).height())){
		$("#cocina .cuchillo").css({"top": cuchillo - ((st - ($('.sobrinos').offset().top - $(window).height())) * 0.15) + "px"});
		$("#cocina .tenedor").css({"top": tenedor- ((st - ($('.sobrinos').offset().top - $(window).height())) * 0.15) + "px"});
		$("#cocina .plato").css({"top": plato - ((st - ($('.sobrinos').offset().top - $(window).height())) * 0.15) + "px"});
		$("#cocina .panceta").css({"top": panceta - ((st - ($('.sobrinos').offset().top - $(window).height())) * 0.15) + "px"});
		$("#cocina .px").css({"top": 350 - ((st - ($('.sobrinos').offset().top - $(window).height())) * 0.4) + "px"});
			
	}
	
	if(st >= ($('.lo_mejor').offset().top - $(window).height())){
		$(".lo_mejor .figaza").css({"top": 0 - ((st - ($('.lo_mejor').offset().top - $(window).height())) * 0.15) + "px"});
		$(".lo_mejor .cucharon").css({"top": 0 - ((st - ($('.lo_mejor').offset().top - $(window).height())) * 0.15) + "px"});
		$(".lo_mejor .rodajas").css({"top": 200 - ((st - ($('.lo_mejor').offset().top - $(window).height())) * 0.15) + "px"});
		$(".lo_mejor .frances").css({"top": 300 - ((st - ($('.lo_mejor').offset().top - $(window).height())) * 0.15) + "px"});
		$(".lo_mejor .copy").css({"top": 100 - ((st - ($('.lo_mejor').offset().top - $(window).height())) * 0.4) + "px"});
	}
	
	if(st >= ($('#cotizar').offset().top - $(window).height())){
		$("img.arrollado").css({"top": 0 - ((st - ($('#cotizar').offset().top - $(window).height())) * 0.15) + "px"});
		$("#cotizar .copy").css({"top": 500 - ((st - ($('#cotizar').offset().top - $(window).height())) * 0.4) + "px"});
	}
	
	if(st >= ($('#fotos').offset().top - $(window).height())){
		$(".fotos .img-1").css({"top": 0 - ((st - $('.sobrinos').offset().top) * 0.1) + "px"});
		$(".fotos .img-2").css({"top": 400 - ((st - $('.sobrinos').offset().top) * 0.4) + "px"});
		$(".fotos .img-3").css({"top": 100 - ((st - $('.sobrinos').offset().top) * 0.1) + "px"});
		$(".fotos .img-4").css({"top": 500 - ((st - $('.sobrinos').offset().top) * 0.1) + "px"});
		$(".fotos .img-5").css({"top": 600 - ((st - $('.sobrinos').offset().top) * 0.25) + "px"});
		$(".fotos .img-6").css({"top": 700 - ((st - $('.sobrinos').offset().top) * 0.25) + "px"});
			
	}
	
	if(st >= ($('#hablemos').offset().top - $(window).height())){
		$("#hablemos .copy").css({"top": 40 - ((st - $('#hablemos').offset().top) * 0.1) + "%"});
	}
	
	if(st >= ($('#firma').offset().top - $(window).height())){
		$('#firma').addClass('view');
	}
	var x = $('#video').offset().top - ($(window).height() / 2);
	
	if(st >= x && st <= (x + 50) ){
		$('button#play-pause').trigger('click')
	}

}
function playKm(){	
	var myVar2 = setInterval(cuentaSeg, 10);
	function cuentaSeg() {
		var Seg = $('#cuenta').data('rel');
		   num1 = parseFloat($('#cuenta').html());
		if(num1 < Seg){
			num1 += 0.010;
			var num1 = num1.toFixed(3)
			$('#cuenta').html(num1);
		}else{
			clearInterval(myVar2);
		}	
	}
}