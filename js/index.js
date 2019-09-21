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

var index = getQueryString('i');
$.ajax({
	type: "GET",
	url: "content.json?timestamp=" + (new Date()).valueOf(),
	dataType: "json",
	success: function (response) {
		var lastIndex = response.length - 1;

		if(response.length <= index){
			return;
		}

		listContent(response, lastIndex);

		if (response[lastIndex]['hasCode'])
			loadScript('content/js/' + response[lastIndex]['date'] + '.js');

		$.ajax({
			type: "GET",
			url: 'content/html/' + response[lastIndex]['date'] + '.html',
			success: function (res) {
				appendContent(res);
			},
			error:function(){
				message.alert('出错了!','网络连接出错了，请稍后再试');
			}
		});
	},
	error:function(){
		message.alert('出错了!','网络连接出错了，请稍后再试');
	}
});