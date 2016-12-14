// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
const reducers = keys.reduce((memo, key) => {
	let redux = context(key);
	if (typeof redux != 'function') {
		redux = redux['default'];
	}
	memo[key.match(/([^\/]+)\.js$/)[1]] = redux;
	return memo;
}, {});


export default reducers;