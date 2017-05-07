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

// Define hover animation in header buttons
$(document).ready(function() {
    $('.header-section .header-buttons #rate').hover(function() {
        $(this).fadeIn(300, function() {
            $(this).text('');
            $(this).html("<img src='icon/icon_1.png'>");
        });
    }, function() {
        $(this).fadeIn(300, function() {
            $(this).text('公開評價');
        });
    });

    $('.header-section .header-buttons #rate').click(function() {
        $('.header-section .header-content .dialogue').toggleClass('dialogue-btn1');
    });

    $('.header-section .header-buttons #safe').hover(function() {
        $(this).fadeIn(300, function() {
            $(this).text('');
            $(this).html("<img src='icon/icon_3.png'>");
        });
    }, function() {
        $(this).fadeIn(300, function() {
            $(this).text('安全服務');
        });
    });

    $('.header-section .header-buttons #safe').click(function() {
        $('.header-section .header-content .dialogue').toggleClass('dialogue-btn2');
    });

    $('.header-section .header-buttons #share').hover(function() {
        $(this).fadeIn(100, function() {
            $(this).text('');
            $(this).html("<img src='icon/icon_2.png'>");
        });
    }, function() {
        $(this).text('共乘模式');
    });

    $('.header-section .header-buttons #share').click(function() {
        $('.header-section .header-content .dialogue').toggleClass('dialogue-btn3');
    });

    $('.header-section .header-buttons #solve').hover(function() {
        $(this).fadeIn(300, function() {
            $(this).text('');
            $(this).html("<img src='icon/icon_5.png'>");
        });
    }, function() {
        $(this).fadeIn(300, function() {
            $(this).text('解決現況');
        });
    });

    $('.header-section .header-buttons #solve').click(function() {
        $('.header-section .header-content .dialogue').toggleClass('dialogue-btn4');
    });
})