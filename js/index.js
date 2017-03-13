if("transition" in document.documentElement.style){
	window.onload=function(){
		console.log(new Date()-t);
		if(fish.initModule("home")){
			setTimeout(function(){
				console.log(new Date()-t);
				$(".container").addClass("home-loaded");
			},700);
		}
	}
}
else{
	location.href="html/error.html";
}