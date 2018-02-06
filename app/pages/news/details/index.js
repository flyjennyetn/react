/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as cache from 'utils/cache/';

import styles from './style.scss';

@connect(({gstates})=> {
    return {gstates}
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

