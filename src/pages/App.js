/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, { useReducer } from 'react';
import Loading from 'components/Loading/';
// import { setTitle, sub } from 'utils/';
// import { set, get } from 'utils/cache/';
// import DOMAIN_PREFIX from 'utils/config/';
// import axios from 'utils/axios/';
// import fetch from 'utils/fetch/';
// import * as api from 'service/';

import { GstatesContext } from 'actions/context';
import { loadingReducers } from '../sagas/gstates';

import 'assets/scss/antd.scss';
import 'assets/scss/swiper.scss';
import 'assets/scss/index.scss';


/**
 * 1.只能在函数组件中使用hooks
 * 2.函数组件业务变更无需修改成class组件
 * 3.告别了繁杂的this和难以记忆的生命周期
 * 4.合并的生命周期componentDidMount、componentDidUpdate、和 componentWillUnmount
 * 5.包装自己的hooks 是基于纯命令式的api
 * 6.更好的完成状态之间的共享 解决原来class组件内部封装问题。也解决了高阶组件和函数组件的嵌套过深
 * 7.useReducer集成redux
 * 8.useEffect接受脏操作等到react更新了DOM之后，它再依次执行我们定义的副作用函数。这里就是一个io且是异步的
 */

/**
 * 以上我们学习过的方法均提供了ref
 * useState 返回有状态值，以及更新这个状态值的函数
 * useEffect 接受包含命令式，可能有副作用代码的函数。
 * useContext 接受上下文对象（从React.createContext返回的值）并返回当前上下文值，
 * useReducer useState的替代方案。接受类型为(state，action) => newState的reducer，并返回与dispatch方法配对的当前状态。
 * useCallback  返回一个回忆的memoized版本，该版本仅在其中一个输入发生更改时才会更改。纯函数的输入输出确定性
 * useMemo 纯的一个记忆函数
 * useRef 返回一个可变的ref对象，其.current属性被初始化为传递的参数
 * useImperativeMethods 自定义使用ref时公开给父组件的实例值
 * useMutationEffect 更新兄弟组件之前，它在React执行其DOM改变的同一阶段同步触发
 * useLayoutEffect DOM改变后同步触发。使用它来从DOM读取布局并同步重新渲染
 */

function App({ children }) {
	// 首次渲染完成
	// componentDidMount() {
	//   console.log(this)
	// }
	// 更新渲染完成
	//   componentDidUpdate() {
	//     document.title = `You clicked ${this.state.count} times`;
	//   }
	// 组件卸载阶段 == return function useEffect每次组件变更均执行
	// componentWillUnmount(){

	// }

	// useEffect(() => {
	//   console.log("component update");
	//   document.title = `标题-${count} times`;
	//   return () => {
	//     console.log("unbind");
	//   };
	// }, [count]);

	const [isShowState, loadingDispatch] = useReducer(loadingReducers, {
		isShow: false
	});

	return (
		<GstatesContext.Provider value={{ isShowState, dispatch: loadingDispatch }}>
			<div className="fullHeight">
				{ isShowState.isShow && <Loading /> }
				{ children }
			</div>
		</GstatesContext.Provider>
	);
}

export default App;
