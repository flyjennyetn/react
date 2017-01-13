/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {IMGADDRESS} from '../../tools/common';
import styles from './index.scss'

function QuizzesSelect ({
    i,exam,examName,examId,subScore,selectType,subAns,lessonScore,optionA,optionB,optionC,optionD,optionE,optionF,onClick
}) {

    return (
        <li className={styles.li}>
            <div className={styles.question}>{parseInt(i)+1}、{examName}（{subScore}分）</div>
            <div className={styles.answer} >
            {
                selectType == 2 ?
                <div>
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'A')}>
                        <span className={exam[examId] == 'A' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>A、</span>
                        <img src={IMGADDRESS+optionA} className={styles.answerImg} />
                    </div>
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'B')}>
                        <span className={exam[examId] == 'B' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>B、</span>
                        <img src={IMGADDRESS+optionB} className={styles.answerImg} />
                    </div>
                </div>
                :
                <div>
                    {optionA != "" &&
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'A')}>
                        <span className={exam[examId] == 'A' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>A、</span>
                        <span>{optionA}}</span>
                    </div>
                    }
                    {optionB != "" &&
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'B')}>
                        <span className={exam[examId] == 'B' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>B、</span>
                        <span>{optionB}</span>
                    </div>
                    }
                    {optionC != "" &&
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'C')}>
                        <span className={exam[examId] == 'C' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>C、</span>
                        <span>{optionC}</span>
                    </div>
                    }
                    {optionD != "" &&
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'D')}>
                        <span className={exam[examId] == 'D' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>D、</span>
                        <span>{optionD}</span>
                    </div>
                    }
                    {optionE != "" &&
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'E')}>
                        <span className={exam[examId] == 'E' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>E、</span>
                        <span>{optionE}</span>
                    </div>
                    }
                    {optionF != "" &&
                    <div className={styles.answerItem} onClick = {() => onClick(examId,'F')}>
                        <span className={exam[examId] == 'F' ? styles.selected :styles.circle}></span>
                        <span className={styles.answerText}>F、</span>
                        <span>{optionF}</span>
                    </div>
                    }
                </div>
            }
            </div>
            {lessonScore != 'no' && 
            <div className={styles.result}>
                <span>正确答案是：</span><span className={styles.selectImg}></span>
                <span className={styles.resultText} >
                    &nbsp;&nbsp;{subAns}
                </span>
            </div>
            }
        </li>
    )
}

export default QuizzesSelect
