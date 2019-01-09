/**
 * Created by aaaa on 2017/2/15.
 */
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import styles from './style.scss'

export default ({text,style,onPress}) => {

    return(<div className={`${styles.btns} ${style}`} onClick={onPress}>
        <span>
            {text}
        </span>
    </div>)
}

