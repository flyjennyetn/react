/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {ActivityIndicator,Modal} from 'antd-mobile'
import cookie from 'js-cookie';
import {isNotNullObj,userVerify} from '../../utils/common';
import {IMGADDRESS} from '../../utils/config';
import styles from './index.scss'

function SubjectList ({items,dispatch}) {

    const learningThematic = (thematicNum)=> {
        const userData = userVerify(cookie.get('userData'),'登录才能学习课程');
        dispatch({
            type:'subject/learning/thematic',
            thematicNum,
            stuCode:userData.token
        });
    }

    return (
        <div className={styles.projectCourese}>
            <ul className={styles.ul}>
            {isNotNullObj(items) && items.map((el,i)=>
                <li key={i} className={styles.li} >
                    <div className={styles.titleMsg}>
                        <span className={styles.tipLabel}></span>
                        <span className={styles.marPad}>{el.thematicSname}</span>
                    </div>
                    <div className={styles.showImg}>
                        <img src={IMGADDRESS+el.photoUrl1} onClick={()=>learningThematic(el.thematicNum)} />
                        <spam className={styles.studyNum}>已有 <font style={{color: "#ff0000"}}>{el.studyNum}</font>人学习</spam>
                    </div>
                    <div className={styles.botTitle}>
                    {isNotNullObj(el.thematicFname) && el.thematicFname.map((el,i)=>
                        <p key={i} className={styles.p}>{el}</p>
                    )}
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}

export default SubjectList
