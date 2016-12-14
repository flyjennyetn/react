/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import cookie from 'js-cookie';
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import CoursesTab from '../../components/CoursesTab'
import CouresesList from '../../components/CouresesList'
import {userVerify} from '../../tools/common';

class Courses extends Component {
    state = {
        userData : userVerify(cookie.get('userData'),'登录才能学习课程')
    }
    componentWillMount(){
        // console.log("已经插入真实DOM 进入之前");
        // console.log(this.state)
        // console.log(this.props)
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
    render() {
        const {courses,dispatch} = this.props;
        const style = {
            width: '100%',
            paddingBottom:'1.2rem',
            background:'#ffffff'
        }
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
                <Navigation navState='courses' />
            </div>
        )
    }
}

function mapStateToProps({courses}) {
    return {courses}
}
export default connect(mapStateToProps)(Courses)
