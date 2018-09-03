import ConnectionStatusManager from './connection-manager.service';

describe('ConnectionStatusManager tests', function() {
	var mockOnlineCallback;
	var mockOfflineCallback;

	var dispatchEvent = function dispatchEvent(event) {
		window.dispatchEvent(new Event(event));
	};

	var fakeMessageChannel = function fakeMessageChannel() {
		var port1 = {};

		return {
			port1,
			port2: port1
		};
	};

	var fakeServiceWorker = function fakeServiceWorker() {
		return {
			controller: {
				postMessage(data, [port2]) {
					port2.onmessage({
						data
					});
				}
			}
		};
	};

	beforeAll(function() {
		window.MessageChannel = fakeMessageChannel;
		window.removeEventListener = jest.fn();
		navigator.serviceWorker = fakeServiceWorker();
	});

	beforeEach(function() {
		mockOnlineCallback = jest.fn();
		mockOfflineCallback = jest.fn();
	});

	it('should have started listening for DOM events', function() {
		var connectionStatusManager = new ConnectionStatusManager();
		connectionStatusManager.startListener(
			mockOnlineCallback,
			mockOfflineCallback
		);

		expect(connectionStatusManager.hasStarted()).toBe(true);
	});

	it('should have stopped listening for DOM events when stopListener is called', function() {
		var connectionStatusManager = new ConnectionStatusManager();
		connectionStatusManager.startListener(
			mockOnlineCallback,
			mockOfflineCallback
		);

		expect(connectionStatusManager.hasStarted()).toBe(true);

		connectionStatusManager.stopListener();

		expect(connectionStatusManager.hasStarted()).toBe(false);
	});

	it('should call the offline callback when connection is lost', function(done) {
		expect.assertions(2);

		var connectionStatusManager = new ConnectionStatusManager();
		connectionStatusManager.startListener(
			mockOnlineCallback,
			mockOfflineCallback
		);

		dispatchEvent('offline');

		setTimeout(function() {
			expect(mockOnlineCallback.mock.calls.length).toBe(0);
			expect(mockOfflineCallback.mock.calls.length).toBe(1);
			done();
		});
	});

	it('should call the online callback when connection is restored', function(done) {
		expect.assertions(2);

		var connectionStatusManager = new ConnectionStatusManager();
		connectionStatusManager.startListener(
			mockOnlineCallback,
			mockOfflineCallback
		);

		dispatchEvent('online');

		setTimeout(function() {
			expect(mockOnlineCallback.mock.calls.length).toBe(1);
			expect(mockOfflineCallback.mock.calls.length).toBe(0);
			done();
		});
	});

	it('should call the online/offline callback when connection is intermittent', function(done) {
		expect.assertions(2);

		var connectionStatusManager = new ConnectionStatusManager();
		connectionStatusManager.startListener(
			mockOnlineCallback,
			mockOfflineCallback
		);

		dispatchEvent('online');
		dispatchEvent('offline');
		dispatchEvent('online');

		setTimeout(function() {
			expect(mockOnlineCallback.mock.calls.length).toBe(2);
			expect(mockOfflineCallback.mock.calls.length).toBe(1);
			done();
		});
	});
});
