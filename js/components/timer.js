import React from "react";

import {TogglePattern} from "react-toggle-pattern";
import TimerButton from "./button";
import ProgressBar from "./progressbar";
import ReactPlayer from 'react-player';

import resetBtn from "../img/reset.svg";
import playBtn from "../img/play.svg";
import muteBtn from "../img/mute.svg";
// import bgm from "./timer.mp3";

export default class Timer extends React.Component
{

	constructor(props)
	{
        super(props);
        this.limit = this.props.limit;
        this.init();
		this.start = this.start.bind(this);
        this.pause= this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.done = this.done.bind(this);
        this.skip = this.skip.bind(this);
        this.reset = this.reset.bind(this);
        this.mute = this.mute.bind(this);
    }

    // Initial Timer
    init()
    {
		this.state = {
			timer: this.limit * 60,
			min: this.limit,
            second: "00",
            progress: 0,
            onFire: "start",
            onStart: false,
            playing: false,
            muted: false,
            volume: 1,
		};
    }

    // Update Timer
	tick()
	{
        // 残り時間で分岐
		if (this.state.timer > 0)
		{
			let timer = this.state.timer -= 1;
			let min = Math.floor(timer / 60);
            let second = timer - (min * 60);
            let progress = 1 - (timer / (this.limit * 60));

            // タイマーが完了時
            if (progress == 1)
            {
                this.setState ({
                    // タイマー音
                    // ミュート選択時は流さないようにする
                    playing: this.state.mute ? false : true
                });

                this.done();
               
            }

			this.setState({
				timer: timer,
                min: min,
                // ゼロ埋め
                second: second < 10 ? "0" + String(second) : second,
                progress: progress,
            });
		}
	}

    // タイマースタート
	start()
	{
        // 1secかけてタイマーをアップデート
		this.interval = setInterval(() => {
			this.tick();
        }, 1000);

        this.setState({
            // スタートボタンをポーズに変更
            onFire: "pause",
            // ストップボタンを表示 
            onStart: true,
        });
	}

    // タイマーを一時停止
	pause()
	{
        // インターバルの解除
        clearInterval(this.interval);

        this.setState({
            // ポーズボタンからスタートボタンに変更
            onFire: "start"
        });
    }
    
    // タイマーをストップ
    stop()
    {
         // ポモドーロタイマーの次の時間へ変更
        // Work -> Rest -> Work -> Rest ...
        this.limit = this.props.inRest()
        this.reset();
    }

    // タイマー終了
    done()
    {
        // タイマーをリセット
        clearInterval(this.interval);
        this.setState ({
            // タイマー音
            // ミュート選択時は流さないようにする
            playing: this.props.mute ? false : true,
            // スタート/ポーズボタンを非表示
            onFire: "stop"
        });
    }

    // タイマーをスキップ
    skip()
    {
        this.limit = this.props.inRest();
        this.reset();
    }

    // タイマーをリセット
    reset()
    {
        clearInterval(this.interval);
        this.setState({
			timer: this.limit * 60,
			min: this.limit,
            second: "00",
            progress: 0,
            onFire: "start",
            onStart: false,
            playing: false,
		});
    }

    mute()
    {
        if(this.state.muted)
        {
            this.setState({
                muted: false,
                volume: 1,
            });
        } else {
            this.setState({
                muted: true,
                volume: 0,
            });
        }
    }
    
    render()    
    {
        let resetImg = [
            <img src={resetBtn} />
        ];

        let mutedClassName = "timerButton_item timerButton_item-mute";
        let mutedImg;
        if (this.state.muted)
        {
            mutedClassName += " timerButton_item-disable"
            mutedImg = [
                <img src={muteBtn} />
            ];

        } else {
            mutedImg = [
                <img src={playBtn} />
            ];
        }

        let mutedButton = [
            <TimerButton buttonClass={mutedClassName} onHandleClick={this.mute} name={mutedImg} />
        ];

        let timerButtons = [
            <div class="timerButton">
                <TimerButton name={resetImg} buttonClass={"timerButton_item timerButton_item-reset"} onHandleClick={this.reset} />
                <TogglePattern onFire={this.state.onFire}>
                    <TimerButton onFire={"start"} buttonClass={"timerButton_item timerButton_item-start"} onHandleClick={this.start} />
                    <TimerButton onFire={"pause"} buttonClass={"timerButton_item timerButton_item-pause"} onHandleClick={this.pause} />
                    <TimerButton onFire={"stop"} buttonClass={"timerButton_item timerButton_item-stop"} onHandleClick={this.stop} />
                </TogglePattern>
                <TimerButton buttonClass={"timerButton_item timerButton_item-skip"} onHandleClick={this.skip} />
            </div>
        ];

        let progressBar = [
            <ProgressBar progress={this.state.progress} min={this.state.min} second={this.state.second} />
        ]

        let bgm = process.env.PUBLIC_URL + "/statics/timer.mp3";
        let player = [
            <ReactPlayer className={"timerPlayer"} url={bgm} playing={this.state.playing} loop={true} onSeek={0} volume={this.state.volume} />
        ]

        let components = [
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div class="mainTimer mx-auto">
                            {mutedButton}
                            {progressBar}
                            {timerButtons}
                        </div>
                        {player}
                    </div>
                </div>
            </div>
		];
		return(components);
    }
}