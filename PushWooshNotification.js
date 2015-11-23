(function(cordova) {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

    function PushNotification() {}

    // Call this to register for push notifications and retreive a push Token
    PushNotification.prototype.registerDevice = function(success, fail) {
        console.log('PushNotification --> registerDevice');
        cordovaRef.exec(success, fail, "PushNotification", "registerDevice", []);
    };

    // Call this to set tags for the device
    PushNotification.prototype.setTags = function(config, success, fail) {
        console.log('PushNotification --> setTags');
        cordovaRef.exec(success, fail, "PushNotification", "setTags", config ? [config] : []);
    };

    // Call this to get push token if it is available
    PushNotification.prototype.getPushToken = function(success) {
        console.log('PushNotification --> getPushToken');
        cordovaRef.exec(success, null, "PushNotification", "getPushToken", []);
    };

    // Call this to get Pushwoosh HWID used for communications with Pushwoosh API
    PushNotification.prototype.getPushwooshHWID = function(success) {
        console.log('PushNotification --> getPushwooshHWID');
        cordovaRef.exec(success, null, "PushNotification", "getPushwooshHWID", []);
    };

    // Call this first thing with your Pushwoosh App ID (see example)
    PushNotification.prototype.onDeviceReady = function(config) {
        console.log('PushNotification --> onDeviceReady');
        cordovaRef.exec(null, null, "PushNotification", "onDeviceReady", config ? [config] : []);
    };

    // Call this to send geo location for the device
    PushNotification.prototype.sendLocation = function(config, success, fail) {
        console.log('PushNotification --> sendLocation');
        cordovaRef.exec(success, fail, "PushNotification", "sendLocation", config ? [config] : []);
    };

    // Call this to get tags for the device
    PushNotification.prototype.getTags = function(success, fail) {
        console.log('PushNotification --> getTags');
        cordovaRef.exec(success, fail, "PushNotification", "getTags", []);
    };

    PushNotification.prototype.unregisterDevice = function(success, fail) {
        console.log('PushNotification --> unregisterDevice');
        cordovaRef.exec(success, fail, "PushNotification", "unregisterDevice", []);
    };

    // Enable Geozones for your Pushwoosh app to be able to use these
    PushNotification.prototype.startLocationTracking = function(success, fail) {
        console.log('PushNotification --> startLocationTracking');
        cordovaRef.exec(success, fail, "PushNotification", "startLocationTracking", []);
    };
    
    PushNotification.prototype.stopLocationTracking = function(success, fail) {
        console.log('PushNotification --> stopLocationTracking');
        cordovaRef.exec(success, fail, "PushNotification", "stopLocationTracking", []);
    };

//Android Only----
    //config params: {msg:"message", seconds:30, userData:"optional"}
    PushNotification.prototype.createLocalNotification = function(config, success, fail) {
        console.log('PushNotification --> Android Only --> createLocalNotification');
        cordovaRef.exec(success, fail, "PushNotification", "createLocalNotification", 
                        config ? [config] : []);
    };

    PushNotification.prototype.clearLocalNotification = function() {
        console.log('PushNotification --> clearLocalNotification');
        cordovaRef.exec(null, null, "PushNotification", "clearLocalNotification", []);
    };

    PushNotification.prototype.clearNotificationCenter = function() {
        console.log('PushNotificiation --> clearNotificationCenter');
        cordovaRef.exec(null, null, "PushNotification", "clearNotificationCenter", []);
    };

    //advanced background task to track device position and not drain the battery
    //deprecated, use startLocationTracking and stopLocationTracking
    PushNotification.prototype.startGeoPushes = function(success, fail) {
        console.log('PushNotificiation --> startGeoPushes');
        cordovaRef.exec(success, fail, "PushNotification", "startGeoPushes", []);
    };

    PushNotification.prototype.stopGeoPushes = function(success, fail) {
        console.log('PushNotification --> stopGeoPushes');
        cordovaRef.exec(success, fail, "PushNotification", "stopGeoPushes", []);
    };

    //advanced background task to track device position and not drain the battery
    PushNotification.prototype.startBeaconPushes = function(success, fail) {
        console.log('PushNotificiation --> startBeaconPushes');
        cordovaRef.exec(success, fail, "PushNotification", "startBeaconPushes", []);
    };

    PushNotification.prototype.stopBeaconPushes = function(success, fail) {
        console.log('PushNotification --> stopBeaconPushes');
        cordovaRef.exec(success, fail, "PushNotification", "stopBeaconPushes", []);
    };

    //Android only, let the plugin know that the app went to background mode (or vise versa)
    PushNotification.prototype.setBeaconBackgroundMode = function(on, success, fail) {
        console.log('PushNotification - ANDROID ONLY --> setBeaconBackgroundMode');
        cordovaRef.exec(success, fail, "PushNotification", "setBeaconBackgroundMode", [on]);
    };

    //sets multi notification mode on
    PushNotification.prototype.setMultiNotificationMode = function(success, fail) {
        console.log('PushNotificiation --> setMultiNotificationMode');
        cordovaRef.exec(success, fail, "PushNotification", "setMultiNotificationMode", []);
    };

    //sets single notification mode
    PushNotification.prototype.setSingleNotificationMode = function(success, fail) {
        console.log('PushNotificiation --> setSingleNotificationMode');
        cordovaRef.exec(success, fail, "PushNotification", "setSingleNotificationMode", []);
    };

    //type: 0 default, 1 no sound, 2 always
    PushNotification.prototype.setSoundType = function(type, success, fail) {
        console.log('PushNotificiation --> setSoundType');
        cordovaRef.exec(success, fail, "PushNotification", "setSoundType", [type]);
    };

    //type: 0 default, 1 no vibration, 2 always
    PushNotification.prototype.setVibrateType = function(type, success, fail) {
        console.log('PushNotificiation --> setVibrationType');
        cordovaRef.exec(success, fail, "PushNotification", "setVibrateType", [type]);
    };

    PushNotification.prototype.setLightScreenOnNotification = function(on, success, fail) {
        console.log('PushNotificiation --> setLightScreenOnNotification');
        cordovaRef.exec(success, fail, "PushNotification", "setLightScreenOnNotification", [on]);
    };

    //set to enable led blinking when notification arrives and display is off
    PushNotification.prototype.setEnableLED = function(on, success, fail) {
        console.log('PushNotificiation --> setEnableLED');
        cordovaRef.exec(success, fail, "PushNotification", "setEnableLED", [on]);
    };

    //set led color
    PushNotification.prototype.setColorLED = function(color, success, fail) {
        console.log('PushNotificiation --> setColorLED');
        cordovaRef.exec(success, fail, "PushNotification", "setColorLED", [color]);
    };
    
    //{goal:'name', count:3} (count is optional)
    PushNotification.prototype.sendGoalAchieved = function(config, success, fail) {
        console.log('PushNotificiation --> sendGoalAchieved');
        cordovaRef.exec(success, fail, "PushNotification", "sendGoalAchieved", config ? [config] : []);
    };

    //Android Only. Gets push history, returns array
    PushNotification.prototype.getPushHistory = function(success) {
        console.log('PushNotificiation --> ANDROID ONLY --> getPushHistory');
        cordovaRef.exec(success, null, "PushNotification", "getPushHistory", []);
    };

    //Android Only. Clears push history
    PushNotification.prototype.clearPushHistory = function() {
        console.log('PushNotificiation --> ANDROID ONLY --> clearPushHistory');
        cordovaRef.exec(null, null, "PushNotification", "clearPushHistory", []);
    };

//Android End----

//iOS only----
    // Call this to get a detailed status of remoteNotifications
    PushNotification.prototype.getRemoteNotificationStatus = function(callback) {
        console.log('PushNotificiation --> getRemoteNotificationStatus');
        cordovaRef.exec(callback, callback, "PushNotification", "getRemoteNotificationStatus", []);
    };

    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function(badgeNumber, callback) {
        console.log('PushNotificiation --> setApplicationIconBadgeNumber');
        cordovaRef.exec(callback, callback, "PushNotification", "setApplicationIconBadgeNumber", 
                        [{badge: badgeNumber}]);
    };

    // Call this to clear all notifications from the notification center
    PushNotification.prototype.cancelAllLocalNotifications = function(callback) {
        console.log('PushNotificiation --> cancelAllLocalNotifications');
        cordovaRef.exec(callback, callback, "PushNotification", "cancelAllLocalNotifications", []);
    };
//iOS End----

    // Event spawned when a notification is received while the application is active
    PushNotification.prototype.notificationCallback = function(notification) {
        var ev = document.createEvent('HTMLEvents');
        ev.notification = notification;
        ev.initEvent('push-notification', true, true, arguments);
        document.dispatchEvent(ev);
    };

//    module.exports = new PushNotification();

    cordova.addConstructor(function() {
		if(!window.plugins)
            window.plugins = {};
		window.plugins.pushNotification = new PushNotification();
	});

 })(window.cordova || window.Cordova || window.PhoneGap);
