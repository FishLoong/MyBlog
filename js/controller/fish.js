$(function(global,$){
	var fish=global.fish={};
	// 页面的动态交互
	fish.view=(function(){
		// work页主体内容
		var workMain=function(){
			var $main=$("<section class='main'></section>"),
				$title=$("#main-title"),
				$download=$("#main-download");
			function init(){
				var $left=$("<span class='left'></span>"),
					$right=$("<span class='right'></span>"),
					// 数据结构
					Item=function(imgURL,title,id){
						var $item=$("<div class='item'></div>");
						$item.html("" +
							"<img src='"+imgURL+"' alt='"+title+"'>" +
							"<p>"+title+"</p>");
						$item.on("click",function(){
						});
						return $item;
					};
				// 页面框架
				// 目录页左边的切换按钮
				$left.html("" +
					"<div class='toggle toggle-active' data-type='project'>项目</div>" +
					"<div class='toggle' data-type='effect'>特效</div>" +
					"<span class='underline'></span>");
				// 右边
				$right.html("" +
					"<div class='toggle toggle-1 toggle-active' id='ct-project'></div>" +
					"<div class='toggle toggle-2' id='ct-effect'></div>");
				// 事件监听
				// 切换点击事件
				$left.find(".toggle").on("click",function(){
					var $this=$(this),
						$other=$left.find(".toggle").eq(!$left.find(".toggle").index($this)),
						$underline=$(".underline"),
						$content=$right.find(".toggle");
					// 显示变化
					if(!$this.hasClass("toggle-active")){
						$this.addClass("toggle-active");
						$other.removeClass("toggle-active");
						if($underline.hasClass("underline-2")){
							$underline.removeClass("underline-2");
						}
						else{
							$underline.addClass("underline-2");
						}
						if($content.eq(0).hasClass("toggle-active")){
							$content.eq(0).removeClass("toggle-active");
							$content.eq(1).addClass("toggle-active");
						}
						else{
							$content.eq(1).removeClass("toggle-active");
							$content.eq(0).addClass("toggle-active");
						}
					}
					// 数据变化
					$content.eq(0).off("transitionend").on("transitionend",function(){
						$.ajax({
							url:"php/work.php",
							type:"post",
							contentType:"application/x-www-form-urlencoded;charset=utf-8",
							data:{
								"type":$this.data("type")
							},
							success:function(msg){

							}
						});
					});
				});
				$main.append($left).append($right);
			}
			init();
			$main.on("transitionend",function(){
			});
			return $main;
		};
		return{
			workMain:workMain
		}
	}());
	// 页面初始化
	fish.init=(function(){
		var spanOfBackground={"home":4,"article":4,"work":3,"message":5,"contact":5},
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
		// 背景分割特效生成器
		var backgroundFactory=function(page){
			var $background=$("<section class='background'></section>");
			for(var i=0,n=spanOfBackground[page];i<n;i++){
				$background.append($("<span></span>"));
			}
			if(page==="work"){
				var $title=$("<span class='title'></span>"),
					$download=$("<span class='download'></span>");
				$title.html("" +
					"<span>" +
						"<span id='main-title'></span>" +
						"<span id='main-back'></span>" +
					"</span>");
				$download.html("" +
					"<span>" +
						"<span class='main-download'></span>" +
					"</span>");
				$background.append($title).append($("<span class='download' id='main-download'></span>"));
			}
			return $background;
		};
		// 标题生成器
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
					$title.append($("<span>Fish</span><span>Loong</span>"))
					break;
			}
			return $title;
		};
		// 导航按钮生成器
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
		// 主体部分生成器
		// 调用对应页的主体生成
		var mainFactory=function(page){
			var $main;
			switch(page){
				case "home":
					$main="";
					break;
				case "article":
					$main=$("<section class='main'></section>");
					break;
				case "work":
					$main=fish.view.workMain();
					break;
				case "message":
					$main=$("<section class='main'></section>");
					break;
				case "contact":
					var info={
						"Ch-Name:":"龙泽铭",
						"En-Name:":"Jeremy Loong",
						"E-mail:":"longzeming1996@gmail.com",
						"GitHub:":"FishLoong"
					};
					$main=$("<section class='main'></section>");
					for(var i in info){
						var $item=$("<div class='item'></div>");
						$item.html("" +
							"<span class='head'>"+i+"</span>" +
							"<span class='tail'>"+(i==="GitHub:"?"<a href='https://github.com/"+info[i]+"' target='_blank'>"+info[i]+"</a>":info[i])+"</span>");
						$main.append($item);
					}
					break;
			}
			return $main;
		};
		// 初始化函数
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
				$background=backgroundFactory(page);
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
	}());
}(window,jQuery));