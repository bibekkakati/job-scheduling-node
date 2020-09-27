import React, { useState } from "react";
import { createTask } from "../../api/api";

export default function CreateTask() {
	const [priorityLevel, setPriorityLevel] = useState("1");

	const dropdown = () => {
		let list = [
			<option key="0" value="0">
				Select Priority
			</option>,
		];
		for (let i = 1; i <= 10; i++)
			list.push(
				<option key={i} value={i}>
					Priority {i}
				</option>
			);
		return list;
	};

	const _createTask = async () => {
		let res = await createTask(priorityLevel);
		if (res.ok) {
			console.log("Task created successfully || " + res.task.taskId);
		} else {
			console.log("Task creation failed");
		}
	};

	return (
		<div className="create-task-container">
			<div className="priority-level">
				<select
					id="dropdown"
					onChange={(e) => setPriorityLevel(e.target.value)}
				>
					{dropdown()}
				</select>
			</div>
			<button className="create-task-button" onClick={_createTask}>
				Create Task
			</button>
		</div>
	);
}
