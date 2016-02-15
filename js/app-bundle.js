/* jshint strict: false, -W117 */
angular.module('app', ['ionic','ionic.service.core','ui.router','ngCordova',
                       'pushwoosh.factory',   
                       'fbService',                  
                       'hours','about','contact','register','settings', 'information',
                       'ui.controllers',
                       'ux.custom',
                       'ux.filters',
                       'ux.header'
                      ])

.run(function($ionicPlatform,$timeout,pushwooshFactory,fbService) {
  $ionicPlatform.ready(function() {
    if (navigator.splashscreen){
        navigator.splashscreen.show();
    }
        
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    if (navigator.splashscreen){
        $timeout(function(){
           console.log('navigator.splashscreen.hide()');
           navigator.splashscreen.hide();
        },10000);
    }
        
    // Pushwoosh Factory
    pushwooshFactory.initialize();
    
    // Company Default
    if (!localStorage.company){
        localStorage.company = JSON.stringify({
            name:'Temple Medical Clinic',
            address:'431 Sage Street',
            city:'Temple',
            state:'GA',
            postal:'30179',
            direct:'(770) 562-9007',
            title1:'Temple Medical',
            title2:'Client'
        });
        console.log(localStorage.company);
    }
    fbService.getCompany();
    
    
    // Hours Default
    if (!localStorage.days) {
        localStorage.days = JSON.stringify([
            { name:'Monday', start:'1 PM', end:'4 PM' },
            { name:'Tueday', start:'9 AM', end:'NOON' },
            { name:'Wednesday', start:'9 AM', end:'NOON'},
            { name:'Thursday', start:'9 AM', end:'4 PM' },
            { name:'Friday', start:'9 PM',end:'4 PM' }            
        ]);
        console.log(localStorage.days);
    }
    fbService.getHours();
    
    angular.element('ion-side-menus').removeClass('hide');
  });  
});

/*    
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    angular
		.module('app')
		.config(function(localStorageServiceProvider){
			localStorageServiceProvider
				.setPrefix('tmc-ionic');  
		})
	;
})(); // Prevent global structure from being left behind ( aka logger )    
*/    

(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    angular
		.module('app')
        //
        //  remember uppercased character are prefix by dash(-)
        //
        .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
            $scope.showMenu = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };
            
            $scope.showRightMenu = function () {
                $ionicSideMenuDelegate.toggleRight();
            };
        })
    ;
})(); // Prevent global structure from being left behind ( aka logger )

