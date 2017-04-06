$(function(){
    ModulePackage.pluginModule.drawerModule();
    var subclass="",klass="message";
    (function(){
        var Item=function(item){
            var arr=item.split(",");
            this.title=arr[0];
            this.link=arr[1];
            this.klass=arr[2];
            if(this.klass=="message"){
                this.time=arr[3];
            }
            else{
                this.subclass=arr[3];
                this.date=arr[4]||"";
                this.place=arr[5]||"";
            }
        };
        $("#menu-message").on("click",function(){
            $("#btn-back").click();
            $("#main").html("");
            klass="message";
            subclass="";
            init();
        });
        $("#menu-employ").on("click",function(){
            $("#btn-back").click();
            $("#main").html("");
            klass="employ";
            subclass="";
            init();
        });
        $("#submenu-online").on("click",function(){
            $("#btn-back").click();
            $("#main").html("");
            klass="employ";
            subclass="online";
            init();
        });
        $("#submenu-school").on("click",function(){
            $("#btn-back").click();
            $("#main").html("");
            klass="employ";
            subclass="school";
            init();
        });
        $("#submenu-practice").on("click",function(){
            $("#btn-back").click();
            $("#main").html("");
            klass="employ";
            subclass="practice";
            init();
        });
        function init(){
            $.ajax({
                type:"POST",
                url:"../index.php",
                contentType:"application/x-www-form-urlencoded;charset=utf-8",
                data:{
                    class:klass,
                    subclass:subclass,
                    index:1,
                    amount:10
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
        init();
        function generateView(items){
            for(var i=0,n=items.length-1;i<n;i++){
                var div=document.createElement("div");
                div.innerHTML="<span class='inf-left'><span class='class-img'></span></span><span class='inf-right'><span><p class='item-title'>" +
                    items[i].title+
                    "</p><p class='item-note'></p></span></span>";
                if(items[i].klass=='message'){
                    div.setAttribute("class","inf-message");
                    $(div).find(".item-note").html("发布于 "+items[i].time);
                }
                else{
                    div.setAttribute("class","inf-"+items[i].subclass);
                    if(items[i].date==""&&items[i].place==""){
                        $(div).find(".item-note").html("点击查看详情");
                    }
                    else if(items[i].date==""){
                        $(div).find(".item-note").html("<span><span class='place-img'></span><span>"+items[i].place+"</span></span>");
                    }
                    else if(items[i].place==""){
                        $(div).find(".item-note").html("<span><span class='time-img'></span><span>"+items[i].date+"</span></span>");
                    }
                    else{
                        $(div).find(".item-note").html("<span><span class='place-img'></span><span>"+items[i].place+"</span></span>" +
                            "<span><span class='time-img'></span><span>"+items[i].date+"</span></span>");
                    }
                }
                div.onclick=(function(i){
                    return function(){
                        location.href="http://"+items[i].link;
                    };
                }(i));
                document.getElementById("main").appendChild(div);
            }
        }
        (function(){
            $("#main").on("touchmove",function(){
                var amount=$(".inf-left").length;
                var container=$(this);
                if(container[0].scrollHeight-container[0].scrollTop-container.height()<30){
                    $.ajax({
                        type:"POST",
                        url:"../index.php",
                        contentType:"application/x-www-form-urlencoded;charset=utf-8",
                        data:{
                            class:klass,
                            subclass:subclass,
                            index:amount+1,
                            amount:5
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
            })
        }());
    }())
});