import React from "react";

import Header from "./header";
import Pomodoro from "./pomodoro";
import Modal from "./modal";

export default class Layout extends React.Component
{

	render()
	{
		let components = [
			<Header />,
			<Pomodoro />,
			<Modal />,
		];
		return(components);
	}
}