/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
     
    angular.module('about', ['ui.TelFactory','fbService'])
    .controller('AboutController', AboutController);
    
    function AboutController($scope, $state, uiTelFactory, $ionicHistory, fbService ) {
        console.log('AboutController');
        var d1 = new Date();
        var d2 = new Date(2005, 6, 1);
    
        $scope.serviceYears = Math.ceil(d1.getFullYear() - d2.getFullYear());   
    
        $scope.companyNumber = localStorage.companyNumber;
        $scope.getCompanyInfo = function(){
            console.log('AboutController:getCompanyInfo:');
            fbService.getCompany()
                .then(
                    function handleDataResolve(data){
                        console.log('AboutController:handleDataResolve:data');
                        console.log(data.direct);
                        $scope.companyNumber = localStorage.companyNumber;
                    },
                    function handleDataReject(){
                        console.log('AboutController:handlDataReject:Data Not Found');
                    }
                );                        
        }
        
        $scope.$on('$ionicView.enter', function(){
            $scope.getCompanyInfo();
        }); 
        
    }
    
    
})(); // Prevent global structure from being left behind ( aka logger )
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular
        .module('about')
        .config(AboutConfig);

    AboutConfig.$inject = ['$stateProvider'];
    function AboutConfig ($stateProvider) {
        $stateProvider
            .state('tabs.about', {
            url: "/about",
            views: {
                'about-tab': {
                templateUrl: "js/about/about.html",
                controller: 'AboutController',
                controllAs: 'vm'
                }
            }
            });        
    }   
})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strick';

    angular.module('contact',['ui.MapFactory','ui.TelFactory','fbService'])
    .controller('ContactController', ContactController);
     
    function ContactController($scope, $state, uiMapFactory, uiTelFactory, fbService) {
        console.log('ContractController');
        
        $scope.contactMap = function(address){
            console.log('ContactController:contactMap');
            console.log(uiMapFactory);
            uiMapFactory.map(address);
        };
        
        $scope.contactCall = function(number) {
            console.log('ContactController:contactCall');
            console.log(uiTelFactory);
            uiTelFactory.call(number);
            
        };
        
        $scope.contact = {'info':'<p>Wow this is the contact view HTML data</p>'};
        console.log($scope.contact.info);
        
        
        $scope.companyNumber = localStorage.companyNumber;
        $scope.companyAddress = localStorage.companyAddress;
        $scope.companyCity = localStorage.companyCity;
        $scope.companyState = localStorage.companyState;
        $scope.companyPostal = localStorage.companyPostal;
        
        $scope.getCompanyInfo = function(){
            console.log('ContractController:getCompanyInfo:');
            fbService.getCompany()
                .then(
                    function handleDataResolve(data){
                        console.log('ContractController:handleDataResolve:data');
                        console.log(data.direct);
                        $scope.companyNumber = localStorage.companyNumber;
                        $scope.companyAddress = localStorage.companyAddress;
                        $scope.companyCity = localStorage.companyCity;
                        $scope.companyState = localStorage.companyState;
                        $scope.companyPostal = localStorage.companyPostal;                        
                    },
                    function handleDataReject(){
                        console.log('ContractController:handlDataReject:Data Not Found');
                    }
                );                        
        }
        
        
        $scope.$on('$ionicView.enter', function(){
            $scope.getCompanyInfo();
        }); 
    }
})(); // Prevent global structure from being left behind ( aka logger )
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular
        .module('contact')
        .config(ContactConfig);

    ContactConfig.$inject = ['$stateProvider','$cordovaInAppBrowserProvider'];
    function ContactConfig ($stateProvider,$cordovaInAppBrowserProvider) {
        var option = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };
        
        $cordovaInAppBrowserProvider.setDefaultOptions(option);

        $stateProvider
            .state('tabs.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                templateUrl: "js/contact/contact.html",
                controller: 'ContactController',
                controllerAS: 'vm'
                }
            }
            });        
    }   
})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular.module('ui.controllers', [])
        .controller('uiOrientationChange', uiOrientationChange);
         
        function uiOrientationChange($scope, $state) {
        $scope.$state = $state;
        window.addEventListener('orientationchange', function(){
            console.log('ui.controllers:uiOrientationChange');
            alert('orientationchange');
            $scope.$state.reload();
        });
    }
})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('ux.custom', ['tmc-about-info','tmc-phone-long','tmc-yos'])
        //
        //  remember uppercased character are prefix by dash(-)
        //
    
        .directive('orientantionchange',function($window){
            return {
                link: function(scope){
                    angular.element($window).on('orientationchange',function(e){
                        scope.$broadcast('orientationchange::orientationchange');
                    });
                }
            };
        });
        
})(); // Prevent global structure from being left behind ( aka logger )
angular
  .module('emailCheck',[])
  .directive('emailCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var ID = '#' + attrs.emailCheck;
        elem.add(ID).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(ID).val();
            ctrl.$setValidity('emailmatch', v);
          });
        });
      }
    };
  }]);
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('fb.factory',['firebase'])    
    .factory('fbFactory',function($firebaseArray){
        var fbFactory = {
            name:'fbFactory',
            usersUrl:'https://tmc-ionic.firebaseio.com/users',
            test:function(){
                console.log(this.name+":test");
                alert(this.name+':test (working)');
            },
            users:function(){
                console.log(this.name+":users");
                var ref = new Firebase(this.usersUrl);
                return $firebaseArray(ref);
            },
            saveUser:function(_ref,_fname,_lname,_email,_trusted){
                console.log(this.name+":saveUser");
                var ref = new Firebase(this.usersUrl);
                
                ref.child(_ref).set({
                    "ref":_ref,
                    "fname":_fname,
                    "lname":_lname,
                    "email":_email,
                    "trusted":_trusted
                });
            },
            getUser:function(email){
                console.log(this.name+":getUser");
                var _key = email.replace(/\./g,'-*-');
                var ref = new Firebase(this.usersUrl+"/"+_key);
                
                
                ref.on("value", function(snapshot) {
                    console.log(snapshot.val());
                    return snapshot.val();
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });            
            }
            
        };
        return fbFactory;
    });
})(); // Prevent global structure from being left behind ( aka logger )


