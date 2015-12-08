angular.module("app",["ionic","ionic.service.core","ui.router","ngCordova","pushwoosh.factory","home","about","contact","ui.controllers","ux.custom","ux.filters","ux.header","ux.footer","ux.contactbar"]).run(function($ionicPlatform,$timeout,pushwooshFactory){$ionicPlatform.ready(function(){navigator.splashscreen&&navigator.splashscreen.show(),window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault(),navigator.splashscreen&&$timeout(function(){console.log("navigator.splashscreen.hide()"),navigator.splashscreen.hide()},1e4),console.log("Initialize Ionic Push");var push=new Ionic.Push({debug:!0});console.log("Get Device Token"),push.register(function(token){console.log("Device token:",token.token)}),console.log("Initalize Ionic User"),Ionic.io(),console.log("Ionic.User.current");var user=Ionic.User.current();user.id||(user.id=Ionic.User.anonymousId()),console.log("Ionic user.id:"+user.id);var today=new Date,dd=today.getDate(),mm=today.getMonth()+1,yyyy=today.getFullYear();10>dd&&(dd="0"+dd),10>mm&&(mm="0"+mm),today=dd+"/"+mm+"/"+yyyy,console.log("Ionic user.active:"+today),user.set("active",today),console.log("Ionic user.name:Eric DeCoff"),user.set("name","Eric DeCoff"),console.log("Ionic user.email","ericdecoff@gmail.com"),user.set("email","ericdecoff@gmail.com"),console.log("user.save()"),user.save(),console.log("Ionic ---SAVE CHECK---"),console.log("Ionic user.active:"+user.get("active")),console.log("Ionic user.name:"+user.get("name")),console.log("Ionic user.email:"+user.get("email")),pushwooshFactory.initialize()})}).config(function($ionicConfigProvider,$stateProvider,$urlRouterProvider){console.log(".config"),$ionicConfigProvider.tabs.position("bottom"),$ionicConfigProvider.tabs.style("standard"),$stateProvider.state("tabs",{url:"/tab","abstract":!0,templateUrl:"templates/tabs.html"}).state("tabs.settings",{url:"/home/settings",views:{"home-tab":{templateUrl:"templates/settings.html"}}}),$urlRouterProvider.otherwise("/tab/about")}),function(window,document,angular,undefined){"use strict";angular.module("ngFitText",[]).value("config",{debounce:!1,delay:250,loadDelay:10,min:undefined,max:undefined}).directive("fittext",["$timeout","config","fitTextConfig",function($timeout,config,fitTextConfig){return{restrict:"A",scope:!0,link:function(scope,element,attrs){angular.extend(config,fitTextConfig.config),element[0].style.display="inline-block",element[0].style.lineHeight="1";var parent=element.parent(),compressor=attrs.fittext||1,loadDelay=attrs.fittextLoadDelay||config.loadDelay,nl=element[0].querySelectorAll("[fittext-nl],[data-fittext-nl]").length||1,minFontSize=attrs.fittextMin||config.min||Number.NEGATIVE_INFINITY,maxFontSize=attrs.fittextMax||config.max||Number.POSITIVE_INFINITY,resizer=function(){element[0].style.fontSize="10px";var ratio=element[0].offsetHeight/element[0].offsetWidth/nl;element[0].style.fontSize=Math.max(Math.min((parent[0].offsetWidth-6)*ratio*compressor,parseFloat(maxFontSize)),parseFloat(minFontSize))+"px"};$timeout(function(){resizer()},loadDelay),scope.$watch(attrs.ngModel,function(){resizer()}),config.debounce?angular.element(window).bind("resize",config.debounce(function(){scope.$apply(resizer)},config.delay)):angular.element(window).bind("resize",function(){scope.$apply(resizer)})}}}]).provider("fitTextConfig",function(){var self=this;return this.config={},this.$get=function(){var extend={};return extend.config=self.config,extend},this})}(window,document,angular),angular.module("about",["ui.TelFactory"]).controller("AboutController",function($scope,$state,uiTelFactory){console.log("AboutController");var d1=new Date,d2=new Date(2005,6,1);$scope.serviceYears=Math.ceil(d1.getFullYear()-d2.getFullYear())}),function(){"use strict";function AboutConfig($stateProvider){$stateProvider.state("tabs.about",{url:"/about",views:{"about-tab":{templateUrl:"templates/about/about.html",controller:"AboutController",controllerAS:"vm"}}})}angular.module("about").config(AboutConfig),AboutConfig.$inject=["$stateProvider"]}(),angular.module("contact",["ui.MapFactory","ui.TelFactory"]).controller("ContactController",function($scope,$state,uiMapFactory,uiTelFactory){console.log("ContactController"),$scope.contactMap=function(address){console.log("ContactController:contactMap"),console.log(uiMapFactory),uiMapFactory.map(address)},$scope.contactCall=function(number){console.log("ContactController:contactCall"),console.log(uiTelFactory),uiTelFactory.call(number)},$scope.contact={info:"<p>Wow this is the contact view HTML data</p>"},console.log($scope.contact.info)}),function(){"use strict";function ContactConfig($stateProvider,$cordovaInAppBrowserProvider){var option={location:"yes",clearcache:"yes",toolbar:"no"};$cordovaInAppBrowserProvider.setDefaultOptions(option),$stateProvider.state("tabs.contact",{url:"/contact",views:{"contact-tab":{templateUrl:"templates/contact/contact.html",controller:"ContactController",controllerAS:"vm"}}})}angular.module("contact").config(ContactConfig),ContactConfig.$inject=["$stateProvider","$cordovaInAppBrowserProvider"]}(),angular.module("ui.controllers",[]).controller("uiOrientationChange",function($scope,$state,$window){$scope.$state=$state,$window.addEventListener("orientationchange",function(){console.log("ui.controllers:uiOrientationChange"),alert("orientationchange"),$scope.$state.reload()})}),angular.module("ui.buttonsettings",[]).directive("uiButtonSettings",function(){return console.log("ui-Button-Settings"),{template:"<div ng-include src=\"'templates/settingsButton.html'\"></div>",link:function(scope,element,attrs){console.log("ui-Button-Settings:link")},controller:function($scope,$state,$ionicTabsDelegate){console.log("ui-Button-Setting:controller"),$scope.$state=$state,$scope.btnSettings_click=function(){$state.transitionTo("tabs.settings")},0===$ionicTabsDelegate.selectedIndex()&&($scope.homeSettings=!0)}}});var tmcCustom=angular.module("ux.custom",["tmc-about-info","tmc-phone-long","tmc-yos"]);tmcCustom.directive("orientantionchange",function($window){return{link:function(scope){angular.element($window).on("orientationchange",function(e){scope.$broadcast("orientationchange::orientationchange")})}}}),angular.module("pushwoosh.factory",[]).factory("pushwooshFactory",function(){var pushwooshFactory={name:"pushwooshFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},googleProjectNumber:function(){return"443338124425"},pushwooshID:function(){return"AA471-6DDC3"},initialize:function(type){console.log("pushwooshFactory.initialize"),console.log("Initialize Pushwoosh Notification"),console.log("****",ionic.Platform.platform(),"***");try{switch(ionic.Platform.platform().toLowerCase()){case"android":pushwooshFactory.androidHandler();break;case"ios":pushwooshFactory.iosHandler();break;default:console.warn("unhandled platform: "+device.platform.toLowerCase())}}catch(err){txt="There was an error initializing Pushwoosh plugin.\n\n",txt+="Error description: "+err.message+"\n\n",console.warn(txt)}return""},androidHandler:function(){console.log("pushwooshFactory.androidPushHandler"),console.log("Initialize Pushwoosh plugin"),console.log("com.pushwoosh.plugins.pushwoosh.PushNotification");var pushNotification=cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");console.log("Pushwoosh plugin config ( Android )"),pushNotification.onDeviceReady({projectid:pushwooshFactory.googleProjectNumber(),pw_appid:pushwooshFactory.pushwooshID()}),document.addEventListener("push-notification",function(event){var title=event.notification.title,userData=event.notification.userdata;"undefined"!=typeof userData&&console.warn("user data: "+JSON.stringify(userData)),alert(title)}),pushNotification.registerDevice(function(status){console.log("Pushwoosh registration success");var pushToken=status;console.warn("Pushwoosh token: "+pushToken)},function(status){console.log("Pushwoosh registration failure"),console.warn(JSON.stringify(["failed to register ",status]))})},iosHandler:function(){console.log("pushwooshFactory.iosHandler"),console.log("Initialize Pushwoosh plugin"),console.log("com.pushwoosh.plugins.pushwoosh.PushNotification");var pushNotification=cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");console.log("Pushwoosh reset badge number"),pushNotification.setApplicationIconBadgeNumber(0),document.addEventListener("push-notification",function(event){var notification=event.notification;alert(notification.aps.alert),pushNotification.setApplicationIconBadgeNumber(0)}),console.log("Pushwoosh plugin config ( iOS )"),pushNotification.onDeviceReady({pw_appid:pushwooshFactory.pushwooshID()}),pushNotification.registerDevice(function(status){console.log("Pushwoosh registration success");var deviceToken=status.deviceToken;console.warn("registerDevice: "+deviceToken)},function(status){console.log("Pushwoosh registration failure"),console.warn("failed to register : "+JSON.stringify(status))})}};return pushwooshFactory}),angular.module("ui.DeviceFactory",[]).factory("uiDeviceFactory",function(){var uiDeviceFactory={name:"uiDeviceFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},type:function(){console.log(this.name+":deviceType");var deviceType="iPad"==navigator.userAgent.match(/iPad/i)?"iPad":"iPhone"==navigator.userAgent.match(/iPhone/i)?"iPhone":"Android"==navigator.userAgent.match(/Android/i)?"Android":"BlackBerry"==navigator.userAgent.match(/BlackBerry/i)?"BlackBerry":"null";return console.log(deviceType),deviceType}};return uiDeviceFactory}),angular.module("ui.MapFactory",["ui.DeviceFactory"]).factory("uiMapFactory",function(uiDeviceFactory,$cordovaInAppBrowser){var uiMapFactory={name:"uiMapFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},map:function(address){console.log(this.name+":map");var defaultBase="https://maps.google.com/maps?saddr=My+Location&daddr=",androidBase="geo:0,0?q=",iosBase="http://maps.apple.com/?q=",base=defaultBase,uri=encodeURI(address);switch(console.log(uri),uiDeviceFactory.type().toLowerCase()){case"ipad":case"iphone":base=iosBase;break;case"android":base=androidBase;break;default:base=defaultBase}console.log("$cordovaInAppBrowser:"+base+uri);var option={location:"yes",clearcache:"yes",toolbar:"no"};$cordovaInAppBrowser.open(base+uri,"_system",option),console.log("$cordovaInAppBrowser.opened")}};return uiMapFactory}),angular.module("ui.TelFactory",[]).factory("uiTelFactory",function($cordovaInAppBrowser){var uiTelFactory={name:"uiTelFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},call:function(number){console.log(this.name+":call");var uri=encodeURI("tel:"+number);console.log(uri);var option={location:"yes",clearcache:"yes",toolbar:"no"};console.log("$cordovaInAppBrowser:"+uri),$cordovaInAppBrowser.open(uri,"_system",option),console.log("$cordovaInAppBrowser.opened")}};return uiTelFactory}),angular.module("home",[]).controller("HomeController",function($scope,$state,$window){console.log("HomeController"),$scope.days=[{name:"Monday",hours:"1 PM - 4 PM"},{name:"Tueday",hours:"9 AM - NOON"},{name:"Wednesday",hours:"9 AM - NOON"},{name:"Thursday",hours:"9 AM - 4 PM"},{name:"Friday",hours:"1 PM - 4 PM"}],$scope.$state=$state}),function(){"use strict";function HomeConfig($stateProvider){$stateProvider.state("tabs.home",{url:"/home",views:{"home-tab":{templateUrl:"templates/home/home.html",controller:"HomeController",controllerAS:"vm"}}})}angular.module("home").config(HomeConfig),HomeConfig.$inject=["$stateProvider"]}(),angular.module("tmc-about-info",[]).directive("tmcAboutInfo",function(){return{restrict:"AE",scope:{items:"="},template:'<div class="row" ng-repeat="item in items">    <div id="about-info-col1" class="col text-center tmc-about-info-col1" ng-bind-html="item.col1 | filterTrustedHTML"></div>    <div id="about-info-col2"class="col text-center" ng-bind-html="item.col2 | filterTrustedHTML"></div></div>            ',link:function(scope,element,attrs){},controller:function($scope,$state){}}}),angular.module("tmc-phone-long",["ui.TelFactory"]).directive("tmcPhoneLong",function(uiTelFactory){return{scope:{phone:"="},template:"<div ng-include src=\"'templates/tmc-phone-long/tmc-phone-long.html'\"></div>",link:function(scope,element,attrs){console.log("tmcPhoneLong:"),console.log(element),console.log("tmcPhoneLong:"+element[0].childNodes[0].clientWidth),console.log("tmcPhoneLong:"+element.prop("offsetWidth"))},controller:function($scope,$state,$window,$timeout){angular.element($window).on("orientationchange",function(e){$scope.$broadcast("orientationchange::orientationchange")}),$scope.tmcCall=function(phone){console.log("tmc-phone-long:tmcCall"),uiTelFactory.call(phone)}}}}),angular.module("tmc-yos",[]).directive("tmcYos",function(){return{template:"<div ng-include src=\"'templates/tmc-yos/yos.html'\"></div>",link:function(scope,element,attrs){},controller:function($scope,$state){}}}),angular.module("ui.twolinetitle",[]).directive("uiTwoLineTitle",function(){return console.log("ui-Two-Line-Title"),{template:"<div ng-include src=\"'templates/ui-twolinetitle/twoLineTitle.html'\"></div>",link:function(scope,element,attrs){console.log("ui-Two-Line-Title:link"),console.log(element),scope.twolineTitle||(scope.twolineTitle={line1:"Pure Awesomeness",line2:"Clickable Title"})},controller:function($scope,$state){console.log("ui-Two-Line-Title:controller"),$scope.title_change=function(title1,title2){$scope.twolineTitle={line1:title1,line2:title2}},$scope.title_click=function(){alert("Title clicked")}}}}),angular.module("ux.boxdate",[]).directive("uxBoxdate",function(){return console.log("ux-Boxdate"),{template:"<div ng-include src=\"'templates/ux-boxdate/boxDate.html'\"></div>",link:function(scope,element,attrs){console.log("ux-boxdate:link");var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],d=new Date;scope.boxDate={DD:d.getDate()<10?"0"+d.getDate():d.getDate(),Month:monthNames[d.getMonth()],YYYY:d.getFullYear()}}}}),angular.module("ux.contactbar",[]).directive("uxContactBar",function(){return console.log("ux-Contact-Bar"),{template:"<div ng-include src=\"'templates/ux-contactbar/ux.contactbar.html'\"></div>",link:function(scope,element,attrs){console.log("ux-contactbar:link"),scope.contact_dphone="770 562-9007",scope.contact_number="770-562-9007",scope.contact_address="431 Sage Street, Temple, GA 30179"}}}),angular.module("filterPhone",[]).filter("filterPhone",function(){return function(tel){if(!tel)return"";var value=tel.toString().trim().replace(/^\+/,"");if(value.match(/[^0-9]/))return tel;var country,city,number;switch(value.length){case 10:country=1,city=value.slice(0,3),number=value.slice(3);break;case 11:country=value[0],city=value.slice(1,4),number=value.slice(4);break;case 12:country=value.slice(0,3),city=value.slice(3,5),number=value.slice(5);break;default:return tel}return 1==country&&(country=""),number=number.slice(0,3)+"-"+number.slice(3),(country+" ("+city+") "+number).trim()}}),angular.module("filterTrustedHTML",[]).filter("filterTrustedHTML",["$sce",function($sce){return function(text){return $sce.trustAsHtml(text)}}]),angular.module("ux.filters",["filterTrustedHTML","filterPhone"]),angular.module("ux.footer",[]).directive("uxFooter",function(){return console.log("ux-footer"),{name:"ux-footer",template:'<ion-footer-bar align-title="left" class="bar-assertive">     <div class="full-image text-center">         <h3 ng-bind-html="footer_address | filterTrustedHTML"></h3>     </div> </ion-footer-bar>  ',link:function(scope,element,attrs){scope.footer_address='431 Sage Street <span class="landscape">&bull; Temple, GA 30179</span>'}}}),angular.module("ux.header",["ux.boxdate","ui.twolinetitle","ui.buttonsettings"]).directive("uxHeader",function(){return console.log("ux-header"),{template:'<ion-header-bar class="bar-positive bar bar-header disable-user-behavior" align-title="center">         <ux-Boxdate></ux-Boxdate>         <ui-Two-Line-Title></ui-Two-Line-Title>         <ui-Button-Settings></ui-Button-Settings> </ion-header-bar>  ',link:function(scope,element,attrs){scope.twolineTitle={line1:"Pure Awesomeness",line2:"Clickable Title"}},controller:function($scope,$ionicTabsDelegate){console.log("ux-header:controller"),$scope.$watch("title_change",function(e){console.log("title_change:"+e),$scope.title_change("Temple Medical","Clinic")})}}});