import {Route} from 'react-router-dom'
import asyncComponent from '../async-component'

const News = asyncComponent(() => import('./index'))
const NewsList = asyncComponent(() => import('./list/'))
const NewsDetails = asyncComponent(() => import('./details/'))

export default ()=>
      <News>
        <Route path='/news/list' component={NewsList} />
        <Route path='/news/details/:id' component={NewsDetails} />
      </News>
