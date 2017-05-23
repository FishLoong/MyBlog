$(function(){
	var $left=$(".left"),
		$right=$(".right");
	$left.find(".toggle").on("click",function(){
		var $this=$(this),
			idx=$left.find(".toggle").index($this),
			$other=$left.find(".toggle").eq(!idx),
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
				$content.eq(0).removeClass("toggle-active toggle-show");
				$content.eq(1).addClass("toggle-active toggle-show");
			}
			else{
				$content.eq(1).removeClass("toggle-active toggle-show");
				$content.eq(0).addClass("toggle-active toggle-show");
			}
		}
	});
});