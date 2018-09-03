import ConnectionStatusManager from './ConnectionStatusManager';

var onlineCallback = function onlineCallback() {
	console.log('User is online!!');
};

var offlineCallback = function offlineCallback() {
	console.log('User is offline!!');
};

var connectionStatusManager = new ConnectionStatusManager();
connectionStatusManager.startListener(onlineCallback, offlineCallback);
