/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {InputItem} from 'antd-mobile';
import InputTxt from 'components/InputTxt';
import Button from 'components/Button';

import * as utils from "utils/";
import * as cache from "utils/cache";

import styles from './style.scss';

import p from 'assets/images/s.gif';
import logo from 'assets/images/logo.png';
import login_sjh from 'assets/images/mobileIcon.png';
import login_yzm from 'assets/images/messageIcon.png';


@connect(({global})=> {
    return {global}
})

export default class extends PureComponent {

    state = {
        time: 59,
        vCodeContent: '获取验证码',
        mobile: '',
        smsCode: '',
        isModalVisible: false,
        loading: false,
        waitFun:null
    };

    componentWillMount(){
        // utils.setTitle('登录');
    }

    identityCertify = ()=> {
        const {mobile,smsCode} = this.state;
        if (smsCode == null || smsCode == '') {
            showToast('请输入验证码', 1)
            return false
        }
        // this.props.dispatch({
        //     type: 'jdUser/agentThirdLogin',
        //     mobile,smsCode
        // })
    };

    BlurNum = ()=> {
        const {name,agentCode} = this.state;
        if (name != '' && agentCode != '') {
            // this.props.dispatch({
            //     type: 'jdUser/capAgentQuery',
            //     name, agentCode
            // })
        }
    }

    handleMobile = (e) => {
        this.setState({mobile: e.target.value})
    };
    handleSmsCode = (e) => {
        this.setState({smsCode: e.target.value})
    };

    vCodeTime = () => {
        const {mobile,smsCode} = this.state;
        if(mobile == ''|| mobile ==null){
            utils.showToast('手机号不能为空', 1)
            return false
        }

        var wait = this.state.time;
        this.state.waitFun = setInterval(() =>{
            if (wait == 0){
                this.setState({time: 59});
                this.setState({vCodeContent: '获取验证码'});
                this.setState({style: {backgroundColor: '#fff'}});
                this.setState({isClick: ''});
                clearInterval(this.state.waitFun);
            } else {
                this.setState({isClick: 'disable'});
                this.setState({style: {backgroundColor: '#fff',color:'#999',borderColor:'#999'}})
                this.setState({vCodeContent: '重新发送'+(wait--)})
            }
        }, 1000);
    };

    next = () => {
        this.props.router.push('/news/list')
    };

    render(){
        const {btnStyles,agentCode,smsCode,loading,mobile} = this.state;
        return (
            <div className={`${styles.container} bg-main`}>
                <img className={`bg-cover ${styles.logo}`} src={p} style={{backgroundImage: `url(${logo})`}}/>
                <div className={styles.box}>
                    <div className={styles.row}>
                        <InputTxt 
                            leftIcon={login_sjh}
                            placeholder="请输入手机号1111"
                            handle={this.handleMobile}
                            value={'123'}
                        />
                    </div>
                    <div className={styles.row}>
                        <InputTxt 
                            leftIcon={login_yzm}
                            placeholder="短信验证码"
                        >
                            <Button text="获取验证码" style={styles.code} onPress={()=>this.vCodeTime()} />
                        </InputTxt>    
                    </div>

                </div>
                <div  className={styles.register}>
                    <Button text="登陆" onPress={()=>this.next()} />
                </div>
            </div>
        )
    }
}

