// JavaScript Document
$('input[type="email"]').on('focus', function(){$(this).attr('placeholder',' ');console.log('ahora')})
$('input[type="email"]').on('blur', function(){$(this).attr('placeholder','Ingresá tu email')});
var sending;
$("#form-cotizar").submit(function(e) {
	e.preventDefault();

	if(sending) return false;
	sending=true;

	var form = $(this);
	
	var validForm = true;
	form.find('input:not([type="hidden"])').each(function(){
		if( $(this).val().trim() =='' || $(this).val() =='¿?'){
			$(this).parent().addClass('error');
			$(this).val('¿?')
			validForm = false;
			sending=false;
			return false;
		}
	})

	if(validForm){

		var action = form.attr('action');
		var data = form.serializeObject();

		console.log(action);
		console.log(data);

	//overlay.html('Estamos enviando tu consulta..').fadeIn(800);

			$.ajax({
				type: 'POST',
				url: action,
				data: data,
				error: function(data){
					console.log("form:error");
					console.log(data);
					sending=false;
				},
				success: function(data){
					console.log("form:success");
					$('#thanks').fadeIn(300).delay(2500).fadeOut(200);
					$('input').val('');
					console.log(data);
					sending=false;
				}
			});

	}


});



// serializes a form into an object.
(function($,undefined){
  '$:nomunge'; // Used by YUI compressor.

  $.fn.serializeObject = function(){
    var obj = {};

    $.each( this.serializeArray(), function(i,o){
      var n = o.name,
        v = o.value;

        obj[n] = obj[n] === undefined ? v
          : $.isArray( obj[n] ) ? obj[n].concat( v )
          : [ obj[n], v ];
    });

    return obj;
  };

})(jQuery);
