/**
 * Created by flyjennyetn on 2016-11-02.
 */
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
        this.setState({visible:true});
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
                            <div className={styles.showImg} onClick={()=>this.getVideoId(el.lessonId)}>
                                <img src={IMGADDRESS+el.videoImgUrl}/>
                            </div>
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
