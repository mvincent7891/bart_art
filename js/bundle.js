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

	"use strict";
	
	var _initialize_data = __webpack_require__(181);
	
	var dataObject = new _initialize_data.DataInitializer();
	
	var canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.height = 540;
	canvasEl.width = 490;

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
	
	var _map = __webpack_require__(182);
	
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
	    this.constructGraph = this.constructGraph.bind(this);
	    this.graph = {};
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
	        var lat = parseFloat($(station).find('gtfs_latitude').html());
	        var lng = parseFloat($(station).find('gtfs_longitude').html());
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
	        this.constructGraph();
	      }
	    }
	  }, {
	    key: 'constructGraph',
	    value: function constructGraph() {
	      var graph = this.graph;
	      Object.keys(this.stations).forEach(function (abbr) {
	        graph[abbr] = [];
	      });
	      var routeConfig = this.routeConfig;
	      Object.keys(routeConfig).forEach(function (routeId) {
	        var route = routeConfig[routeId];
	        route.slice(0, route.length - 1).forEach(function (station, index) {
	          if (!graph[route[index]].includes(route[index + 1])) {
	            graph[route[index]].push(route[index + 1]);
	          }
	        });
	      });
	      var map = new _map.SubwayMap(graph, this.stations);
	      console.log(graph);
	    }
	  }]);

	  return DataInitializer;
	}();

/***/ },

/***/ 182:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SubwayMap = exports.SubwayMap = function () {
	  function SubwayMap(graph, stations) {
	    _classCallCheck(this, SubwayMap);
	
	    this.graph = graph;
	    this.stations = stations;
	    this.extractCoordLimits = this.extractCoordLimits.bind(this);
	    this.mapStations = this.mapStations.bind(this);
	    this.mapCircle = this.mapCircle.bind(this);
	    this.drawLine = this.drawLine.bind(this);
	    this.canvas = document.getElementsByTagName("canvas")[0];
	    this.ctx = this.canvas.getContext("2d");
	    this.minX = 0;
	    this.minY = 0;
	    this.maxY = parseInt(this.canvas.height) - 40;
	    this.maxX = parseInt(this.canvas.width) - 40;
	    this.extractCoordLimits();
	    this.mapStations();
	  }
	
	  _createClass(SubwayMap, [{
	    key: "mapStations",
	    value: function mapStations() {
	      var x = void 0,
	          y = void 0,
	          a = void 0,
	          b = void 0,
	          x2 = void 0,
	          y2 = void 0,
	          c = void 0,
	          d = void 0;
	      var graphArray = Object.keys(this.graph);
	      var graph = this.graph;
	      var firstStation = graphArray[Math.floor(Math.random() * graphArray.length)];
	      var stationsToDraw = [[firstStation, undefined]];
	      var stationsDrawn = [];
	      var i = -1;
	      var station = void 0;
	      while (stationsToDraw.length > 0) {
	        station = stationsToDraw[0][0];
	        i += 1;
	        x = this.stations[station].lng;
	        y = this.stations[station].lat;
	
	        var _mapCoords = this.mapCoords(x, y);
	
	        var _mapCoords2 = _slicedToArray(_mapCoords, 2);
	
	        a = _mapCoords2[0];
	        b = _mapCoords2[1];
	
	        if (stationsToDraw[0][1]) {
	          x2 = this.stations[stationsToDraw[0][1]].lng;
	          y2 = this.stations[stationsToDraw[0][1]].lat;
	
	          var _mapCoords3 = this.mapCoords(x2, y2);
	
	          var _mapCoords4 = _slicedToArray(_mapCoords3, 2);
	
	          c = _mapCoords4[0];
	          d = _mapCoords4[1];
	
	          this.drawLine(a, b, c, d, i);
	        }
	        this.mapCircle(a, b, i);
	        stationsDrawn.push(stationsToDraw[0][0]);
	        graph[station].forEach(function (newStation) {
	          if (stationsDrawn.indexOf(newStation) === -1) {
	            stationsToDraw.push([newStation, station]);
	          }
	        });
	        stationsToDraw = stationsToDraw.slice(1);
	      }
	    }
	  }, {
	    key: "drawLine",
	    value: function drawLine(x1, y1, x2, y2, i) {
	      var _this = this;
	
	      setTimeout(function () {
	        _this.ctx.beginPath();
	        _this.ctx.moveTo(x1 + 20, y1 + 20);
	        _this.ctx.lineTo(x2 + 20, y2 + 20);
	        _this.ctx.lineWidth = 1;
	        _this.ctx.strokeStyle = '#dddddd';
	        _this.ctx.stroke();
	      }, 25 * i);
	    }
	  }, {
	    key: "mapCircle",
	    value: function mapCircle(x, y, i) {
	      var _this2 = this;
	
	      setTimeout(function () {
	        _this2.ctx.fillStyle = "#676767";
	        _this2.ctx.beginPath();
	        _this2.ctx.arc(x + 20, y + 20, 2, 0, 2 * Math.PI, false);
	        _this2.ctx.fill();
	      }, 25 * i + 2 * i);
	    }
	  }, {
	    key: "extractCoordLimits",
	    value: function extractCoordLimits() {
	      var _this3 = this;
	
	      // Pull minimum and maximum lat/lng for normalizing map on canvas
	      var stations = this.stations;
	      var stationNames = Object.keys(this.stations);
	      var firstStation = stations[stationNames[0]];
	      this.minLat = firstStation.lat;
	      this.maxLat = firstStation.lat;
	      this.minLng = firstStation.lng;
	      this.maxLng = firstStation.lng;
	      var newStation = void 0;
	      stationNames.forEach(function (name) {
	        newStation = stations[name];
	        if (newStation.lat > _this3.maxLat) {
	          _this3.maxLat = newStation.lat;
	        } else if (newStation.lat < _this3.minLat) {
	          _this3.minLat = newStation.lat;
	        }
	        if (newStation.lng > _this3.maxLng) {
	          _this3.maxLng = newStation.lng;
	        } else if (newStation.lng < _this3.minLng) {
	          _this3.minLng = newStation.lng;
	        }
	      });
	    }
	  }, {
	    key: "mapCoords",
	    value: function mapCoords(lng, lat) {
	      // Pass in (lat, lng); return (x, y) coords for canvas element
	      var lngRange = this.maxLng - this.minLng;
	      var latRange = this.maxLat - this.minLat;
	      var xCoord = Math.floor(this.maxX * (lng - this.minLng) / lngRange);
	      var yCoord = Math.floor(this.maxY * (lat - this.minLat) / latRange);
	
	      return [xCoord, this.maxY - yCoord];
	    }
	  }]);

	  return SubwayMap;
	}();

/***/ }

/******/ });
//# sourceMappingURL=bundle.js.map