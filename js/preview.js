(function () {
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
    deployContentList();
    $.ajax({
        type: "GET",
        url: 'content/md/' + getQueryString('date') + '.md?timestamp=' + (new Date().valueOf()),
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
