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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _parse_bart = __webpack_require__(1);
	
	var dataObject = new _parse_bart.DataInitializer();
	
	var canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.height = 540;
	canvasEl.width = 490;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DataInitializer = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bart = __webpack_require__(2);
	
	var BART_API = _interopRequireWildcard(_bart);
	
	var _map = __webpack_require__(3);
	
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
	      var $stationEl = void 0;
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
	        $stationEl = $('<li>' + name + '</li>');
	        $stationEl.attr('id', '' + abbr);
	        $stationEl.attr('class', 'truncate');
	        $("#list").append($stationEl);
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
	    }
	  }]);

	  return DataInitializer;
	}();

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SubwayMap = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _animate_list = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SubwayMap = exports.SubwayMap = function () {
	  function SubwayMap(graph, stations) {
	    _classCallCheck(this, SubwayMap);
	
	    this.graph = graph;
	    this.stations = stations;
	    this.stationCircles = {};
	    this.stationLines = [];
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
	    var hover = new _animate_list.ListAnimation(this.stations, this.stationCircles, this.stationLines, graph);
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
	      var firstStation = graphArray[0];
	      // To choose random starting station (causes error sometimes):
	      // let firstStation = graphArray[Math.floor(Math.random() * graphArray.length)];
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
	        this.mapCircle(a, b, i, station);
	        this.stationCircles[station] = [a + 20, b + 20, 2, '#474747'];
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
	
	      this.stationLines.push([x1 + 20, y1 + 20, x2 + 20, y2 + 20]);
	      setTimeout(function () {
	        _this.ctx.beginPath();
	        _this.ctx.moveTo(x1 + 20, y1 + 20);
	        _this.ctx.lineTo(x2 + 20, y2 + 20);
	        _this.ctx.lineWidth = 1;
	        _this.ctx.strokeStyle = '#474747';
	        _this.ctx.stroke();
	      }, 25 * i);
	    }
	  }, {
	    key: "mapCircle",
	    value: function mapCircle(x, y, i) {
	      var _this2 = this;
	
	      setTimeout(function () {
	        _this2.ctx.fillStyle = "#474747";
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ListAnimation = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path_finder = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ListAnimation = exports.ListAnimation = function () {
	  function ListAnimation(stations, circles, lines, graph) {
	    var _this = this;
	
	    _classCallCheck(this, ListAnimation);
	
	    this.stations = stations;
	    this.circles = circles;
	    this.lines = lines;
	    this.addOnHover = this.addOnHover.bind(this);
	    this.drawCircles = this.drawCircles.bind(this);
	    this.drawLines = this.drawLines.bind(this);
	    this.updateList = this.updateList.bind(this);
	    this.canvas = document.getElementsByTagName("canvas")[0];
	    this.ctx = this.canvas.getContext("2d");
	    this.clearCanvas = this.clearCanvas.bind(this);
	    this.startAnimating = this.startAnimating.bind(this);
	    this.updateList();
	    setTimeout(function () {
	      return _this.addOnHover();
	    }, 3000);
	    setTimeout(function () {
	      return _this.startAnimating();
	    }, 3000);
	    setTimeout(function () {
	      _this.pathFinder = new _path_finder.PathFinder(_this.stations, _this.circles, _this.lines, graph);
	    }, 2000);
	  }
	
	  _createClass(ListAnimation, [{
	    key: "updateList",
	    value: function updateList() {
	      var $blankEl = void 0;
	      for (var i = 0; i < 8; i++) {
	        $blankEl = $("<li>BLANK</li>");
	        $blankEl.attr('class', "blank");
	        $("#list").append($blankEl);
	      }
	      for (var i = 0; i < 6; i++) {
	        $blankEl = $("<li>BLANK</li>");
	        $blankEl.attr('class', "blank");
	        $("#list").prepend($blankEl);
	      }
	    }
	  }, {
	    key: "startAnimating",
	    value: function startAnimating() {
	      var _this2 = this;
	
	      setInterval(function () {
	        _this2.clearCanvas();
	        _this2.drawLines();
	        _this2.drawCircles();
	      }, 5);
	    }
	  }, {
	    key: "drawCircles",
	    value: function drawCircles() {
	      var _this3 = this;
	
	      var circle = void 0;
	      Object.keys(this.circles).forEach(function (id) {
	        circle = _this3.circles[id];
	        _this3.ctx.fillStyle = circle[3];
	        _this3.ctx.beginPath();
	        _this3.ctx.arc(circle[0], circle[1], circle[2], 0, 2 * Math.PI, false);
	        _this3.ctx.fill();
	      });
	    }
	  }, {
	    key: "drawLines",
	    value: function drawLines() {
	      var _this4 = this;
	
	      var x1 = void 0,
	          y1 = void 0,
	          x2 = void 0,
	          y2 = void 0;
	      this.lines.forEach(function (line) {
	        var _line = _slicedToArray(line, 4);
	
	        x1 = _line[0];
	        y1 = _line[1];
	        x2 = _line[2];
	        y2 = _line[3];
	
	        _this4.ctx.beginPath();
	        _this4.ctx.moveTo(x1, y1);
	        _this4.ctx.lineTo(x2, y2);
	        _this4.ctx.lineWidth = 1;
	        _this4.ctx.strokeStyle = '#676767';
	        _this4.ctx.stroke();
	      });
	    }
	  }, {
	    key: "clearCanvas",
	    value: function clearCanvas() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	  }, {
	    key: "addOnHover",
	    value: function addOnHover() {
	      var _this5 = this;
	
	      var stations = this.stations;
	      Object.keys(stations).forEach(function (abbr) {
	        $("#" + abbr).mouseover(function () {
	          _this5.circles[abbr][3] = '#00ACC1';
	          for (var i = 0; i < 6; i++) {
	            setTimeout(function () {
	              _this5.circles[abbr][2] = _this5.circles[abbr][2] + 1;
	            }, i * 60);
	          }
	        });
	        $("#" + abbr).mouseout(function () {
	          _this5.circles[abbr][3] = '#676767';
	          for (var i = 0; i < 7; i++) {
	            setTimeout(function () {
	              if (_this5.circles[abbr][2] > 2) {
	                _this5.circles[abbr][2] = _this5.circles[abbr][2] - 1;
	              }
	            }, i * 60);
	          }
	        });
	      });
	    }
	  }]);

	  return ListAnimation;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PathFinder = exports.PathFinder = function () {
	  function PathFinder(stations, circles, lines, graph) {
	    _classCallCheck(this, PathFinder);
	
	    console.log(graph);
	    this.circles = circles;
	    this.stations = stations;
	    this.graph = graph;
	    this.initialInstructions = this.initialInstructions.bind(this);
	    this.addOnClick = this.addOnClick.bind(this);
	    this.selectStation = this.selectStation.bind(this);
	    this.clearPathFinder = this.clearPathFinder.bind(this);
	    this.startSolving = this.startSolving.bind(this);
	    this.clearSearch = this.clearSearch.bind(this);
	    this.highlightTrace = this.highlightTrace.bind(this);
	    this.addCircle = this.addCircle.bind(this);
	    this.solving = false;
	    this.initialInstructions();
	    this.addOnClick();
	    this.destination = undefined;
	    this.origin = undefined;
	
	    this.interval = 40;
	  }
	
	  _createClass(PathFinder, [{
	    key: 'initialInstructions',
	    value: function initialInstructions() {
	      $("#instructions").text('Select origin...');
	    }
	  }, {
	    key: 'addOnClick',
	    value: function addOnClick() {
	      var _this = this;
	
	      var stations = this.stations;
	      Object.keys(stations).forEach(function (abbr) {
	        $('#' + abbr).on('click', function () {
	          if (!_this.solving && _this.stations[abbr] !== _this.destination) {
	            _this.selectStation(abbr);
	            $('#' + abbr).attr('class', 'selected');
	          }
	        });
	      });
	    }
	  }, {
	    key: 'selectStation',
	    value: function selectStation(abbr) {
	      var x = this.circles[abbr][0];
	      var y = this.circles[abbr][1];
	
	      if (this.origin) {
	        // set arrival and start alorithm
	        this.destination = this.stations[abbr];
	        this.solving = true;
	        this.circles['destination'] = [x, y, 6, '#EC407A'];
	        $("#instructions").text('Searching...');
	        $("#route").text(this.origin.name + ' to ' + this.destination.name);
	        this.startSolving();
	      } else {
	        this.origin = this.stations[abbr];
	        this.origin['abbr'] = abbr;
	        console.log(this.origin);
	        this.circles['origin'] = [x, y, 6, '#FFC107'];
	        $("#instructions").text('Select destination...');
	      }
	    }
	  }, {
	    key: 'startSolving',
	    value: function startSolving() {
	      var unvisited = [];
	      var visited = [];
	      var x = void 0,
	          y = void 0;
	      var trace = {};
	      unvisited.push(this.origin['abbr']);
	      var nextStation = void 0;
	      var i = 0;
	      while (nextStation !== this.destination.abbr) {
	        i += 1;
	        nextStation = unvisited[0];
	        visited.push(unvisited[0]);
	        unvisited.shift();
	
	        this.graph[nextStation].forEach(function (newStation) {
	          if (visited.indexOf(newStation) === -1) {
	            trace[newStation] = nextStation;
	            unvisited.push(newStation);
	          }
	        });
	        x = this.circles[nextStation][0];
	        y = this.circles[nextStation][1];
	        this.addCircle(x, y, 5, '#00ACC1', i);
	      }
	
	      this.clearSearch(i, trace);
	    }
	  }, {
	    key: 'clearSearch',
	    value: function clearSearch(j, trace) {
	      var _this2 = this;
	
	      setTimeout(function () {
	        for (var i = 0; i <= j; i++) {
	          delete _this2.circles['zz-' + i];
	        }
	        _this2.highlightTrace(trace, j);
	      }, j * this.interval + 1000);
	    }
	  }, {
	    key: 'clearTrace',
	    value: function clearTrace(j, trace) {
	      var _this3 = this;
	
	      setTimeout(function () {
	        for (var i = 0; i <= j; i++) {
	          if (_this3.circles['zz-' + i]) {
	            delete _this3.circles['zz-' + i];
	          }
	        }
	        $("#instructions").text('Select origin...');
	      }, j * this.interval + 2000);
	    }
	  }, {
	    key: 'highlightTrace',
	    value: function highlightTrace(trace, length) {
	      console.log(this);
	      var dest = this.destination.abbr;
	      var origin = this.origin.abbr;
	      $("#instructions").text('Tracing optimal route...');
	      var nextStation = dest;
	      var x = void 0,
	          y = void 0;
	      var i = 0;
	      while (nextStation !== origin) {
	        i += 1;
	        x = this.circles[nextStation][0];
	        y = this.circles[nextStation][1];
	        this.addCircle(x, y, 5, '#FFC107', length - i);
	        nextStation = trace[nextStation];
	      }
	      i += 1;
	      x = this.circles[nextStation][0];
	      y = this.circles[nextStation][1];
	      this.addCircle(x, y, 5, '#FFC107', length - i);
	      this.clearPathFinder();
	      this.clearTrace(length, trace);
	    }
	  }, {
	    key: 'addCircle',
	    value: function addCircle(x, y, r, color, i) {
	      var _this4 = this;
	
	      setTimeout(function () {
	        _this4.circles['zz-' + i] = [x, y, r, color];
	      }, i * this.interval);
	    }
	  }, {
	    key: 'clearPathFinder',
	    value: function clearPathFinder() {
	      this.circles['destination'] = [0, 0, 0, '#EC407A'];
	      this.circles['origin'] = [0, 0, 0, '#FFC107'];
	
	      $("#route").text('');
	      this.destination = undefined;
	      this.origin = undefined;
	      this.solving = false;
	      Object.keys(this.stations).forEach(function (abbr) {
	        $('#' + abbr).removeClass('selected');
	      });
	    }
	  }]);

	  return PathFinder;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map