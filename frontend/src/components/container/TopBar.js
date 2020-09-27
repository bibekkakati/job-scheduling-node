import React from "react";
import CreateTask from "../functional/CreateTask";

export default function TopBar() {
	return (
		<div className="TopBar">
			<h2 className="title">Job Scheduler.</h2>
			<CreateTask />
		</div>
	);
}
