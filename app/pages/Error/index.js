/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import * as utils from "utils/";
import * as cache from "utils/cache";

import styles from './style.scss';

@connect(({global})=> {
    return {global}
})

export default class extends PureComponent {

    state = {
    };

    componentWillMount(){
        // utils.setTitle('登录');
    }


    next = () => {
        this.props.router.push('/MyVisit/VisitCenter')
    };

    render(){
        return (
            <div className={styles.container}>
                error
            </div>
        )
    }
}

