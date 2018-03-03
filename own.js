$(document).ready(function() {
    var max_fields      = 5; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="main setio_'+x+'" id="id_'+x+'"><input type="text" name="myprice[]" value="" placeholder="0" class="price"><input type="text" name="myqunty[]" classs="quantity" value="" placeholder="0" onkeyup="return doCalc(); "><a href="#" class="remove_field" id="'+x+'">Remove</a><span class="subamount"></span></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); 
		var aa=$(this).attr("id");
		
		var subtotal_rem=0;
	  $("#id_"+aa).each(function() {
       
		subtotal_rem += $('input:eq(0)', this).val() * $('input:eq(1)', this).val();
		
       });
	   $(".setio_"+aa).remove(); x--;
	   var total=$("#total").val()-subtotal_rem;
	   
	   var com_val2=0;
	if(total< 5){
	com_val2=0.15;
	}else if(total>=5 && total<10){
	com_val2=0.10;
	}else{
	com_val2=0.05;
	}
	
	   var coms=total*com_val2;
	   $("#total_commission").val(coms);
	   $("#total").val(total-coms);
	   
		//alert(subtotal_rem);
    });
	
	$('input[type="text"]').keyup(function(){
	// alert();
	
	});
	
});



function doCalc() {
    var total = 0;
	var subtotal=0;
	var j=0;
    $('.main').each(function() {
         
		subtotal += $('input:eq(0)', this).val() * $('input:eq(1)', this).val();
		
	
    });
    $('.subamount').each(function() {
        total += parseInt($(this).text(),10);
    });
	//alert(subtotal);
	var com_val=0;
	if(subtotal< 5){
	com_val=0.15;
	}else if(subtotal>=5 && subtotal<10){
	com_val=0.10;
	}else{
	com_val=0.05;
	}
	var com= subtotal*(com_val);
	$("#total_commission").val(com)
	$("#total").val(subtotal-com);
	//alert(total);
    //$('div.total_amount').html(total);
}
$("input[name^='myqunty[]']").blur(doCalc);
