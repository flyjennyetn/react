/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'
import styles from './index.scss';

class Navigation extends Component {
 
    render() {
        const {navState} = this.props;
        return (
            <div className={styles.navigation}>
                <div className={styles.menu}>
                    <Link to='/courses' className={styles.nava}>
                        <span className={navState != 'courses' ? styles.navBgActive0 : styles.navBg0}></span>
                        <p className={navState == 'courses' ?  styles.textInfo+' '+styles.colorBottom : styles.textInfo}>安全</p>
                    </Link>
                    <Link to='/subject' className={styles.nava}>
                        <span className={navState != 'subject' ? styles.navBgActive1 : styles.navBg1}></span>
                        <p className={navState == 'subject' ?  styles.textInfo+' '+styles.colorBottom : styles.textInfo}>专题</p>
                    </Link>
                    <Link to='/user' className={styles.nava}>
                        <span className={navState != 'user' ? styles.navBgActive2 : styles.navBg2}></span>
                        <p className={navState == 'user' ?  styles.textInfo+' '+styles.colorBottom : styles.textInfo}>我的</p>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Navigation
