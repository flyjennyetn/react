import React, {
	PureComponent
} from 'react'
import {
	ActivityIndicator
} from 'antd-mobile';

export default () => {
	return (
		<div className="toast-example">
          	<ActivityIndicator
	            toast
	            text={'Loading...'}
         	 />
        </div>
	)
}