(function($) {
    // Start of use strict
    "use strict";

    // Page scrolling feature
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top navbar as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });


    // Close the responsive menu on menu item click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Initialize and configure scroll reveal animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);

    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });

    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    // Initialize and configure magnific popup lightbox plugin
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigationByImgClick: true,
            preload: [0, 1]
        },
        image: {
            error: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });
})(jQuery);


/**這裡是signin.ejs部分的動畫設置 **/

(function($){
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
})
switchCards();

