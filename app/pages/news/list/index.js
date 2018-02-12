/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
//import xback from 'assets/js/xback';
import Link from 'components/Link';
import * as cache from 'utils/cache/';

import styles from './style.scss';


// import p from 'assets/images/s.gif';
// import personalCenter from 'assets/images/personalCenter1.png';


@connect(({global,news})=> {
    return {global,news}
})





export default class extends PureComponent {

    state = {
        userName:'',
        pageStatus: false

    };

    componentWillMount(){

        //XBack.listen(()=>{
        //    alert('android 返回了');
        //    this.props.router.push('/news/details/1')
        //    return false;
        //});


        // const info = {
        //     "pics":"data:image/png;base64,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",
        //     "lens":"2690"
        // }

        //this.props.dispatch({
        //    type:'news/premQuery'
        //})

        // this.props.dispatch({
        //     type:'register/findMcomList'
        // })

        // this.props.dispatch({
        //     type:'interface/uploadPic',
        //     ...info
        // })        

        // this.props.dispatch({
        //     type:'register/userComInfo'
        // })
    }

    render(){
        const {pageStatus} = this.state
        return (
            <div className={styles.container}>
                <Link href='/news/details/1'>新闻列表 </Link>
            </div>
        )
    }
}

