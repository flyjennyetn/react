/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {polyvObjects} from '../../utils/common';
import styles from './index.scss'

class SubjectDetails extends Component {

    componentDidMount() {
        polyvObjects(this.props.videoId,'5.6rem','3.2rem');
    }

    render() {
        const styles = require('./index'+this.props.id+'.scss');
        const grade = this.props.grade;
        return (
            <div className={styles.subject}>
                <div className={grade < 7 ? styles.xiaoxue : styles.zhongxue}>
                    <div className={styles.imgTop1}></div>
                    <div className={styles.studyVideo} style={{background: "#fff"}}>
                        <div className={styles.videoBg}>
                            <div className={styles.video} id={'plv_'+this.props.videoId}></div>
                        </div>
                    </div>
                    <div className={styles.imgTop2}></div>
                </div>
            </div>
        )
    }
}

export default SubjectDetails
