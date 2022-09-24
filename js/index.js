var index = getQueryString('i');
$.ajax({
	type: "GET",
	url: "content.json?timestamp=" + (new Date()).valueOf(),
	dataType: "json",
	success: function (response) {
		var lastIndex = response.length - 1;

		if (response.length <= index) {
			return;
		}

		listContent(response, lastIndex);

		if (response[lastIndex]['type']=='html') {
			$.ajax({
				type: "GET",
				url: 'content/html/' + response[lastIndex]['date'] + '.html',
				success: function (res) {
					appendContent(res);
				},
				error: function () {
					message.alert('出错了!', '网络连接出错了，请稍后再试');
				}
			});
		}
	},
	error: function () {
		message.alert('出错了!', '网络连接出错了，请稍后再试');
	}
});