// 主域名对象
const DOMAIN = {
	ott: 'api.ssports.ptqy.gitv.tv',
	activity: '//activity.ssports.com',
	ottJson: '//json.ssports.ptqy.gitv.tv'
};

// 接口域名对象
const DOMAIN_PREFIX = {
	ott: process.env.NODE_ENV === 'development' ? window.location.host : DOMAIN.ott,
	activity: process.env.NODE_ENV === 'development' ? window.location.host : DOMAIN.activity,
	ottJson: process.env.NODE_ENV === 'development' ? window.location.host : DOMAIN.ottJson,
	location: '//json.ssports.ptqy.gitv.tv/h5'
};

export default DOMAIN_PREFIX;
