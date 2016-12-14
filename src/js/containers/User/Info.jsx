/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import cookie from 'js-cookie';
import Header from '../../components/Header'
import {IMGADDRESS} from '../../tools/config';
import {userVerify} from '../../tools/common';
import styles from './Info.scss'


class UserInfo extends Component {
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
        const {patch,stuname,gendercode,schoolarea,school,stugrade,stuclassname} = this.props.user.userInfo;
        return (
            <div className={styles.userBasMsg} >
                <Header title="个人资料" href="javascript:history.go(-1)" />
                <div className={styles.userImg}>
                    <div className={styles.showImg}>
                        <img src={IMGADDRESS+patch} className={styles.portrait}/>
                    </div>
                </div>
                <ul className={styles.ul}>
                    <li>
                        <span className={styles.left}>姓&nbsp;名</span><span className={styles.right}>{stuname}</span>
                    </li>
                    <li>
                        <span className={styles.left}>性&nbsp;别</span>
                        <span className={styles.right}>
                            {gendercode == 'M' ? '男' : '女'}
                        </span>
                    </li>
                    <li>
                        <span className={styles.left}>所在地</span><span className={styles.right}>{schoolarea}</span>
                    </li>
                    <li>
                        <span className={styles.left}>学&nbsp;校</span><span className={styles.right}>{school}</span>
                    </li>
                    <li>
                        <span className={styles.left}>年&nbsp;级</span><span className={styles.right}>{stugrade}</span>
                    </li>
                    <li>
                        <span className={styles.left}>班&nbsp;级</span><span className={styles.right}>{stuclassname}</span>
                    </li>
                </ul>
                <div className={styles.bottomCon}>
                    <span className={styles.Msg_icon}></span>&nbsp;&nbsp;
                    如果需要修改个人资料，<a href="#">联系我们</a>!
                </div>
            </div>
        )
    }
}


function mapStateToProps({user}) {
    return {user}
}

export default connect(mapStateToProps)(UserInfo)