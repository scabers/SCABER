/**這裡是signin.ejs部分的動畫設置 **/


var  signIn = $('.sign-in'),
	 signUp = $('.sign-up'),
	 card1 = $('#signin-left-main-1'),
	 card2 = $('#signin-left-main-2'),
	 submit = $('.submit');

function ifActive(elem){
	if (elem.hasClass('active')) {
		return true;
	} else {
		return false;
	}
}

function switchCards(){
	signUp.on('click', function(e){
		e.preventDefault();
		if (ifActive(signIn)){
			signUp.addClass('active');
			signIn.removeClass('active');
			card1.removeClass('signin-form').addClass('signup-form');
			card2.removeClass('signup-form').addClass('signin-form animated bounceInRight');
			}
		}
	);
	signIn.on('click', function(e){
		e.preventDefault();
		if (ifActive(signUp)) {
			signUp.removeClass('active');
			signIn.addClass('active');
			card2.removeClass('signin-form').addClass('signup-form');
			card1.removeClass('signup-form').addClass('signin-form animated bounceInLeft');
		}
	});
		
}
switchCards();
