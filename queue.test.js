import Queue from './queue';

describe('Queue tests', function() {
	describe('Basic tests', function() {
		it('should initialize the queue with no items', function() {
			var queue = new Queue();
			expect(queue.size()).toBe(0);
		});
	});

	describe('Enqueue tests', function() {
		it('should add one item to the queue', function() {
			var queue = new Queue();
			queue.enqueue({ item: 'A' });

			expect(queue.size()).toBe(1);
		});

		it('should add two items to the queue', function() {
			var queue = new Queue();
			queue.enqueue({ item: 'A' });
			queue.enqueue({ item: 'B' });

			expect(queue.size()).toBe(2);
		});

		it('should add fifty items to the queue', function() {
			var queue = new Queue();

			for (let i = 0; i < 50; i++) {
				queue.enqueue({ item: '' + (i + 1) });
			}

			expect(queue.size()).toBe(50);
		});

		it('should do nothing when adding an undefined item', function() {
			var queue = new Queue();

			queue.enqueue(undefined);
			queue.enqueue(null);
			queue.enqueue();

			expect(queue.size()).toBe(0);
		});
	});

	describe('Dequeue tests', function() {
		it('should do nothing when queue is empty', function() {
			var queue = new Queue();
			var dequeued = queue.dequeue();

			expect(dequeued).toBeUndefined();
			expect(queue.size()).toBe(0);
		});

		it('should dequeue the first item when the queue contains one items', function() {
			var queue = new Queue();
			var item = { message: 'A' };

			queue.enqueue(item);

			var dequeued = queue.dequeue();

			expect(dequeued).toBe(item);
			expect(queue.size()).toBe(0);
		});

		it('should dequeue the first item when the queue contains two items', function() {
			var queue = new Queue();
			var itemA = { message: 'A' };
			var itemB = { message: 'B' };

			queue.enqueue(itemA);
			queue.enqueue(itemB);

			var dequeued = queue.dequeue();

			expect(dequeued).toBe(itemA);
			expect(queue.size()).toBe(1);
		});

		it('should dequeue the first item when the queue contains two items', function() {
			var queue = new Queue();
			var itemA = { message: 'A' };
			var itemB = { message: 'B' };

			queue.enqueue(itemA);
			queue.enqueue(itemB);

			var dequeued = queue.dequeue();

			expect(dequeued).toBe(itemA);
			expect(queue.size()).toBe(1);
		});

		it('should dequeue the first item when the queue contains fifty items', function() {
			var queue = new Queue();
			var itemA = { message: '' + 1 };

			queue.enqueue(itemA);

			for (let i = 1; i < 50; i++) {
				queue.enqueue({ message: '' + (i + 1) });
			}

			var dequeued = queue.dequeue();

			expect(dequeued).toBe(itemA);
			expect(queue.size()).toBe(49);
		});
	});
});
