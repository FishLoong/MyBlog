var fish=(function($){
	var buttonStyle=function(index,content,flag,prePage){
		var $container=$("<span class='nav-bt'></span>");
		if(!flag){
			$container.on("click",function(){
				$(".container").removeClass(prePage+"-loaded");
				console.log(prePage);
				setTimeout(function(){
					if(initModule((content.length==2?content[0]:content).toLowerCase())){
						setTimeout(function(){
							$(".container").addClass((content.length==2?content[0]:content).toLowerCase()+"-loaded");
						},500);
					}
				},1000);
			});
		}
		else{
			$container.addClass("nav-bt-this");
		}
		console.log(index+" "+content+" "+flag);
		switch(index){
			case 1:
				$container.html("" +
					"<span class='head'>" +
						"<span class='text'>"+content[0]+"</span>" +
						"<span class='image'></span>" +
					"</span>" +
					"<span class='tail'>"+content[1]+"</span>");
				break;
			case 2:
				$container.html("" +
					"<span class='head'></span>" +
					"<span class='tail'>"+content+"</span>");
				break;
			case 3:
				$container.html("" +
					content +
					"<span></span><span></span><span></span><span></span>");
				break;
		}
		return $container;
	};
	var initModule=function(page){
		var Page=page[0].toUpperCase()+page.substring(1,page.length),
			$container=$(".container"),
			$background=$("<section class='background'></section>"),
			$nav=$("<section class='nav'></section>");
		$("title").text("Fish Loong - "+Page);
		return (function(){
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
			for(var i=0,n=spanOfBackground[page];i<n;i++){
				$("<span></span>").appendTo($background);
			}
			for(var i=0;i<5;i++){
				$nav.append(buttonStyle(btStyleIndex[page],page==="home"?[btName[i],btRemark[i]]:btName[i],Page===btName[i],page));
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