const News = [{
	path: '/news/list',
	component: import ('./list/'),
}, {
	path: '/news/details/:id',
	component: import ('./details/')
}]

export default News;