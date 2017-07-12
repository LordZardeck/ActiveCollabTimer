import { FormatTime } from "../lib/TimerFormatter";
import React from 'react';

export class TimerEntry extends React.Component {
	constructor(props) {
		super(props);

		this.entryClicked = this._entryClicked.bind(this);
		this.entryDoubleClicked = this._entryDoubleClicked.bind(this);
	}

	_entryClicked(event) {
		event.stopPropagation();

		if(event.target) {
			event.target.blur();
		}

		this.props.onTimerSelected(this.props.id);
	}

	_entryDoubleClicked(event) {
		event.stopPropagation();

		this.props.onTimerChange(this.props.id);
	}

	render() {
		let classNames = [];

		if (this.props.active) {
			classNames.push("active");
		}

		if (this.props.selected) {
			classNames.push("selected");
		}

		return (
			<tr
				className={classNames.join(" ")}
				onClick={this.entryClicked}
				onDoubleClick={this.entryDoubleClicked}
			>
				<td>
					<p className="task-title">{this.props.task.name}</p>
					<p className="task-summary">{this.props.task.summary}</p>
				</td>
				<td>({FormatTime(this.props.task.time)})</td>
				<td>
					<i className={`fa fa-${this.props.active ? "pause" : "play"}`} />
				</td>
			</tr>
		);
	}
}
