/**
 * Created by flyjennyetn on 2017/12/25.
 */
import React, { useState, useContext, useEffect } from 'react';
import { GstatesContext } from 'actions/context';
import { gstatesRequest } from 'reducers/gstates';
import styles from './style.scss';

function Login(props) {
	console.log(props);
	// useEffect(()=>{
	//     console.log(count)
	//     return () => {
	//         setCount(null);
	//     };
	// })
	const gstates = useContext(GstatesContext);
	// console.log(gstates)
	const [count, setCount] = useState(0);
	// setTimeout(()=>{
	// setInterval(()=>{
	//     if(count < 3){
	// setCount(count+1);
	//     }
	// },3000)

	useEffect(() => {
		// Update the document title using the browser API
		// document.title = `You clicked ${count} times`;
		gstates.dispatch(gstatesRequest(true));
		setTimeout(() => {
			gstates.dispatch(gstatesRequest(false));
		}, 3000);
	}, []);

	return (
		<div className={`${styles.container} bg-main`}>
			<p> You clicked {count} times </p>
			<button type="button" onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}

export default Login;