/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    angular
        .module('navFactory',['ionic','ionic.service.core'])    
        .factory('navFactory',function($state,$ionicHistory){
            var navFactory = {
                name:'navFactory',
                base:function(val){
                    var _baseValue;
                    if (val === undefined){
                        return this._baseValue;
                    }else{
                        this._baseValue = val;
                    }
                },                
                prefix:function(val){
                    var _prefixValue;
                    if (val === undefined){
                        return this._prefixValue;
                    }else{
                        this._prefixValue = val;
                    }
                },
                suffix:function(val){
                    var _suffixValue;
                    if (val === undefined){
                        return this._suffixValue;
                    }else{
                        this._suffixValue = val;
                    }
                },
                back:function(){
                    console.log(this.name+':back');
                    console.log($ionicHistory.currentView());
                    console.log($ionicHistory.currentView().backViewId);
                    if ($ionicHistory.currentView().backViewId === null){
                        $state.go('tabs.about');    
                    }else{
                        $ionicHistory.goBack();
                    }
                },
                mapUrl:function(url){
                    if (angular.isNumber(url)){
                        url = this.prefix() + url + this.suffix();       
                    }
                    return this.base() + url;
                }
            };
            return navFactory;
        });
})(); // Prevent global structure from being left behind ( aka logger )    angular.module('ui.DeviceFactory',[])
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('pushwoosh.factory',[])
    .factory('pushwooshFactory',function(){
        var pushwooshFactory = {
            name:'pushwooshFactory',
            test:function(){
                console.log(this.name+":test");
                alert(this.name+':test (working)');
            },
            googleProjectNumber:function(){
                return "443338124425";
            },
            pushwooshID:function(){
                return "AA471-6DDC3";			
            },
            initialize:function(type){
                console.log('pushwooshFactory.initialize');
                console.log('Initialize Pushwoosh Notification');
                console.log('****',ionic.Platform.platform(),'***');
                try 
                { 
                    switch (ionic.Platform.platform().toLowerCase()){
                        case "android":
                            pushwooshFactory.androidHandler();
                            break;
                        case "ios":
                            pushwooshFactory.iosHandler();
                            break;
                        default:
                            console.warn('unhandled platform: '+device.platform.toLowerCase());
                            //alert('unhandled platform: '+device.platform.toLowerCase());
                            break;
                    }
                }
                catch(err) 
                { 
                    var txt="There was an error initializing Pushwoosh plugin.\n\n"; 
                    txt+="Error description: " + err.message + "\n\n";
                    console.warn(txt); 
                    //alert(txt); 
                }                 
    
                return "";
            },
            androidHandler:function(){
                console.log('pushwooshFactory.androidPushHandler');
    
                // Initialize the pushwoosh plugin
                console.log('Initialize Pushwoosh plugin');
                console.log('com.pushwoosh.plugins.pushwoosh.PushNotification');			
                var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
            
                // Config Pushwoosh plugin with projectid: "GOOGLE_PROJECT_ID", pw_appid : "PUSHWOOSH_APP_ID". 
                // This will trigger all pending push notifications on start.
                console.log('Pushwoosh plugin config ( Android )');
                pushNotification.onDeviceReady({ projectid: pushwooshFactory.googleProjectNumber(), pw_appid : pushwooshFactory.pushwooshID() });
        
                // Added Pushwoosh notification handler
                document.addEventListener('push-notification', function(event) {
                    var title = event.notification.title;
                    var userData = event.notification.userdata;
                                    
                    if(typeof(userData) != "undefined") {
                        console.warn('user data: ' + JSON.stringify(userData));
                    }
                                            
                    alert(title);
                });
                
                // Register Pushwoosh Device
                pushNotification.registerDevice(
                    function(status) {
                        console.log('Pushwoosh registration success');
                        var pushToken = status;
                        console.warn('Pushwoosh token: ' + pushToken);
                        var iUser = Ionic.io();
                        iUser.set('pushwoosh',pushToken); 
                    },
                    function(status) {
                        console.log('Pushwoosh registration failure');
                        console.warn(JSON.stringify(['failed to register ', status]));
                    }
                );
            },
            iosHandler:function(){
                console.log('pushwooshFactory.iosHandler');
    
                // Initialize the pushwoosh plugin
                console.log('Initialize Pushwoosh plugin');
                console.log('com.pushwoosh.plugins.pushwoosh.PushNotification');			
                var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
                
                //reset badge badge number
                console.log('Pushwoosh reset badge number');
                pushNotification.setApplicationIconBadgeNumber(0);
                
                // Added Pushwoosh notification handler
                document.addEventListener('push-notification', function(event) {
                    //get the notification payload
                    var notification = event.notification;
    
                    //display alert to the user for example
                    alert(notification.aps.alert);
                    
                    //clear the app badge
                    pushNotification.setApplicationIconBadgeNumber(0);
                });
    
                // Config Pushwoosh plugin for iOS            
                console.log('Pushwoosh plugin config ( iOS )');
                pushNotification.onDeviceReady({pw_appid:pushwooshFactory.pushwooshID()});            
                
                // Register Pushwoosh Device
                pushNotification.registerDevice(
                    function(status) {
                        console.log('Pushwoosh registration success');
                        var deviceToken = status.deviceToken;
                        console.warn('registerDevice: ' + deviceToken);
                        var iUser = Ionic.io();
                        iUser.set('pushwoosh',deviceToken); 
                    },
                    function(status) {
                        console.log('Pushwoosh registration failure');
                        console.warn('failed to register : ' + JSON.stringify(status));
                        //alert(JSON.stringify(['failed to register ', status]));
                    }
                );
                
            }
        };
        return pushwooshFactory;
    });
})(); // Prevent global structure from being left behind ( aka logger )    
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('ui.DeviceFactory',[])    
    .factory('uiDeviceFactory',function(){
        var uiDeviceFactory = {
            name:'uiDeviceFactory',
            test:function(){
                console.log(this.name+":test");
                alert(this.name+':test (working)');
            },
            type:function(){
                console.log(this.name+":deviceType");
                var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" :
                (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" :
                (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" :
                (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
                console.log(deviceType);
                return deviceType;
            }
        };
        return uiDeviceFactory;
    });
})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('ui.MapFactory',['ui.DeviceFactory'])
    .factory('uiMapFactory',function(uiDeviceFactory,$cordovaInAppBrowser){
        var uiMapFactory = {
            name:'uiMapFactory',
            test:function(){
                console.log(this.name+":test");
                alert(this.name+':test (working)');
            },
            map:function(address){
                console.log(this.name+':map');
                
                var defaultBase='https://maps.google.com/maps?saddr=My+Location&daddr=';
                var androidBase='geo:0,0?q=';
                var iosBase='http://maps.apple.com/?q=';
                var base = defaultBase;
                var uri = encodeURI(address);
                console.log(uri);
                            
                switch(uiDeviceFactory.type().toLowerCase()){
                    case "ipad":
                    case "iphone":
                        base = iosBase;
                        break;
                    case "android":
                        base = androidBase;
                        break;
                    default:
                        base = defaultBase;
                        break;
                }
                
    //            console.log('window.open:'+base+uri);
    //            window.open(base+uri,'_blank','location=yes');
                console.log('$cordovaInAppBrowser:'+base+uri);
                
                var option = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no'
                };
                $cordovaInAppBrowser.open(base+uri, "_system", option);
                console.log('$cordovaInAppBrowser.opened');
                                    
            }
        };
        return uiMapFactory;
    });
})(); // Prevent global structure from being left behind ( aka logger )    
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('ui.TelFactory',[])
    .factory('uiTelFactory',function($cordovaInAppBrowser){
        var uiTelFactory = {
            name:'uiTelFactory',
            test:function(){
                console.log(this.name+":test");
                alert(this.name+':test (working)');
            },
            call:function(number){
                console.log(this.name+':call');
                var uri = encodeURI('tel:'+number);
                console.log(uri);
                            
                
                var option = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no'
                };
    
                console.log('$cordovaInAppBrowser:'+uri);
                $cordovaInAppBrowser.open(uri, "_system", option);
                console.log('$cordovaInAppBrowser.opened');
                                    
            }
        };
        return uiTelFactory;
    });
})(); // Prevent global structure from being left behind ( aka logger )    
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('fbService',[]) 
    .factory('fbService',function($q, $cordovaDevice, $timeout){
        console.log('fbService');
        var fbService = {
            name:'fbService',
            // Important IO must be capitalized
            companyUrl:"https://tmc-ionic.firebaseIO.com/company",
            // Important IO must be capitalized
            registerUrl:"https://tmc-ionic.firebaseIO.com/registered",
            // Important IO must be capitalized
            hoursUrl:"https://tmc-ionic.firebaseIO.com/hours",
            connect:function(){
                console.log(this.name,':connect');
                console.log('Firebase:online');
                try {
                    Firebase.goOnline();
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                }
                
            },
            disconnect:function(){
                console.log(this.name,':disconnect');
                console.log('Firebase:offline');
                try {
                    Firebase.goOffline()  
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                }
            },
            encodeID:function(id){
                console.log(this.name,":encodeID");
                var _ref = id.replace(/\./g,'-*-');
                console.log(this.name,':encodeID:',_ref);
                return _ref;
            },            
            getRegisterUserData:function(id){
                console.log(this.name,':getUserData');
                
                id = this.encodeID(id);
                var deferred = $q.defer();
                try {
                    
                    // overcomes this 1 hour cache
                    this.disconnect();
                    this.connect();
            
                    var collectionUsers = new Firebase( this.registerUrl);
                    // Get the User with the given ID 
                    // (as it translates to a path in the parent resource). 
                    // Unlike the SET/REMOVE methods, the success
                    // callback may be invoked SYNCHRONOUSLY. If the data is available in
                    // the local cache, then it will be invoked immediately. If, however,
                    // the data is not in the local cache, the callback will be invoked
                    // ASYNCHRONOUSLY when the resource has been synchronized.
                    collectionUsers.child( id ).once(
                        "value",
                        function handleSuccess( snapshot ) {
                            console.log('fbService:getRegisterUserData:handleSuccess');
                            deferred.resolve( snapshot.val() );
                        },
                        function handleError( error ) {
                            console.log('fbService:getRegisterUserData:handleError');
                            // Client does not have permission to read this data.
                            deferred.reject();
                        }
                    );
                    return (deferred.promise);
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                    return (deferred.promise);                    
                }
            },
            saveRegisterUserData:function(id,data){
                console.log(this.name,':registerUserData');
                id = this.encodeID(id);
                data.ref = id;
                data.updated = new Date().toString();
                data = this.addExtras(data);
                data = this.validateData(data);
                try {
                    console.log(this.name,':registerUrl:',this.registerUrl);
                    var ref = new Firebase(this.registerUrl);
                    console.log(this.name,':id:',id);
                    // update and add missing data to previous data 
                    // --set-- would remove previous data and write only data supplied )
                    ref.child(id).update(data);
                    this.saveCreated(id);
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                }
            },
            addExtras:function(data){
                data.userAgent = navigator.userAgent;
                data.platform = navigator.platform;
                data.language = navigator.language;
                try {
                    data.uuid = $cordovaDevice.getUUID();
                } catch ( ex ) {};
                return data;
            },
            saveCreated:function(id){
                try {
                    console.log(this.name,':saveCreated');
                    var ref = new Firebase(this.registerUrl + '/' +id);
                    ref.once(
                        "value",
                        function handleSuccsss(snapshot){
                            console.log('fbService:saveCreated:handleSuccess');
                            console.log('snapshot:',snapshot.val());
                            console.log('ref:',snapshot.val().ref);
                            if (snapshot.val().ref && snapshot.val().created === undefined){
                                var d = new Date();
                                var dateString = d.toString();
                                var data = {created:dateString };
                                console.log('saveCreated:data:',data);
                                try {
                                    var ref = new Firebase('tmc-ionic.firebaseIO.com/registered/' +id);
                                    ref.update(data);
                                } catch ( ex ) {
                                    console.log('Firebase:',ex);
                                }                                
                            }
                        },
                        function errorHandler( error ) {
                            console.log('fbService:saveCreated:handleError');
                            console.log(error);                            
                        }
                    ); 
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                }
            },
            addUserData:function(id,data){
                console.log(this.name,':addData');
                try {
                    var ref = new Firebase(this.registerUrl + '/' +id);
                    ref.update(data);
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                }
            },
            validateData:function(data){
                console.log(this.name,':validateData');
                angular.forEach(data, function(value, key) {
                    data[key] = value === undefined ? '' : value;
                });
                console.log(data);
                return data;                
            },
            getHours:function(){
                console.log(this.name,':getHours');
                            
                var deferred = $q.defer();

                try {
                            
                    // overcomes this 1 hour cache
                    this.disconnect();
                    this.connect();

                    var hoursRef = new Firebase( this.hoursUrl);
                    // Get the User with the given ID 
                    // (as it translates to a path in the parent resource). 
                    // Unlike the SET/REMOVE methods, the success
                    // callback may be invoked SYNCHRONOUSLY. If the data is available in
                    // the local cache, then it will be invoked immediately. If, however,
                    // the data is not in the local cache, the callback will be invoked
                    // ASYNCHRONOUSLY when the resource has been synchronized.
                    hoursRef.once(
                        "value",
                        function handleSuccess( snapshot ) {
                            console.log('fbService:getHours:handleSuccess');
                            var days = JSON.parse(localStorage.days);
                            // Monday
                            days[0].start = snapshot.val().mondayStart;
                            days[0].end = snapshot.val().mondayEnd;
                            // Tuesday
                            days[1].start = snapshot.val().tuesdayStart;
                            days[1].end = snapshot.val().tuesdayEnd;
                            // Wednesday
                            days[2].start = snapshot.val().wednesdayStart;
                            days[2].end = snapshot.val().wednesdayEnd;
                            // Thursday
                            days[3].start = snapshot.val().thursdayStart;
                            days[3].end = snapshot.val().thursdayEnd;
                            // Friday
                            days[4].start = snapshot.val().fridayStart;
                            days[4].end = snapshot.val().fridayEnd;
                            
                            localStorage.days = JSON.stringify(days);

                            return deferred.resolve(snapshot.val());
                        },
                        function handleError( error ) {
                            console.log('fbService:getHours:handleError');
                            // Client does not have permission to read this data.
                            return deferred.reject();
                        }
                    );
                    return (deferred.promise);
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                    return (deferred.promise);
                }
            },
            getCompany:function(){
                console.log(this.name,':getCompany');

                var deferred = $q.defer();

                try {
                            
                    // overcomes this 1 hour cache
                    this.disconnect();
                    this.connect();

                    var companyRef = new Firebase( this.companyUrl);
                    // Get the User with the given ID 
                    // (as it translates to a path in the parent resource). 
                    // Unlike the SET/REMOVE methods, the success
                    // callback may be invoked SYNCHRONOUSLY. If the data is available in
                    // the local cache, then it will be invoked immediately. If, however,
                    // the data is not in the local cache, the callback will be invoked
                    // ASYNCHRONOUSLY when the resource has been synchronized.
                    companyRef.once(
                        "value",
                        function handleSuccess( snapshot ) {
                            console.log('fbService:getCompany:handleSuccess');
                            var company = JSON.parse(localStorage.days);

                            localStorage.companyName = company.name = snapshot.val().name;
                            localStorage.companyAddress = company.address = snapshot.val().address;
                            localStorage.companyCity = company.city = snapshot.val().city;
                            localStorage.companyState = company.state = snapshot.val().state;
                            localStorage.companyPostal =company.postal = snapshot.val().postal;  
                            localStorage.companyNumber = company.direct = snapshot.val().direct;
                                                      
                            localStorage.title1 = company.title1 = snapshot.val().title1;
                            localStorage.title2 = company.title2 = snapshot.val().title2;

                            localStorage.company = JSON.stringify(company);
                            
                            return deferred.resolve(snapshot.val());
/*                            
                            console.log('fbService:getCompany:companyUpdated');
                            $rootScope.$broadcast('companyUpdated',company);
                            console.log('fbService:getCompany:companyUpdated');
*/                            
                        },
                        function handleError( error ) {
                            console.log('fbService:getCompany:handleError');
                            // Client does not have permission to read this data.
                            return deferred.reject();
                        }
                    );
                    return deferred.promise;
                } catch ( ex ) {
                    console.log('Firebase:',ex);
                    //
                    // *** How do we dispose of deferred ***
                    //
                    return (deferred.promise);
                }
            }
        };

        return fbService;
        
    });       

})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular.module('hours', ['fbService'])
    .controller('HoursController', HoursController); 

    function HoursController($scope,fbService) {
        console.log('HomeController');
        
        $scope.hoursURL = 'js/home/home.1.html';
        console.log('hoursURL:',$scope.hoursURL);
        
        $scope.days = JSON.parse(localStorage.days);
        $scope.getHoursInfo= function(){
            
            fbService.getHours().then(
                function handleDataResolve(data){
                    console.log('HoursController:getCompany:handleDataResolve:data');
                    $scope.days = JSON.parse(localStorage.days);
                },
                function handleDataReject(){
                    console.log('HoursController:getCompany:handlDataReject:Data Not Found');
                }
                
            );
        
        }
        
        $scope.$on('$ionicView.enter', function(){
            $scope.getHoursInfo();
        }); 
        
    }
})(); // Prevent global structure from being left behind ( aka logger )

