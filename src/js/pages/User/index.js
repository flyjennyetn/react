/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import cookie from 'js-cookie';
import Navigation from '../../components/Navigation'
import UserPortrait from '../../components/UserPortrait'
import {userVerify} from '../../utils/common';
import styles from './index.scss';

class User extends Component {

    state = {
        userData : userVerify(cookie.get('userData'),'登录才能学习课程')
    }

    componentWillMount(){
        this.props.dispatch({
            type:'user/query/pci',
            token:this.state.userData.token
        })
    }

    render() {
        const {userInfo} = this.props.user;
        return (
            <div className={styles.userCenter} >
                <UserPortrait dispatch={this.props.dispatch} userInfo={userInfo}/>
                <div className={styles.basicMenu}>
                    <div className={styles.classMsg} >
                        <div className={styles.circular}>
                            <span className={styles.iconImg1}></span>
                        </div>
                        <div className={styles.textMsg}>
                            <Link to='/user/info'>个人资料</Link>
                        </div>
                    </div>
                    <div className={styles.classMsg} >
                        <div className={styles.circular}>
                            <span className={styles.iconImg2}></span>
                        </div>
                        <div className={styles.textMsg}>
                            <Link to='/courses'>我的课程</Link>
                        </div>
                    </div>
                    <div className={styles.classMsg} >
                        <div className={styles.circular}>
                            <span className={styles.iconImg3}></span>
                        </div>
                        <div className={styles.textMsg}>
                            <Link to='/accountChange'>账户修改</Link>
                        </div>
                    </div>
                    <div className={styles.classMsg} >
                        <div className={styles.circular}>
                            <span className={styles.iconImg4}></span>
                        </div>
                        <div className={styles.textMsg}>
                            <Link to='/user/Pwd'>修改密码</Link>
                        </div>
                    </div>
                </div>
                <Navigation navState='user' />
            </div>
        )
    }

}


function mapStateToProps({user}) {
    return {user}
}
export default connect(mapStateToProps)(User)