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
    Toast
} from 'antd-mobile';
import moment from 'moment';
import Header from 'components/Header/';
import Swiper from './Swiper/';
import util from '@ssports_fe/ssutils';
import callNative from 'assets/js/umd';
import styles from './style.scss';

import sharePic from './images/sharePic.jpg';

import pic21_1 from './images/21-1.png';
import pic21_2 from './images/21-2.png';
import pic21_3 from './images/21-3.png';
import pic21_4 from './images/21-4.png';
import pic21_5 from './images/21-5.png';
import pic21_6 from './images/21-6.png';

import pic22_1 from './images/22-1.png';
import pic22_2 from './images/22-2.png';
import pic22_3 from './images/22-3.png';
import pic22_4 from './images/22-4.png';

import pic23_1 from './images/23-1.png';
import pic23_2 from './images/23-2.png';
import pic23_3 from './images/23-3.png';
import pic23_4 from './images/23-4.png';
import pic23_5 from './images/23-5.png';

import pic24_1 from './images/24-1.png';
import pic24_2 from './images/24-2.png';
import pic24_3 from './images/24-3.png';
import pic24_4 from './images/24-4.png';
import pic24_5 from './images/24-5.png';
import pic24_6 from './images/24-6.png';

@connect(({
    gstates
}) => {
    return {
        gstates
    }
})


export default class extends PureComponent {

