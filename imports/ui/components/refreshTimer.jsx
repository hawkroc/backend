import React from 'react'

class RefreshTimer extends React.Component {
	constructor(args) {
		super(args)
		this.state = {
			count: 60,
		}
	}

	timerTick = () =>
		this.setState({
			count: this.state.count - 1 < 0 
				? 60 : this.state.count - 1
		})
	startTimer = () => {
		clearInterval(this.timer)
		this.timer = setInterval(this.timerTick, 1000)
	}
	stopTimer = () => clearInterval(this.timer)

	componentDidMount = () => {
		this.startTimer()
	}
	componentWillUnmount = () => {
		this.stopTimer()
	}

	render = () => {
		return (
			<b style={{ fontStyle: 'italic' }}>Transaction data refreshes in {this.state.count} seconds</b>
		)
	}
}

export default RefreshTimer