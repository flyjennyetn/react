/**
 * Created by flyjennyetn on 2016-10-26.
 */
export const setTitle = (title) => {
	document.title = title;
	const userAgent = window.navigator.userAgent.toLowerCase();
	const isiOS = userAgent.indexOf('applewebkit') >= 0;
	const isWechat = userAgent.indexOf('micromessenger') >= 0;
	if (isiOS && isWechat) {
		const iframe = document.createElement('iframe');
		iframe.src = '/favicon.ico';
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		iframe.onload = () => {
			setTimeout(() => {
				iframe.remove();
			}, 0);
		};
	}
};

/**
 * @description: 字符串截取
 * @param {String} str 字符串
 * @param {Number} n 需要截取的字节长度，一个汉字2个字节，一个字母或数字为1个字节
 */
export const sub = (str, n) => {
	const r = '/[^\x00-\xff]/g';
	if (str.replace(r, 'mm').length <= n) { return str; }
	const m = Math.floor(n / 2);
	for (let i = m; i < str.length; i++) {
		if (str.substr(0, i).replace(r, 'mm').length >= n) {
			return str.substr(0, i);
		}
	}
	return str;
};
