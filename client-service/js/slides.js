/* Define struct mode */
'use strict';

$(document).ready(function() {
    var $content = $('.slides');
    var $slide = $('.slide');
    var $title = $('.slide-title');
    var $text = $('.slide-text');
    var $close = $('.slide-close');

    // Define slides parameters.
    var numSlides = 4;
    var initialAnimDur = 5705;
    var initialAnimDel = 1000;
    var initialAnim = true;
    var clickAnim = false;

    $(document).on('click', '.slide-dark', function() {
        if (initialAnim || clickAnim) return;

        var _this = $(this).parent();
        var target = +_this.attr('data-target');
        clickAnim = true;

        _this.css({
            'cursor': 'default',
            /* transform */
            'transform': 'translate3d(-100%, 0, 0)',
            '-webkit-transform': 'translate3d(-100%, 0, 0)',
            '-moz-transform': 'translate3d(-100%, 0, 0)',
            '-ms-transform': 'translate3d(-100%, 0, 0)',
            '-o-transform': 'translate3d(-100%, 0, 0)',
            /* transition */
            'transition': '.75s',
            '-webkit-transition': '.75s',
            '-moz-transition': '.75s',
            '-o-transition': '.75s'
        });

        _this.find('.slide-wrapper').css({
            /* transform */
            'transform': 'translate3d(0, 0, 0) scale(.95, .95)',
            '-webkit-transform': 'translate3d(0, 0, 0) scale(.95, .95)',
            '-moz-transform': 'translate3d(0, 0, 0) scale(.95, .95)',
            '-ms-transform': 'translate3d(0, 0, 0) scale(.95, .95)',
            '-o-transform': 'translate3d(0, 0, 0) scale(.95, .95)',
            /* transition */
            'transition': '2s',
            '-webkit-transition': '2s',
            '-moz-transition': '2s',
            '-o-transition': '2s'
        });

        for (var i = target, len = $slide.length; i < len; ++i) {
            $('#slide-' + (i + 1)).css({
                /* transform */
                'transform': 'translate3d(0, 0, 0)',
                '-webkit-transform': 'translate3d(0, 0, 0)',
                '-moz-transform': 'translate3d(0, 0, 0)',
                '-ms-transform': 'translate3d(0, 0, 0)',
                '-o-transform': 'translate3d(0, 0, 0)',
                /* transition */
                'transtion': '.75s',
                '-webkit-transition': '.75s',
                '-moz-transition': '.75s',
                '-o-transition': '.75s'
            });
        }

        for (var i = target; i > 1; --i) {
            $('#slide-' + (i - 1)).css({
                /* transform */
                'transform': 'translate3d(-125%, 0, 0)',
                '-webkit-transform': 'translate3d(-125%, 0, 0)',
                '-moz-transform': 'translate3d(-125%, 0, 0)',
                '-ms-transform': 'translate3d(-125%, 0, 0)',
                '-o-transform': 'translate3d(-125%, 0, 0)',
                /* transition */
                'transtion': '.75s',
                '-webkit-transition': '.75s',
                '-moz-transition': '.75s',
                '-o-transition': '.75s'
            })
        }

        setTimeout(function() {
            $slide.not(_this).find('.slide-dark').css({
                'opacity': '0'
            });
        }, 750);

        $close.addClass('slide-close-show');

        _this.find('.slide-title').css({
            'opacity': '1',
            /* transform */
            'transform': 'translate3d(50px, -40%, 0)',
            '-webkit-transform': 'translate3d(50px, -40%, 0)',
            '-moz-transform': 'translate3d(50px, -40%, 0)',
            '-ms-transform': 'translate3d(50px, -40%, 0)',
            '-o-transform': 'translate3d(50px, -40%, 0)',
            /* transition */
            'transition': '2s',
            '-webkit-transition': '2s',
            '-moz-transition': '2s',
            '-o-transition': '2s'
        });

        _this.find('.slide-text').css({
            'opacity': '1',
            /* transform */
            'transform': 'translate3d(150px, -40%, 0)',
            '-webkit-transform': 'translate3d(150px, -40%, 0)',
            '-moz-transform': 'translate3d(150px, -40%, 0)',
            '-ms-transform': 'translate3d(150px, -40%, 0)',
            '-o-transform': 'translate3d(150px, -40%, 0)',
            /* transition */
            'transition': '2s',
            '-webkit-transition': '2s',
            '-moz-transition': '2s',
            '-o-transition': '2s'
        });
    });

    $(document).on('mousemove', '.slide', function() {
        if (initialAnim || clickAnim) return;

        var _this = $(this);
        var target = +_this.attr('data-target');

        _this.css({
            /* transform */
            'transform': 'translate3d(-' + (100 / numSlides * (numSlides - (target - 1)) + 5) + '%, 0, 0)',
            '-webkit-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (target - 1)) + 5) + '%, 0, 0)',
            '-moz-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (target - 1)) + 5) + '%, 0, 0)',
            '-ms-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (target - 1)) + 5) + '%, 0, 0)',
            '-o-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (target - 1)) + 5) + '%, 0, 0)',
            /* transition */
            'transition': '.75s',
            '-webkit-transition': '.75s',
            '-moz-transition': '.75s',
            '-o-transition': '.75s'
        });

        _this.find('.slide-title').css({
            'opacity': '1',
            /* transform */
            'transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-webkit-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-moz-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-ms-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-o-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            /* transition */
            'transition': '.75s',
            '-webkit-transition': '.75s',
            '-moz-transition': '.75s',
            '-o-transition': '.75s'
        });

        _this.find('.slide-text').css({
            'opacity': '1',
            /* transform */
            'transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-webkit-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-moz-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-ms-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            '-o-transform': 'translate3d(0, -40%, 0) rotate(0.01deg)',
            /* transition */
            'transition': '.75s',
            '-webkit-transition': '.75s',
            '-moz-transition': '.75s',
            '-o-transition': '.75s'
        });

        for (var i = target, len = $slide.length; i < len; ++i) {
            $('#slide-' + (i + 1)).css({
                /* transform */
                'transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i + 1 - 1)) - 5) + '%, 0, 0)',
                '-webkit-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i + 1 - 1)) - 5) + '%, 0, 0)',
                '-moz-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i + 1 - 1)) - 5) + '%, 0, 0)',
                '-ms-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i + 1 - 1)) - 5) + '%, 0, 0)',
                '-o-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i + 1 - 1)) - 5) + '%, 0, 0)',
                /* transition */
                'transition': '.75s',
                '-webkit-transition': '.75s',
                '-moz-transition': '.75s',
                '-o-transition': '.75s'
            });
        }

        for (var i = target; i > 1; --i) {
            $('#slide-' + (i - 1)).css({
                /* transform */
                'transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i - 1 - 1)) + 5) + '%, 0, 0)',
                '-webkit-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i - 1 - 1)) + 5) + '%, 0, 0)',
                '-moz-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i - 1 - 1)) + 5) + '%, 0, 0)',
                '-ms-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i - 1 - 1)) + 5) + '%, 0, 0)',
                '-o-transform': 'translate3d(-' + (100 / numSlides * (numSlides - (i - 1 - 1)) + 5) + '%, 0, 0)',
                /* transition */
                'transition': '.75s',
                '-webkit-transition': '.75s',
                '-moz-transition': '.75s',
                '-o-transition': '.75s'
            });
        }

        _this.find('.slide-wrapper').css({
            /* transform */
            'transform': 'translate3d(-200px, 0, 0) scale(.85, .85)',
            '-webkit-transform': 'translate3d(-200px, 0, 0) scale(.85, .85)',
            '-moz-transform': 'translate3d(-200px, 0, 0) scale(.85, .85)',
            '-ms-transform': 'translate3d(-200px, 0, 0) scale(.85, .85)',
            '-o-transform': 'translate3d(-200px, 0, 0) scale(.85, .85)',
            /* transition */
            'transition': '.75s',
            '-webkit-transition': '.75s',
            '-moz-transition': '.75s',
            '-o-transition': '.75s'
        });

        $slide.not(_this).find('.slide-wrapper').css({
            /* transform */
            'transform': 'translate3d(-200px, 0, 0) scale(.90, .90)',
            '-webkit-transform': 'translate3d(-200px, 0, 0) scale(.90, .90)',
            '-moz-transform': 'translate3d(-200px, 0, 0) scale(.90, .90)',
            '-ms-transform': 'translate3d(-200px, 0, 0) scale(.90, .90)',
            '-o-transform': 'translate3d(-200px, 0, 0) scale(.90, .90)',
            /* transition */
            'transition': '1s',
            '-webkit-transition': '1s',
            '-moz-transition': '1s',
            '-o-transition': '1s'
        });

        $slide.not(_this).find('.slide-dark').css({
            'opacity': '.75'
        });
    });

    $(document).on('mouseleave', '.slide', function() {
        if (initialAnim || clickAnim) return;

        var _this = $(this);
        var target = +_this.attr('data-target');

        for (var i = 1, len = $slide.length; i <= len; ++i) {
            $('#slide-' + i).css({
                /* transform */
                'transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-webkit-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-moz-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-ms-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-o-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                /* transition */
                'transition': '1s',
                '-webkit-transition': '1s',
                '-moz-transition': '1s',
                '-o-transition': '1s'
            });
        }

        $slide.find('.slide-wrapper').css({
            /* transform */
            'transform': 'translate3d(-200px, 0, 0) scale(1, 1)',
            '-webkit-transform': 'translate3d(-200px, 0, 0) scale(1, 1)',
            '-moz-transform': 'translate3d(-200px, 0, 0) scale(1, 1)',
            '-ms-transform': 'translate3d(-200px, 0, 0) scale(1, 1)',
            '-o-transform': 'translate3d(-200px, 0, 0) scale(1, 1)',
            /* transition */
            'transition': '.75s',
            '-webkit-transition': '.75s',
            '-moz-transition': '.75s',
            '-o-transition': '.75s'
        });

        $slide.find('.slide-dark').css({
            'opacity': '0'
        });

        $title.css({
            'opacity': '0',
            /* transform */
            'transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-webkit-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-moz-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-ms-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-o-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            /* transition */
            'transition': '.2s',
            '-webkit-transition': '.2s',
            '-moz-transition': '.2s',
            '-o-transition': '.2s'
        });

        $text.css({
            'opacity': '0',
            /* transform */
            'transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-webkit-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-moz-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-ms-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            '-o-transform': 'translate3d(0, -50%, 0) rotate(0.01deg)',
            /* transition */
            'transition': '.2s',
            '-webkit-transition': '.2s',
            '-moz-transition': '.2s',
            '-o-transition': '.2s'
        });
    });

    /* Define click event */
    $(document).on('click', '.slide-close', function() {
        setTimeout(function() {
            clickAnim = false;
        }, 1000);

        $close.removeClass('slide-close-show');

        for (var i = 1, len = $slide.length; i <= len; ++i) {
            $('#slide-' + i).css({
                'cursor': 'pointer',
                /* transform */
                'transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-webkit-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-moz-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-ms-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                '-o-transform': 'translate3d(-' + 100 / numSlides * (numSlides - (i - 1)) + '%, 0, 0)',
                /* transition */
                'transition': '1s',
                '-webkit-transition': '1s',
                '-moz-transition': '1s',
                '-o-transition': '1s'
            });
        }

        $title.css({
            'opacity': '0',
            /* transform */
            'transform': 'translate3d(50px, -40%, 0)',
            '-webkit-transform': 'translate3d(50px, -40%, 0)',
            '-moz-transform': 'translate3d(50px, -40%, 0)',
            '-ms-transform': 'translate3d(50px, -40%, 0)',
            '-o-transform': 'translate3d(50px, -40%, 0)',
            /* transition */
            'transition': '.2s',
            '-webkit-transition': '.2s',
            '-moz-transition': '.2s',
            '-o-transition': '.2s'
        });

        $text.css({
            'opacity': '0',
            /* transform */
            'transform': 'translate3d(150px, -40%, 0)',
            '-webkit-transform': 'translate3d(150px, -40%, 0)',
            '-moz-transform': 'translate3d(150px, -40%, 0)',
            '-ms-transform': 'translate3d(150px, -40%, 0)',
            '-o-transform': 'translate3d(150px, -40%, 0)',
            /* transition */
            'transition': '.2s',
            '-webkit-transition': '.2s',
            '-moz-transition': '.2s',
            '-o-transition': '.2s'
        });

        setTimeout(function() {
            $title.css({
                /* transform */
                'transform': 'translate3d(0, -50%, 0)',
                '-webkit-transform': 'translate3d(0, -50%, 0)',
                '-moz-transform': 'translate3d(0, -50%, 0)',
                '-ms-transform': 'translate3d(0, -50%, 0)',
                '-o-transform': 'translate3d(0, -50%, 0)'
            });

            $text.css({
                /* transform */
                'transform': 'translate3d(0, -50%, 0)',
                '-webkit-transform': 'translate3d(0, -50%, 0)',
                '-moz-transform': 'translate3d(0, -50%, 0)',
                '-ms-transform': 'translate3d(0, -50%, 0)',
                '-o-transform': 'translate3d(0, -50%, 0)'
            });
        }, 200);
    });

    setTimeout(function() {
        $content.addClass('active');
    }, initialAnimDel);

    setTimeout(function() {
        initialAnim = false;
    }, initialAnimDur + initialAnimDel);
});