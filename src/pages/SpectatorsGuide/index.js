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

import pic14_2 from './images/14-2.png';
import pic14_1 from './images/14-1.png';
import pic14_3 from './images/14-3.png';

import pic15_2 from './images/15-2.png';
import pic15_1 from './images/15-1.png';
import pic15_3 from './images/15-3.png';
import pic15_4 from './images/15-4.png';

import pic16_2 from './images/16-2.png';
import pic16_1 from './images/16-1.png';
import pic16_3 from './images/16-3.png';
import pic16_4 from './images/16-4.png';

import pic18_22_l from './images/18-22-l.png';
import pic18_22_r from './images/18-22-r.png';
import pic18_23 from './images/18-23.png';
import pic18_24 from './images/18-24.png';
import pic18_25 from './images/18-25.png';
import pic18_26_l from './images/18-26-l.png';
import pic18_26_r from './images/18-26-r.png';
import pic18_27_l from './images/18-27-l.png';
import pic18_27_r from './images/18-27-r.png';
import pic18_28 from './images/18-28.png';
import pic18_29 from './images/18-29.png';
import pic18_30_l from './images/18-30-l.png';
import pic18_30_r from './images/18-30-r.png';
import pic18_31 from './images/18-31.png';


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
        pic14: [pic14_2, pic14_1, pic14_3],
        pic15: [pic15_2, pic15_1, pic15_3, pic15_4],
        pic16: [pic16_2, pic16_1, pic16_3, pic16_4],
        swiperOption1: {
            centeredSlides: true,
            initialSlide: 1,
        },
        swiperOption2: {
            slidesPerView: 1,
            initialSlide: (moment().format('DD') - 22),
            parallax: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '">' + (index + 22) + '</span>';
                }
            },
            on: {
                slideChangeTransitionEnd: function() {
                    let el = this.pagination.el;
                    let width = el.clientWidth;
                    let to = width / 8;
                    let scrollLeft = el.offsetLeft;
                    if (this.activeIndex >= 3 && scrollLeft < width) {
                        el.scrollLeft = this.activeIndex * to
                    } else {
                        el.scrollLeft = 0;
                    }
                }
            }
        }
    };
    componentWillMount() {

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
                name: 'guansaizhinan201812',
                title: document.title,
                page: 'guansaizhinan201812',
                url: window.parent.location.href
            }
        })
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.gstates.imgReportSrc !== nextProps.gstates.imgReportSrc) {
            //监听数据发生改变时处理
        }
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
            title: '爱奇艺体育12月观赛指南！',
            desc: '英超开启魔鬼赛程，来爱奇艺体育，让热血球赛温暖冬日！',
            imgUrl: 'http://sports.iqiyi.com/resource/h5-active/public/spectatorsGuide.jpg',
            link: 'http://sports.iqiyi.com/resource/h5-active/spectatorsGuide.html'
        });
    }

    previewEvent = () => {
        if (this.refs.media.paused && this.state.previewState) {
            this.props.dispatch({
                type: 'gstates/set/report',
                param: {
                    act: '3000',
                    page: 'bofang',
                    url: window.parent.location.href
                }
            })
            this.setState({
                previewState: false
            })
            this.refs.media.play()
        }
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

    bindEvent = (type) => {

        let defaultConfigBuy = this.reelConfig('TYMemshopPage')
        let defaultConfigMatch = this.reelConfig('TYPadPopPage&frame={{152,107},{720,554}}', '&initParams={\"root\":\"TYPadMemShopPage\",\"init_params\":{}}')
        let defaultConfigPadBuy = this.reelConfig('TYMatchListPage')
        let defaultConfigPadMatch = this.reelConfig('TYPadMatchListPage')

        const {
            isIpad
        } = new util.browser.getBrowser();
        let config = {
            more: {
                native: isIpad ? defaultConfigPadMatch : defaultConfigMatch,
                href: '//m.iqiyi.com/m5/sports/matchList.html'
            },
            join: {
                native: isIpad ? defaultConfigPadBuy : defaultConfigBuy,
                href: '//sports.iqiyi.com/resource/h5/shop.html#/'
            }
        }

        this.props.dispatch({
            type: 'gstates/set/report',
            param: {
                act: '3000',
                name: type == 'more' ? 'gengduoshaicheng' : 'lijijiaru',
                cont: type == 'more' ? '更多赛程' : '立即加入',
                page: 'guansaizhinan201812',
                url: window.parent.location.href
            }
        })

        if (util.regexp.isIqiyiApp()) {
            this.initNativeSDK(function() {
                callNative.callNative(config[type].native);
            });
        } else {
            window.location.href = config[type].href
        }

    }
    scrollToAnchor(id) {
        document.getElementById(id).scrollIntoView();
    }

    render() {
        const {
            headerState,
            previewState,
            pic14,
            pic15,
            pic16,
            swiperOption1,
            swiperOption2
        } = this.state
        return (
            <div className={`${styles.container} spectatorsGuide`}>
                {headerState &&
                    <Header noBack={true} title={'12月观赛指南：魔鬼赛程开启！'} />
                }
                <div className={styles.bjpic1}>
                    <div className={styles.rows}>
                        <a className={styles.anchor} href="javascript:;" onClick={()=>this.scrollToAnchor('early')}/>
                        <a className={styles.anchor} href="javascript:;" onClick={()=>this.scrollToAnchor('middle')}/>
                        <a className={styles.anchor} href="javascript:;" onClick={()=>this.scrollToAnchor('end')}/>
                    </div>
                </div>
                <div className={styles.bjpic2}>
                    <a id="early" />
                    <div className={styles.box} >
                        {previewState &&
                            <div className={styles.preview} onClick={()=>this.previewEvent()} />
                        }
                        <video ref='media' controls="controls" webkit-playsinline="true" >
                            <source 
                                className={styles.videoSource} 
                                src="http://image.ssports.com/images/resources/web/static/video/gamble.mp4" type="video/mp4"/>
                        </video>     
                        <div className={styles.titles}> 孤注一掷：曼彻斯特城</div>
                    </div>    
                </div>  

                <div className={styles.bjpic3}>
                    <div className={`box3 ${styles.box}`}>
                        <Swiper picList={pic14} swiperOption={swiperOption1} />
                    </div>  
                </div>

                <div className={styles.bjpic4}>
                    <div className={`box4 ${styles.box}`}>
                        <Swiper picList={pic15} swiperOption={swiperOption1} />
                    </div>  
                </div>

                <div className={styles.bjpic5}>
                    <a id="middle" />
                    <div className={`box5 ${styles.box}`}>
                        <Swiper picList={pic16} swiperOption={swiperOption1} />
                    </div>  
                </div>

                <div className={styles.bjpic6}>
                    <a id="end" />
                    <div className={`box6 ${styles.box}`}>
                        <Swiper swiperOption={swiperOption2}>
                            <div className={`${styles.spacebetween}`}>
                                <img src={pic18_22_l} />
                                <img src={pic18_22_r} />
                            </div>                                
                            <div className={`${styles.center}`}>
                                <img src={pic18_23} />
                            </div>                                
                            <div className={`${styles.center}`}>
                                <img src={pic18_24} />
                            </div>                                 
                            <div className={`${styles.center}`}>
                                <img src={pic18_25} />
                            </div> 
                            <div className={` ${styles.spacebetween}`}>
                                <img src={pic18_26_l} />
                                <img src={pic18_26_l} />
                            </div>  
                            <div className={`${styles.spacebetween}`}>
                                <img src={pic18_27_l} />
                                <img src={pic18_27_r} />
                            </div> 
                            <div className={`${styles.center}`}>
                                <img src={pic18_28} />
                            </div>  
                            <div className={`${styles.center}`}>
                                <img src={pic18_29} />
                            </div> 
                            <div className={`${styles.spacebetween}`}>
                                <img src={pic18_30_l} />
                                <img src={pic18_30_r} />
                            </div> 
                            <div className={`${styles.center}`}>
                                <img src={pic18_31} />
                            </div> 
                        </Swiper>

                    </div> 
                </div>

                <div className={styles.bjpic7}>
                    <div className={styles.box}>
                        <a className={styles.more} onClick={()=>this.bindEvent('more')} title="查看更多赛事" />
                        <a className={styles.join} onClick={()=>this.bindEvent('join')} title="立即加入" />
                    </div>
                </div> 
            </div>
        )
    }
}