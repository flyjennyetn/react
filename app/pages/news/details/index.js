/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as cache from 'utils/cache/';

import styles from './style.scss';


// import p from 'assets/images/s.gif';
// import personalCenter from 'assets/images/personalCenter1.png';


@connect(({global})=> {
    return {global}
})
export default class extends PureComponent {

    state = {
        userName:'',
        pageStatus: false
    };
  

    render(){
        const {pageStatus} = this.state
        return (
            <div className={styles.container}>
                详情页面
            </div>
        )
    }
}