(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular
        .module('hours')
        .config(HomeConfig);

    HomeConfig.$inject = ['$stateProvider'];
    function HomeConfig ($stateProvider) {
        $stateProvider
            .state('tabs.hours', {
                url: "/hours",
                views: {
                    'hours-tab': {
                    templateUrl: "js/hours/hours.html",
                    controller: 'HoursController',
                    controllerAS: 'vm'
                    }
                }
            });        
    }   
    
})(); // Prevent global structure from being left behind ( aka logger )(function() {

/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
     
    angular.module('information', ['navFactory'])
    .controller('InformationController', InformationController);
    
    function InformationController($scope, navFactory) {
        console.log('InformationController');
        
            if (window.localStorage.pushNotification === null){
                window.localStorage.pushNotification =true;
            }
            console.log(window.localStorage.pushNotification);
        
        $scope.pushVal = function(){
            return window.localStorage.pushNotification;
        };
        
        $scope.pushToggle = function(){
            window.localStorage.pushNotification =
            $scope.pushVal() === true ? false : true;                
        };        
        
        navFactory.base('js/information/');
        navFactory.prefix('information.');
        navFactory.suffix('.html');
        
        $scope.setUrl= function(url){
            console.log('InformationController:setUrl');
            
            $scope.informationUrl = navFactory.mapUrl(url);
        };

        $scope.myGoBack = function(){
            console.log('InformationController:myGoBack');
            navFactory.back();
        };
        
        $scope.setUrl(1);
        
    }
    
})(); // Prevent global structure from being left behind ( aka logger )
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular
        .module('information')
        .config(InformationConfig);

    InformationConfig.$inject = ['$stateProvider'];
    function InformationConfig ($stateProvider) {
        $stateProvider
            .state('information', {
                url: "/information",
                templateUrl: "js/information/information.html",
                controller: 'InformationController',
                controllerAS: 'vm'                    
            });
    }   
    
})(); // Prevent global structure from being left behind ( aka logger )(function() {

