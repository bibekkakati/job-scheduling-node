const PrioritySearch = require("./PrioritySearch");

class PriorityQueue {
	constructor(lowerPriorityRange, upperPriorityRange) {
		this.queue = [];
		this.lowerPriorityRange = lowerPriorityRange;
		this.upperPriorityRange = upperPriorityRange;
	}

	enqueue = (data) => {
		if (data) {
			return this._dataHandler(data);
		}
		return null;
	};

	dequeue = () => {
		return this.queue.pop();
	};

	_dataHandler = (data) => {
		const priorityLevel = this._fetchPriorityLevel(data);

		if (this._isPriorityInRange(priorityLevel)) {
			if (this.queue.length < 1) {
				this.queue.push(data);

				return data;
			}

			if (priorityLevel === 1) {
				this.queue.unshift(data);
				return data;
			}

			if (
				this.queue[this.queue.length - 1].priorityLevel < priorityLevel
			) {
				this.queue.push(data);
			} else {
				let priorityIndex = PrioritySearch(this.queue, priorityLevel);
				priorityIndex === false
					? this.queue.push(data)
					: this.queue.splice(priorityIndex, 0, data);
			}
			return data;
		}
	};

	_isPriorityInRange = (priorityLevel) => {
		return priorityLevel >= this.lowerPriorityRange &&
			priorityLevel <= this.upperPriorityRange
			? true
			: false;
	};

	_fetchPriorityLevel = (data) => {
		const priorityLevel = parseInt(data.priorityLevel);
		return isNaN(priorityLevel) ? 1 : priorityLevel;
	};
}

module.exports = PriorityQueue;
