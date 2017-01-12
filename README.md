

## [react](https://github.com/flyjennyetn/react)

  react 开发框架，集成[redux]( http://cn.redux.js.org/index.html)，[react-router](http://leonshi.com/redux-saga-in-chinese/index.html)，[redux-saga](http://www.uprogrammer.cn/react-router-cn/  )，[CSS Modules ](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)，
 [redux-actions](https://www.npmjs.com/package/redux-actions) 


##特性

*  加入了Autoprefixer，可以使用一个数据库根据当前浏览器的普及度以及属性支持提供给你前缀；
*  省时的浏览器同步测试工具；
*  加入 [browserSync](https://segmentfault.com/a/1190000002607627) 服务
* 加入react热加载；
* css语法糖 ，简写模式。

##安装
* npm install
* npm start
* npm build

##项目目录结构
```react-master```               &nbsp; &nbsp; # 项目根目录
```sh
├─ src                    # 项目配置文件
    ├── fonts            # 字体库
    ├── images           # 图片库
    ├── js   
         ├──components   # 组件库
         ├── containers  # 容器/页
         ├── reducers   # 负责处理action的state更新。
         ├── sagas      # 负责协调那些复杂或异步的操作。
         ├── tools      # 工具库
         ├── index.js   # 配置入口文件
    ├──styles 
    ├── favicon.ico   # 公共工具库类
    ├──index.ejs      # 模板文件
├─ .babelrc        [#babel配置文件](https://inv-veri.chinatax.gov.cn/)
├─ package.json     # 包配置
├── README.md   
├── server.js      # 服务文件配置
├── webpack-dev-config.js [# 开发构建配置](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)
├── webpack-pro-config.js  # 正式环境配置
├── webpack-public-path.js  # 开发地址配置
```
> **注意**  当前目录结构适用于原生和微信小程序，请勿修改。
 

##开发流程
#### ```server.js```  默认本地开发端口，可修改
 
```js
...
  port: 8888,  本地浏览器开发地址
  ui: {
    port: 8889  手机开发地址
  }
...
```
  <br/>
  
#### ```src/js/index.js``` 架构配置文件，无需修改 
 
```js
import "babel-polyfill"  //解决babel ES6 新的API
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader' //react热加载
import {createStore,applyMiddleware,compose,combineReducers
} from 'redux'
import {Provider} from 'react-redux'
import {browserHistory,hashHistory} from 'react-router' //路由
import {syncHistoryWithStore,routerReducer as routing} from 'react-router-redux';
import createSagaMiddleware, {END} from 'redux-saga'
import createLogger from 'redux-logger' 

import ReducersManager from './reducers/' #项目动作配置入口
import SagaManager from './sagas/'     #项目sagas配置入口
import Routes from './containers/routes' #项目路由集合
//创建中间键
const sagaMiddleware = createSagaMiddleware()

const initialState = window.__INITIAL_STATE__;
//结合应用中间键
const enhancer = compose(
    applyMiddleware(sagaMiddleware, module.hot ? createLogger() : {})
);
//创建数据结合
const store = createStore(
    combineReducers({...ReducersManager,
        routing
    }),
    initialState,
    enhancer
)

//监听所有文件热替换
if (module.hot) {
    module.hot.accept('./reducers', () => {
        const combinedReducers = combineReducers({
            reducers,
            routing
        });
        store.replaceReducer(combinedReducers);
    });
    module.hot.accept('./sagas/', () => {
        SagaManager.cancelSagas(store);
        require('./sagas/').default.startSagas(sagaMiddleware);
    });
}

const history = syncHistoryWithStore(browserHistory, store);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
//运行中间键
store.runSaga(SagaManager)
const rootEl = document.getElementById('app');
//渲染DOM
ReactDOM.render(
    <AppContainer>
        <Routes store={store} history={history}/>
    </AppContainer>,
    rootEl
)

if (module.hot) {
    const orgError = console.error;
    console.error = (message) => {
        if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
            orgError.apply(console, [message]);
        }
    };
    module.hot.accept('./containers/routes', () => {
        const NextApp = require('./containers/routes').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp store={store} history={history}/>
            </AppContainer>,
            rootEl
        )

    });
}

hashHistory.listen(location => {
    console.log(location);
  if (location.action === 'POP' && location.pathname === '/users') {

  }
});


```
#### ```src/js/containers/routes.js``` 
 
```js
import React, {PropTypes} from 'react';
import {Provider} from 'react-redux'
import {Router,Route,IndexRoute,Redirect,IndexLink,browserHistory} from 'react-router';
//所有页面引入
import App from './App'; 
import Login from './Login/';
import Courses from './Courses/';
import Quizzes from './Courses/Quizzes';
import Subject from './Subject/';
import SubjectDetails from './subject/Details';
import User from './User/';
import UserInfo from './User/Info';
import UserPwd from './User/Pwd';
//公共css引入
import '../../styles/normalize.scss'
import '../../styles/app.scss'
import '../../styles/antdStyleReset.scss'
import '../../styles/font.scss'
import '../../styles/animations.scss'

function Routes({
  store,
  history
}) {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
      //默认先加载app页面，然后去查找它的子默认（IndexRoute，代表默认加载，类似于index）页面
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="courses">
                <IndexRoute component={Courses} />
                <Route path="/courses/quizzes" component={Quizzes} />
            </Route>
            <Route path="subject">
                <IndexRoute component={Subject} />
                <Route path=":id" component={SubjectDetails} />
            </Route>
            <Route path="user">
                <IndexRoute component={User} />
                <Route path="/user/info" component={UserInfo} />
                <Route path="/user/pwd" component={UserPwd} />
            </Route>
        </Route>
      </Router>
    </Provider>
  );
}

export default Routes;
```

#### ```src/js/reducers/index.js```  架构配置文件，无需修改 
 
```js
//负责处理action的state更新，配置入口，每一个模块的动作配置载人
import { combineReducers } from 'redux'
import courses from './courses'
import quizzes from './quizzes'
import subject from './subject'
import user from './user'

const rootReducer = combineReducers({
	courses,
	quizzes,
	subject,
	user
});
//导出所有本地状态更新集合
export default rootReducer;
``` 
配置入口，载入不同的模块，导出已完成更新的集合
<br/>

#### ```src/js/sagas/index.js``` 
 
```js
import login from './login'
import courses from './courses'
import quizzes from './quizzes'
import subject from './subject'
import user from './user'
//导出所有异步动态数据处理集合
export default function* rootSaga() {
	yield* login();
	yield* courses();
	yield* quizzes();
	yield* subject();
	yield* user();
}
```  
  
#### ```src/js/reducers/courses.js```  
  
```js
import {handleActions} from 'redux-actions';
import {combineReducer} from 'redux'
const courses = handleActions({
//定义一个动作，
/*
['courses/qurery/success']---定义一个动作名
state ---代表当前的数据 
action---接收需要更新的数据
*/
	['courses/qurery/success'](state, action) {
		return {
			...state,  //获取定义的数据
			//重新赋值然后传递出去
			items: action.coursesUp,
			coursesUp: action.coursesUp,
			coursesDown: action.coursesDown
		};
	},
	['courses/set/videoId'](state, action) {
		return {
			...state,
			videoId: action.videoId,
			animating: false
		};
	},
	['courses/animating/state'](state, action) {
		return {
			...state,
			animating: action.animating
		};
	},
	['courses/set/state'](state, action) {
		return {
			...state,
			items: action.coursesState == 1 ? state.coursesUp : state.coursesDown,
			coursesState: action.coursesState
		};
	}
}, 
//定义默认初始状态、数据
{
	coursesState: 1,
	items: {},
	coursesUp: {},
	coursesDown: {},
	videoId: '',
	animating: true
});

export default courses;
```

<br/>

####```src/js/sagas/courses.js``` 
  
```js
import xFetch from '../services/xFetch'; //引入封装的异步请求
import qs from 'qs'; 
import {takeLatest} from 'redux-saga';
import {take,put,call,fork,select} from 'reduxsaga/effects';
import {browserHistory} from 'react-router';
function* coursesQuery({token}) {
	const coursesUp = yield call(xFetch, {
	//三个参数，第一个接口地址，第二个解析过的值，第三个其他参数
	requestUrl:'interface/getLessonInfoByStuNoForCenter.json',
		token,
		stuTerm: 1
	});
	const coursesDown = yield call(xFetch, {
		requestUrl: 'interface/getLessonInfoByStuNoForCenter.json',
		token,
		stuTerm: 2
	});
	//返回数据结果
	yield put({
		type: 'courses/qurery/success',
		coursesUp,
		coursesDown
	});
}

function* queryVideoId({
	token,
	lessonId
}) {
	const videoId = yield call(xFetch, {
		requestUrl: 'interface/getLessonVideoId',
		token,
		lessonId
	});
	yield put({
		type: 'courses/set/videoId',
		videoId,
	});
}

function* isLearning({
	token,
	grade,
	lessonId
}) {
	const study = yield call(xFetch, {
		requestUrl: 'interface/queryIfExam.json',
		token,
		lessonId
	});
	if (study.isPassStudy == 1) {
		browserHistory.push({
			pathname: '/courses/quizzes',
			state: {
				lessonId
			}
		});
	} else {
		alert("请先学习课程！")
	}
}
/*
监听一个请求课程数据
takeLatest，发起一个动作，如果当前动作还未执行完毕，不可以再次触发。
takeEvery 允许多个 fetchData 实例同时启动
*/
function* watchCourses() {
/*
courses/query---动作名
coursesQuery---要触发的方法，即函数名称
*/
	yield takeLatest('courses/query', coursesQuery);
}

function* watchVideoId() {
	yield takeLatest('courses/get/videoId', queryVideoId);
}

function* watchLearning() {
	yield takeLatest('courses/learning', isLearning);
}
//创建动作监听
export default function*() {
	yield fork(watchCourses);
	yield fork(watchVideoId);
	yield fork(watchLearning);
}
```
协调处理异步操作，function后带```“*”```，表示函数执行是按行的，不允许跳行，```call```调用当前方法，以获取到的值替换当前的值，```put```调用当前方法。
<br/>
#### ```src/js/containers/Courses/index.jsx``` 课程页（容器）

```js
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import cookie from 'js-cookie';
//引入组件
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import CoursesTab from '../../components/CoursesTab'
import CouresesList from '../../components/CouresesList'
//引入工具、方法
import {userVerify} from '../../tools/common';
//创建一个组件
class Courses extends Component {
//定义初始状态（数据）
    state = {
        userData : userVerify(cookie.get('userData'),'登录才能学习课程')
    }
    componentWillMount(){
        // console.log("已经插入真实DOM 进入之前");
        // console.log(this.state)
        // console.log(this.props)
        
        //指派一个动作
        this.props.dispatch({
	        type:'courses/query',
            token:this.state.userData.token
        })
    }
    componentDidMount(){
        // console.log("已经插入真实DOM 进入之后");
    }
    componentWillUpdate(){
        // console.log("DOM正在被重新渲染  进入之前");
    }
    componentDidUpdate(){
        // console.log("DOM正在被重新渲染  进入之后");
    }
    componentWillUnmount(){
        // console.log("已移除真实DOM 进入之前");
    }
    // componentWillReceiveProps(nextProps){
    //     // console.log("已加载组件收到新的参数时调用");
    // }
    // shouldComponentUpdate(nextProps,nextState){
    //     // console.log("组件判断是否重新渲染时调用");
    //     return {};
    // }
    
    //渲染
    render() {
    //从数据里获取值
        const {courses,dispatch} = this.props;
        const style = {
            width: '100%',
            paddingBottom:'1.2rem',
            background:'#ffffff'
        }
        //获取本地的数据
        const {token,grade} = this.state.userData;
        return (
            <div style={style}>
                <Header title="我的课程" href="/user" />
                <CoursesTab dispatch={dispatch} coursesState={courses.coursesState} />
                <CouresesList 
                    dispatch={dispatch} 
                    token={token} 
                    grade={grade} 
                    courses={courses}
                />
                //通用底部栏
                <Navigation navState='courses' />
            </div>
        )
    }
}

//取相应的中间键
function mapStateToProps({courses}) {
    return {courses}
}

//结合当前组件
export default connect(mapStateToProps)(Courses)
```
页面作为一个容器，获取需要的中间键，然后结合
<br/>

####```src/js/components/CouresesList/index.jsx``` 课程列表页
 
```js
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {ActivityIndicator,Modal} from 'antd-mobile'
import moment from 'moment'
import Video from '../../components/Video'
import {isNotNullObj,userVerify} from '../../tools/common';
import {IMGADDRESS} from '../../tools/config';
import styles from './index.scss'

class CouresesList extends Component {
    state={
        visible:false,
    }
    getVideoId = (lessonId)=>{
    //设置当前属性值
        this.setState({visible:true});
        //获取需要在页面显示的值
        this.props.dispatch({
            type:'courses/get/videoId',
            token:this.props.token,
            lessonId:lessonId
        });        
    }

    learningLesson = (lessonId)=>{
        this.props.dispatch({
            type:'courses/learning',
            token:this.props.token,
            grade:this.props.grade,
            lessonId
        });  
    }
    onClose = ()=> {
        this.setState({visible:false});
    }

    render() {
        const {coursesState,items,videoId,animating} = this.props.courses;
        return (
            <div>
                <ul className={styles.upTerm} >
                    {isNotNullObj(items) && items.lessonInfoList.map((el,i)=>
                        <li key={i}>
                        //通过函数getVideoId获取到lessonId
                            <div className={styles.showImg} onClick={()=>this.getVideoId(el.lessonId)}> 
                                <img src={IMGADDRESS+el.videoImgUrl}/>
                            </div>
                            //styles.courseMsg===class为courseMsg
                            <div className={styles.courseMsg}>
                                <div className={styles.conText}>
                                    <div className={styles.leftText}>
                                        <div className={styles.test}>
                                            <span className={styles.courseName} onClick={()=>this.learningLesson(el.lessonId)}>随堂考</span>
                                        </div>
                                        <div className={styles.botTitle}>
                                            <span className={styles.tipLabel}></span>
                                            <span className={styles.marPad}>{el.lessonSname}</span>
                                            <span className={styles.marPad}>{el.extCode1}</span>
                                            <span className={styles.marPad} style={{color: el.stuTime !="" ? "#2bac64" : '#ff0000'}}>
                                                {el.stuTime !="" ? "[已学习]" : '[未学习]'}
                                            </span>
                                            {el.stuTime !="" &&
                                            <div className={styles.timeData} >
                                                <span className={styles.timeSpan}></span>
                                                <span className={styles.time}>{moment(el.stuTime).format('YYYY-MM-DD')}</span>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {el.lessonScore != '' &&
                                <div className={styles.score} >
                                    <span>课程分数：<font color="#0BBA38">{el.lessonScore}分</font></span>
                                    <span>年级排名：<font color="#0288E9">第{el.gradeRanke}名</font></span>
                                    <span>班级排名：<font color="#1CB7B9">第{el.classRanke}名</font></span>
                                </div>
                                }
                            </div>
                        </li>
                    )}
                    {!items &&
                        <div className={styles.noCourse}>暂无课程</div>
                    }
                </ul>

                {this.state.visible &&
                <Modal
                    closable={true}
                    maskClosable
                    transparent
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{width: '100%'}}
                >
                    <ActivityIndicator animating={animating}/>
                    <Video videoId={videoId} ></Video>
                </Modal>
                }
            </div>
        )
    }
}

export default CouresesList

```

##使用说明
该项目是使用```redux```架构构建，文件目录结构和代码结构是为了通用适配以下两个项目的原生开发和微信小程序开发，请勿修改。

##links
* [react-native]( https://github.com/flyjennyetn/react-native)
* [wechat-react](https://github.com/flyjennyetn/wechat-react)