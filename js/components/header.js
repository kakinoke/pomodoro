import React from "react";

export default class Header extends React.Component
{
	render()
	{
		const components = [
			<header>
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<a class="navbar-brand" href="#">Pomodoro Timer</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div class="navbar-nav">
							<a class="nav-item nav-link active" href="#">Home</a>
							<a class="nav-item nav-link" href="#" data-toggle="modal" data-target=".modal">Made by</a>
						</div>
					</div>
				</nav>
			</header>
		];
		return(components);
	}
}
