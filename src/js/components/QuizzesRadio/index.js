/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {polyvObjects} from '../../tools/common';
import styles from './index.scss'

function QuizzesRadio ({i,exam,examId,examName,subScore,subAns,lessonScore,onClick}) {
  
    return (
        <li className={styles.li}>
            <div className={styles.question}>{parseInt(i)+1}、{examName}（{subScore}分）</div>
            <div className={styles.answer} >
                <div className={styles.answerItem} onClick = {() => onClick(examId,'1')}>
                    <span className={exam[examId] == '1' ? styles.selected :styles.circle} value="1"></span>
                    <span className={styles.answerText}>正确</span>
                </div>
                <div className={styles.answerItem} onClick = {() => onClick(examId,'0')}>
                    <span className={exam[examId] == '0' ? styles.selected :styles.circle} value="0"></span>
                    <span className={styles.answerText}>错误</span>
                </div>
            </div>
            {lessonScore != 'no' &&
            <div className={styles.result}>
                <span>正确答案是：</span><span className={styles.selectImg}></span>
                <span className={styles.resultText} >&nbsp;&nbsp;
                {subAns == '1' ? '正确' : '错误'}
                </span>
            </div>
            }
        </li>
    )
}

export default QuizzesRadio
