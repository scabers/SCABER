$("section").addClass("pre-enter").removeClass("signin-content");
setTimeout(function(){
	$("section").addClass("on-enter");
}, 500);
setTimeout(function(){
	$("section").removeClass("pre-enter on-enter");
	setTimeout(function(){
		$("section").addClass("signin-content");
	}, 50);
}, 3000);

$("h1 a").click(function(){
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	if ($(this).is("#link-signup")) {
		$("#form-signup").removeClass("active");
		setTimeout(function(){
			$("#form-signin").addClass("active");
		}, 50);
	} else {
		$("#form-signin").removeClass("active");
		setTimeout(function(){
			$("#form-signup").addClass("active");
		}, 50);
	}
});