angular
  .module('phoneCheck',[])
  .directive('phoneCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var ID = '#' + attrs.phoneCheck;
        elem.add(ID).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(ID).val();
            ctrl.$setValidity('numbersmatch', v);
          });
        });
      }
    };
  }]);
/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
     
    angular.module('register', ['emailCheck','phoneCheck','navFactory','fbService'])
    .controller('RegisterController', SettingsController);
    
    function SettingsController($scope,  navFactory, fbService) {
        console.log('RegisterController');
        
        // Setup User Info
        console.log('RegisterController:Setup:user');
        $scope.register = {};
//        window.localStorage..clearAll();
        
        console.log('RegisterController:localStorage --> Supported <--');

        $scope.register = {
            nameFirst:localStorage.nameFirst,
            nameLast:localStorage.nameLast, 
            email1:localStorage.email,
            email2:localStorage.email,
            mobile1:localStorage.mobile,
            mobile2:localStorage.mobile,
            pushwoosh:localStorage.pushwoosh,                        
        };
                
        navFactory.base('js/register/');
        navFactory.prefix('register.');
        navFactory.suffix('.html');
        $scope.setUrl= function(url){
            console.log('RegisterController:setUrl');
            
            console.log(navFactory.mapUrl(url));
            $scope.registerUrl = navFactory.mapUrl(url);
        };
        
        $scope.myGoBack = function(){     
            console.log('RegisterControl:myGoBack');

            navFactory.back();

            $scope.setUrl(1);
        };
                
        $scope.saveInfo = function(){
            console.log('RegisterController:saveInfo');

            console.log('RegisterController:register ---Value(s)---');
            console.log($scope.register);
          
            localStorage.nameFirst = $scope.register.nameFirst;
            localStorage.nameLast = $scope.register.nameLast;
            localStorage.email = $scope.register.email1;
            localStorage.mobile = $scope.register.mobile1;
            
            console.log('RegisterController:localStorage ---Save Check---');
            console.log('LocalStorage.fname:'+ localStorage.nameFirst);
            console.log('LocalStorage.lname:' + localStorage.nameFirst);
            console.log('LocalStorage.email:' + localStorage.email);
            console.log('LocalStorage.mobile:' + localStorage.mobile);

            console.log('RegisterController:firebase---Save---');
            fbService.saveRegisterUserData($scope.register.email1,$scope.register);
            
            $scope.myGoBack();
        };
        
        $scope.setUrl(1);        
    }
    
})(); // Prevent global structure from being left behind ( aka logger )
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular
        .module('register')
        .config(RegisterConfig);

    RegisterConfig.$inject = ['$stateProvider'];
    function RegisterConfig ($stateProvider) {
        $stateProvider
            .state('register', {
                url: "/register",
                templateUrl: "js/register/register.html",
                controller: 'RegisterController',
                controllerAS: 'vm'                    
            });
            
    }   
    
})(); // Prevent global structure from being left behind ( aka logger )

