(function (document) {
	//Usage: $("#id").Drag() 
	//Author: hooyes
	$.fn.Drag = function (target) {
		var M = false;
		var Rx, Ry;
		var t = $(this);
		t.mousedown(function (event) {
				event.stopPropagation();
				Rx = event.pageX - (parseInt(target.css("left")) || 0);
				Ry = event.pageY - (parseInt(target.css("top")) || 0);
				M = true;
				scaleChanged = false;
			})
			.mouseup(function (event) {
				M = false;
				//t.fadeTo(20, 1);
			});
		$(document).mousemove(function (event) {
			if (M) {
				target.css({
					top: event.pageY - Ry,
					left: event.pageX - Rx
				});
			}
			scaleChanged = true;
		});
	}
})(document);