/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {
    PureComponent
} from 'react';
import {
    connect
} from 'react-redux';
import Link from 'components/Link';
import * as cache from 'utils/cache/';

import styles from './style.scss';



@connect(({
    global,
    news
}) => {
    return {
        global,
        news
    }
})



export default class extends PureComponent {

    state = {
        userName: '',
        pageStatus: false

    };

    componentWillMount() {


    }

    render() {
        const {
            pageStatus
        } = this.state
        return (
            <div className={styles.container}>
                <Link href='/news/details/1'>新闻列表 </Link>
            </div>
        )
    }
}