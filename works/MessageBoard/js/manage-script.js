$(function(){
    ModulePackage.styleModule.manageStyle();
    ModulePackage.eventModule.activatePlugins();
    var index=1,
        klass=$("[name='classes']:checked").val(),
        subclass=$("[name='subclasses']:checked").val();
    var Item=function(item){
        var arr=item.split(",");
        this.pid=arr[0];
        this.title=arr[1];
        this.link=arr[2];
        this.klass=arr[3];
        if(this.klass=="message"){
            this.time=arr[4];
        }
        else{
            this.subclass=arr[4];
            this.date=arr[5]||"";
            this.place=arr[6]||"";
        }
    };
    init();
    function init(){
        $.ajax({
            type:"POST",
            url:"../index.php",
            contentType:"application/x-www-form-urlencoded;charset=utf-8",
            data:{
                title:$("#title").val()||"",
                link:$("#link").val()||"",
                class:klass,
                subclass:subclass,
                date:$("#date").val(),
                place:$("#place").val(),
                index:index
            },
            success:function(msg){
                var items=msg.split(";");
                var item=[];
                for(var i=0,n=items.length;i<n;i++){
                    item.push(new Item(items[i]));
                }
                generateView(item);
            }
        });
    }
    function generateView(items){
        document.getElementById("inf-list").innerHTML="";
        for(var i=0,n=items.length-1;i<n;i++){
            var span=document.createElement("span");
            span.innerHTML="<span class='inf-left'><span class='class-img'></span></span>" +
                "<span class='inf-center'><p class='item-title' title='"+items[i].title+"'>"+items[i].title+"</p>" +
                "<p class='item-date'></p></span><span class='inf-right'>" +
                "<span class='item-delete'></span></span>";
            span.setAttribute("class","inf-item");
            $("span").find("item-delete").on("click",(function(i){
                return function(){
                    $.ajax({
                        type:"POST",
                        url:"../index.php",
                        contentType:"application/x-www-form-urlencoded;charset=utf-8",
                        data:{
                            signal:"delete",
                            pid:items[i].pid
                        },
                        success:function(){
                            init();
                        }
                    });
                };
            }(i)));
            if(items[i].klass=='message'){
                $(span).addClass("inf-message").find(".item-date").html(items[i].time);
            }
            else{
                $(span).addClass("inf-"+items[i].subclass).find(".item-date").html("截止时间："+(items[i].date||"未标注"));
            }
            document.getElementById("inf-list").appendChild(span);
        }
    }
    var reg_not_space=/^[\S]+$/,
        reg_date2=/^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日|(0[1-9]|1[0-2])月|(0[1-9]|[1-2][0-9]|3[0-1])日$/;
    var manageReg=function(){
        $("#search-submit").on("click",function(e){
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
            if(title.length>0&&!reg_not_space.test(title)){
                remind.html("标题中不能有空格字符");
                if(remind.hasClass("remind-error")){
                    remind.removeClass("remind-error");
                }
                setTimeout(function(){
                    remind.addClass("remind-error");
                },1);
                text_title.focus();
            }
            else if(link.length>0&&!reg_not_space.test(link)){
                remind.html("链接中不能有空格字符");
                if(remind.hasClass("remind-error")){
                    remind.removeClass("remind-error");
                }
                setTimeout(function(){
                    remind.addClass("remind-error");
                },1);
                text_link.focus();
            }
            else if(date.length>0&&!reg_date2.test(date)){
                remind.html("(01月或01日或01月01日)，注意0和汉字");
                if(remind.hasClass("remind-error")){
                    remind.removeClass("remind-error");
                }
                setTimeout(function(){
                    remind.addClass("remind-error");
                },1);
                text_date.focus();
            }
            else if(place.length>0&&!reg_not_space.test(place)){
                remind.html("地点中不能有空格字符");
                if(remind.hasClass("remind-error")){
                    remind.removeClass("remind-error");
                }
                setTimeout(function(){
                    remind.addClass("remind-error");
                },1);
                text_place.focus();
            }
            else{
                if(remind.hasClass("remind-error")){
                    remind.removeClass("remind-error");
                }
                index=1;
                $("#page").html(index);
                klass=$("[name='classes']:checked").val();
                subclass=$("[name='subclasses']:checked").val();
                init();
            }
        });
    };
    manageReg();
    $("#btn-previous").on("click",function(){
        if(index>1){
            index--;
            $("#page").html(index);
            init();
        }
    });
    $("#btn-next").on("click",function(){
        index++;
        $("#page").html(index);
        init();
    });
});