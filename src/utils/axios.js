/**
 * Created by flyjennyetn on 2016-10-26.
 */
import axios from 'axios';
import Qs from 'qs';

const config = {
	headers: { 'Content-Type': 'application/json;charset=UTF-8' },
	timeout: 10000,
	responseType: 'json',
	withCredentials: true,
	transformRequest: [(data) => (Qs.stringify(data))],
	transformResponse: [(json) => (json)]
};

// axios.interceptors.response.use(function (res) {
//     //相应拦截器
//     return res;
// });

function axioss(api, data, rawMethod) {
	const newUrl = api.indexOf('.com') !== -1 ? `//${api}` : api;
	config.method = rawMethod;
	config.data = data;
	return axios(newUrl, config)
		.then((res) => (res))
		.catch((err) => {
			// alert(err); //  '网络请求异常，请检查网络'
			console.log(err);
			return false;
		});
}

export default axioss;
