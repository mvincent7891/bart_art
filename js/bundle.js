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
	
	var dataObject = new _initialize_data.DataInitializer();

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
	
	var fetchRoutes = exports.fetchRoutes = function fetchRoutes(success) {
	  $.ajax({
	    url: 'http://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V',
	    method: 'GET',
	    success: success
	  });
	};
	
	var fetchRouteData = exports.fetchRouteData = function fetchRouteData(success, number) {
	  $.ajax({
	    url: 'http://api.bart.gov/api/route.aspx?cmd=routeinfo&route=' + number + '&key=MW9S-E7SL-26DU-VV8V',
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
	exports.DataInitializer = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bart = __webpack_require__(2);
	
	var BART_API = _interopRequireWildcard(_bart);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataInitializer = exports.DataInitializer = function () {
	  function DataInitializer() {
	    _classCallCheck(this, DataInitializer);
	
	    this.stations = {};
	    this.routes = {};
	    this.routeConfig = {};
	    this.dataFetcher = this.dataFetcher.bind(this);
	    this.stationParser = this.stationParser.bind(this);
	    this.routesParser = this.routesParser.bind(this);
	    this.routeParser = this.routeParser.bind(this);
	    this.dataFetcher();
	  }
	
	  _createClass(DataInitializer, [{
	    key: 'dataFetcher',
	    value: function dataFetcher() {
	      BART_API.fetchRoutes(this.routesParser);
	      BART_API.fetchStationData(this.stationParser);
	    }
	  }, {
	    key: 'stationParser',
	    value: function stationParser(message) {
	      var stations = this.stations;
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
	    }
	  }, {
	    key: 'routesParser',
	    value: function routesParser(message) {
	      var routes = this.routes;
	      var routeParser = this.routeParser;
	      $(message).find('route').each(function (idx, route) {
	        var abbr = $(route).find('abbr').html();
	        var name = $(route).find('name').html();
	        var routeID = $(route).find('routeID').html();
	        var number = $(route).find('number').html();
	        var color = $(route).find('color').html();
	        var newRoute = { abbr: abbr, name: name, routeID: routeID, number: number, color: color };
	        BART_API.fetchRouteData(routeParser, number);
	        routes[routeID] = newRoute;
	      });
	    }
	  }, {
	    key: 'routeParser',
	    value: function routeParser(message) {
	      var number = $(message).find('number').html();
	      var stations = [];
	      $(message).find('station').each(function (idx, station) {
	        stations.push($(station).html());
	      });
	      this.routeConfig[number] = stations;
	      if (Object.keys(this.routeConfig).length === Object.keys(this.routes).length) {
	        console.log(this.routeConfig);
	      }
	    }
	  }]);

	  return DataInitializer;
	}();

/***/ }

/******/ });
//# sourceMappingURL=bundle.js.map