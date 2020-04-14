import React from "react";

export default class TimerButton extends React.Component
{
	render()
	{
		let components = {
			
		}
		return(
			<div className={this.props.buttonClass} onClick={this.props.onHandleClick}>
				{this.props.name}
			</div>
		);
	}
}