import React from "react";

import Timer from "./timer";

export default class Pomodoro extends React.Component
{

    constructor(props)
    {
        super(props);
        this.limit = 25;
        this.restTime = 5;
        this.state = {
            inRest: false,
            limit: this.limit
        };
        this.inRest = this.inRest.bind(this);
    }

    inRest()
    {
        // bool rest = true or false
		if (this.state.inRest) 
		{
			this.setState({
				inRest: false,
				limit: this.limit,
			});
			return this.limit;
		} else {
			this.setState({
				inRest: true,
				limit: this.restTime,
			});
			return this.restTime;
		}
    }

    render()
    {
        let components = [
            <Timer limit={this.state.limit} inRest={this.inRest} />
        ];
        return(components);
    }
}