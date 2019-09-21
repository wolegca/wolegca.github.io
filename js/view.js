(function () {
	var index = getQueryString('i');
	$.ajax({
		type: "GET",
		url: "content.json?timestamp=" + (new Date()).valueOf(),
		dataType: "json",
		success: function (response) {
			
			if (response.length <= index)
				return;
			listContent(response, index);

			if (response[index]['hasCode'])
				loadScript('content/js/' + response[index]['date'] + '.js');

			$.ajax({
				type: "GET",
				url: 'content/html/' + response[index]['date'] + '.html',
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
})();