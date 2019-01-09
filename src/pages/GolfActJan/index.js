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
// import VConsole from 'vconsole'
import Header from 'components/Header/';
import util from '@ssports_fe/ssutils';
import callNative from 'assets/js/umd';
import styles from './style.scss';

import wechat_icon from './images/wechat_icon.jpg';

import wrapper_bg_1 from './images/wrapper_bg_1.png';
import wrapper_bg_2 from './images/wrapper_bg_2.png';
import wrapper_bg_3 from './images/wrapper_bg_3.png';

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
        wrapper_bg: [wrapper_bg_1, wrapper_bg_2, wrapper_bg_3],
        config: '',
        isImageUrl: false
    };

    componentWillMount() {
        // let vConsole = new VConsole()
        util.dom.setPageTitle('爱奇艺体育高尔夫赛事包上线')
        util.dom.setPageMeta('description', '爱奇艺体育高尔夫赛事包上线！开通可畅看美巡赛和高尔夫四大满贯等赛事，1月31日前开通即可获赠爱奇艺电视果，投屏神奇助你畅享大屏观赛体验！更有限量官方高尔夫周边等待送出！')
        util.dom.setPageMeta('keywords', '爱奇艺体育会员、高尔夫、伍兹、赛事、PGA、美巡赛、英国公开赛、美国公开赛、美国大师赛、上线、麦克罗伊、冯珊珊、李昊桐、四大满贯')
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
                name: 'gaoerfuhuodong201901',
                title: document.title,
                page: 'gaoerfuhuodong201901',
                url: window.parent.location.href
            }
        })
    }

    componentDidUpdate(nextProps) { 
        //在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。
        if (this.state.isImageUrl && this.props.gstates.imgReportSrc !== nextProps.gstates.imgReportSrc) {
            this.setState({isImageUrl: false}, () => {
                //当路由切换时
                if (util.regexp.isIqiyiApp()) {
                    this.initNativeSDK(() => {
                        callNative.callNative(this.state.config.native);
                    });
                } else {
                    window.location.href = this.state.config.href
                }
            });
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
            title: '高尔夫赛事包上线 开通送电视果',
            desc: '赛事包可畅看美巡赛和高尔夫四大满贯等赛事，1.31前开通即可获赠爱奇艺电视果，畅享大屏观赛体验！',
            imgUrl: 'http://sports.iqiyi.com' + wechat_icon,
            link: 'http://sports.iqiyi.com/resource/h5-active/#/golfActJan'
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

    bindEvent = (type) => {
        let pid = type === 'm' ? 58 : 59
        let reportName = type === 'm' ? 'kaitongyuebao' : 'kaitongnianbao'
        let reportCont = type === 'm' ? '开通月包' : '开通年包'
        let defaultConfigPadBuy = this.reelConfig(
            'TYPadPopPage&frame={{152,107},{720,554}}',
            '&initParams={"root":"TYPadAllSeasonShopPage","init_params":{"pid":' + pid + '}}'
        )
        let defaultConfigBuy = this.reelConfig(
            'TYTicketsShopSinglePage',
            '&initParams={"pid":' + pid + '}'
        )

        const {
            isIpad
        } = new util.browser.getBrowser();
        let config = {
            native: isIpad ? defaultConfigPadBuy : defaultConfigBuy,
            href: '//sports.iqiyi.com/resource/h5/shop.html#/ticket?id='+ pid,
        }

        this.props.dispatch({
            type: 'gstates/set/report',
            param: {
                act: '3000',
                name: reportName,
                cont: reportCont,
                page: 'gaoerfuhuodong201901',
                url: window.parent.location.href
            }
        })

        this.setState({
            config,
            isImageUrl: true
        })

    }

    render() {
        const {
            modalState,
            headerState,
            wrapper_bg
        } = this.state
        return (
            <div className={`${styles.golfActJan} golfActJan`}>
        {
            headerState &&
                <Header noBack={true} title={'爱奇艺体育高尔夫赛事包上线'} />
        }
                <div className={styles.wrapper_bg_1}>
                    <div className={styles.roles} onClick={()=>this.setState({modalState:true})}/>
                    <div className={styles.box}>
                        <a className={styles.join_m} onClick={()=>this.bindEvent("m")} title="开通月包" />
                        <a className={styles.join_y} onClick={()=>this.bindEvent("y")} title="开通年包" />
                    </div>
                </div>
                <div className={styles.wrapper_bg_2}></div>
                <div className={styles.wrapper_bg_3}></div>
                <Modal
                  visible={modalState}
                  transparent
                  maskClosable={false}
                  className="golfActJan_amModalTransparent"
                >
                    <div className={styles.rulesBox}>
                        <div className={styles.rulesBg}>
                            <h3>活动规则</h3>
                            <p>1. 活动时间：即日起至2019年1月31日；</p>
                            <p>2. 所赠福利将通过手机短信告知符合获赠资格的用户填写收货信息的指定页面，请务必在开通年包前将您的爱奇艺体育账号与常用手机号绑定，以确保可以及时收到短信；</p>
                            <p>3. 高尔夫赛事包观赛权益目前仅限使用手机、电脑网页、Pad端享用；</p>
                            <p>4. 如发现违规操作，爱奇艺体育有权不向违规账户发放相关权益。</p>
                            <p>5. 如有疑问，请拨打爱奇艺体育客服电话：400-890-1300。</p>
                        </div>
                        <div className={styles.closeBtn} onClick={()=>this.setState({modalState:false})}></div>
                    </div>
                </Modal>

            </div>
        )
    }
}