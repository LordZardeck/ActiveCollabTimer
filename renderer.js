import { ActiveTimer } from "./Components/ActiveTimer";
import { TimerEntry } from "./Components/TimerEntry";
import React from 'react';
import ReactDOM from 'react-dom';
import key from 'keymaster';

export class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTask: 2,
			selectedTask: null,
			tasks: {
				0: {
					summary: "[Unassigned]",
					name: "Down Time",
					time: 0
				},
				1: {
					summary: "[Unassigned]",
					name: "Down Time",
					time: 0
				},
				2: {
					summary:
						"ACT #13 User needs a better colab timer to better keep track of timers of a periord of time",
					name: "Develop New Active Colab Timer",
					time: 0,
					estimate: 106,
					devPercent: 0.57
				},
				3: {
					summary: "[Unassigned]",
					name: "Down Time",
					time: 0
				},
				4: {
					summary: "[Unassigned]",
					name: "Down Time",
					time: 0
				},
				5: {
					summary: "[Unassigned]",
					name: "Down Time",
					time: 0
				}
			},
			taskOrder: [0, 1, 2, 3, 4, 5]
		};

		this.timerId = 0;
		this.lastTrackedTime = Date.now();

		this.changeTask = this._changeTask.bind(this);
		this.selectTask = this._selectTask.bind(this);
		this.clearSelection = this._clearSelection.bind(this);

		key("up", () => {
			this.moveSelectedTask(-1);
			return false;
		});
		key("down", () => {
			this.moveSelectedTask(1);
			return false;
		});
		key("space", () => {
			if (this.state.selectedTask == null) {
				return false;
			}

			this.setState({ activeTask: this.state.selectedTask });
			this.clearSelection();
			return false;
		});
	}

	moveSelectedTask(direction) {
		let selectedTaskIndex = this.state.selectedTask;

		if (selectedTaskIndex == null) {
			if (this.state.activeTask == null) {
				return;
			}

			selectedTaskIndex = this.state.taskOrder.indexOf(this.state.activeTask);
		}

		selectedTaskIndex += direction;

		if (selectedTaskIndex < 0) {
			selectedTaskIndex = this.state.taskOrder.length - 1;
		}

		if (selectedTaskIndex >= this.state.taskOrder.length) {
			selectedTaskIndex = 0;
		}

		this.setState({
			selectedTask: this.state.taskOrder[selectedTaskIndex]
		});
	}

	componentDidMount() {
		this.timerId = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	tick() {
		if (this.state.activeTask !== null) {
			this.setState((previousState, props) => {
				const currentTime = Date.now();

				previousState.tasks[previousState.activeTask].time += Math.round(
					(currentTime - this.lastTrackedTime) / 1000
				);

				this.lastTrackedTime = currentTime;

				return previousState;
			});
		}
	}

	_changeTask(taskKey) {
		if (this.state.tasks[taskKey] !== "undefined") {
			return;
		}
		this.setState({ activeTask: taskKey });
	}

	_selectTask(taskKey) {
		if (this.state.tasks[taskKey] === "undefined") {
			return;
		}

		let stateToChange = {},
			stateKey = "selectedTask";

		if (this.state.selectedTask == taskKey) {
			stateKey = "activeTask";
		}

		stateToChange[stateKey] = taskKey;

		this.setState(stateToChange);

		if (stateKey === "activeTask") {
			this.clearSelection();
		}
	}

	_clearSelection() {
		this.setState({ selectedTask: null });
	}

	render() {
		const timerEntries = this.state.taskOrder.map(key =>
			<TimerEntry
				key={key}
				task={this.state.tasks[key]}
				id={key}
				active={key == this.state.activeTask}
				selected={key == this.state.selectedTask}
				onTimerChange={this.changeTask}
				onTimerSelected={this.selectTask}
				onTimerTapped={this.tapTask}
			/>
		);

		return (
			<div id="app" onClick={this.clearSelection}>
				<ActiveTimer task={this.state.tasks[this.state.activeTask]} />
				<table id="timer-list">
					<tbody>
						{timerEntries}
					</tbody>
				</table>
			</div>
		);
	}
}

window.onload = function(){
    ReactDOM.render(<App />, document.getElementById('app'));
};
