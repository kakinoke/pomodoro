import React from "react";

export default class ProgressBar extends React.Component
{

    constructor(props)
    {
        super(props);
    }

    // プログレスバーのアニメーション
    // 右半分
    getRightStyle(progress)
    {
        let rightStyle;

        if (progress <= 0.5)
        {
            let rotate = 180 * (progress * 2);
            rightStyle = {
                transform: "rotate(" + rotate + "deg)",
            }
        } else {
            rightStyle = {
               transform: "rotate(360deg)",
               transition: "transform 0.1s",
               background: "#999"
            };
        }
        return rightStyle;
    }

    getLeftStyle(progress)
    {
        let leftStyle;
        if (progress <= 0.5)
        {
           leftStyle = {
               transform: "rotate(0deg)",
           };
        } else {
            let rotate = 180 * (progress * 2) - 180;
            leftStyle = {
                transform: "rotate(" + rotate + "deg)",
            }
        }
        return leftStyle;
    }

	render()
	{
        let rightStyle = this.getRightStyle(this.props.progress);
        let leftStyle = this.getLeftStyle(this.props.progress);

        const components = [
            <div class="progressbar">
                <div class="progressbar_inner"></div>
                <div class="progressbar_circle-left" style={leftStyle}></div>
                <div class="progressbar_circle-right" style={rightStyle}></div>
                <h2 class="time">{this.props.min}:{this.props.second}</h2>
            </div>
        ];
		return(components);
	}
}