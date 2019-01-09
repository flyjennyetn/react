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
    Toast,
    Modal
} from 'antd-mobile';
import moment from 'moment';
import Header from 'components/Header/';
import Swiper from './Swiper/';
import util from '@ssports_fe/ssutils';
import callNative from 'assets/js/umd';
import styles from './style.scss';

import picNeujahrMatch from './images/neujahrMatch.jpg';

import bj1_pic1 from './images/barrage1.png';
import bj1_pic2 from './images/barrage2.png';
import bj1_pic3 from './images/barrage3.png';

import people1s from './images/people1s.png';
import people2s from './images/people2s.png';
import people3s from './images/people3s.png';

import bj2_pic1 from './images/bj_pic1.png';
import bj2_pic2 from './images/bj_pic2.png';
import bj2_pic3 from './images/bj_pic3.png';
import bj2_pic4 from './images/bj_pic4.png';

import bj3_pic26 from './images/bj3_26.png';
import bj3_pic27 from './images/bj3_27.png';
import bj3_pic28 from './images/bj3_28.png';
import bj3_pic29 from './images/bj3_29.png';
import bj3_pic30 from './images/bj3_30.png';
import bj3_pic31 from './images/bj3_31.png';
import bj3_pic1 from './images/bj3_1.png';
import bj3_pic2 from './images/bj3_2.png';
import bj3_pic3 from './images/bj3_3.png';
import bj3_pic4 from './images/bj3_4.png';


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
        modalState: false,
        people: [people1s, people2s, people3s],
        bj1_pic: [bj1_pic1, bj1_pic2, bj1_pic3],
        bj2_pic: [bj2_pic1, bj2_pic2, bj2_pic3, bj2_pic4],
        bj3_pic: [bj3_pic26, bj3_pic27, bj3_pic28, bj3_pic29, bj3_pic30, bj3_pic31, bj3_pic1, bj3_pic2, bj3_pic3, bj3_pic4],
        bj1SwiperOption: {
            autoplay: {
                delay: 0,
            },
            speed: 15000,
            loop: true,
            freeMode: true,
            initialSlide: 0,
            slidesPerView: 1,
            pagination: {}
        },
        swiperOption0: {
            autoplay: {
                delay: 5000,
            },
            speed: 1000,
            loop: true,
            effect: 'fade',
            initialSlide: 0,
            slidesPerView: 1,
            pagination: {}
        },
        swiperOption1: {
            autoplay: {
                disableOnInteraction: false,
                delay: 5000,
            },
            centeredSlides: true,
            slidesPerView: 1,
            initialSlide: 0,
        },
        swiperOption2: {
            slidesPerView: 1,
            initialSlide: parseInt(moment().format('MM')) == 12 ? (parseInt(moment().format('DD')) - 26) : (parseInt(moment().format('DD')) + 5),
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
                    let num = 0;
                    if ((index + 26) <= 31) {
                        num = (index + 26);
                    } else {
                        num = index - 5
                    }
                    return '<span class="' + className + '">' + num + '</span>';
                }
            },
            on: {
                slideChangeTransitionEnd: function() {
                    let colePagination = setInterval(() => {
                        if (this.pagination.el) {
                            clearInterval(colePagination)
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
                    }, 300)


                }
            }
        }
    };

    componentWillMount() {
        util.dom.setPageTitle("爱奇艺体育双旦大礼：全季通免费领！")
        util.dom.setPageMeta('description', '英超双旦赛程将在10天内进行3轮共30场比赛！每天都有英超看！12月24日至1月4日开通爱奇艺体育会员年卡，即可获赠价值228元的英超全季通球票！畅看18/19赛季全部英超比赛直播！')
        util.dom.setPageMeta('keywords', '爱奇艺体育会员、英超、曼联、曼城、切尔西、利物浦、阿森纳、圣诞、元旦、足球、新年、年终、疯狂赛程、全季通、死忠通、免费')
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
                name: 'fengkuangdeyuandan201812',
                title: document.title,
                page: 'fengkuangdeyuandan201812',
                url: window.parent.location.href
            }
        })
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
            title: '英超双旦赛程来袭！免费领全季通',
            desc: '每天都有比赛！为您贴心奉上双旦看球日历、双旦赛程冷知识！戳我查看！',
            imgUrl: 'http://sports.iqiyi.com' + picNeujahrMatch,
            link: 'http://sports.iqiyi.com/resource/h5-active/#/neujahrMatch'
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
                name: 'dianjilijikaitong',
                cont: '点击立即开通',
                page: 'fengkuangdeyuandan201812',
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
    scrollToAnchor(id) {
        document.getElementById(id).scrollIntoView();
    }

    render() {
        const {
            modalState,
            headerState,
            people,
            bj1_pic,
            bj2_pic,
            bj3_pic,
            bj1SwiperOption,
            swiperOption0,
            swiperOption1,
            swiperOption2
        } = this.state
        return (
            <div className={`${styles.neujahrMatch} neujahrMatch`}>
        {
            headerState &&
                <Header noBack={true} title={'爱奇艺体育双旦大礼：全季通免费领！ '} />
        }
                <div className={styles.icon2} href="javascript:;" onClick={()=>this.scrollToAnchor('gift')}/>
                <div className={styles.bj1}>
                    <div className={styles.icon1} onClick={()=>this.setState({modalState:true})}/>
                    <div className={styles.titleIcon} />
                    <div className={styles.box} >
                        <div className={styles.preview} onClick={()=>this.previewEvent()} >
                            <div className={`box1_1`}>
                                <Swiper picList={bj1_pic} swiperNoSwiping={true} swiperOption={bj1SwiperOption} />
                            </div>
                            <div className={`box1_2`}>
                                <Swiper picList={people} swiperNoSwiping={true} swiperOption={swiperOption0} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bj2}>
                    <div className={`box2 ${styles.box}`}>
                        <Swiper picList={bj2_pic} swiperOption={swiperOption1} />
                    </div>
                </div>

                <div className={styles.bj3}>
                    <div className={`box3 ${styles.box}`}>
                        <Swiper picList={bj3_pic} swiperOption={swiperOption2} />
                    </div>
                </div>

                <div className={styles.bj4}>
                    <a id="gift" />
                    <div className={styles.box}>
                        <a className={styles.join} onClick={()=>this.bindEvent()} title="点击立即开通" />
                    </div>
                </div>
                <Modal
                  visible={modalState}
                  transparent
                  maskClosable={false}
                  className="neujahrMatch_amModalTransparent"
                >
                    <div className={styles.rulesBox}>
                        <div className={styles.rulesBg}>
                            <h3>活动规则</h3>
                            <p>1. 活动时间：2018年12月24日12:00am 至 2019年1月4日12:00am</p>
                            <p>2. 活动期间，凡成功付费购买爱奇艺体育会员年卡的用户均可获赠18/19赛季英超全季通球票，参与活动所获赠权益每个用户仅可享受1次，多次购买或在活动开始之前已经购买18/19赛季英超全季通的用户所赠权益不叠加。</p>
                            <p>3. 18/19赛季英超全季通可在爱奇艺体育频道内观看观看赛季内英超全部比赛直播，权益截至2019年5月31日；</p>
                            <p>4. 如发现违规操作，爱奇艺体育有权不向违规账户发放相关权益。</p>
                        </div>
                        <div className={styles.closeBtn} onClick={()=>this.setState({modalState:false})}></div>
                    </div>
                </Modal>

            </div>
        )
    }
}