import React from 'react';
import timerEndSound from './timerEnd.mp3'

var myInterval;
export default class Clock extends React.Component{

	constructor(){
		super();
		this.state = {
			session:true,
			session_value:5,
			session_current:5,
			break_value:5,
			break_current:4,
			second:0,
			run:false
		}
		this.handleIncrement = this.handleIncrement.bind(this);
		this.handleDecrement = this.handleDecrement.bind(this);
		this.stopwatch = this.stopwatch.bind(this)
		this.pause = this.pause.bind(this)
		this.restart = this.restart.bind(this)
	}

	handleIncrement(e){
		let stateName = e.target.name;
		console.log(stateName)
		console.log(this.state[stateName])

		this.setState(
			(prevState) => {
				let name = stateName.split('_')[0];
				let value = String(name)+'_value';
				let current = String(name)+ '_current';
				if(!this.state.run)
					return {
						[value] : (prevState[value]) + 1,
						[current]: (prevState[current]) +1
					}
			}
		)
	}

	handleDecrement(e){
		let stateName = e.target.name;
		console.log(stateName)
		console.log(this.state[stateName])

		this.setState(
			(prevState) => {
				let name = stateName.split('_')[0];
				let value = String(name)+'_value';
				let current = String(name)+ '_current';

				if (prevState[value] > 1 && !this.state.run)
					return {
						[value] : (prevState[value]) - 1,
						[current] : (prevState[current]) -1
					}
			}
		)

	}

	stopwatch(){
		if(this.state.run){
			return null
		}
		myInterval = setInterval( () =>
				
				this.setState( (prevState) => {

					//logic if stopwatch session is 0
					if (this.state.session_current == 0 && this.state.second == 0){
						this.refs.audio_tag.play()
						return {session:false,
								second:59,
								session_current:prevState.session_value-1,
								}
					}

					// if session is run
					if (this.state.session){
						// run the logic of stopwatch
						if(this.state.second > 0)
							return {second: prevState.second - 1}
						else
							return{second:59, session_current:prevState.session_current-1}
					}
			

					//logic if stopwatch session is 0
					if (this.state.break_current == 0 && this.state.second == 0){
						this.refs.audio_tag.play()
						return {session:true,
								second:59,
								break_current:prevState.break_value-1,
								}
					}
						
					// if break si run
					if(!this.state.session){
						// run the logic of stopwatch
						if(this.state.second > 0)
							return {second: prevState.second - 1}
						else
							return{second:59, break_current:prevState.break_current-1}
					}


				}
				) // end of setState

			,1000)
		
	}
	pause(){
		clearInterval(myInterval)
	}
	restart(){
		clearInterval(myInterval);
		this.setState(
			(prevState) => {
				return {
					run:false,
					session_current: prevState.session_value,
					break_current:prevState.break_value,
					second:0,
					session:true,
				}
			}
		)
		
	}

	render(){
		return(
			<div>
			<div className="clockMain">

				<div className="title"> Pomodoro Clock </div>

				<div className="sessionBreak">
					<div className="session-box">
						<div className="session-label"> Session Length </div>
						<div className="session-bottom">
							<span className="sesion-decrement">
								<button name="session_value" onClick={this.handleDecrement}> &darr; </button>
							</span>
							<span name="session_value" className="session-value"> {this.state.session_value} </span>
							<span className="sesion-increment">
								<button name="session_value" onClick={this.handleIncrement}> &uarr; </button>
							</span>
						</div>
					</div>

					<div className="break-box">
						<div className="break-label"> Break Length </div>
						<span className="break-decrement">
							<button name="break_value" onClick={this.handleDecrement}> &darr; </button>
						</span>
						<span  className="break-value"> {this.state.break_value} </span>
						<span className="break-increment">
							<button name="break_value" onClick={this.handleIncrement}> &uarr; </button>
						</span>
					</div>
				</div>

				<div className="clock-box">
					<div className="title"> {this.state.session? <p> Session </p>: <p> Break </p>} </div>
					<div className="clock-value">
						{this.state.session ?
							<p> {this.state.session_current}:{this.state.second < 10 ? <span>0{this.state.second}</span>:<span> {this.state.second}</span>} </p> : 
							<p> {this.state.break_current}:{this.state.second < 10 ? <span>0{this.state.second}0</span>:<span> {this.state.second}</span>} </p> }
					</div>
				</div>

				

				<div className="operator">
					<button onClick={  () => {
												this.stopwatch(); 
												this.setState({run:true});
											} 
									}> run </button>


					<button onClick={  () => {
												this.setState({run:false});
												this.pause(); 
											} 
									}> pause </button>
					<button onClick={this.restart}> restart </button>

					<p> Run: {String(this.state.run)} </p>
				</div>

				<audio ref="audio_tag" src={timerEndSound} style={{display:'hidden'}}/>

			</div>
				<div className="footer">
					<div> Designed and Created by: </div>
					<div style={{color:'lightblue'}}> Andreas Sujono </div>
				</div>
			</div>

		);
	}
}








