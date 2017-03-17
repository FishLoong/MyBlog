if(!(!!window.ActiveXObject || "ActiveXObject" in window)){
	window.pageIndex=["home","article","work","message","contact"];
	window.onload=function(){
		console.log(new Date()-t);
		if("pushState" in history){
			$(window).on("popstate",function(){
				var state=history.state;
				if(state){
					var $container=$(".container");
					var delClass=$container.attr("class").split(" ")[2];
					$container.removeClass(delClass);
					setTimeout(function(){
						if(fish.initModule(state)){
							setTimeout(function(){
								$container.addClass(state+"-loaded");
								$(".nav-bt").eq(pageIndex.indexOf(state)).addClass("nav-bt-this");
							},500);
						}
					},1000);
				}
			});
			history.pushState("home","","fish.html");
		}
		if(fish.initModule("home")){
			setTimeout(function(){
				console.log(new Date()-t);
				$(".container").addClass("home-loaded");
				$(".nav-bt").eq(0).addClass("nav-bt-this");
			},700);
		}
	}
}
else{
	location.href="html/error.html";
}