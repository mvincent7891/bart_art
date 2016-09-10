/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _initialize_data = __webpack_require__(181);
	
	(0, _initialize_data.initializeData)();

/***/ },

/***/ 2:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var fetchStationData = exports.fetchStationData = function fetchStationData(success) {
	  $.ajax({
	    url: 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V',
	    method: 'GET',
	    success: success
	  });
	};
	
	var fetchRouteData = exports.fetchRouteData = function fetchRouteData(success) {
	  $.ajax({
	    url: 'http://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V',
	    method: 'GET',
	    success: success
	  });
	};

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initializeData = undefined;
	
	var _bart = __webpack_require__(2);
	
	var BART_API = _interopRequireWildcard(_bart);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var stationParser = function stationParser(message) {
	  var stations = {};
	  $(message).find('station').each(function (idx, station) {
	    var abbr = $(station).find('abbr').html();
	    var name = $(station).find('name').html();
	    var lat = $(station).find('gtfs_latitude').html();
	    var lng = $(station).find('gtfs_longitude').html();
	    var address = $(station).find('address').html();
	    var city = $(station).find('city').html();
	    var county = $(station).find('county').html();
	    var state = $(station).find('state').html();
	    var zipcode = $(station).find('zipcode').html();
	    var newStation = { abbr: abbr, name: name, lat: lat, lng: lng, address: address,
	      city: city, county: county, state: state, zipcode: zipcode };
	    stations[abbr] = newStation;
	  });
	  // console.log(stations);
	};
	
	var routeParser = function routeParser(message) {
	  var routes = {};
	  $(message).find('route').each(function (idx, route) {
	    var abbr = $(route).find('abbr').html();
	    var name = $(route).find('name').html();
	    var routeID = $(route).find('routeID').html();
	    var number = $(route).find('number').html();
	    var color = $(route).find('color').html();
	    var newRoute = { abbr: abbr, name: name, routeID: routeID, number: number, color: color };
	    routes[routeID] = newRoute;
	  });
	  console.log(routes);
	};
	
	var initializeData = exports.initializeData = function initializeData() {
	  BART_API.fetchRouteData(routeParser);
	  BART_API.fetchStationData(stationParser);
	};

/***/ }

/******/ });
//# sourceMappingURL=bundle.js.map