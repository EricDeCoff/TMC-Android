angular.module("app",["ionic","ui.router","home.controller","about.controller","contact.controller","ui.controllers","ux.custom","ux.filter","ux.header","ux.footer","ux.contact"]).run(function($ionicPlatform,$timeout){$ionicPlatform.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault(),$timeout(navigator.splashscreen.hide(),1e4)})}).config(function($ionicConfigProvider,$stateProvider,$urlRouterProvider){console.log(".config"),$ionicConfigProvider.tabs.position("bottom"),$ionicConfigProvider.tabs.style("standard"),$stateProvider.state("tabs",{url:"/tab","abstract":!0,templateUrl:"templates/tabs.html"}).state("tabs.home",{url:"/home",views:{"home-tab":{templateUrl:"templates/home.html",controller:"homeCtrl"}}}).state("tabs.about",{url:"/about",views:{"about-tab":{templateUrl:"templates/about.html",controller:"aboutCtrl"}}}).state("tabs.contact",{url:"/contact",views:{"contact-tab":{templateUrl:"templates/contact.html",controller:"contactCtrl"}}}).state("tabs.settings",{url:"/home/settings",views:{"home-tab":{templateUrl:"templates/settings.html"}}}),$urlRouterProvider.otherwise("/tab/about")}),angular.module("app.defaults",[]).factory("defaults",function(){var defaults={title:function(){return"title"}};return defaults}),function(window,document,angular,undefined){"use strict";angular.module("ngFitText",[]).value("config",{debounce:!1,delay:250,loadDelay:10,min:undefined,max:undefined}).directive("fittext",["$timeout","config","fitTextConfig",function($timeout,config,fitTextConfig){return{restrict:"A",scope:!0,link:function(scope,element,attrs){angular.extend(config,fitTextConfig.config),element[0].style.display="inline-block",element[0].style.lineHeight="1";var parent=element.parent(),compressor=attrs.fittext||1,loadDelay=attrs.fittextLoadDelay||config.loadDelay,nl=element[0].querySelectorAll("[fittext-nl],[data-fittext-nl]").length||1,minFontSize=attrs.fittextMin||config.min||Number.NEGATIVE_INFINITY,maxFontSize=attrs.fittextMax||config.max||Number.POSITIVE_INFINITY,resizer=function(){element[0].style.fontSize="10px";var ratio=element[0].offsetHeight/element[0].offsetWidth/nl;element[0].style.fontSize=Math.max(Math.min((parent[0].offsetWidth-6)*ratio*compressor,parseFloat(maxFontSize)),parseFloat(minFontSize))+"px"};$timeout(function(){resizer()},loadDelay),scope.$watch(attrs.ngModel,function(){resizer()}),config.debounce?angular.element(window).bind("resize",config.debounce(function(){scope.$apply(resizer)},config.delay)):angular.element(window).bind("resize",function(){scope.$apply(resizer)})}}}]).provider("fitTextConfig",function(){var self=this;return this.config={},this.$get=function(){var extend={};return extend.config=self.config,extend},this})}(window,document,angular),angular.module("about.controller",[]).controller("aboutCtrl",function($scope,$state){console.log("aboutCtrl");var d1=new Date,d2=new Date(2005,6,1);$scope.serviceYears=Math.ceil(d1.getFullYear()-d2.getFullYear())}),angular.module("contact.controller",["ui.MapFactory"]).controller("contactCtrl",function($scope,$state,uiMapFactory){console.log("contactCtrl"),$scope.contactMap=function(address){console.log("contactCtrl:contactMap"),console.log(uiMapFactory),uiMapFactory.map("431 Sage Street Temple, GA 30179")},$scope.contact={info:"<p>Wow this is the contact view HTML data</p>"},console.log($scope.contact.info)}),angular.module("home.controller",[]).controller("homeCtrl",function($scope,$state,$window){console.log("homeCtrl"),$scope.days=[{name:"Monday",hours:"1 PM - 4 PM"},{name:"Tueday",hours:"9 AM - NOON"},{name:"Wednesday",hours:"9 AM - NOON"},{name:"Thursday",hours:"9 AM - 4 PM"},{name:"Friday",hours:"1 PM - 4 PM"}],$scope.$state=$state}),angular.module("ui.controllers",[]).controller("uiOrientationChange",function($scope,$state,$window){$scope.$state=$state,$window.addEventListener("orientationchange",function(){console.log("ui.controllers:uiOrientationChange"),alert("orientationchange"),$scope.$state.reload()})}),angular.module("ux.contact",[]).directive("uxContactbar",function(){return console.log("ux-contactbar"),{template:'<div class="row"> \r\n    <div class="col col-20 text-left"> \r\n        <a class="button button-light ion-2x ion-ios-telephone button-balanced" \r\n            href="tel://{{ contact_number }}"></a> \r\n    </div> \r\n    <div class="col col-70"> \r\n{{ contact_dphone }}\r\n    </div> \r\n    <div class="col col-20 text-right"> \r\n        <a class="button button-light button-balanced ion-2x ion-ios-navigate" \r\n            href="#" \r\n            ng-click="contactMap(\'{{ contact_address }}\')"> \r\n        </a> \r\n    </div> \r\n</div>',link:function(scope,element,attrs){console.log("ux-contactbar:link"),scope.contact_dphone="770&nbsp;562-9007",scope.contact_number="770-562-9007",scope.contact_address="431 Sage Street, Temple, GA 30179"}}});var tmcCustom=angular.module("ux.custom",[]);tmcCustom.directive("tmcAboutinfo",function(){return{restrict:"AE",scope:{items:"="},template:'\r\n<div class="row" ng-repeat="item in items">\r\n    <div id="about-info-col1" class="col text-center" ng-bind-html="item.col1 | trustedHTML"></div>\r\n    <div id="about-info-col2"class="col text-center" ng-bind-html="item.col2 | trustedHTML"></div>\r\n</div>\r\n            ',link:function(scope,element,attrs){},controller:function($scope,$state){}}}).directive("orientantionchange",function($window){return{link:function(scope){angular.element($window).on("orientationchange",function(e){scope.$broadcast("orientationchange::orientationchange")})}}}).directive("tmcPhoneLong",function(){return{scope:{phone:"="},template:'\r\n<a class="button button-outline icon-left ion-ios-telephone button-balanced" \r\n    href="tel://770-562-9007"\r\n    >{{ phone | tel }} \r\n</a> \r\n            ',link:function(scope,element,attrs){console.log("tmcPhoneLong:"),console.log(element),console.log("tmcPhoneLong:"+element[0].childNodes[0].clientWidth),console.log("tmcPhoneLong:"+window.innerWidth),tmcPhoneLongOrientation=function(){console.log("tmcPhoneLong:orientationchange");var ew=element[0].childNodes[0].clientWidth,sw=window.innerWidth;element[0].childNodes[0].style.left=sw/4-ew/2+"px"},tmcPhoneLongOrientation(),scope.$on("orientationchange::orientationchange",tmcPhoneLongOrientation)},controller:function($scope,$state,$window){angular.element($window).on("orientationchange",function(e){$scope.$broadcast("orientationchange::orientationchange")})}}}).directive("tmcYos",function(){return{template:"<div ng-include src=\"'templates/yos.html'\"></div>",link:function(scope,element,attrs){},controller:function($scope,$state){}}}),angular.module("ux.filter",[]).filter("trustedHTML",["$sce",function($sce){return function(text){return $sce.trustAsHtml(text)}}]).filter("tel",function(){return function(tel){if(!tel)return"";var value=tel.toString().trim().replace(/^\+/,"");if(value.match(/[^0-9]/))return tel;var country,city,number;switch(value.length){case 10:country=1,city=value.slice(0,3),number=value.slice(3);break;case 11:country=value[0],city=value.slice(1,4),number=value.slice(4);break;case 12:country=value.slice(0,3),city=value.slice(3,5),number=value.slice(5);break;default:return tel}return 1==country&&(country=""),number=number.slice(0,3)+"-"+number.slice(3),(country+" ("+city+") "+number).trim()}}),angular.module("ux.footer",[]).directive("uxFooter",function(){return console.log("ux-footer"),{name:"ux-footer",template:'\r\n<ion-footer-bar align-title="left" class="bar-assertive"> \r\n    <div class="full-image text-center"> \r\n        <h3 ng-bind-html="footer_address | trustedHTML"></h3> \r\n    </div> \r\n</ion-footer-bar> \r\n',link:function(scope,element,attrs){scope.footer_address='431 Sage Street <span class="landscape">&bull; Temple, GA 30179</span>'}}}),angular.module("ux.header",[]).directive("uxBoxdate",function(){return console.log("ux-Boxdate"),{template:"<div ng-include src=\"'templates/boxDate.html'\"></div>",link:function(scope,element,attrs){console.log("ux-boxdate:link");var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],d=new Date;scope.boxDate={DD:d.getDate()<10?"0"+d.getDate():d.getDate(),Month:monthNames[d.getMonth()],YYYY:d.getFullYear()}}}}).directive("uiTwoLineTitle",function(){return console.log("ui-Two-Line-Title"),{template:'\r\n<style type="text/css"> \r\n.offsetLine1 { \r\n    left: 50px !important; \r\n    z-index: 0 !important; \r\n} \r\n.offsetLine2 { \r\n    top: 20px !important; \r\n    left: 50px !important; \r\n    z-index: 0 !important; \r\n} \r\n</style> \r\n<div> \r\n    <span ng-click="title_click();" class="title offsetLine1">{{ twolineTitle.line1 }}</span> \r\n    <span ng-click="title_click();" class="title offsetLine2">{{ twolineTitle.line2 }}</span> \r\n</div> \r\n',link:function(scope,element,attrs){console.log("ui-Two-Line-Title:link"),console.log(element),scope.twolineTitle||(scope.twolineTitle={line1:"Pure Awesomeness",line2:"Clickable Title"})},controller:function($scope,$state){console.log("ui-Two-Line-Title:controller"),$scope.title_change=function(title1,title2){$scope.twolineTitle={line1:title1,line2:title2}},$scope.title_click=function(){alert("Title clicked")}}}}).directive("uiButtonSettings",function(){return console.log("ui-ButtonSettings"),{name:"ui-ButtonSettings",template:'<div id="divBtnSettingsTitle"class="title" style="z-index:1"></div> \r\n<div id="btnSettings" class="buttons buttons-right" \r\n     ng-click="btnSettings_click();" \r\n     ng-show="{{ homeSettings }}"> \r\n    <span class="right-buttons"> \r\n        <button class="button button-icon button-clear ion-gear-a"> \r\n        </button> \r\n    </span> \r\n</div>',link:function(scope,element,attrs){console.log("ui-Button-Settings:link")},controller:function($scope,$state,$ionicTabsDelegate){console.log("ui-Button-Setting:controller"),$scope.$state=$state,$scope.btnSettings_click=function(){$state.transitionTo("tabs.settings")},0===$ionicTabsDelegate.selectedIndex()&&($scope.homeSettings=!0)}}}).directive("uxHeader",function(){return console.log("ux-header"),{template:'<ion-header-bar class="bar-positive bar bar-header disable-user-behavior" align-title="center"> \r\n        <ux-Boxdate></ux-Boxdate> \r\n        <ui-Two-Line-Title></ui-Two-Line-Title> \r\n        <ui-Button-Settings></ui-Button-Settings> \r\n</ion-header-bar> \r\n',link:function(scope,element,attrs){scope.twolineTitle={line1:"Pure Awesomeness",line2:"Clickable Title"}},controller:function($scope,$ionicTabsDelegate){console.log("ux-header:controller"),$scope.$watch("title_change",function(e){console.log("title_change:"+e),$scope.title_change("Temple Medical","Clinic")})}}}),angular.module("ui.DeviceFactory",[]).factory("uiDeviceFactory",function(){var uiDeviceFactory={name:"uiDeviceFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},type:function(){console.log(this.name+":deviceType");var deviceType="iPad"==navigator.userAgent.match(/iPad/i)?"iPad":"iPhone"==navigator.userAgent.match(/iPhone/i)?"iPhone":"Android"==navigator.userAgent.match(/Android/i)?"Android":"BlackBerry"==navigator.userAgent.match(/BlackBerry/i)?"BlackBerry":"null";return console.log(deviceType),deviceType}};return uiDeviceFactory}),angular.module("ui.MapFactory",["ui.DeviceFactory"]).factory("uiMapFactory",function(uiDeviceFactory){var uiMapFactory={name:"uiMapFactory",test:function(){console.log(this.name+":test"),alert(this.name+":test (working)")},map:function(address){console.log(this.name+":mapURI");var defaultBase="https://maps.google.com/maps?saddr=My+Location&daddr=",androidBase="geo:0,0?q=",iosBase="http://maps.apple.com/?q=",base=defaultBase,uri=encodeURI(address);switch(console.log(uri),uiDeviceFactory.type().toLowerCase()){case"ipad":case"iphone":base=iosBase;break;case"android":base=androidBase;break;default:base=defaultBase}console.log("window.open:"+base+uri),window.open(base+uri,"_blank","location=yes"),console.log("window.opened")}};return uiMapFactory});