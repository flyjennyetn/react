/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {
    PureComponent
} from 'react';
import {
    connect
} from 'react-redux';
import {
    Input
} from 'antd';
import Button from 'components/Button';
import * as cache from "utils/cache";
import styles from './style.scss';
import logo from 'assets/images/img1.png';

@connect(({
    gstates
}) => {
    return {
        gstates
    }
})

export default class extends PureComponent {

    state = {
        time: 59,
        vCodeContent: '获取验证码',
        mobile: '',
        smsCode: '',
        isModalVisible: false,
        loading: false,
        waitFun: null
    };

    componentWillMount() {
        // utils.setTitle('登录');
        this.props.dispatch({
            type: 'staticJson/getArticleList_focus_1'
        })
    }

    handleSmsCode = (e) => {
        this.setState({
            smsCode: e.target.value
        })
    };

    next = () => {
        // history.push('#/news/list')
        // history.push('/spectatorsGuide/456')
        // history.push({
        //     pathname:'/spectatorsGuide',
        //     state:{
        //         a:123
        //     }
        // })
        this.props.history.push('/spectatorsGuide')
        // this.props.history.push('/spectatorsGuide/456', {
        //     a: 123
        // })
    };

    render() {
        const {
            btnStyles,
            agentCode,
            smsCode,
            loading,
            mobile
        } = this.state;
        return (
            <div className={`${styles.container} bg-main`}>
                <img className={`bg-cover ${styles.logo}`} style={{backgroundImage: `url(${logo})`}}/>
                <div className={styles.box}>
                    <div className={styles.row}>
                        <Input />
                    </div>
                    <div className={styles.row}>
                        <Input />
                        <Button text="获取验证码" style={styles.code} onPress={()=>this.next()} />
                    </div>

                </div>
                <div  className={styles.register}>
                    <Button text="登陆" onPress={()=>this.next()} />
                </div>
            </div>
        )
    }
}