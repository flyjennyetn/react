import fetchJsonp from 'fetch-jsonp';
import Qs from 'qs';

function fetchs(api, data) {
	let newUrl = `http://${api}`;
	const queryStr = Qs.stringify(data);
	newUrl += queryStr ? '?' : queryStr;
	return fetchJsonp(newUrl)
		.then((response) => response.json())
		.then(({ json }) => json)
		.catch((err) => {
			// alert("网络请求异常，请检查网络")
			console.log(err);
			return false;
		});
}
export default fetchs;
