var sendMessage = function sendMessage(message) {
	return new Promise(function(resolve, reject) {
		var messageChannel = new MessageChannel();
		messageChannel.port1.onmessage = function(event) {
			if (event.data.error) {
				reject(event.data.error);
			} else {
				resolve(event.data);
			}
		};
		navigator.serviceWorker.controller.postMessage(message, [
			messageChannel.port2
		]);
	});
};

var online = function online(callback) {
	sendMessage('User is online').then(callback);
};

var offline = function offline(callback) {
	sendMessage('User is offline').then(callback);
};

class ConnectionStatusManager {
	constructor() {
		this.started = false;
	}

	hasStarted() {
		return this.started;
	}

	stopListener() {
		this.started = false;

		window.removeEventListener('online', online);
		window.removeEventListener('offline', offline);
	}

	startListener(onlineCallback, offlineCallback) {
		if (this.started) {
			return;
		}

		this.started = true;

		window.addEventListener('online', () => online(onlineCallback));
		window.addEventListener('offline', () => offline(offlineCallback));
	}
}

export default ConnectionStatusManager;
