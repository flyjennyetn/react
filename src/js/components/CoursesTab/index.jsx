/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import styles from './index.scss'

function CoursesTab({dispatch, coursesState}) {

    const bgColor = {
        color: '#fff',
        background: '#2bac64'
    };

    const setState = (state)=>{
        dispatch({
            type:'courses/set/state',
            coursesState:state
        })
    }

    return (
        <div>
            <div className={styles.coursesMenu}>
                <span className={styles.menuCon}>
                    <span className={styles.menuName+" "+styles.menuName1} style={coursesState == 1 ? bgColor : {}} onClick={()=>setState(1)}>下学期</span>
                    <span className={styles.menuName+" "+styles.menuName1} style={coursesState == 2 ? bgColor : {}} onClick={()=>setState(2)}>上学期</span>
                </span>
            </div>
        </div>
    )
}

export default CoursesTab
