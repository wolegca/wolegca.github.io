var index = getQueryString('i');
$.ajax({
	type: "GET",
	url: "content.json?timestamp=" + (new Date()).valueOf(),
	dataType: "json",
	success: function (response) {
		var lastIndex = response.length - 1;

		if (response.length <= index) {
			message.alert('出错了!', '网络连接出错了，请稍后再试');
			return;
		}

		listContent(response, lastIndex);

		if (response[lastIndex]['type'] == 'html') {
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
		} else {
			$.ajax({
				type: "GET",
				url: 'content/md/' + response[lastIndex]['date'] + '.md',
				success: function (res) {
					let md = window.markdownit({
						html: true,
						breaks: true,
						highlight: function (str, lang) {
							if (lang && hljs.getLanguage(lang)) {
								try {
									const preCode = hljs.highlight(str, { language: lang }).value;
									// 以换行进行分割
									const lines = preCode.split(/\n/).slice(0, -1)
									// 添加自定义行号
									let html = lines.map((item, index) => {
										return '<li><span class="line-num"></span>' + item + '</li>'
									}).join('')
									html = '<ol>' + html + '</ol>'
									// 添加代码语言
									if (lines.length) {
										html += '<b class="name">' + lang + '</b>'
									}
									return '<pre><code>' +
										html +
										'</code></pre>'
								} catch (e) { }
							}
							return ''; // use external default escaping
						}
					});
					appendContent(md.render(res));
					loadCss('js/highlight/styles/atom-one-light.min.css')
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