    state = {
        headerState: true,
        previewState: true,
        pic21: [pic21_1, pic21_2, pic21_3, pic21_4, pic21_5, pic21_6],
        pic22: [pic22_1, pic22_2, pic22_3, pic22_4],
        pic23: [pic23_1, pic23_2, pic23_3, pic23_4, pic23_5],
        pic24: [pic24_1, pic24_2, pic24_3, pic24_4, pic24_5, pic24_6],

        swiperOption1: {
            centeredSlides: true,
            initialSlide: 0,
        }
    };
    componentWillMount() {

        util.dom.setPageTitle("爱奇艺体育1月观赛指南 ")
        util.dom.setPageMeta('description', '爱奇艺体育1月观赛指南：2019，四大热门运动看点再升级。英超下半赛程全面开启，澳网打响大满贯第一枪，伍兹出战美巡赛、排球一姐朱婷踏上欧冠女排卫冕之路。开通爱奇艺体育会员，畅享顶级赛事直播！')
        util.dom.setPageMeta('keywords', '爱奇艺体育会员、英超、曼联、曼城、切尔西、利物浦、阿森纳、澳网、费德勒、德约、纳达尔、王蔷、彭帅、朱婷、欧冠女排、美巡赛、PGA、皇马、巴萨、梅西、国王杯、足球、高尔夫、伍兹、麦克罗伊、元旦、新年、开门红、赛程、冠军、决赛')

        // 爱奇艺APP打开，不展示头部，初始化Native JSSDK相关操作
        if (util.regexp.isIqiyiApp()) {
            this.setState({
                headerState: false
            })
            this.initNativeSDK(() => {
                this.initNativeShareInfo();
            });
        } else if (util.browser.getBrowser().isWx) {
            this.setState({
                headerState: false
            })
        }

        this.props.dispatch({
            type: 'gstates/set/report',
            param: {
                act: '2000',
                name: 'guansaizhinan201901',
                title: document.title,
                page: 'guansaizhinan201901',
                url: window.parent.location.href
            }
        })
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.match.params.point != 0) {
                this.scrollToAnchor('point' + this.props.match.params.point)
            }
        }, 300)
    }

    initNativeSDK = (callback) => {
        iqiyi.ready((flag) => {
            if (flag) {
                if (callback && typeof(callback) === 'function') {
                    callback();
                }
            } else {
                Toast.fail('初始化NativeSDK失败')
            }
        })
    }
    // 初始化Native右上角分享信息
    initNativeShareInfo = () => {
        iqiyi.onShare({
            title: '1月观赛指南：足网高排开年齐聚',
            desc: '真球迷才挑剔！新年用观赛指南，追寻看球新风向。你关心的，我们都安排上了！',
            imgUrl: 'http://sports.iqiyi.com' + sharePic,
            link: 'http://sports.iqiyi.com/resource/h5-active/#/januaryGuide/0'
        });
    }

    reelConfig = (componentName, biz_dynamic_params = "") => {
        let url = 'iqiyi://mobile/register_business/qyclient?pluginParams=' +
            encodeURIComponent(
                encodeURIComponent(JSON.stringify({
                    biz_plugin: 'qiyibase',
                    biz_id: 100,
                    biz_params: {
                        biz_sub_id: 106,
                        biz_params: "bizId=xinying&componentName=" + componentName,
                        biz_dynamic_params,
                        biz_extend_params: "",
                        biz_statistics: ""
                    }
                }))
            );

        return {
            SCHEME: url,
            FAILBACK: {
                IOS: "https://itunes.apple.com/cn/app/id393765873?mt=8",
                ANDROID: "//mbdapp.iqiyi.com/j/ap/iqiyi_1845.apk"
            },
            TIMEOUT: 2e3,
            COVER_IMG: 'https://statics-web.iqiyi.com/h5/manhua_h5/res/img/_common/share/mask.png'
        }
    }

    bindEvent = () => {

        let defaultConfigPadBuy = this.reelConfig(
            'TYPadPopPage&frame={{152,107},{720,554}}',
            '&initParams={\"root\":\"TYPadMemShopPage\",\"init_params\":{}}'
        )
        let defaultConfigBuy = this.reelConfig('TYMemshopPage')

        const {
            isIpad
        } = new util.browser.getBrowser();
        let config = {
            native: isIpad ? defaultConfigPadBuy : defaultConfigBuy,
            href: '//sports.iqiyi.com/resource/h5/shop.html#/'
        }

        this.props.dispatch({
            type: 'gstates/set/report',
            param: {
                act: '3000',
                name: 'jilijiaru',
                cont: '立即加入',
                page: 'kanqiuxinfengxiang201901',
                url: window.parent.location.href
            }
        })
        if (util.regexp.isIqiyiApp()) {
            this.initNativeSDK(function() {
                callNative.callNative(config.native);
            });
        } else {
            window.location.href = config.href
        }

    }
    scrollToAnchor = (id) => {
        document.getElementById(id).scrollIntoView();
    }
    render() {
        const {
            headerState,
            pic21,
            pic22,
            pic23,
            pic24,
            swiperOption1
        } = this.state
        return (
            <div className={`${styles.container} januaryGuide`}>
                {headerState &&
                    <Header noBack={true} title={'爱奇艺体育1月观赛指南'} />
                }

                <div className={styles.bjpic1}>
                    <div className={`${styles.box}`}>
                    </div>  
                </div>                
                <div className={styles.bjpic2}>
                    <a id="point1" />
                    <div className={`box2 ${styles.box}`}>
                        <Swiper picList={pic21} swiperOption={swiperOption1} />
                    </div>
                </div>                
                <div className={styles.bjpic3}>
                    <a id="point2" />
                    <div className={`box3 ${styles.box}`}>
                        <Swiper picList={pic22} swiperOption={swiperOption1} />
                    </div>  
                </div>

                <div className={styles.bjpic4}>
                    <a id="point3" />
                    <div className={`box4 ${styles.box}`}>
                        <Swiper picList={pic23} swiperOption={swiperOption1} />
                    </div>  
                </div>

                <div className={styles.bjpic5}>
                    <a id="point4" />
                    <div className={`box5 ${styles.box}`}>
                        <Swiper picList={pic24} swiperOption={swiperOption1} />
                    </div>  
                </div>

                <div className={styles.bjpic6}>
                    <div className={styles.box}>
                        <a className={styles.join} onClick={()=>this.bindEvent()} title="立即加入" />
                    </div>
                </div> 
            </div>
        )
    }
}