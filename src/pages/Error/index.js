/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {
    PureComponent
} from 'react';
import {
    connect
} from 'react-redux';

import * as cache from "utils/cache";

import styles from './style.scss';

@connect(({
    gstates
}) => {
    return {
        gstates
    }
})

export default class extends PureComponent {

    state = {};

    componentWillMount() {
        // utils.setTitle('登录');
    }


    render() {
        return (
            <div className={styles.container}>
                error 404
            </div>
        )
    }
}