/* jshint strict: false, -W117 */
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
     
    angular.module('settings', ['navFactory'])
    .controller('SettingsController', SettingsController);
    
    function SettingsController($scope, navFactory) {
        console.log('SettingsController');
        
        if (window.localStorage.pushNotification === null){
            window.localStorage.pushNotification = 'true';
        }
        console.log(window.localStorage.pushNotification);
        
        $scope.pushVal = function(){
            // localStorage default stores as string
            // this function return boolean value
            return window.localStorage.pushNotification == 'true' ? true : false;
        };
        
        $scope.pushToggle = function(){
            console.log('pushVal()',$scope.pushVal());
            window.localStorage.pushNotification = ($scope.pushVal() === true ? 'false' : 'true');                
            console.log('localstorage:',window.localStorage.pushNotification);
        };        

        navFactory.base('js/settings/');
        navFactory.prefix('settings.');
        navFactory.suffix('.html');
        
        $scope.setUrl= function(url){
            console.log('RegisterController:setUrl');
            
            $scope.settingsUrl = navFactory.mapUrl(url);
        };

        $scope.myGoBack = function(){
            console.log('SettingControl:myGoBack');
            navFactory.back();
        };
        
        $scope.setUrl(1);
        
    }
    
})(); // Prevent global structure from being left behind ( aka logger )
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular
        .module('settings')
        .config(SettingsConfig);

    SettingsConfig.$inject = ['$stateProvider'];
    function SettingsConfig ($stateProvider) {
        $stateProvider
            .state('settings', {
                url: "/settings",
                templateUrl: "js/settings/settings.html",
                controller: 'SettingsController',
                controllerAS: 'vm'                    
            });
    }   
    
})(); // Prevent global structure from being left behind ( aka logger )(function() {

