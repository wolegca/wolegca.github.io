(function () {
	var index = getQueryString('i');
	$.ajax({
		type: "GET",
		url: "content.json",
		dataType: "json",
		success: function (response) {
			
			listContent(response,index);

			if (response[index]['hasCode'])
				loadScript('content/js/' + response[index]['date'] + '.js');

			$.ajax({
				type: "GET",
				url: 'content/html/' + response[index]['date'] + '.html',
				success: function (res) {
					appendContent(res);
				}
			});
		}
	});
})();