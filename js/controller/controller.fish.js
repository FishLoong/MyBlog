var fish=(function($){
	var initModule=function(page){
		var $container=$(".container"),
			$background=$("<section class='background'></section>");
		$("title").text("Fish Loong - "+page[0].toUpperCase()+page.substring(1,page.length));
		return (function(){
			var spanOfBackground={"home":4,"contact":4};
			for(var i=0,n=spanOfBackground[page];i<n;i++){
				$("<span></span>").appendTo($background);
			}
			$container.empty().attr("class","container "+page).append($background).append($("" +
				"<section class='copyright'>Copyright©longzeming1996@gmail.com, Jeremy Loong</section>"));
			return true;
		}());
	};
	return{
		initModule:initModule
	}
}(jQuery));