(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';

    angular
        .module('app')
        .config(TabsConfig);

    TabsConfig.$inject = ['$stateProvider','$ionicConfigProvider','$urlRouterProvider'];
    function TabsConfig ($stateProvider,$ionicConfigProvider, $urlRouterProvider) {
        console.log('tabs.config');
        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "js/tabs/tabs.html"
            });
        
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
    
        $urlRouterProvider.otherwise("/tab/about");

    }       
})(); // Prevent global structure from being left behind ( aka logger )(function() {

/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('tmc-about-info', [])
        //
        //  remember uppercased character are prefix by dash(-)
        //
        .directive('tmcAboutInfo',function(){
            return {
                restrict: 'AE',
                scope:{
                    items:'='
                },
                template:'\
    <div class="row" ng-repeat="item in items">\
        <div id="about-info-col1" class="col text-center tmc-about-info-col1" ng-bind-html="item.col1 | filterTrustedHTML"></div>\
        <div id="about-info-col2"class="col text-center" ng-bind-html="item.col2 | filterTrustedHTML"></div>\
    </div>\
                ',
                link:function(scope,element,attrs){
                    console.log('tmc-about-info:link');
                },
                controller:function($scope,$state){
                    console.log('tmc-about-info:controller');
                }
            };
        })
    ;
})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('tmc-phone-long', ['ui.TelFactory'])
        //
        //  remember uppercased character are prefix by dash(-)
        //
    
        .directive('tmcPhoneLong',function(uiTelFactory){
            console.log('tmc-phone-long');
            return {
                scope:{
                    phone:'='
                },
                template: '<div ng-include src="\'js/tmc-phone-long/tmc-phone-long.html\'"></div>',
                link:function(scope,element,attrs){
                    console.log('tmcPhoneLong:');
                    console.log(element);
                    console.log('tmcPhoneLong:'+element[0].childNodes[0].clientWidth);
                    console.log('tmcPhoneLong:'+element.prop('offsetWidth'));
                },
                controller:function($scope,$state, $window, $timeout){   
                    angular.element($window).on('orientationchange',function(e){
                        $scope.$broadcast('orientationchange::orientationchange');
                    });
                    $scope.tmcCall = function(phone) {
                        console.log('tmc-phone-long:tmcCall');
                        uiTelFactory.call(phone);
                    };
    //                alert('tmcPhoneLong:'+window.innerWidth);
                    
                }
            };
        })
    ;
})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('tmc-yos', [])
        //
        //  remember uppercased character are prefix by dash(-)
        //

        .directive('tmcYos',function(){
            console.log('tmc-yos');
            return {
                template: '<div ng-include src="\'js/tmc-yos/yos.html\'"></div>',
                link:function(scope,element,attrs){
                },
                controller:function($scope,$state){
                }
            };
        })
    ;
})(); // Prevent global structure from being left behind ( aka logger )    
/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('ui.twolinetitle', ['fbService'])
        //
        //  remember uppercased character are prefix by dash(-)
        //
        .directive('uiTwoLineTitle',function(){
            console.log('ui-two-line-title');
            return{
            template: '<div ng-include src="\'js/ui-twolinetitle/twoLineTitle.html\'"></div>',          
                /* link: function compile(scope, element, attrs) { */
                link: function (scope, element, attrs) {
                    console.log('ui-two-line-title:link');
                },
                controller:function($scope, $state, $timeout, fbService){
                    console.log('ui-two-line-title:controller');

                    $scope.title = {
                        line1:localStorage.title1,
                        line2:localStorage.title2
                    };
                
                    fbService.getCompany()
                        .then(
                            function handleDataResolve(data){
                                console.log('uiTwoLineTitle:getCompany:handleDataResolve:data');
                                $scope.title = {
                                    line1:localStorage.title1,
                                    line2:localStorage.title2
                                };
                            },
                            function handleDataReject(){
                                console.log('uiTwoLineTitle:getCompany:handlDataReject:Data Not Found');
                            }
                        );                                
                }
            };
        });
})(); // Prevent global structure from being left behind ( aka logger )    
/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    /* 
        remember first character after - has to be uppercased
    */
    angular.module('ux.boxdate',[])    
        //
        //  remember uppercased character are prefix by dash(-)
        //
        .directive('uxBoxdate', function() {
            console.log('ux-boxdate');
            return {
                template: '<div ng-include src="\'js/ux-boxdate/boxDate.html\'"></div>',
                link: function (scope, element, attrs) {
                    console.log('ux-boxdate:link');
                    
                    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December' ];
                                    
                    var d = new Date();
                    
                    scope.boxDate = { 
                        DD:d.getDate() < 10 ? '0'+d.getDate() : d.getDate(),
                        Month: monthNames[d.getMonth()], 
                        YYYY:d.getFullYear()
                    };
                }
            };
	});
})(); // Prevent global structure from being left behind ( aka logger )    angular.module('ux.boxdate', [])

(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('filterPhone',[])
    .filter('filterPhone', function () {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    });
})(); // Prevent global structure from being left behind ( aka logger )    angular.module('filterPhone', [])
/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
    angular.module('filterTrustedHTML', [])
    .filter('filterTrustedHTML', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
})(); // Prevent global structure from being left behind ( aka logger )
/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    
	angular.module('ux.filters', ['filterTrustedHTML','filterPhone']);
})(); // Prevent global structure from being left behind ( aka logger )

/* jshint strict: false, -W117 */
// jshint multistr:true
(function() { // Immediately Invoked Function Expression ( aka Closures )
    'use strict';
    angular.module('ux.header',['ux.boxdate','ui.twolinetitle'])
        //
        //  remember uppercased character are prefix by dash(-)
        //
        .directive('uxHeader',function(){
            console.log('ux-header');
            return {
                template: '<div ng-include src="\'js/ux-header/header.html\'"></div>',
                link: function(scope,element, attrs){
                },
                controller: function ($scope, $ionicTabsDelegate) {
                    console.log("ux-header:controller");
                }
            };            
    });
})(); // Prevent global structure from being left behind ( aka logger )
