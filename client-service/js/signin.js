/**這裡是signin.ejs部分的動畫設置 **/
var  signIn = $('.sign-in'),
	 signUp = $('.sign-up'),
	 card1 = $('#signin-left-main-1'),
	 card2 = $('#signin-left-main-2'),
	 submit = $('.submit');
alert("dsdasdas1");
function ifActive(elem){
	if (elem.hasClass('activebar')) {
		return true;
	} else {
		return false;
	}
}
alert("dsdasdas2");

function switchCards(){
	alert("dsdasdas3");
	signUp.on('click', function(e){
		e.preventDefault();
		if (ifActive(signIn)){
			signUp.addClass('activebar');
			signIn.removeClass('activebar');
			card1.removeClass('signinform').addClass('signupform');
			card2.removeClass('signupform').addClass('signinform bounceInRight');
			alert("dsdasdas4");
		   }
		}
	);
	signIn.on('click', function(e){
		e.preventDefault();
		if (ifActive(signUp)) {
			signUp.removeClass('activebar');
			signIn.addClass('activebar');
			card2.removeClass('signinform').addClass('signupform');
			card1.removeClass('signupform').addClass('signinform animated bounceInLeft');
		alert("dsdasdas5");
	    }
	});
		 alert("dsdasdas6");
}
switchCards();

