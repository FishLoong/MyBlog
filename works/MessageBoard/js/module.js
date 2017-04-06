$(function(global){
    global.ModulePackage=(function(){
        // 样式设置
        var styleModule=(function(){
            var loginStyle=function(){
                Y("#username").placeholder("用户名（字母或数字）：");
                Y("#password").placeholder("密码（字母或数字）：");
            };
            var publishStyle=function(){
                Y("#title").placeholder("（必填）标题：");
                Y("#date").placeholder("（选填）截止日期：01月01日 - 12月31日");
                Y("#place").placeholder("（选填）地点：");
                Y("#link").placeholder("（必填）链接：");
            };
            var manageStyle=function(){
                Y("#title").placeholder("标题（关键字）：");
                Y("#date").placeholder("截止日期（01月或01日或01月01日）：");
                Y("#place").placeholder("地点（关键字）：");
                Y("#link").placeholder("链接（完整）：");
            };
            return{
                loginStyle:loginStyle,
                publishStyle:publishStyle,
                manageStyle:manageStyle
            };
        }());
        // 正则匹配
        // 用户名、密码只能为数字或字母
        // 截止日期有指定格式
        // 其余不能包含空格
        // 必填内容必填
        var regexModule=(function(){
            var reg_username,
                reg_password=reg_username=/^[A-Za-z0-9]+$/,
                reg_not_space=/^[\S]+$/,
                reg_date1=/^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/,
                reg_date2=/^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日|(0[1-9]|1[0-2])月|(0[1-9]|[1-2][0-9]|3[0-1])日$/;
            var loginReg=function(){
                $("#login-submit").on("click",function(e){
                    if(!e){
                        e=window.event;
                    }
                    var text_username=$("#username"),
                        username=text_username.val(),
                        text_password=$("#password"),
                        password=text_password.val(),
                        remind=$(".remind").eq(0);
                    if(username.length<=0){
                        remind.html("用户名不应为空");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_username.focus();
                    }
                    else if(password.length<=0){
                        remind.html("密码不应为空");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_password.focus();
                    }
                    else if(!reg_username.test(username)){
                        remind.html("用户名中包含特殊字符（合法：字母，数字）");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_username.focus();
                    }
                    else if(!reg_password.test(password)){
                        remind.html("密码中包含特殊字符（合法：字母，数字）");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_password.focus();
                    }
                    else{
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                    }
                });
            };
            var publishReg=function(){
                $("#publish-submit").on("click",function(e){
                    if(!e){
                        e=window.event;
                    }
                    e.preventDefault();
                    var text_title=$("#title"),
                        title=text_title.val(),
                        text_date=$("#date"),
                        date=text_date.val(),
                        text_place=$("#place"),
                        place=text_place.val(),
                        radio_classes=$("input[name='classes']:checked"),
                        classes=radio_classes.val(),
                        radio_subclasses=$("input[name='subclasses']:checked"),
                        subclasses=radio_subclasses.val(),
                        text_link=$("#link"),
                        link=text_link.val(),
                        remind=$(".remind").eq(0);
                    if(title.length<=0){
                        remind.html("标题不应为空");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_title.focus();
                    }
                    else if(link.length<=0){
                        remind.html("链接不应为空");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_link.focus();
                    }
                    else if(!reg_not_space.test(title)){
                        remind.html("标题中不能有空格字符");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_title.focus();
                    }
                    else if(!reg_not_space.test(link)){
                        remind.html("链接中不能有空格字符");
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                        setTimeout(function(){
                            remind.addClass("remind-error");
                        },1);
                        text_link.focus();
                    }
                    else if(date.length>0){
                        if(!reg_date1.test(date)){
                            remind.html("(01月01日)，注意0和空格");
                            if(remind.hasClass("remind-error")){
                                remind.removeClass("remind-error");
                            }
                            setTimeout(function(){
                                remind.addClass("remind-error");
                            },1);
                            text_date.focus();
                        }
                    }
                    else if(place.length>0){
                        if(!reg_not_space.test(place)){
                            remind.html("地点中不能有空格字符");
                            if(remind.hasClass("remind-error")){
                                remind.removeClass("remind-error");
                            }
                            setTimeout(function(){
                                remind.addClass("remind-error");
                            },1);
                            text_place.focus();
                        }
                    }
                    else{
                        if(remind.hasClass("remind-error")){
                            remind.removeClass("remind-error");
                        }
                    }
                });
            };
            return{
                loginReg:loginReg,
                publishReg:publishReg,
            }
        }());
        // 自定义组件
        // 按钮
        // 抽屉
        var pluginModule=(function(){
            var buttonModule=function(clickEvent){
                var button=$(".switch-background");
                button.on("click",function(){
                    var block=$(".switch-button");
                    if(button.hasClass("switch-background-open")){
                        button.removeClass("switch-background-open");
                        block.removeClass("switch-button-open");
                        clickEvent("close");
                    }
                    else{
                        button.addClass("switch-background-open");
                        block.addClass("switch-button-open");
                        clickEvent("open");
                    }
                })
            };
            var drawerModule=function(){
                var cover=$(".cover"),
                    menu=$(".menu");
                $("#btn-menu").on("click",function(){
                    if(!cover.hasClass("cover-show")){
                        cover.addClass("cover-show");
                        menu.addClass("menu-show");
                    }
                });
                $("#btn-back").on("click",function(){
                    if(cover.hasClass("cover-show")){
                        cover.removeClass("cover-show");
                        menu.removeClass("menu-show");
                    }
                });
            };
            return{
                buttonModule:buttonModule,
                drawerModule:drawerModule
            };
        }());
        // 事件
        // 文字编辑页面展开
        // 就业板解除readonly与disabled
        // 滚动加载
        var eventModule=(function(){
            var openContentEdit=function(flag){
                var nav=$(".nav"),
                    main=$(".main"),
                    content=$(".content-edit");
                switch(flag){
                    case "open":
                        nav.addClass("nav-open");
                        main.addClass("main-open");
                        content.addClass("content-edit-open");
                        break;
                    case "close":
                        nav.removeClass("nav-open");
                        main.removeClass("main-open");
                        content.removeClass("content-edit-open");
                        break;
                }
            };
            var activatePlugins=function(){
                var radio_classes=$("input[name='classes']"),
                    radio_subclasses=$("input[name='subclasses']"),
                    text_date=$("#date"),
                    text_place=$("#place");
                radio_classes.on("change",function(){
                    var classes=$("input[name='classes']:checked").val();
                    radio_classes.removeAttr("checked");
                    $(this).attr("checked","true");
                    switch(classes){
                        case "message":
                            if(!radio_subclasses.attr("disabled")){
                                radio_subclasses.attr("disabled","disabled");
                                radio_subclasses.attr("checked","undefined");
                                radio_subclasses.removeAttr("checked");
                                text_date.attr("readonly","true");
                                text_place.attr("readonly","true");
                            }
                            break;
                        case "employ":
                            if(radio_subclasses.attr("disabled")){
                                radio_subclasses.attr("disabled","false");
                                radio_subclasses.removeAttr("disabled");
                                radio_subclasses.eq(0).attr("checked","true");
                                text_date.attr("readonly","false");
                                text_date.removeAttr("readonly");
                                text_place.attr("readonly","false");
                                text_place.removeAttr("readonly");
                            }
                            break;
                    }
                });
                radio_subclasses.on("change",function(){
                    if(!radio_subclasses.attr("disabled")){
                        radio_subclasses.removeAttr("checked");
                        $(this).attr("checked","true");
                    }
                })
            };
            return{
                openContentEdit:openContentEdit,
                activatePlugins:activatePlugins,
            }
        }());
        return{
            styleModule:styleModule,
            regexModule:regexModule,
            pluginModule:pluginModule,
            eventModule:eventModule
        };
    }());
}(window));