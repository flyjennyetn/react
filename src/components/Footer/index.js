/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {
    PureComponent
} from 'react'
import {
    TabBar,
    Toast
} from 'antd';
import styles from './style.scss';
import {
    hashHistory
} from 'react-router';
import icon_home from 'assets/images/icon_home.png';
import icon_home_active from 'assets/images/icon_home_active.png';

import icon_tribe from 'assets/images/icon_tribe.png';
import icon_tribe_active from 'assets/images/icon_tribe_active.png';

import icon_application from 'assets/images/icon_application.png';
import icon_application_active from 'assets/images/icon_application_active.png';

export default class extends PureComponent {
    state = {}

    render() {
        const {
            name
        } = this.props;
        return (
            <div className={styles.fixBox}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#f65757"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: `url(${icon_home}) center center /  0.42rem 0.42rem no-repeat` }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: `url(${icon_home_active}) center center /  0.42rem 0.42rem no-repeat`  }}
                        />
                        }
                        selected={'home' === name}
                        onPress={() => {
                            hashHistory.push('/home')
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: `url(${icon_tribe}) center center /  0.42rem 0.42rem no-repeat` }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: `url(${icon_tribe_active}) center center /  0.42rem 0.42rem no-repeat` }}
                            />
                        }
                        title="部落"
                        key="部落"
                        selected={'tribe' ===  name}
                        onPress={() => {
                            Toast.info('暂未开放', 1);
                            return false;
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: `url(${icon_application}) center center /  0.42rem 0.42rem no-repeat` }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: `url(${icon_application_active}) center center /  0.42rem 0.42rem no-repeat` }}
                            />
                        }
                        title="应用"
                        key="应用"
                        selected={'use' ===  name}
                        onPress={() => {
                            hashHistory.push('/use')
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>

        )
    }
}