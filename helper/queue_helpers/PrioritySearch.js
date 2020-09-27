const PrioritySearch = (arr, priorityLevel) => {
	let start = 0,
		end = arr.length - 1;

	if (arr[start].priorityLevel === priorityLevel) return 0;

	while (start <= end) {
		let mid = Math.floor((start + end) / 2);

		if (arr[mid].priorityLevel === priorityLevel) {
			for (let i = mid; i >= 0; i--) {
				if (arr[i].priorityLevel !== priorityLevel) {
					return i + 1;
				}
			}
		} else if (arr[mid].priorityLevel < priorityLevel) {
			start = mid + 1;
		} else end = mid - 1;
	}

	return false;
};

module.exports = PrioritySearch;
