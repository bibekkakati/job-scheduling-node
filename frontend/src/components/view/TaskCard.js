import React from "react";

export default function TaskCard({
	data,
	deleteTask,
	rescheduleTask,
	stopTask,
}) {
	console.log(data);
	const btnContainer = () => {
		switch (data.status) {
			case "Run":
				return (
					<button
						className="btn Run"
						onClick={() => stopTask(data.taskId)}
					>
						Stop
					</button>
				);
			case "Abort":
				return (
					<>
						<button
							className="btn Queue"
							onClick={() => rescheduleTask(data.taskId)}
						>
							Reschedule
						</button>
						<button
							className="btn Abort"
							onClick={() => deleteTask(data.taskId)}
						>
							Delete
						</button>
					</>
				);
			default:
				return null;
		}
	};
	return (
		<div className="task-card">
			<div className="task-id-container">
				<p className="task-id">TASK ID. </p>
				<p className="task-id-p">{data.taskId}</p>
			</div>
			<div className="task-status-container">
				<p className="task-status">TASK STATUS. </p>
				<p className={"task-status-p " + data.status}>{data.status}</p>
			</div>
			<div className="btn-container">{btnContainer()}</div>
		</div>
	);
}
