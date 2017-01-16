/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Toast} from 'antd-mobile';
import cookie from 'js-cookie';
import Navigation from '../../components/Navigation'
import QuizzesRadio from '../../components/QuizzesRadio'
import QuizzesSelect from '../../components/QuizzesSelect'
import {isNotNullObj,userVerify} from '../../utils/common';
import styles from './quizzes.scss';
class Quizzes extends Component {
    state = {
        userData : userVerify(cookie.get('userData'),'登录才能学习课程')
    }

    componentWillMount(){
        const {lessonId} = this.props.location.state;
        this.props.dispatch({
            type:'quizzes/query/questions',
            token:this.state.userData.token,
            lessonId
        })
    }

    subAnswer = (lessonScore)=>{
        if(lessonScore == 'no'){
            const {lessonId} = this.props.location.state;
            const {exam} = this.props.quizzes;
            let results = '{"results":[';
            let key=1;
            var examState = true;
            exam.map((el,i)=>{
                if(el == ''){
                    Toast.fail('第 '+key+' 题没有作答!', 1);
                    examState = false;
                    return false;
                }
                results+= '{"subId":"' + i + '","subAns":"' + el + '"},';
                key++;
            })
            results += ']}';
            if(!examState)
                return false;

            this.props.dispatch({
                type:'quizzes/query/Score',
                results,
                lessonId,
                stuCode:this.state.userData.token
            })
        }
    }

    selected =(examId,value)=>{
        const {lessonScore} = this.props.quizzes;
        if(lessonScore == 'no'){
            this.props.dispatch({
                type:'quizzes/set/exam',
                examId,
                value
            })
        }
    }

    render() {
        const {examPaperName,examList,examSelect,exam,lessonScore} = this.props.quizzes;
        return (
            <div className={styles.quizzes}>
                <div className={styles.title}>
                    <a className={styles.goBack} href="javascript:history.go(-1)"></a>
                    <span className={styles.textCon}>随堂考</span>
                </div>

                <ul>
                {isNotNullObj(examList) && examList.map((el,i)=>
                    <QuizzesRadio 
                        {...el}
                        key={i}
                        i={i}
                        lessonScore={lessonScore}
                        exam = {exam}
                        onClick={this.selected}
                    />
                )}
                {isNotNullObj(examSelect) && examSelect.map((el,i)=>
                    <QuizzesSelect 
                        {...el}
                        key={i}
                        i={i}
                        lessonScore={lessonScore}
                        exam = {exam}
                        onClick={this.selected}
                        
                    />
                )}
                </ul>

                <div className={styles.subBtn}>
                    <span className={styles.subAnswer} onClick={()=>this.subAnswer(lessonScore)}>
                        {
                        lessonScore == 'no' 
                        ?'确认提交'
                        :'答题分数:'+lessonScore+' 分'
                    }
                    </span>
                </div>
                <Navigation navState='courses' />
            </div>
        )
    }
}


function mapStateToProps({quizzes}) {
    return {quizzes}
}
export default connect(mapStateToProps)(Quizzes)