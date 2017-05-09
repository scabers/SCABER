




function sign_up(){
  var inputs = document.querySelectorAll('.input_form_sign');
  document.querySelectorAll('.ul_tabs > li')[0].className=""; 
  document.querySelectorAll('.ul_tabs > li')[1].className="active"; 
  $(document).ready(function(){ 
    $("div.signup-form").hide();
    $("a.fad2").click(function(){
        $("div.signup-form").fadeIn(500);
        $("div.signin-form").fadeOut();      /*開一個,其他關掉*/

    });
});
            
			

}



function sign_in(){
  var inputs = document.querySelectorAll('.input_form_sign');
document.querySelectorAll('.ul_tabs > li')[0].className = "active"; 
document.querySelectorAll('.ul_tabs > li')[1].className = ""; 
  


  $(document).ready(function(){ 
    $("div.signin-form").hide();
    $("a.fad1").click(function(){
        $("div.signin-form").fadeIn(500);
        $("div.signup-form").fadeOut();      /*開一個,其他關掉*/

    });
});


setTimeout( function(){
for(var d = 0; d < inputs.length ; d++  ) {
switch(d) {
    case 1:
 console.log(inputs[d].name);
        break;
    case 2:
 console.log(inputs[d].name);

    default:
 document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block";  
 document.querySelectorAll('.input_form_sign')[2].className = "input_form_sign d_block active_inp";  

   }
  }
 },100 );




  setTimeout(function(){


for(var d = 0; d < inputs.length ; d++  ) {

switch(d) {
    case 1:
 console.log(inputs[d].name);
        break;
    case 2:
 console.log(inputs[d].name);

         break;
    default:
 document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign";  
}
  }
   },1500);
   document.querySelector('.btn_sign').style.opacity = "1";
   document.querySelector('.btn_sign').innerHTML = "SIGN IN";    
}




