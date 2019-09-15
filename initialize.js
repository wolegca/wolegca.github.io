$(function () {
	window.onselectstart = block;
	window.ontouchstart = block;
	window.ondragstart = block;
	$('.msg-header').Drag($('.msg-container'));
	$('.menu-container ul li span').on('click',function(){
		message.alert('这里是','<div style="text-align:right"><div style="font-size:28px;height:70px;padding-top:20px;text-align:center">AHPU-老中医</div>的博客&nbsp;&nbsp;&nbsp;</div>');
	});
	function block() {
		return false;
	}
});

(function(){
	$(window).on('resize',function(){
		$('.msg-container').css({
			"top":"50%",
			"left":"50%"
		});
	});
	$(document.body).on('click','.msg-footer span',function(){
		var p = $(this).parent().parent();
		var m = $('.mask');
		p.css('animation','fadeOut .2s forwards');
		m.css('animation','fadeOut .3s forwards');
		setTimeout(function(){
			p.remove();
			m.remove();
		},300);
		message.alertCode = '';
	});
})();

var message = new function () {
	this.alertCode = '';
	this.alert = function (header, content) {
		if(message.alertCode){
			console.warn('存在未关闭的提示框');
			return;
		}
		
		var id = uuid();
		var html =
			'<div class="msg-container" id="mc-' + id + '">' +
			'<div class="msg-header" id="mh-'+id+'">' +
			(header || '提示框') +
			'</div>' +
			'<div class="msg-content">' +
			(content || '提示内容') +
			'</div>' +
			'<div class="msg-footer">'+
			'<span>关闭</span>'+
			'</div>' +
			'</div>' + 
			'<div class="mask"></div>';
		$(document.body).append(html);
		$('.mask').css('animation','fadeIn .2s forwards');
		$('#mh-'+id).Drag($('#mc-'+id));
		message.alertCode = id;
	}
}

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}