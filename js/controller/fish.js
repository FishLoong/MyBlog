$(function(global,$){
	var fish=global.fish={},
		currentAjax=[],
		// 异步延时函数
		asyDelay=function(func,step){
			var deferred=$.Deferred();
			setTimeout(function(){
				func();
				deferred.resolve();
			},step);
			return deferred.promise();
		};
	// 页面的动态交互
	fish.view=(function(){
		// article页主体内容
		// 左右结构
		// 左边为分类导航，类名旁边对应文章数，类下即为文章名，有滚动条
		// 右边为文章内容，有滚动条，包含标题、分类、时间、内容
		// 内容应包括：文字，代码，图片，图片标题，表格
		var articleMain=function(){
			var $main=$("<section class='main'></section>");
			return $main;
		};
		// work页主体内容
		// 左边两个切换按钮，右边两个屏幕，点击切换按钮实现屏幕的上下切换
		// 屏幕最多包含6个项目，下方为翻页按钮，点击翻页按钮该页内容隐藏，显示所点击页的内容
		// 项目点击屏幕内容隐藏，主体右方出现两个图片分割模块，一为标题加后退按钮，二位下载按钮
		// 屏幕内容出现相应项目的子页，子页点击在新的标签页中预览子页内容
		var	workMain=function(){
			var $main=$("<section class='main'></section>");
			// 初始化函数
			function init(){
				var $left=$("<span class='left'></span>"),
					$right=$("<span class='right'></span>"),
					$pageBtn=$("<span class='m-page-btn'></span>"),
					// 数据结构
					Page=function(title,imgURL,url){
						var $page=$("<span class='item'></span>");
						$page.html("" +
							"<span class='img'>" +
								"<img src='works/"+imgURL+"' alt='"+title+"'>" +
							"</span>" +
							"<p>"+title+"</p>");
						$page.on("click",function(){
							// 手动创建一个a标签来模拟a标签跳转，以达到生成新窗口不被浏览器拦截的效果
							var a=$("<a href='works/"+url+"' target='_blank'></a>")[0],
								e=document.createEvent('MouseEvents');
							e.initEvent('click',true,true);
							a.dispatchEvent(e);
						});
						return $page;
					},
					Item=function(imgURL,title,pages,download){
						var $item=$("<span class='item'></span>");
						$item.html("" +
							"<span class='img'>" +
								"<img src='works/"+imgURL+"' alt='"+title+"'>" +
							"</span>" +
							"<p>"+title+"</p>");
						$item.on("click",function(){
							var $container=$($(this).parent()),
								$background=$(".background"),
								$title=$("#main-title");
							$title.html(title);
							$container.removeClass("toggle-show");
							// 清空并生成相应的子页面目录
							asyDelay(function(){
								$container.empty();
							},400).then(function(){
								var $content=$right.find(".toggle"),
									idx=$content.index($right.find(".toggle-active")),
									data={
										pages:pages
									};
								// 向后台请求子页面目录并添加到容器中
								httpRequest($content,idx,data)();
							});
							// 标题、后退按钮、下载按钮的添加
							$background.find(".title").addClass("title-show");
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
						idx=$left.find(".toggle").index($this),
						$other=$left.find(".toggle").eq(!idx),
						$underline=$(".underline"),
						$content=$right.find(".toggle"),
						$background=$(".background");
					// 显示变化
					$background.find(".title").removeClass("title-show");
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
					$content.removeClass("toggle-show");
					// 数据变化
					asyDelay(function(){
						$content.empty();
						httpRequest($content,idx,{
							"type":$this.data("type")
						})();
					},500);
				});

				// 添加元素
				$main.append($left).append($right).append($pageBtn);

				// 数据请求
				httpRequest($right.find(".toggle"),0,{
					"type":$left.find(".toggle").eq(0).data("type")
				})();
				function httpRequest($content,idx,data){
					return function(){
						var $container=$content.eq(idx);
						currentAjax.push($.ajax({
							url:"php/work.php",
							type:"post",
							contentType:"application/x-www-form-urlencoded;charset=utf-8",
							data:data,
							beforeSend:function(){
								if(currentAjax.length>1){
									if(currentAjax[0]){
										currentAjax[0].abort();
										currentAjax.splice(0,1);
									}
								}
								var $loading=$("<div class='loading'></div>");
								$loading.html("" +
									"<div class='part part1'></div>" +
									"<div class='part part2'></div>" +
									"<div class='part part3'></div>" +
									"<div class='part part4'></div>" +
									"<div class='part part5'></div>" +
									"<div class='part part6'></div>");
								$container.append($loading);
								asyDelay(function(){
									$loading.addClass("loading-show");
								},50);
							},
							success:function(msg){
								var strs=msg.split(" + "),
									jsons=[],
									items=[],
									n=strs.length-1;
								// 清空内容
								$content.empty();
								// Json处理
								for(var i=0;i<n;i++){
									var json=$.parseJSON(strs[i]);
									if(json.items){
										items.push(Item(json.img,json.title,json.items,json.url));
									}
									else{
										items.push(Page(json.title,json.img,json.url))
									}
								}
								$container.append(items.slice(0,6));
								$content.removeClass("toggle-show");
								asyDelay(function(){},400).then(function(){
									$container.addClass("toggle-show");
								});
								// 翻页按钮，统计页数继而生成
								$pageBtn.empty().append($("<span class='page-active' data-index='1'></span>"));
								for(var page=0;page<Math.floor(n/6);page++){
									$pageBtn.append($("<span data-index='"+(page+2)+"'></span>"));
								}
								// 翻页按钮点击事件
								$pageBtn.find("span").on("click",function(){
									var $this=$(this),
										index=$this.data("index");
									if(!$this.hasClass("page-active")){
										$container.removeClass("toggle-show");
										$pageBtn.find(".page-active").removeClass("page-active");
										$this.addClass("page-active");
										var promise=asyDelay(function(){
											$container.empty().append(items.slice((index-1)*6,index*6));
										},500);
										promise.then(function(){
											$container.addClass("toggle-show");
										});
									}
								});
							}
						}));
					}
				}
				setTimeout(function(){
					$main.addClass("main-active");
				},1);
			}
			$main.one("transitionend",function(){
				init();
			});
			return $main;
		};
		return{
			articleMain:articleMain,
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
				var $title=$("<span class='title'></span>");
				$title.html("" +
					"<span>" +
						"<p class='main-title' id='main-title'></p>" +
						"<p class='main-remind'>（点击左侧按钮&nbsp;<br/>&nbsp;即返回上一层）</p>" +
					"</span>");
				$background.append($title);
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
					$title.append($("<span>Fish</span><span>Loong</span>"));
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
					$main=fish.view.articleMain();
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