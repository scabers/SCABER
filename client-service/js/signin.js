/*去讓對話框彈出來*/

$(document).ready(function(){
    $("button .sign-in").click(function(){
        $("div.tab-content1").animate({
            top:'20vh',
            left: '58vw',
            opacity: '0.5',
            height: '430px',
            width: '550px'

        });

    });
});
$(document).ready(function(){
    $("button .sign-up").click(function(){
        $("div.tab-content2").animate({
            top:'26vh',
            left: '58vw',
            opacity: '0.5',
            height: '430px',
            width: '550px',
        });

    });
});


/*讓效果展現更好,淡入淡出*/
$(document).ready(function(){ 
    $("div.tab-content1").hide();
    $("button .sign-in").click(function(){
        $("div.tab-content1").fadeIn(800);
        $("div.tab-content2").fadeOut();      /*開一個,其他關掉*/
    });
});
$(document).ready(function(){ 
    $("div.tab-content2").hide();
    $("button .sign-up").click(function(){
        $("div.tab-content2").fadeIn(800);
        $("div.tab-content1").fadeOut();      /*開一個,其他關掉*/
    });
});
