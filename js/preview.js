(function () {
    let md = window.markdownit({
        html: true,
        breaks:true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(str, { language: lang }).value;
              } catch (e) {}
            }
        
            return ''; // use external default escaping
        }
    })

    $.ajax({
		type: "GET",
		url: "readme.md?timestamp=" + (new Date().valueOf()),
		dataType: "text",
		success: function (response) {

            let res = md.render(response);
            appendContent(res);
            loadCss('js/highlight/styles/atom-one-light.min.css')
            
	        loadCss("css/highlight.css");
            
		
		},
		error: function () {
			message.alert('出错了!', '网络连接出错了，请稍后再试');
		}
	});
})()
