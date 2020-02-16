import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Clock from './components/clock.js'

ReactDOM.render(
	<div className="back">
		<Clock />
	</div>
	, document.getElementById('root')
);