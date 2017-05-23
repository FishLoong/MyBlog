<?php
	require_once "connect.php";
	error_reporting(7);
	if($post=$_POST){
		if($type=$post["type"]){
			if($res=$con->query("select title,img,url,items from workall where type='".$type."'")){
				while($item=$res->fetch_assoc()){
					foreach($item as $key=>$value){
						$item[$key]=urlencode($value);
					}
					echo urldecode(json_encode($item))." + ";
				}
			}
		}
		else if($pages=explode(",",$post["pages"])){
			if($res=$con->query("select title,img,url from workitem where pid in (".$post["pages"].")")){
				while($item=$res->fetch_assoc()){
					foreach($item as $key=>$value){
						$item[$key]=urlencode($value);
					}
					echo urldecode(json_encode($item))." + ";
				}
			}
		}
	}