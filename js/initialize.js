$(function () {
	window.onselectstart = block;
	window.ontouchstart = block;
	window.ondragstart = block;
	var topElem = $('.top'),
		isCssed = false,
		docTop;
	toggleTop();
	$('.msg-header').Drag($('.msg-container'));
	$('.menu-container ul li span').on('click', function () {
		message.alert('这里是', '<div style="text-align:right"><div style="font-size:28px;height:70px;padding-top:20px;text-align:center">AHPU-老中医</div>的博客&nbsp;&nbsp;&nbsp;</div>');
	});
	topElem.on('click', function () {
		$('html,body').animate({
			scrollTop: '0px'
		}, 300);
	});
	window.onscroll = toggleTop;

	function toggleTop() {
		docTop = document.documentElement.scrollTop;
		if (docTop >= 300 && !isCssed) {
			topElem.css({
				"display": "block",
				"animation": "fadeIn .2s forwards"
			});
			isCssed = true;
		} else if (docTop < 300 && isCssed) {
			topElem.css({
				"animation": "fadeOut .2s forwards"
			});
			setTimeout(function () {
				topElem.css({
					"display": "none"
				});
			}, 200);
			isCssed = false;
		}
	}

	function block() {
		return false;
	}
});

(function () {
	$(window).on('resize', function () {
		$('.msg-container').css({
			"top": "50%",
			"left": "50%"
		});
	});
	$(document.body).on('click', '.msg-footer span', function () {
		var p = $(this).parent().parent();
		var m = $('.mask');
		p.css('animation', 'fadeOut .2s forwards');
		m.css('animation', 'fadeOut .3s forwards');
		setTimeout(function () {
			p.remove();
			m.remove();
		}, 300);
		message.alertCode = '';
		if (message.callback)
			message.callback();
	});
})();

var message = new function () {
	this.callback = undefined;
	this.alertCode = '';
	this.alert = function () {

		var header, content;
		if (message.alertCode) {
			console.warn('存在未关闭的提示框');
			return;
		}

		var arg1 = arguments[0],
			arg2 = arguments[1],
			callback = arguments[2];

		if (arguments.length <= 1) {
			header = '提示';
			content = (arg1 === undefined ? '提示内容' : arg1);
		} else {
			header = (arg1 === undefined ? '提示' : arg1);
			content = (arg2 === undefined ? '提示内容' : arg2);
		}

		message.callback = callback;
		appendHtml(header, content);


	}

	function appendHtml(header, content) {
		var id = uuid();
		var html =
			'<div class="msg-container" id="mc-' + id + '">' +
			'<div class="msg-header" id="mh-' + id + '">' +
			header +
			'</div>' +
			'<div class="msg-content">' +
			content +
			'</div>' +
			'<div class="msg-footer">' +
			'<span>关闭</span>' +
			'</div>' +
			'</div>' +
			'<div class="mask"></div>';
		$(document.body).append(html);
		$('.mask').css('animation', 'fadeIn .2s forwards');
		$('#mh-' + id).Drag($('#mc-' + id));
		message.alertCode = id;
	}
}

function loadScript(url, callback) {
	var script = document.createElement("script")
	if (script.readyState) { //IE
		script.onreadystatechange = function () {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				if (callback)
					callback();
			}
		};
	} else { //Others
		script.onload = function () {
			if (callback)
				callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function loadCss(url, callback) {
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = url;
	document.head.appendChild(css);
	if (callback)
		callback();
}

function appendContent(content) {
	var div = $('<div class="content">');
	div.append(content);
	$('.content-border').prepend(div);
}

function listContent(json, num) {
	var index,
		i = 1,
		len = json.length,
		sidebar = $('.sidebar');
	for (; i <= len; i++) {
		index = len - i;
		if (index != num) {
			sidebar.append($('<div>').append($('<a>').attr('href', 'view.html?i=' + index).append(json[index]['title'])));
		} else {
			sidebar.append($('<div>').append($('<span>').append(' · ' + json[index]['title'])));
		}
	}
	$('.loading').remove();
}

function getQueryString(param) {
	var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return '';
}

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

var base64 = new Base64();

function Base64() {

	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}

	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}

	// private method for UTF-8 encoding
	_utf8_encode = function (string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}

	// private method for UTF-8 decoding
	_utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

console.log('\n' + base64.decode('4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paR4paE4paR4paRCuKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkOKWiOKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWhOKWgOKWkuKWjOKWkQrilpHilpHilpHilpHilpHilpHilpHilpHilpDiloDilpLilojilpHilpHilpHilpHilpHilpHilpHilpHiloTiloDilpLilpLilpLilpAK4paR4paR4paR4paR4paR4paR4paR4paQ4paE4paA4paS4paS4paA4paA4paA4paA4paE4paE4paE4paA4paS4paS4paS4paS4paS4paQCuKWkeKWkeKWkeKWkeKWkeKWhOKWhOKWgOKWkuKWkeKWkuKWkuKWkuKWkuKWkuKWkuKWkuKWkuKWkuKWiOKWkuKWkuKWhOKWiOKWkuKWkArilpHilpHilpHiloTiloDilpLilpLilpLilpHilpHilpHilpLilpLilpLilpHilpHilpHilpLilpLilpLiloDilojilojiloDilpLilowK4paR4paR4paQ4paS4paS4paS4paE4paE4paS4paS4paS4paS4paR4paR4paR4paS4paS4paS4paS4paS4paS4paS4paA4paE4paS4paSCuKWkeKWkeKWjOKWkeKWkeKWjOKWiOKWgOKWkuKWkuKWkuKWkuKWkuKWhOKWgOKWiOKWhOKWkuKWkuKWkuKWkuKWkuKWkuKWkuKWiOKWkuKWkArilpHilpDilpHilpHilpHilpLilpLilpLilpLilpLilpLilpLilpLilozilojilojiloDilpLilpLilpHilpHilpHilpLilpLilpLiloDiloQK4paR4paM4paR4paS4paE4paI4paI4paE4paS4paS4paS4paS4paS4paS4paS4paS4paS4paR4paR4paR4paR4paR4paR4paS4paS4paS4paSCuKWgOKWkuKWgOKWkOKWhOKWiOKWhOKWiOKWjOKWhOKWkeKWgOKWkuKWkuKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkeKWkuKWkuKWkgrljZXouqvni5flsLHov5nmoLfpu5jpu5jlnLDnnIvnnYDkvaDvvIzkuIDlj6Xor53kuZ/kuI3or7TjgII='));