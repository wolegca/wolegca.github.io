$.ajax({
	type:"GET",
	url:"https://javacloud.bmob.cn/0104a7ae840e3555/counter?name=wcx",
	async:true,
	success:function(res){
		message.alert(res);
	},
	error:function(){
		message.alert('error!');
	}
});