/**
 * Created by flyjennyetn on 2016-10-26.
 */
//服务器配置 前面项目名字首拼 JYH 后面是项目启动日期 171229



//君英会
export const JYH171229 = {
	API_HOST : process.env.NODE_ENV == 'production' ? 'https://ybt.jklife.com/ja-jyh-app' : 'http://test.jklife.com:8888/ja-jyh-app',
	APPID : process.env.NODE_ENV == 'production' ? 'JA-JYH-APP' : 'JA-JYH-APP',
	APPKEY : process.env.NODE_ENV == 'production' ? 'gLxYhKsCHb' : '3O87qylsi9'
}

//君银通
export const JYT171215 = {
	API_HOST : process.env.NODE_ENV == 'production' ? 'https://mip.jklife.com/jkbc/' : 'http://test.jklife.com:8888/jkbc/',
	APPID : process.env.NODE_ENV == 'production' ? 'jyt-01' : 'jyt-01',
	APPKEY : process.env.NODE_ENV == 'production' ? 'jyt-01' : 'jyt-01'
}

//图片配置  显示服务器图片静态地址 /static/
export const REQUESTIMG = {
	API_HOST : process.env.NODE_ENV == 'production' ? 'http://test.jklife.com:8888/rear-ms' : 'http://test.jklife.com:8888/rear-ms'
}

