import { FormatTime } from "../lib/TimerFormatter";
import React from 'react';

const redH = 0;
const greenH = 151;

export class ActiveTimer extends React.Component {
	render() {
		let percentageLeft = 1;

		if (
			typeof this.props.task.estimate !== "undefined" &&
			typeof this.props.task.devPercent !== "undefined"
		) {
			percentageLeft = Math.max(
				redH,
				1 -
					this.props.task.time /
						(this.props.task.estimate * this.props.task.devPercent)
			);
		}

		return (
			<header
				id="timer-header"
				className="running"
				style={{ background: `hsl(${greenH * percentageLeft}, 100%, 45%)` }}
			>
				<div className="time-status">
					<span>
						{FormatTime(this.props.task.time)}
					</span>
					<hr style={{ width: `${this.props.task.time % 60 / 60 * 100}%` }} />
				</div>
				<p className="task-name">{this.props.task.name}</p>
			</header>
		);
	}
}
