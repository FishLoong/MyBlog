if(!(!!window.ActiveXObject||"ActiveXObject" in window)){
	window.onload=function(){
		if("pushState" in history){
			$(window).on("popstate",function(){
				var state=history.state;
				if(state){
					var $container=$(".container");
					var delClass=$container.attr("class").split(" ")[2];
					$container.removeClass(delClass);
					setTimeout(function(){
						if(fish.init.initModule(state)){
							setTimeout(function(){
								fish.init.initAnimate(state);
							},500);
						}
					},1000);
				}
			});
			history.pushState("home","","fish.html");
		}
		if(fish.init.initModule("home")){
			setTimeout(function(){
				fish.init.initAnimate("home");
			},700);
		}
	}
}
else{
	location.href="html/error.html";
}