<?php
	if(!$con=new mysqli("localhost","root","lzm8974106","blog")){
		exit(0);
	}
	else{
		$con->query("set names utf8");
	}