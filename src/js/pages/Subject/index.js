/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import SubjectList from '../../components/SubjectList'
import Navigation from '../../components/Navigation'

class Subject extends Component {

    componentWillMount(){
        // console.log("已经插入真实DOM 进入之前");
        // console.log(this.state)
        // console.log(this.props)
        this.props.dispatch({
            type:'subject/query'
        })
    }

    render() {
        const {items} = this.props.subject;
        const style = {
            width: '100%',
            background:'#ffffff'
        }
        return (
            <div style={style}>
                <SubjectList items={items} dispatch={this.props.dispatch} />
                <Navigation navState='subject' />
            </div>
        )
    }
}

function mapStateToProps({subject}) {
    return {subject}
}
export default connect(mapStateToProps)(Subject)
