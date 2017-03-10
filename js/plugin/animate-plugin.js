$(function($){
	$.fn.sliceImage=function(imgURL,index,shadow,delay,props){
		var $this=$(this),
			$container=$(".p-glass")||$("<span class='p-glass'></span>"),
			styleSheet=document.styleSheets[index],
			n;
		styleSheet.cssRules[1].style["background"]="url("+imgURL+") no-repeat";
		if(n=props.length){
			for(var i=0;i<n;i++){
				createGlass(props[i],i).appendTo($container);
			}
		}
		else{
			createGlass(props,0).appendTo($container);
		}
		function createGlass(props,index){
			var $glass=$("<span></span>");
			var thisSheet=styleSheet.cssRules[index*2+2],
				thisActiveSheet=styleSheet.cssRules[(index*2)+3];
			for(var i in props){
				thisSheet.style[i]=props[i];
			}
			thisActiveSheet.style["box-shadow"]=shadow;
			thisActiveSheet.style["top"]=parseInt(props["top"])-1+"%";
			thisActiveSheet.style["left"]=parseInt(props["left"])-1+"%";
			thisActiveSheet.style["width"]=parseInt(props["width"])+2+"%";
			thisActiveSheet.style["height"]=parseInt(props["height"])+2+"%";
			thisActiveSheet.style["transition-delay"]=delay*index+"s";
			return $glass;
		}
		$this.append($container);
		return $this;
	};
}(jQuery));