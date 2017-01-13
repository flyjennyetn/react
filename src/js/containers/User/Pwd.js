/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import { Toast} from 'antd-mobile';
import cookie from 'js-cookie';
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import UserPortrait from '../../components/UserPortrait'
import {userVerify} from '../../tools/common';
import styles from './Pwd.scss';

class UserPwd extends Component {

    state = {
        userData : userVerify(cookie.get('userData'),'登录才能学习课程'),
        oldPwd:'',
        newPwd:'',
        affirmPwd:''
    }

    setOldPwd= (e)=>{
        this.setState({oldPwd:e.target.value});
    }    
    setNewPwd= (e)=>{
        this.setState({newPwd:e.target.value});
    }    
    setAffirmPwd= (e)=>{
        this.setState({affirmPwd:e.target.value});
    }
    confirm = ()=>{
        if(this.state.oldPwd == ''){
            Toast.fail('旧密码不能为空', 1);
            return false;
        }
        if(this.state.newPwd == ''){
            Toast.fail('新密码不能为空', 1);
            return false;
        }
        if(this.state.affirmPwd != this.state.newPwd){
            Toast.fail('确认密码和新密码不一致', 1);
            return false;
        }
        this.props.dispatch({
            type:'userPwd/edit',
            token:this.state.userData.token,
            oldPwd:this.state.oldPwd,
            newPwd:this.state.newPwd,
        })
    }

    render() {
        return (
            <div className={styles.changePwd}>
                <Header title="修改密码" href="javascript:history.go(-1)" />
                <div className={styles.content}>
                    <div className={styles.item}>
                        <span>原始密码</span><input type="password" name="oldpwd" onChange={this.setOldPwd}/>
                        <div className={styles.pwdBackLine}></div>
                    </div>
                    <div className={styles.item}>
                        <span>新密码</span><input type="password" name="newpwd" onChange={this.setNewPwd}/>
                        <div className={styles.pwdBackLine}></div>
                    </div>
                    <div className={styles.item}>
                        <span>确认新密码</span><input type="password" name="affirmpwd" onChange={this.setAffirmPwd}/>
                        <div className={styles.pwdBackLine}></div>
                    </div>
                </div>
                <div className={styles.submit}>
                    <button type="button" 
                        onClick={this.confirm}
                        className={styles.button} 
                    >确认修改</button>
                    <div className={styles.pwdBack}><a href="user/pwdBack">忘记密码</a></div>
                </div>
            </div>

        )
    }

}


function mapStateToProps({userPwd}) {
    return {userPwd}
}
export default connect(mapStateToProps)(UserPwd)