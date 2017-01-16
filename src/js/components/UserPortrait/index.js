/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import fetch from 'isomorphic-fetch'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {browserHistory} from 'react-router';
import cookie from 'js-cookie';
import {IMGADDRESS,IPLOCATION} from '../../utils/config';
import {userVerify} from '../../utils/common';
import styles from './index.scss'



class UserPortrait extends Component {
    state = {
        userData : userVerify(cookie.get('userData'),'登录才能学习课程'),
        files:this.props.userInfo.patch ? IMGADDRESS+this.props.userInfo.patch : 'images/portrait.png'
    }

    onImageDrop = (files)=>{
        console.log(files[0]);
        console.log(this.state.userData.token);

        fetch(IPLOCATION+'pci/changePortrait', {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "token="+this.state.userData.token+"&file="+files[0]
        }).then(function(res) {
            console.log(res);
            // console.log("Response succeeded?", JSON.stringify(res.ok));
            // console.log(JSON.stringify(res));
        }).catch(function(e) {
            // console.log("fetch fail", JSON.stringify(params));
            console.log(e);
        });
    }

    logOut =()=>{
        console.log(111);
        cookie.set('userData','');
        browserHistory.push('/');
    }
    render() {
        const {patch} = this.props.userInfo;
        return (
            <div className={styles.userImg}>
                <div className={styles.showImg}>
                    <Dropzone
                      className={styles.portrait}
                      multiple={false}
                      accept="image/jpg,image/png"
                      onDrop={this.onImageDrop}
                    >
                      <p>点击上传</p>
                    </Dropzone>
                </div>
                <div className={styles.userState}>
                    <a className={styles.btn} onClick={this.logOut}>
                        {this.state.userData != null ? '退出登录' : '请登录'}
                    </a>
                </div>
            </div>
        )
    }
}

export default UserPortrait
