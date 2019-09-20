// $.ajax({
// 	type:"GET",
// 	url:"https://javacloud.bmob.cn/0104a7ae840e3555/counter?name=wcx",
// 	async:true,
// 	success:function(res){
// 		message.alert('提示',res);
// 	},
// 	error:function(){
// 		message.alert('提示','error!');
// 	}
// });


$.ajax({
	type: "GET",
	url: "content.json",
	dataType: "json",
	success: function (response) {
		var lastIndex = response.length - 1;

		if (response[lastIndex]['hasCode'] == true)
			loadScript('content/js/' + response[lastIndex]['date'] + '.js');

		$.ajax({
			type: "GET",
			url: 'content/html/' + response[lastIndex]['date'] + '.html',
			success: function (response) {
				appendContent(response);
			}
		});
	}
});