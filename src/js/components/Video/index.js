/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {polyvObjects} from '../../utils/common';
import styles from './index.scss'

class Video extends Component {
  
    componentDidUpdate() {
        if (this.props.videoId != '') {
            polyvObjects(this.props.videoId);
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.videoId != '' &&
                    <div id={'plv_' + this.props.videoId}></div>
                }
            </div>
        )
    }
}

export default Video
