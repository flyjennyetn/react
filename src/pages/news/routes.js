const News = [{
	path: '/news/list',
	component: import('./list/index')
}, {
	path: '/news/details/:id',
	component: import('./details/index')
}];

export default News;
