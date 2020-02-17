import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Clock from './components/clock.js'

ReactDOM.render(
	<div className="back">
		<Clock />
		<div className="footer">
			<div> Designed and Created by: </div>
			<div style={{color:'lightblue'}}> Andreas Sujono </div>
		</div>
	</div>
	, document.getElementById('root')
);