(function () {
	var index = window.parseInt(getQueryString('i'));
	if (window.isNaN(index)) {
		message.alert('发生错误', '缺少参数或参数类型不正确，请检查URL是否正确', function () {
			window.location.replace('/');
		});
		return;
	}
	$.ajax({
		type: "GET",
		url: "content.json?timestamp=" + (new Date()).valueOf(),
		dataType: "json",
		success: function (response) {

			if (response.length <= index)
				return;
			listContent(response, index);

			$.ajax({
				type: "GET",
				url: 'content/html/' + response[index]['date'] + '.html',
				success: function (res) {
					appendContent(res);
				},
				error: function () {
					message.alert('出错了!', '网络连接出错了，请稍后再试');
				}
			});
		},
		error: function () {
			message.alert('出错了!', '网络连接出错了，请稍后再试');
		}
	});
})();