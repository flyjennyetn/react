/**
 * Created by flyjennyetn on 2016-10-24.
 */

export function userVerify(userData, msg, route = '/') {
	if (!userData) {
		alert(msg);
		location.href = '/';
		return false;
	}
	return eval('(' + userData + ')');
}

export function isNotNullObj(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return true;
		}
	}
	return false;
}

//渲染视频的
export function polyvObjects() {
	//polyvplayer_v2.0.min
	var width = "100%";
	var height = "5rem";
	var banSeekByLimitTime = 'off';
	var autoplay = '1';
	if (arguments.length > 1) {
		width = arguments[1];
		height = arguments[2];
		banSeekByLimitTime = 'on';
		autoplay = '0';
	}
	var player = polyvObject('#plv_' + arguments[0]).videoPlayer({
		'width': width,
		'height': height,
		'vid': arguments[0],
		'flashvars': {
			"ban_seek_by_limit_time": banSeekByLimitTime,
			"autoplay": autoplay
		}
	});
}