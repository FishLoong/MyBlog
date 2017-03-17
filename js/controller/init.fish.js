$(function(global){
	global.fish={};
	fish.init=(function($){
		var spanOfBackground={"home":4,"contact":4},
			titleStyleIndex={"home":1,"article":2,"work":2,"message":2,"contact":1},
			btStyleIndex={"home":1,"article":2,"work":2,"message":2,"contact":3},
			btName=["Home","Article","Work","Message","Contact"],
			pageIndex=["home","article","work","message","contact"],
			btRemark=[
				"Fish, just fish. 一只热爱编程与艺术的鱼。",
				"最新文章：丑鱼 - 梦澧花落知多少",
				"最新项目：湖南大学易班学生工作站失物招领系统",
				"期待您留下您的足迹。",
				"但君所需，愿为驱驰。"
			];
		var initAnimate=function(page){
			$(".container").addClass(page+"-loaded");
			$(".nav-bt").eq(pageIndex.indexOf(page)).addClass("nav-bt-this");
			switch(page){
				case "home":
					break;
				case "article":
					break;
				case "work":
					break;
				case "message":
					break;
				case "contact":
					break;
			}
		};
		var titleFactory=function(index){
			var $title=$("<section class='title'></section>");
			switch(index){
				case 1:
					var str="Fish Loong";
					for(var i=0,n=str.length;i<n;i++){
						$title.append($("<span>"+str[i]+"</span>"));
					}
					break;
				case 2:
					break;
			}
			return $title;
		};
		var buttonFactory=function(index,content,flag){
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
								initAnimate(page);
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
		var mainFactory=function(page){
			var $main;
			switch(page){
				case "home":
					$main="";
					break;
				case "article":
					break;
				case "work":
					break;
				case "message":
					break;
				case "contact":
					var info={
						"Ch-Name:":"龙泽铭",
						"En-Name:":"Jeremy Loong",
						"E-mail :":"longzeming1996@gmail.com",
						"GitHub :":"github.com/FishLoong"
					};
					$main=$("<section class='main'></section>");
					for(var i in info){
						var $item=$("<div></div>");
						$item.html("" +
							"<span class='head'>"+i+"</span>" +
							"<span>"+(i==="GitHub :"?"<a href='https://"+info[i]+"'>"+info[i]+"</a>":info[i])+"</span>")
						$main.append($item);
					}
					break;
			}
			return $main;
		};
		var initModule=function(page){
			// 除组件以外其他元素的初始化
			var Page=page[0].toUpperCase()+page.substring(1,page.length);
			$("title").text("Fish Loong - "+Page);
			// 添加组件
			return (function(){
				// 参数
				var $container=$(".container"),
					$background,$title,$nav,$main,$copyright;
				// 背景
				$background=$("<section class='background'></section>");
				for(var i=0,n=spanOfBackground[page];i<n;i++){
					$background.append($("<span></span>"));
				}
				// 标题
				$title=titleFactory(titleStyleIndex[page]);
				// 导航栏（按钮）
				$nav=$("<section class='nav'></section>");
				for(var i=0;i<5;i++){
					$nav.append(buttonFactory(btStyleIndex[page],page==="home"?[btName[i],btRemark[i]]:btName[i],btName[i]===Page));
				}
				// 内容主体
				$main=mainFactory(page);
				// 版权声明
				$copyright=$("<section class='copyright'>Copyright©longzeming1996@gmail.com, Jeremy Loong</section>");
				// 依次添加到容器
				$container.empty().attr("class","container "+page)
					.append($background)
					.append($title)
					.append($nav)
					.append($main)
					.append($copyright);
				return true;
			}());
		};
		return{
			initModule:initModule,
			initAnimate:initAnimate
		}
	}(jQuery));
}(window));