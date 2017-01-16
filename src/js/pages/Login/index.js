/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import styles from './index.scss';

function Login({dispatch,login}) {
    //this.context.router.push
    const userData = {
        name:'',
        password:''
    };

    const changeName = (e)=>{
        userData.name = e.target.value
    }
    const changePassword = (e)=>{
        userData.password = e.target.value
    }

    const userVerify = () =>{
        if(userData.name == ""){
            alert("用户名不能为空");
            return false;
        }
        if(userData.password == ""){
            alert("密码不能为空");
            return false;
        }
        dispatch({
            type:'login/query',
            userData
        })
    }

    return (
        <div className={styles.login}>
            <div className={styles.loginText}>
                <span className={styles.goBack}><a href="javascript:history.go(-1)">&nbsp;</a></span>
                登录青少年第一人
            </div>
            <div className={styles.content}>
                <div className={styles.item}>
                    <span>用户名</span><input type="text" name="name" onChange={changeName}/>
                    <div className={styles.pwdBackLine}></div>
                </div>
                <div className={styles.item}>
                    <span>密码</span><input type="password" name="password" onChange={changePassword}/>
                    <div className={styles.pwdBackLine}></div>
                </div>
            </div>
            <div className={styles.submit}>
                <div className={styles.button} onClick={()=>userVerify()}>登录</div>
                <div className={styles.pwdBack}><a href="#!/pwdBack">忘记密码</a></div>
            </div>
        </div>
    )
}


function mapStateToProps({login}) {
    return {login}
}
export default connect(mapStateToProps)(Login)