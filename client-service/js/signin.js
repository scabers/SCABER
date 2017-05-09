function sign_up(){

  

   document.querySelector('.link_forgot_pass').style.opacity = "0";
   document.querySelector('.link_forgot_pass').style.top = "-5px";
   document.querySelector('.form-check').style.opacity = "0";
   document.querySelector('.form-check').style.top = "-5px";
   document.querySelector('.form-group').style.opacity= "0";   
   document.querySelector('.btn_sign').style.opacity= "0";
   document.querySelector('.btn_sign').style.top= "-5px";    
  setTimeout(function(){

  document.querySelector('.terms_and_cons').style.opacity = "1";
  document.querySelector('.terms_and_cons').style.top = "5px";
 
  },500);
  setTimeout(function(){
    document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_none";
	document.querySelector('.form-check').className = "form-check d_none";
	document.querySelector('.form-group').className = "form-group d_none";
 document.querySelector('.terms_and_cons').className = "terms_and_cons d_block";
  },450);

}



function sign_in(){





 document.querySelector('.terms_and_cons').style.opacity = "0";
  document.querySelector('.terms_and_cons').style.top = "-5px";

  setTimeout(function(){
 document.querySelector('.terms_and_cons').className = "terms_and_cons d_none"; 
document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_block";
document.querySelector('.form-check').className = "form-check d_block";
document.querySelector('.form-group').className = "form-group d_block";

 },500);

  setTimeout(function(){

 document.querySelector('.link_forgot_pass').style.opacity = "1";
   document.querySelector('.link_forgot_pass').style.top = "5px";
   document.querySelector('.form-check').style.opacity = "1";
   document.querySelector('.form-check').style.top = "5px";
   document.querySelector('.form-group').style.opacity= "1";
    


   },1500);
   document.querySelector('.btn_sign').style.opacity = "1";
   document.querySelector('.btn_sign').innerHTML = "SIGN IN";    
}


window.onload =function(){
  document.querySelector('.cont_centrar').className = "cont_centrar cent_active";

}