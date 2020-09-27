import React, { Fragment, useEffect, useState } from "react";
import TaskCard from "../view/TaskCard";
import { getTasks, abortTask, deleteTask, rescheduleTask } from "../../api/api";

export default function TaskCards() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			let data = await getTasks();
			if (data.ok) {
				setTasks(data.data);
			}
		})();
		setLoading(false);
	}, []);

	const _deleteTask = async (taskId) => {
		let res = await deleteTask(taskId);
		if (res.ok) {
			console.log("Task deleted successfully");
		} else {
			console.log("Task deletion failed");
		}
	};
	const _rescheduleTask = async (taskId) => {
		let res = await rescheduleTask(taskId);
		if (res.ok) {
			console.log("Task rescheduled successfully");
		} else {
			console.log("Reschedule request failed");
		}
	};
	const _stopTask = async (taskId) => {
		let res = await abortTask(taskId);
		if (res.ok) {
			console.log("Task aborted successfully");
		} else {
			console.log("Abort request failed");
		}
	};

	if (loading) {
		return (
			<div className="no-data-container">
				<h3 className="loader">Loading...</h3>
			</div>
		);
	} else if (tasks.length > 0) {
		return (
			<Fragment>
				{tasks.map((data) => (
					<TaskCard
						key={data.taskId}
						data={data}
						deleteTask={_deleteTask}
						rescheduleTask={_rescheduleTask}
						stopTask={_stopTask}
					/>
				))}
			</Fragment>
		);
	} else {
		return (
			<div className="no-data-container">
				<h3 className="loader">No Data Available</h3>
			</div>
		);
	}
}
