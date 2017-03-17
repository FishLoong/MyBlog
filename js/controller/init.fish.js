var fish=(function($){
	var spanOfBackground={"home":4,"contact":4},
		btStyleIndex={"home":1,"article":2,"work":2,"message":2,"contact":3},
		btName=["Home","Article","Work","Message","Contact"],
		btRemark=[
			"Fish, just fish. 一只热爱编程与艺术的鱼。",
			"最新文章：丑鱼 - 梦澧花落知多少",
			"最新项目：湖南大学易班学生工作站失物招领系统",
			"期待您留下您的足迹。",
			"但君所需，愿为驱驰。"
		];
	var buttonStyle=function(index,content,flag){
		var $nav=$("<span class='nav-bt'></span>");
		var $container=$(".container");
		if(!flag){
			$nav.on("click",function(){
				var page=(content.length==2?content[0]:content).toLowerCase();
				if("pushState" in history){
					history.pushState(page,"","fish.html");
				}
				$container.removeClass($container.attr("class").split(" ")[2]);
				setTimeout(function(){
					if(initModule(page)){
						setTimeout(function(){
							$container.addClass(page+"-loaded");
							$(".nav-bt").eq(btName.indexOf((content.length==2?content[0]:content))).addClass("nav-bt-this");
						},500);
					}
				},1000);
			});
		}
		switch(index){
			case 1:
				$nav.html("" +
					"<span class='head'>" +
						"<span class='text'>"+content[0]+"</span>" +
						"<span class='image'></span>" +
					"</span>" +
					"<span class='tail'><span>"+content[1]+"</span></span>");
				break;
			case 2:
				$nav.html("" +
					"<span class='head'></span>" +
					"<span class='tail'>"+content+"</span>");
				break;
			case 3:
				$nav.html("" +
					"<span></span><span></span><span></span><span></span>" +
					content);
				break;
		}
		return $nav;
	};
	var initModule=function(page){
		var Page=page[0].toUpperCase()+page.substring(1,page.length),
			$container=$(".container"),
			$background=$("<section class='background'></section>"),
			$nav=$("<section class='nav'></section>");
		$("title").text("Fish Loong - "+Page);
		return (function(){
			for(var i=0,n=spanOfBackground[page];i<n;i++){
				$("<span></span>").appendTo($background);
			}
			for(var i=0;i<5;i++){
				$nav.append(buttonStyle(btStyleIndex[page],page==="home"?[btName[i],btRemark[i]]:btName[i],btName[i]===Page));
			}
			$container.empty().attr("class","container "+page).append($background).append($nav).append($("" +
				"<section class='copyright'>Copyright©longzeming1996@gmail.com, Jeremy Loong</section>"));
			return true;
		}());
	};
	return{
		initModule:initModule
	}
}(jQuery));