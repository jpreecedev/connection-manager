class Queue {
	constructor() {
		this.storage = [];
	}

	enqueue(item) {
		if (item) {
			this.storage.push(item);
		}
	}

	dequeue() {
		return this.storage.shift();
	}

	size() {
		return this.storage.length;
	}
}

export default Queue;
