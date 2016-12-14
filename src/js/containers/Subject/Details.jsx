/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import cookie from 'js-cookie';
import SubjectDetails from '../../components/SubjectDetails'
import Navigation from '../../components/Navigation'
import {polyvObjects,userVerify} from '../../tools/common';
class Details extends Component {
    state={
        userData : userVerify(cookie.get('userData'),'登录才能学习课程'),
        videoId:[
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },           
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },            
            {
                'small':'2a7f2d070c1373c2181ee348c6a51d24_2',
                'middle':'2a7f2d070c1373c2181ee348c6a51d24_2'
            },
        ]
    }
    getVideoId = ()=>{
        const {grade} = this.state.userData;
        const num = parseInt(this.props.params.id)-1;
        if(grade < 7){
            return this.state.videoId[num].small;
        }
        return this.state.videoId[num].middle;
    }
 
    render() {
        
        const style = {
            width: '100%',
            background:'#ffffff'
        }
        const {grade} = this.state.userData;
        return (
            <div style={style}>
                <div style={{paddingBottom: "1rem"}}>
                    <SubjectDetails id={this.props.params.id} grade={grade} videoId={this.getVideoId()} />
                </div>
                <Navigation navState='subject' />
            </div>
        )
    }
}


export default Details