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
        util.dom.setPageTitle('爱奇艺体育会员免费看2019澳网')
        util.dom.setPageMeta('description', '爱奇艺体育全程直播2019澳网公开赛，体育会员可观看全部直播，再享专属活动：【观看直播挑战】和【福利抽奖】助你赢取澳网官方周边礼品！')
        util.dom.setPageMeta('keywords', '爱奇艺体育会员、2019澳网公开赛、纳达尔、费德勒、德约科维奇、穆雷、德尔波特罗、丘里奇、王蔷、张帅、彭帅、哈勒普、科贝尔、沃兹尼亚奇、斯维托丽、ATP、WTA、澳大利亚、中国金花、李娜')
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
                name: 'aowanghuodong201901',
                title: document.title,
                page: 'aowanghuodong201901',
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
            title: '体育会员免费看2019澳网！',
            desc: '2019澳网来袭！费德勒冲击百冠、王蔷领衔中国金花！加入爱奇艺体育会员，免费畅看全部直播>',
            imgUrl: 'http://sports.iqiyi.com' + wechat_icon,
            link: 'http://sports.iqiyi.com/resource/h5-active/#/ausOpenActJan'
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
                name: 'xianzaijiaru',
                cont: '现在加入',
                page: 'aowanghuodong201901',
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
            <div className={`${styles.ausOpenActJan} ausOpenActJan`}>
        {
            headerState &&
                <Header noBack={true} title={'爱奇艺体育会员免费看2019澳网'} />
        }
                <div className={styles.wrapper_bg_1}>
                    <div className={styles.roles} onClick={()=>this.setState({modalState:true})}/>
                    <div className={styles.box}>
                        <a href="javascript:;" onClick={()=>this.bindEvent()} title="现在加入" />
                    </div>
                </div>
                <div className={styles.wrapper_bg_2}></div>
                <div className={styles.wrapper_bg_3}></div>
                <Modal
                  visible={modalState}
                  transparent
                  maskClosable={false}
                  className="ausOpenActJan_amModalTransparent"
                >
                    <div className={styles.rulesBox}>
                        <div className={styles.rulesBg}>
                            <h3>活动规则</h3>
                            <p>1. 活动时间：2019年1月7日10:00至2019年1月28日10:00；</p>
                            <p>2. 爱奇艺体育会员在有效期内可观看体育频道直播的全部2019澳网比赛；</p>
                            <p>3. 受苹果设备价格体系限制，不同设备购买会员产品可能会有价格差异；</p>
                            <p>4.【观看直播挑战】活动的参与资格：爱奇艺体育会员有效期在2019年1月28日之后；</p>
                            <p>5.【额外福利抽奖】活动的参与资格：活动期间开通/续费爱奇艺体育会员；</p>
                            <p>6.【观看直播挑战】活动有效统计范围为爱奇艺体育直播的所有2019年澳网男、女单打；男、女双打正赛第一轮至决赛的所有比赛直播时间；</p>
                            <p>7. 如有任何疑问，请拨打爱奇艺体育客服电话：400-890-1300。</p>
                        </div>
                        <div className={styles.closeBtn} onClick={()=>this.setState({modalState:false})}></div>
                    </div>
                </Modal>

            </div>
        )
    }
}