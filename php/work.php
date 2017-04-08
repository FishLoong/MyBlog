<?php
	require_once "connect.php";
	if($post=$_POST){
		if($res=$con->query("select * from workall where type='".$post["type"]."'")){
			while($item=$res->fetch_assoc()){
				foreach($item as $key=>$value){
					$item[$key]=urlencode($value);
				}
				echo urldecode(json_encode($item))." + ";
			}
		}
	}