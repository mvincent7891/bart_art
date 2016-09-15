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
	
	var _parse_nycmta = __webpack_require__(1);
	
	var _parse_bart = __webpack_require__(44);
	
	var dataObject = void 0;
	var loadMap = function loadMap(selector) {
	  $('#modal').attr('class', 'closed');
	  $('#modal').removeClass('open');
	  $('#overlay').attr('class', 'closed');
	  $('#overlay').removeClass('open');
	  $('#footer').removeClass('closed');
	  $(changeCity).text('CHANGE');
	  if (selector) {
	    dataObject = new _parse_bart.DataInitializerBART();
	  } else {
	    dataObject = new _parse_nycmta.DataInitializerNYC();
	  }
	};
	
	var selectNYC = $('#ny');
	$(selectNYC).on('click', loadMap.bind(null, false));
	
	var selectSF = $('#sf');
	$(selectSF).on('click', loadMap.bind(null, true));
	
	var changeCity = $('#change');
	$(changeCity).on('click', function () {
	  return location.reload();
	});
	
	var canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.height = 640;
	canvasEl.width = 540;

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DataInitializerNYC = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _nycmta = __webpack_require__(2);
	
	var NYC_API = _interopRequireWildcard(_nycmta);
	
	var _map = __webpack_require__(3);
	
	var _routes = __webpack_require__(41);
	
	var _stops = __webpack_require__(42);
	
	var _transfers = __webpack_require__(43);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataInitializerNYC = exports.DataInitializerNYC = function () {
	  function DataInitializerNYC() {
	    _classCallCheck(this, DataInitializerNYC);
	
	    $("#title").text('New York City, NY - MTA');
	    this.routes = {};
	    this.stations = {};
	    this.stationNames = {};
	    this.routeConfig = {};
	    this.graph = {};
	    this.stationParser = this.stationParser.bind(this);
	    this.routesParser = this.routesParser.bind(this);
	    this.routesParser = this.routesParser.bind(this);
	    // this.dataFetcher();
	    this.routesParser();
	    this.stationParser();
	    this.constructGraph();
	  }
	
	  _createClass(DataInitializerNYC, [{
	    key: 'dataFetcher',
	    value: function dataFetcher() {
	      // NYC_API.fetchStationData(this.stationParser);
	    }
	  }, {
	    key: 'stationParser',
	    value: function stationParser() {
	      var _this = this;
	
	      var stations = this.stations;
	      var $stationEl = void 0;
	      var rawStopsData = (0, _stops.returnStops)().split('\n');
	      var stopsHeaders = rawStopsData[0].split(',');
	      rawStopsData.slice(1).forEach(function (rawStop) {
	        var stop = rawStop.split(',');
	        var name = stop[2];
	        var lat = parseFloat(stop[4]);
	        var lng = parseFloat(stop[5]);
	        var abbr = stop[9];
	        var newStation = { abbr: abbr, name: name, lat: lat, lng: lng };
	        if (!stations[abbr]) {
	          stations[abbr] = newStation;
	          if (!_this.stationNames[name]) {
	            _this.stationNames[name] = newStation;
	            $stationEl = $('<li>' + name + '</li>');
	            $stationEl.attr('id', '' + abbr);
	            $stationEl.attr('class', 'truncate');
	            $("#list").append($stationEl);
	          }
	        }
	      });
	    }
	  }, {
	    key: 'routesParser',
	    value: function routesParser(message) {
	      var routes = this.routes;
	      var routeParser = this.routeParser;
	      var rawRoutesData = (0, _routes.returnRoutes)().split('\n');
	      var routesHeaders = rawRoutesData[0].split(',');
	      rawRoutesData.slice(1).forEach(function (rawRoute) {
	        var route = rawRoute.split(',');
	        var routeID = route[0].slice(1);
	        var abbr = route[2];
	        var name = route[3];
	        var newRoute = { abbr: abbr, name: name, routeID: routeID };
	        routes[routeID] = newRoute;
	      });
	      // $(message).find('route').each((idx, route) => {
	      //   const abbr = $(route).find('abbr').html();
	      //   const name = $(route).find('name').html();
	      //   const routeID = $(route).find('routeID').html();
	      //   const number = $(route).find('number').html();
	      //   const color = $(route).find('color').html();
	      //   const newRoute = { abbr, name, routeID, number, color };
	      //   BART_API.fetchRouteData(routeParser, number);
	      //   routes[routeID] = newRoute;
	      // });
	    }
	  }, {
	    key: 'routeParser',
	    value: function routeParser(message) {
	
	      // const number = $(message).find('number').html();
	      // const stations = [];
	      // $(message).find('station').each((idx, station) => {
	      //     stations.push($(station).html());
	      // });
	      // this.routeConfig[number] = stations;
	      // if (Object.keys(this.routeConfig).length ===
	      //     Object.keys(this.routes).length) {
	      //   this.constructGraph();
	      // }
	    }
	  }, {
	    key: 'constructGraph',
	    value: function constructGraph() {
	      var graph = this.graph;
	      Object.keys(this.stations).forEach(function (abbr) {
	        graph[abbr] = [];
	      });
	      var rawTransferData = (0, _transfers.returnTransfers)().split('\n');
	      var transferHeaders = rawTransferData[0].split(',');
	      rawTransferData.slice(1).forEach(function (rawTransfer, idx) {
	        var transfer = rawTransfer.split(',');
	        var stop1 = transfer[0].slice(4);
	        var stop2 = transfer[1];
	        var stop3 = void 0;
	        if (rawTransferData[idx + 2]) {
	          var transfer2 = rawTransferData[idx + 2].split(',');
	          stop3 = transfer2[0].slice(4);
	        } else {
	          stop3 = stop1;
	        }
	        if (stop1[0] === stop3[0] && !(stop1 === stop3)) {
	          graph[stop1].push(stop3);
	          graph[stop3].push(stop1);
	        } else if (!(stop1 === stop2)) {
	          graph[stop1].push(stop2);
	        }
	      });
	      var map = new _map.SubwayMap(graph, this.stations);
	    }
	  }]);

	  return DataInitializerNYC;
	}();

/***/ },

/***/ 2:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var transitFeed = exports.transitFeed = function transitFeed() {
	  $.ajax({
	    url: 'https://api.transitfeeds.com/v1/getLocations',
	    method: 'GET',
	    dataType: 'json',
	    data: { key: 'b2490fe7-f10b-493b-a23a-abe5d2f5faad' },
	    success: function success(message) {
	      return console.log(message);
	    }
	  });
	};
	
	var fetchStationData = exports.fetchStationData = function fetchStationData(success) {
	  $.ajax({
	    url: 'http://datamine.mta.info/mta_esi.php?key=b1c77cb8e5ce4374eb955f1b6372144d&feed_id=1',
	    method: 'GET',
	    dataType: 'json',
	    success: success
	  });
	};
	//
	// function createCORSRequest(method, url) {
	//   var xhr = new XMLHttpRequest();
	//   if ("withCredentials" in xhr) {
	//
	//     // Check if the XMLHttpRequest object has a "withCredentials" property.
	//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
	//     xhr.open(method, url, true);
	//
	//   } else if (typeof XDomainRequest != "undefined") {
	//
	//     // Otherwise, check if XDomainRequest.
	//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
	//     xhr = new XDomainRequest();
	//     xhr.open(method, url);
	//
	//   } else {
	//
	//     // Otherwise, CORS is not supported by the browser.
	//     xhr = null;
	//
	//   }
	//   return xhr;
	// }
	//
	// export const fetchStationDataXML = success => {
	//   // This is a sample server that supports CORS.
	//   var url = 'http://datamine.mta.info/mta_esi.php?key=b1c77cb8e5ce4374eb955f1b6372144d&feed_id=1';
	//
	//   var xhr = createCORSRequest('GET', url);
	//   if (!xhr) {
	//     alert('CORS not supported');
	//     return;
	//   }
	//
	//   // Response handlers.
	//   xhr.onload = function() {
	//     var text = xhr.responseText;
	//     alert('Response from CORS request to ' + url + ': ' + text);
	//   };
	//
	//   xhr.onerror = function() {
	//     alert('Woops, there was an error making the request.');
	//   };
	//   xhr.send();
	// };

/***/ },

/***/ 3:
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
	    this.interval = Math.floor(1000 / Object.keys(this.stations).length);
	
	    this.extractCoordLimits = this.extractCoordLimits.bind(this);
	    this.mapStations = this.mapStations.bind(this);
	    this.mapCircle = this.mapCircle.bind(this);
	    this.drawLine = this.drawLine.bind(this);
	
	    this.canvas = document.getElementsByTagName("canvas")[0];
	    this.ctx = this.canvas.getContext("2d");
	
	    this.minX = 0;
	    this.minY = 0;
	    this.maxY = 600;
	    this.maxX = 500;
	
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
	      }, this.interval * i);
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
	      }, this.interval * i);
	    }
	  }, {
	    key: "extractCoordLimits",
	    value: function extractCoordLimits() {
	      var _this3 = this;
	
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

/***/ 4:
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
	    this.clearCanvas = this.clearCanvas.bind(this);
	    this.startAnimating = this.startAnimating.bind(this);
	
	    this.canvas = document.getElementsByTagName("canvas")[0];
	    this.ctx = this.canvas.getContext("2d");
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
	    key: "drawLines",
	    value: function drawLines() {
	      var _this3 = this;
	
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
	
	        _this3.ctx.beginPath();
	        _this3.ctx.moveTo(x1, y1);
	        _this3.ctx.lineTo(x2, y2);
	        _this3.ctx.lineWidth = 1;
	        _this3.ctx.strokeStyle = '#676767';
	        _this3.ctx.stroke();
	      });
	    }
	  }, {
	    key: "clearCanvas",
	    value: function clearCanvas() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	  }, {
	    key: "drawCircles",
	    value: function drawCircles() {
	      var _this4 = this;
	
	      var circle = void 0;
	      Object.keys(this.circles).forEach(function (id) {
	        circle = _this4.circles[id];
	        _this4.ctx.fillStyle = circle[3];
	        _this4.ctx.beginPath();
	        _this4.ctx.arc(circle[0], circle[1], circle[2], 0, 2 * Math.PI, false);
	        _this4.ctx.fill();
	      });
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

/***/ 5:
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
	    this.addClickAnywhere = this.addClickAnywhere.bind(this);
	    this.addCircle = this.addCircle.bind(this);
	    this.solving = false;
	    this.initialInstructions();
	    this.addOnClick();
	    this.destination = undefined;
	    this.origin = undefined;
	    this.size = 3;
	    this.interval = Math.floor(3000 / Object.keys(this.stations).length);
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
	        this.addCircle(x, y, this.size, '#00ACC1', i);
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
	      }, j * this.interval + 500);
	    }
	  }, {
	    key: 'clearTrace',
	    value: function clearTrace(j, trace) {
	      for (var i = 0; i <= j; i++) {
	        if (this.circles['zz-' + i]) {
	          delete this.circles['zz-' + i];
	        }
	      }
	      $("#instructions").text('Select origin...');
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
	        this.addCircle(x, y, this.size, '#FFC107', length - i);
	        nextStation = trace[nextStation];
	      }
	      i += 1;
	      x = this.circles[nextStation][0];
	      y = this.circles[nextStation][1];
	      this.addCircle(x, y, this.size, '#FFC107', length - i);
	      this.addClickAnywhere(length, trace);
	    }
	  }, {
	    key: 'addClickAnywhere',
	    value: function addClickAnywhere(length, trace) {
	      var _this3 = this;
	
	      setTimeout(function () {
	        $("#instructions").text('Click anywhere...');
	      }, length * this.interval);
	      $("#route").text('');
	      $('body').on('click', function () {
	        $('body').off();
	        _this3.clearPathFinder();
	        _this3.clearTrace(length, trace);
	      });
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

/***/ },

/***/ 41:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var returnRoutes = exports.returnRoutes = function returnRoutes() {
	  var routes = "route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color\n  1,MTA NYCT,1,Broadway - 7 Avenue Local,\"Trains operate between 242 St in the Bronx and South Ferry in Manhattan, most times\",1,http://web.mta.info/nyct/service/pdf/t1cur.pdf,EE352E,\n  2,MTA NYCT,2,7 Avenue Express,\"Trains operate between Wakefield-241 St, Bronx, and Flatbush Av-Brooklyn College, Brooklyn, at all times. Trains operate local in Bronx and Brooklyn. Trains operate express in Manhattan except late night when it operates local.\",1,http://web.mta.info/nyct/service/pdf/t2cur.pdf,EE352E,\n  3,MTA NYCT,3,7 Avenue Express,\"Trains operate between 148 St, 7 Av, Manhattan, and New Lots Av, Brooklyn, at all times except late nights. During late nights, trains operate only in Manhattan between 148 St, 7 Av and Times Square-42 St.\",1,http://web.mta.info/nyct/service/pdf/t3cur.pdf,EE352E,\n  4,MTA NYCT,4,Lexington Avenue Express,\"Trains operate daily between Woodlawn/Jerome Av, Bronx, and Utica Av/Eastern Pkwy, Brooklyn, running express in Manhattan and Brooklyn. During late night and early morning hours, trains runs local in Manhattan and Brooklyn, and extends beyond Utica Av to New Lots/Livonia Avs, Brooklyn.\",1,http://web.mta.info/nyct/service/pdf/t4cur.pdf,00933C,\n  5,MTA NYCT,5,Lexington Avenue Express,\"Weekdays daytime, most trains operate between either Dyre Av or 238 St-Nereid Av, Bronx, and Flatbush Av-Brooklyn College, Brooklyn. At all other times except during late nights, trains operate between Dyre Av, Bronx, and Bowling Green, Manhattan. During late nights trains operate only in the Bronx between Dyre Av and E 180 St/MorrisPark Av. Customers who ride during late night hours can transfer to 2 service at the E 180 St Station. At all times, trains operate express in Manhattan and Brooklyn. Weekdays, trains in the Bronx operate express from E 180 St to 149 St-3 Av during morning rush hours (from about 6 AM to 9 AM), and from 149 St-3 Av to E 180 St during the evening rush hours (from about 4 PM to 7 PM).\",1,http://web.mta.info/nyct/service/pdf/t5cur.pdf,00933C,\n  5X,MTA NYCT,5X,Lexington Avenue Express,\"Weekdays daytime, most trains operate between either Dyre Av or 238 St-Nereid Av, Bronx, and Flatbush Av-Brooklyn College, Brooklyn. At all other times except during late nights, trains operate between Dyre Av, Bronx, and Bowling Green, Manhattan. During late nights trains operate only in the Bronx between Dyre Av and E 180 St/MorrisPark Av. Customers who ride during late night hours can transfer to 2 service at the E 180 St Station. At all times, trains operate express in Manhattan and Brooklyn. Weekdays, trains in the Bronx operate express from E 180 St to 149 St-3 Av during morning rush hours (from about 6 AM to 9 AM), and from 149 St-3 Av to E 180 St during the evening rush hours (from about 4 PM to 7 PM).\",1,http://web.mta.info/nyct/service/pdf/t5cur.pdf,00933C,\n  6,MTA NYCT,6,Lexington Avenue Local,\"Local trains operate between Pelham Bay Park/Bruckner Expwy, Bronx, and Brooklyn Bridge/City Hall, Manhattan, at all times.\",1,http://web.mta.info/nyct/service/pdf/t6cur.pdf,00933C,\n  6X,MTA NYCT,6X,Lexington Avenue Express,\"Express trains operate between Pelham Bay Park/Bruckner Expwy, Bronx, and Brooklyn Bridge/City Hall, Manhattan, weekday mornings toward Manhattan. Weekday afternoons and evenings, these trains operate express to the Bronx.\",1,http://web.mta.info/nyct/service/pdf/t6cur.pdf,00A65C,\n  7,MTA NYCT,7,Flushing Local,\"Trains operate between Main St-Flushing, Queens, and 11th Av-34th St, at all times. \",1,http://web.mta.info/nyct/service/pdf/t7cur.pdf,B933AD,\n  7X,MTA NYCT,7X,Flushing Express,\"Trains operate between Main St-Flushing, Queens, and 11th Av-34th St, Manhattan, weekday mornings toward Manhattan. Weekday afternoons and evenings, these trains operate express to Queens.\",1,http://web.mta.info/nyct/service/pdf/t7cur.pdf,B933AD,\n  GS,MTA NYCT,S,42 St Shuttle,\"Operates in Manhattan between Grand Central and Times Square. The shuttle provides a free transfer between 4, 5, 6, and 7 service at Grand Central-42 St and A, C, E, N, Q, R, W, 1, 2, 3, and 7 service at Times Square-42 St. The shuttle runs at all times except during late nights, from about 12 midnight to 6 AM.\",1,http://web.mta.info/nyct/service/pdf/t0cur.pdf,6D6E71,\n  A,MTA NYCT,A,8 Avenue Express,\"Trains operate between Inwood-207 St, Manhattan and Far Rockaway-Mott Avenue, Queens at all times. Also from about 6 AM until about midnight, additional trains operate between Inwood-207 St and Lefferts Boulevard (trains typically alternate between Lefferts Blvd and Far Rockaway). During weekday morning rush hours, special trains, denoted in the schedule by a diamond symbol, operate from Rockaway Park-Beach 116 St, Queens, toward Manhattan. These trains make local stops between Rockaway Park and Broad Channel. Similarly, in the evening rush hour special trains leave Manhattan operating toward Rockaway Park-Beach 116 St, Queens.\",1,http://web.mta.info/nyct/service/pdf/tacur.pdf,2850AD,FFFFFF\n  B,MTA NYCT,B,6 Avenue Express,\"Trains operate, weekdays only, between 145 St, Manhattan, and Brighton Beach, Brooklyn at all times except late nights. The route extends to Bedford Park Blvd, Bronx, during rush hours.\",1,http://web.mta.info/nyct/service/pdf/tbcur.pdf,FF6319,\n  C,MTA NYCT,C,8 Avenue Local,\"Trains operate between 168 St, Manhattan, and Euclid Av, Brooklyn, daily from about 6 AM to 11 PM.\",1,http://web.mta.info/nyct/service/pdf/tccur.pdf,2850AD,FFFFFF\n  D,MTA NYCT,D,6 Avenue Express,\"Trains operate, at all times, from 205 Street, Bronx, to Stillwell Avenue, Brooklyn via Central Park West and 6th Avenue in Manhattan, and via the Manhattan Bridge to and from Brooklyn. When in Brooklyn trains operate via 4th Avenue then through Bensonhurst to Coney Island. Trains typically operate local in the Bronx, express in Manhattan, and local in Brooklyn. But please note that Bronx rush hour trains operate express (peak direction ONLY), and Brooklyn trains operate express along the 4th Avenue segment (all times except late nights).\",1,http://web.mta.info/nyct/service/pdf/tdcur.pdf,FF6319,\n  E,MTA NYCT,E,8 Avenue Local,\"Trains operate between Jamaica Center (Parsons/Archer), Queens, and World Trade Center, Manhattan, at all times.\",1,http://web.mta.info/nyct/service/pdf/tecur.pdf,2850AD,FFFFFF\n  F,MTA NYCT,F,Queens Blvd Express/ 6 Av Local,\"Trains operate at all times between Jamaica, Queens, and Stillwell Av, Brooklyn via the 63 St Connector (serving 21 St-Queensbridge, Roosevelt Island, Lexington Av-63 St, and 57 St-6 Av). F trains operate express along Queens Blvd at all times. Trains do not serve Queens Plaza, 23 St-Ely Av, Lexington Av-53 St and 5 Av-53 St.\",1,http://web.mta.info/nyct/service/pdf/tfcur.pdf,FF6319,\n  FS,MTA NYCT,S,Franklin Avenue Shuttle,\"Train provides full time connecting service between the A and C at the Franklin Av/Fulton St station, and the Q at the Prospect Park/Empire Blvd station. A free transfer is also available at the Botanic Garden/Eastern Parkway Station to the 2, 3, 4, and 5 service.\",1,http://web.mta.info/nyct/service/pdf/tscur.pdf,,\n  G,MTA NYCT,G,Brooklyn-Queens Crosstown,\"Trains operate between Court Square, Queens and Church Av, Brooklyn weekdays, and all weekend. Weekday evenings and late nights, trains operate between Forest Hill-71 Av, Queens and Church Av, Brooklyn.\",1,http://web.mta.info/nyct/service/pdf/tgcur.pdf,6CBE45,\n  J,MTA NYCT,J,Nassau St Local,\"Trains operate weekdays between Jamaica Center (Parsons/Archer), Queens, and Broad St, Manhattan. During weekdays, Trains going to Manhattan run express in Brooklyn between Myrtle Av and Marcy Av from about 7 AM to 1 PM and from Manhattan from 1:30 PM and 8 PM. During weekday rush hours, trains provide skip-stop service. Skip-stop service means that some stations are served by J trains, some stations are served by the Z trains, and some stations are served by both J and Z trains. J/Z skip-stop service runs towards Manhattan from about 7 AM to 8:15 AM and from Manhattan from about 4:30 PM to 5:45 PM.\",1,http://web.mta.info/nyct/service/pdf/tjcur.pdf,996633,\n  L,MTA NYCT,L,14 St-Canarsie Local,\"Trains operate between 8 Av/14 St, Manhattan, and Rockaway Pkwy/Canarsie, Brooklyn, 24 hours daily.\",1,http://web.mta.info/nyct/service/pdf/tlcur.pdf,A7A9AC,\n  M,MTA NYCT,M,QNS BLVD-6th AVE/ Myrtle Local,\"Trains operate between Middle Village-Metropolitan Avenue, Queens and Myrtle Avenue, Brooklyn at all times. Service is extended weekdays (except late nights) Continental Ave, Queens, All trains provide local service.\",1,http://web.mta.info/nyct/service/pdf/tmcur.pdf,FF6319,\n  N,MTA NYCT,N,Broadway Express,\"Trains operate from Ditmars Boulevard, Queens, to Stillwell Avenue, Brooklyn, at all times. N trains in Manhattan operate along Broadway and across the Manhattan Bridge to and from Brooklyn. Trains in Brooklyn operate along 4th Avenue, then through Borough Park to Gravesend. Trains typically operate local in Queens, and either express or local in Manhattan and Brooklyn, depending on the time. Late night trains operate via Whitehall Street, Manhattan. Late night service is local.\",1,http://web.mta.info/nyct/service/pdf/tncur.pdf,FCCC0A,\n  Q,MTA NYCT,Q,Broadway Express,\"Trains operate between Astoria, Queens, and Stillwell Av, Brooklyn except nights. During late nights trains will operate from 57th Street/7th Avenue, Manhattan, and Stillwell Av, Brooklyn. Trains operate express from 34th St. via Broadway to Canal Street, except late nights when trains operate express 34th to Canal(lower level), cross into Brooklyn via Manhattan Bridge, then operate local to and from Stillwell Av.\",1,http://web.mta.info/nyct/service/pdf/tqcur.pdf,FCCC0A,\n  R,MTA NYCT,R,Broadway Local,\"Trains operate local between Forest Hills-71 Av, Queens, and 95 St/4 Av, Brooklyn, at all times except late nights. During late nights, trains operate only in Brooklyn between 36 St and 95 St/4 Av.\",1,http://web.mta.info/nyct/service/pdf/trcur.pdf,FCCC0A,\n  H,MTA NYCT,S,Rockaway Park Shuttle,\"Service operates at all times between Broad Channel, and Rockaway Park, Queens.\",1,http://web.mta.info/nyct/service/pdf/thcur.pdf,,\n  Z,MTA NYCT,Z,Nassau St Express,\"During weekday rush hours, J and Z trains provide skip-stop service. Skip-stop service means that some stations are served by J trains, some stations are served by the Z trains, and some stations are served by both J and Z trains. J/Z skip-stop service runs towards Manhattan from about 7 AM to 8:15 AM and from Manhattan from about 4:30 PM to 5:45 PM.\",1,http://web.mta.info/nyct/service/pdf/tjcur.pdf,996633,\n  SI,MTA NYCT,SIR,Staten Island Railway,\"Service runs 24 hours a day between the St George and Tottenville terminals. At the St George terminal, customers can make connections with Staten Island Ferry service to Manhattan.\",2,http://web.mta.info/nyct/service/pdf/sircur.pdf,,\n  ";
	  return routes;
	};

/***/ },

/***/ 42:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var returnStops = exports.returnStops = function returnStops() {
	  var stops = "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station\n    101,,Van Cortlandt Park - 242 St,,40.889248,-73.898583,,,1,\n    101N,,Van Cortlandt Park - 242 St,,40.889248,-73.898583,,,0,101\n    101S,,Van Cortlandt Park - 242 St,,40.889248,-73.898583,,,0,101\n    103,,238 St,,40.884667,-73.90087,,,1,\n    103N,,238 St,,40.884667,-73.90087,,,0,103\n    103S,,238 St,,40.884667,-73.90087,,,0,103\n    104,,231 St,,40.878856,-73.904834,,,1,\n    104N,,231 St,,40.878856,-73.904834,,,0,104\n    104S,,231 St,,40.878856,-73.904834,,,0,104\n    106,,Marble Hill - 225 St,,40.874561,-73.909831,,,1,\n    106N,,Marble Hill - 225 St,,40.874561,-73.909831,,,0,106\n    106S,,Marble Hill - 225 St,,40.874561,-73.909831,,,0,106\n    107,,215 St,,40.869444,-73.915279,,,1,\n    107N,,215 St,,40.869444,-73.915279,,,0,107\n    107S,,215 St,,40.869444,-73.915279,,,0,107\n    108,,207 St,,40.864621,-73.918822,,,1,\n    108N,,207 St,,40.864621,-73.918822,,,0,108\n    108S,,207 St,,40.864621,-73.918822,,,0,108\n    109,,Dyckman St,,40.860531,-73.925536,,,1,\n    109N,,Dyckman St,,40.860531,-73.925536,,,0,109\n    109S,,Dyckman St,,40.860531,-73.925536,,,0,109\n    110,,191 St,,40.855225,-73.929412,,,1,\n    110N,,191 St,,40.855225,-73.929412,,,0,110\n    110S,,191 St,,40.855225,-73.929412,,,0,110\n    111,,181 St,,40.849505,-73.933596,,,1,\n    111N,,181 St,,40.849505,-73.933596,,,0,111\n    111S,,181 St,,40.849505,-73.933596,,,0,111\n    112,,168 St - Washington Hts,,40.840556,-73.940133,,,1,\n    112N,,168 St - Washington Hts,,40.840556,-73.940133,,,0,112\n    112S,,168 St - Washington Hts,,40.840556,-73.940133,,,0,112\n    113,,157 St,,40.834041,-73.94489,,,1,\n    113N,,157 St,,40.834041,-73.94489,,,0,113\n    113S,,157 St,,40.834041,-73.94489,,,0,113\n    114,,145 St,,40.826551,-73.95036,,,1,\n    114N,,145 St,,40.826551,-73.95036,,,0,114\n    114S,,145 St,,40.826551,-73.95036,,,0,114\n    115,,137 St - City College,,40.822008,-73.953676,,,1,\n    115N,,137 St - City College,,40.822008,-73.953676,,,0,115\n    115S,,137 St - City College,,40.822008,-73.953676,,,0,115\n    116,,125 St,,40.815581,-73.958372,,,1,\n    116N,,125 St,,40.815581,-73.958372,,,0,116\n    116S,,125 St,,40.815581,-73.958372,,,0,116\n    117,,116 St - Columbia University,,40.807722,-73.96411,,,1,\n    117N,,116 St - Columbia University,,40.807722,-73.96411,,,0,117\n    117S,,116 St - Columbia University,,40.807722,-73.96411,,,0,117\n    118,,Cathedral Pkwy,,40.803967,-73.966847,,,1,\n    118N,,Cathedral Pkwy,,40.803967,-73.966847,,,0,118\n    118S,,Cathedral Pkwy,,40.803967,-73.966847,,,0,118\n    119,,103 St,,40.799446,-73.968379,,,1,\n    119N,,103 St,,40.799446,-73.968379,,,0,119\n    119S,,103 St,,40.799446,-73.968379,,,0,119\n    120,,96 St,,40.793919,-73.972323,,,1,\n    120N,,96 St,,40.793919,-73.972323,,,0,120\n    120S,,96 St,,40.793919,-73.972323,,,0,120\n    121,,86 St,,40.788644,-73.976218,,,1,\n    121N,,86 St,,40.788644,-73.976218,,,0,121\n    121S,,86 St,,40.788644,-73.976218,,,0,121\n    122,,79 St,,40.783934,-73.979917,,,1,\n    122N,,79 St,,40.783934,-73.979917,,,0,122\n    122S,,79 St,,40.783934,-73.979917,,,0,122\n    123,,72 St,,40.778453,-73.98197,,,1,\n    123N,,72 St,,40.778453,-73.98197,,,0,123\n    123S,,72 St,,40.778453,-73.98197,,,0,123\n    124,,66 St - Lincoln Center,,40.77344,-73.982209,,,1,\n    124N,,66 St - Lincoln Center,,40.77344,-73.982209,,,0,124\n    124S,,66 St - Lincoln Center,,40.77344,-73.982209,,,0,124\n    125,,59 St - Columbus Circle,,40.768247,-73.981929,,,1,\n    125N,,59 St - Columbus Circle,,40.768247,-73.981929,,,0,125\n    125S,,59 St - Columbus Circle,,40.768247,-73.981929,,,0,125\n    126,,50 St,,40.761728,-73.983849,,,1,\n    126N,,50 St,,40.761728,-73.983849,,,0,126\n    126S,,50 St,,40.761728,-73.983849,,,0,126\n    127,,Times Sq - 42 St,,40.75529,-73.987495,,,1,\n    127N,,Times Sq - 42 St,,40.75529,-73.987495,,,0,127\n    127S,,Times Sq - 42 St,,40.75529,-73.987495,,,0,127\n    128,,34 St - Penn Station,,40.750373,-73.991057,,,1,\n    128N,,34 St - Penn Station,,40.750373,-73.991057,,,0,128\n    128S,,34 St - Penn Station,,40.750373,-73.991057,,,0,128\n    129,,28 St,,40.747215,-73.993365,,,1,\n    129N,,28 St,,40.747215,-73.993365,,,0,129\n    129S,,28 St,,40.747215,-73.993365,,,0,129\n    130,,23 St,,40.744081,-73.995657,,,1,\n    130N,,23 St,,40.744081,-73.995657,,,0,130\n    130S,,23 St,,40.744081,-73.995657,,,0,130\n    131,,18 St,,40.74104,-73.997871,,,1,\n    131N,,18 St,,40.74104,-73.997871,,,0,131\n    131S,,18 St,,40.74104,-73.997871,,,0,131\n    132,,14 St,,40.737826,-74.000201,,,1,\n    132N,,14 St,,40.737826,-74.000201,,,0,132\n    132S,,14 St,,40.737826,-74.000201,,,0,132\n    133,,Christopher St - Sheridan Sq,,40.733422,-74.002906,,,1,\n    133N,,Christopher St - Sheridan Sq,,40.733422,-74.002906,,,0,133\n    133S,,Christopher St - Sheridan Sq,,40.733422,-74.002906,,,0,133\n    134,,Houston St,,40.728251,-74.005367,,,1,\n    134N,,Houston St,,40.728251,-74.005367,,,0,134\n    134S,,Houston St,,40.728251,-74.005367,,,0,134\n    135,,Canal St,,40.722854,-74.006277,,,1,\n    135N,,Canal St,,40.722854,-74.006277,,,0,135\n    135S,,Canal St,,40.722854,-74.006277,,,0,135\n    136,,Franklin St,,40.719318,-74.006886,,,1,\n    136N,,Franklin St,,40.719318,-74.006886,,,0,136\n    136S,,Franklin St,,40.719318,-74.006886,,,0,136\n    137,,Chambers St,,40.715478,-74.009266,,,1,\n    137N,,Chambers St,,40.715478,-74.009266,,,0,137\n    137S,,Chambers St,,40.715478,-74.009266,,,0,137\n    138,,Cortlandt St,,40.711835,-74.012188,,,1,\n    138N,,Cortlandt St,,40.711835,-74.012188,,,0,138\n    138S,,Cortlandt St,,40.711835,-74.012188,,,0,138\n    139,,Rector St,,40.707513,-74.013783,,,1,\n    139N,,Rector St,,40.707513,-74.013783,,,0,139\n    139S,,Rector St,,40.707513,-74.013783,,,0,139\n    140,,South Ferry Loop,,40.701411,-74.013205,,,1,\n    140N,,South Ferry Loop,,40.701411,-74.013205,,,0,140\n    140S,,South Ferry Loop,,40.701411,-74.013205,,,0,140\n    201,,Wakefield - 241 St,,40.903125,-73.85062,,,1,\n    201N,,Wakefield - 241 St,,40.903125,-73.85062,,,0,201\n    201S,,Wakefield - 241 St,,40.903125,-73.85062,,,0,201\n    204,,Nereid Av,,40.898379,-73.854376,,,1,\n    204N,,Nereid Av,,40.898379,-73.854376,,,0,204\n    204S,,Nereid Av,,40.898379,-73.854376,,,0,204\n    205,,233 St,,40.893193,-73.857473,,,1,\n    205N,,233 St,,40.893193,-73.857473,,,0,205\n    205S,,233 St,,40.893193,-73.857473,,,0,205\n    206,,225 St,,40.888022,-73.860341,,,1,\n    206N,,225 St,,40.888022,-73.860341,,,0,206\n    206S,,225 St,,40.888022,-73.860341,,,0,206\n    207,,219 St,,40.883895,-73.862633,,,1,\n    207N,,219 St,,40.883895,-73.862633,,,0,207\n    207S,,219 St,,40.883895,-73.862633,,,0,207\n    208,,Gun Hill Rd,,40.87785,-73.866256,,,1,\n    208N,,Gun Hill Rd,,40.87785,-73.866256,,,0,208\n    208S,,Gun Hill Rd,,40.87785,-73.866256,,,0,208\n    209,,Burke Av,,40.871356,-73.867164,,,1,\n    209N,,Burke Av,,40.871356,-73.867164,,,0,209\n    209S,,Burke Av,,40.871356,-73.867164,,,0,209\n    210,,Allerton Av,,40.865462,-73.867352,,,1,\n    210N,,Allerton Av,,40.865462,-73.867352,,,0,210\n    210S,,Allerton Av,,40.865462,-73.867352,,,0,210\n    211,,Pelham Pkwy,,40.857192,-73.867615,,,1,\n    211N,,Pelham Pkwy,,40.857192,-73.867615,,,0,211\n    211S,,Pelham Pkwy,,40.857192,-73.867615,,,0,211\n    212,,Bronx Park East,,40.848828,-73.868457,,,1,\n    212N,,Bronx Park East,,40.848828,-73.868457,,,0,212\n    212S,,Bronx Park East,,40.848828,-73.868457,,,0,212\n    213,,E 180 St,,40.841894,-73.873488,,,1,\n    213N,,E 180 St,,40.841894,-73.873488,,,0,213\n    213S,,E 180 St,,40.841894,-73.873488,,,0,213\n    214,,West Farms Sq - E Tremont Av,,40.840295,-73.880049,,,1,\n    214N,,West Farms Sq - E Tremont Av,,40.840295,-73.880049,,,0,214\n    214S,,West Farms Sq - E Tremont Av,,40.840295,-73.880049,,,0,214\n    215,,174 St,,40.837288,-73.887734,,,1,\n    215N,,174 St,,40.837288,-73.887734,,,0,215\n    215S,,174 St,,40.837288,-73.887734,,,0,215\n    216,,Freeman St,,40.829993,-73.891865,,,1,\n    216N,,Freeman St,,40.829993,-73.891865,,,0,216\n    216S,,Freeman St,,40.829993,-73.891865,,,0,216\n    217,,Simpson St,,40.824073,-73.893064,,,1,\n    217N,,Simpson St,,40.824073,-73.893064,,,0,217\n    217S,,Simpson St,,40.824073,-73.893064,,,0,217\n    218,,Intervale Av,,40.822181,-73.896736,,,1,\n    218N,,Intervale Av,,40.822181,-73.896736,,,0,218\n    218S,,Intervale Av,,40.822181,-73.896736,,,0,218\n    219,,Prospect Av,,40.819585,-73.90177,,,1,\n    219N,,Prospect Av,,40.819585,-73.90177,,,0,219\n    219S,,Prospect Av,,40.819585,-73.90177,,,0,219\n    220,,Jackson Av,,40.81649,-73.907807,,,1,\n    220N,,Jackson Av,,40.81649,-73.907807,,,0,220\n    220S,,Jackson Av,,40.81649,-73.907807,,,0,220\n    221,,3 Av - 149 St,,40.816109,-73.917757,,,1,\n    221N,,3 Av - 149 St,,40.816109,-73.917757,,,0,221\n    221S,,3 Av - 149 St,,40.816109,-73.917757,,,0,221\n    222,,149 St - Grand Concourse,,40.81841,-73.926718,,,1,\n    222N,,149 St - Grand Concourse,,40.81841,-73.926718,,,0,222\n    222S,,149 St - Grand Concourse,,40.81841,-73.926718,,,0,222\n    224,,135 St,,40.814229,-73.94077,,,1,\n    224N,,135 St,,40.814229,-73.94077,,,0,224\n    224S,,135 St,,40.814229,-73.94077,,,0,224\n    225,,125 St,,40.807754,-73.945495,,,1,\n    225N,,125 St,,40.807754,-73.945495,,,0,225\n    225S,,125 St,,40.807754,-73.945495,,,0,225\n    226,,116 St,,40.802098,-73.949625,,,1,\n    226N,,116 St,,40.802098,-73.949625,,,0,226\n    226S,,116 St,,40.802098,-73.949625,,,0,226\n    227,,Central Park North (110 St),,40.799075,-73.951822,,,1,\n    227N,,Central Park North (110 St),,40.799075,-73.951822,,,0,227\n    227S,,Central Park North (110 St),,40.799075,-73.951822,,,0,227\n    228,,Park Pl,,40.713051,-74.008811,,,1,\n    228N,,Park Pl,,40.713051,-74.008811,,,0,228\n    228S,,Park Pl,,40.713051,-74.008811,,,0,228\n    229,,Fulton St,,40.709416,-74.006571,,,1,\n    229N,,Fulton St,,40.709416,-74.006571,,,0,229\n    229S,,Fulton St,,40.709416,-74.006571,,,0,229\n    230,,Wall St,,40.706821,-74.0091,,,1,\n    230N,,Wall St,,40.706821,-74.0091,,,0,230\n    230S,,Wall St,,40.706821,-74.0091,,,0,230\n    231,,Clark St,,40.697466,-73.993086,,,1,\n    231N,,Clark St,,40.697466,-73.993086,,,0,231\n    231S,,Clark St,,40.697466,-73.993086,,,0,231\n    232,,Borough Hall,,40.693219,-73.989998,,,1,\n    232N,,Borough Hall,,40.693219,-73.989998,,,0,232\n    232S,,Borough Hall,,40.693219,-73.989998,,,0,232\n    233,,Hoyt St,,40.690545,-73.985065,,,1,\n    233N,,Hoyt St,,40.690545,-73.985065,,,0,233\n    233S,,Hoyt St,,40.690545,-73.985065,,,0,233\n    234,,Nevins St,,40.688246,-73.980492,,,1,\n    234N,,Nevins St,,40.688246,-73.980492,,,0,234\n    234S,,Nevins St,,40.688246,-73.980492,,,0,234\n    235,,Atlantic Av - Barclays Ctr,,40.684359,-73.977666,,,1,\n    235N,,Atlantic Av - Barclays Ctr,,40.684359,-73.977666,,,0,235\n    235S,,Atlantic Av - Barclays Ctr,,40.684359,-73.977666,,,0,235\n    236,,Bergen St,,40.680829,-73.975098,,,1,\n    236N,,Bergen St,,40.680829,-73.975098,,,0,236\n    236S,,Bergen St,,40.680829,-73.975098,,,0,236\n    237,,Grand Army Plaza,,40.675235,-73.971046,,,1,\n    237N,,Grand Army Plaza,,40.675235,-73.971046,,,0,237\n    237S,,Grand Army Plaza,,40.675235,-73.971046,,,0,237\n    238,,Eastern Pkwy - Brooklyn Museum,,40.671987,-73.964375,,,1,\n    238N,,Eastern Pkwy - Brooklyn Museum,,40.671987,-73.964375,,,0,238\n    238S,,Eastern Pkwy - Brooklyn Museum,,40.671987,-73.964375,,,0,238\n    239,,Franklin Av,,40.670682,-73.958131,,,1,\n    239N,,Franklin Av,,40.670682,-73.958131,,,0,239\n    239S,,Franklin Av,,40.670682,-73.958131,,,0,239\n    241,,President St,,40.667883,-73.950683,,,1,\n    241N,,President St,,40.667883,-73.950683,,,0,241\n    241S,,President St,,40.667883,-73.950683,,,0,241\n    242,,Sterling St,,40.662742,-73.95085,,,1,\n    242N,,Sterling St,,40.662742,-73.95085,,,0,242\n    242S,,Sterling St,,40.662742,-73.95085,,,0,242\n    243,,Winthrop St,,40.656652,-73.9502,,,1,\n    243N,,Winthrop St,,40.656652,-73.9502,,,0,243\n    243S,,Winthrop St,,40.656652,-73.9502,,,0,243\n    244,,Church Av,,40.650843,-73.949575,,,1,\n    244N,,Church Av,,40.650843,-73.949575,,,0,244\n    244S,,Church Av,,40.650843,-73.949575,,,0,244\n    245,,Beverly Rd,,40.645098,-73.948959,,,1,\n    245N,,Beverly Rd,,40.645098,-73.948959,,,0,245\n    245S,,Beverly Rd,,40.645098,-73.948959,,,0,245\n    246,,Newkirk Av,,40.639967,-73.948411,,,1,\n    246N,,Newkirk Av,,40.639967,-73.948411,,,0,246\n    246S,,Newkirk Av,,40.639967,-73.948411,,,0,246\n    247,,Flatbush Av - Brooklyn College,,40.632836,-73.947642,,,1,\n    247N,,Flatbush Av - Brooklyn College,,40.632836,-73.947642,,,0,247\n    247S,,Flatbush Av - Brooklyn College,,40.632836,-73.947642,,,0,247\n    248,,Nostrand Av,,40.669847,-73.950466,,,1,\n    248N,,Nostrand Av,,40.669847,-73.950466,,,0,248\n    248S,,Nostrand Av,,40.669847,-73.950466,,,0,248\n    249,,Kingston Av,,40.669399,-73.942161,,,1,\n    249N,,Kingston Av,,40.669399,-73.942161,,,0,249\n    249S,,Kingston Av,,40.669399,-73.942161,,,0,249\n    250,,Crown Hts - Utica Av,,40.668897,-73.932942,,,1,\n    250N,,Crown Hts - Utica Av,,40.668897,-73.932942,,,0,250\n    250S,,Crown Hts - Utica Av,,40.668897,-73.932942,,,0,250\n    251,,Sutter Av - Rutland Rd,,40.664717,-73.92261,,,1,\n    251N,,Sutter Av - Rutland Rd,,40.664717,-73.92261,,,0,251\n    251S,,Sutter Av - Rutland Rd,,40.664717,-73.92261,,,0,251\n    252,,Saratoga Av,,40.661453,-73.916327,,,1,\n    252N,,Saratoga Av,,40.661453,-73.916327,,,0,252\n    252S,,Saratoga Av,,40.661453,-73.916327,,,0,252\n    253,,Rockaway Av,,40.662549,-73.908946,,,1,\n    253N,,Rockaway Av,,40.662549,-73.908946,,,0,253\n    253S,,Rockaway Av,,40.662549,-73.908946,,,0,253\n    254,,Junius St,,40.663515,-73.902447,,,1,\n    254N,,Junius St,,40.663515,-73.902447,,,0,254\n    254S,,Junius St,,40.663515,-73.902447,,,0,254\n    255,,Pennsylvania Av,,40.664635,-73.894895,,,1,\n    255N,,Pennsylvania Av,,40.664635,-73.894895,,,0,255\n    255S,,Pennsylvania Av,,40.664635,-73.894895,,,0,255\n    256,,Van Siclen Av,,40.665449,-73.889395,,,1,\n    256N,,Van Siclen Av,,40.665449,-73.889395,,,0,256\n    256S,,Van Siclen Av,,40.665449,-73.889395,,,0,256\n    257,,New Lots Av,,40.666235,-73.884079,,,1,\n    257N,,New Lots Av,,40.666235,-73.884079,,,0,257\n    257S,,New Lots Av,,40.666235,-73.884079,,,0,257\n    301,,Harlem - 148 St,,40.82388,-73.93647,,,1,\n    301N,,Harlem - 148 St,,40.82388,-73.93647,,,0,301\n    301S,,Harlem - 148 St,,40.82388,-73.93647,,,0,301\n    302,,145 St,,40.820421,-73.936245,,,1,\n    302N,,145 St,,40.820421,-73.936245,,,0,302\n    302S,,145 St,,40.820421,-73.936245,,,0,302\n    401,,Woodlawn,,40.886037,-73.878751,,,1,\n    401N,,Woodlawn,,40.886037,-73.878751,,,0,401\n    401S,,Woodlawn,,40.886037,-73.878751,,,0,401\n    402,,Mosholu Pkwy,,40.87975,-73.884655,,,1,\n    402N,,Mosholu Pkwy,,40.87975,-73.884655,,,0,402\n    402S,,Mosholu Pkwy,,40.87975,-73.884655,,,0,402\n    405,,Bedford Park Blvd - Lehman College,,40.873412,-73.890064,,,1,\n    405N,,Bedford Park Blvd - Lehman College,,40.873412,-73.890064,,,0,405\n    405S,,Bedford Park Blvd - Lehman College,,40.873412,-73.890064,,,0,405\n    406,,Kingsbridge Rd,,40.86776,-73.897174,,,1,\n    406N,,Kingsbridge Rd,,40.86776,-73.897174,,,0,406\n    406S,,Kingsbridge Rd,,40.86776,-73.897174,,,0,406\n    407,,Fordham Rd,,40.862803,-73.901034,,,1,\n    407N,,Fordham Rd,,40.862803,-73.901034,,,0,407\n    407S,,Fordham Rd,,40.862803,-73.901034,,,0,407\n    408,,183 St,,40.858407,-73.903879,,,1,\n    408N,,183 St,,40.858407,-73.903879,,,0,408\n    408S,,183 St,,40.858407,-73.903879,,,0,408\n    409,,Burnside Av,,40.853453,-73.907684,,,1,\n    409N,,Burnside Av,,40.853453,-73.907684,,,0,409\n    409S,,Burnside Av,,40.853453,-73.907684,,,0,409\n    410,,176 St,,40.84848,-73.911794,,,1,\n    410N,,176 St,,40.84848,-73.911794,,,0,410\n    410S,,176 St,,40.84848,-73.911794,,,0,410\n    411,,Mt Eden Av,,40.844434,-73.914685,,,1,\n    411N,,Mt Eden Av,,40.844434,-73.914685,,,0,411\n    411S,,Mt Eden Av,,40.844434,-73.914685,,,0,411\n    412,,170 St,,40.840075,-73.917791,,,1,\n    412N,,170 St,,40.840075,-73.917791,,,0,412\n    412S,,170 St,,40.840075,-73.917791,,,0,412\n    413,,167 St,,40.835537,-73.9214,,,1,\n    413N,,167 St,,40.835537,-73.9214,,,0,413\n    413S,,167 St,,40.835537,-73.9214,,,0,413\n    414,,161 St - Yankee Stadium,,40.827994,-73.925831,,,1,\n    414N,,161 St - Yankee Stadium,,40.827994,-73.925831,,,0,414\n    414S,,161 St - Yankee Stadium,,40.827994,-73.925831,,,0,414\n    415,,149 St - Grand Concourse,,40.818375,-73.927351,,,1,\n    415N,,149 St - Grand Concourse,,40.818375,-73.927351,,,0,415\n    415S,,149 St - Grand Concourse,,40.818375,-73.927351,,,0,415\n    416,,138 St - Grand Concourse,,40.813224,-73.929849,,,1,\n    416N,,138 St - Grand Concourse,,40.813224,-73.929849,,,0,416\n    416S,,138 St - Grand Concourse,,40.813224,-73.929849,,,0,416\n    418,,Fulton St,,40.710368,-74.009509,,,1,\n    418N,,Fulton St,,40.710368,-74.009509,,,0,418\n    418S,,Fulton St,,40.710368,-74.009509,,,0,418\n    419,,Wall St,,40.707557,-74.011862,,,1,\n    419N,,Wall St,,40.707557,-74.011862,,,0,419\n    419S,,Wall St,,40.707557,-74.011862,,,0,419\n    420,,Bowling Green,,40.704817,-74.014065,,,1,\n    420N,,Bowling Green,,40.704817,-74.014065,,,0,420\n    420S,,Bowling Green,,40.704817,-74.014065,,,0,420\n    423,,Borough Hall,,40.692404,-73.990151,,,1,\n    423N,,Borough Hall,,40.692404,-73.990151,,,0,423\n    423S,,Borough Hall,,40.692404,-73.990151,,,0,423\n    501,,Eastchester - Dyre Av,,40.8883,-73.830834,,,1,\n    501N,,Eastchester - Dyre Av,,40.8883,-73.830834,,,0,501\n    501S,,Eastchester - Dyre Av,,40.8883,-73.830834,,,0,501\n    502,,Baychester Av,,40.878663,-73.838591,,,1,\n    502N,,Baychester Av,,40.878663,-73.838591,,,0,502\n    502S,,Baychester Av,,40.878663,-73.838591,,,0,502\n    503,,Gun Hill Rd,,40.869526,-73.846384,,,1,\n    503N,,Gun Hill Rd,,40.869526,-73.846384,,,0,503\n    503S,,Gun Hill Rd,,40.869526,-73.846384,,,0,503\n    504,,Pelham Pkwy,,40.858985,-73.855359,,,1,\n    504N,,Pelham Pkwy,,40.858985,-73.855359,,,0,504\n    504S,,Pelham Pkwy,,40.858985,-73.855359,,,0,504\n    505,,Morris Park,,40.854364,-73.860495,,,1,\n    505N,,Morris Park,,40.854364,-73.860495,,,0,505\n    505S,,Morris Park,,40.854364,-73.860495,,,0,505\n    601,,Pelham Bay Park,,40.852462,-73.828121,,,1,\n    601N,,Pelham Bay Park,,40.852462,-73.828121,,,0,601\n    601S,,Pelham Bay Park,,40.852462,-73.828121,,,0,601\n    602,,Buhre Av,,40.84681,-73.832569,,,1,\n    602N,,Buhre Av,,40.84681,-73.832569,,,0,602\n    602S,,Buhre Av,,40.84681,-73.832569,,,0,602\n    603,,Middletown Rd,,40.843863,-73.836322,,,1,\n    603N,,Middletown Rd,,40.843863,-73.836322,,,0,603\n    603S,,Middletown Rd,,40.843863,-73.836322,,,0,603\n    604,,Westchester Sq - E Tremont Av,,40.839892,-73.842952,,,1,\n    604N,,Westchester Sq - E Tremont Av,,40.839892,-73.842952,,,0,604\n    604S,,Westchester Sq - E Tremont Av,,40.839892,-73.842952,,,0,604\n    606,,Zerega Av,,40.836488,-73.847036,,,1,\n    606N,,Zerega Av,,40.836488,-73.847036,,,0,606\n    606S,,Zerega Av,,40.836488,-73.847036,,,0,606\n    607,,Castle Hill Av,,40.834255,-73.851222,,,1,\n    607N,,Castle Hill Av,,40.834255,-73.851222,,,0,607\n    607S,,Castle Hill Av,,40.834255,-73.851222,,,0,607\n    608,,Parkchester,,40.833226,-73.860816,,,1,\n    608N,,Parkchester,,40.833226,-73.860816,,,0,608\n    608S,,Parkchester,,40.833226,-73.860816,,,0,608\n    609,,St Lawrence Av,,40.831509,-73.867618,,,1,\n    609N,,St Lawrence Av,,40.831509,-73.867618,,,0,609\n    609S,,St Lawrence Av,,40.831509,-73.867618,,,0,609\n    610,,Morrison Av- Sound View,,40.829521,-73.874516,,,1,\n    610N,,Morrison Av- Sound View,,40.829521,-73.874516,,,0,610\n    610S,,Morrison Av- Sound View,,40.829521,-73.874516,,,0,610\n    611,,Elder Av,,40.828584,-73.879159,,,1,\n    611N,,Elder Av,,40.828584,-73.879159,,,0,611\n    611S,,Elder Av,,40.828584,-73.879159,,,0,611\n    612,,Whitlock Av,,40.826525,-73.886283,,,1,\n    612N,,Whitlock Av,,40.826525,-73.886283,,,0,612\n    612S,,Whitlock Av,,40.826525,-73.886283,,,0,612\n    613,,Hunts Point Av,,40.820948,-73.890549,,,1,\n    613N,,Hunts Point Av,,40.820948,-73.890549,,,0,613\n    613S,,Hunts Point Av,,40.820948,-73.890549,,,0,613\n    614,,Longwood Av,,40.816104,-73.896435,,,1,\n    614N,,Longwood Av,,40.816104,-73.896435,,,0,614\n    614S,,Longwood Av,,40.816104,-73.896435,,,0,614\n    615,,E 149 St,,40.812118,-73.904098,,,1,\n    615N,,E 149 St,,40.812118,-73.904098,,,0,615\n    615S,,E 149 St,,40.812118,-73.904098,,,0,615\n    616,,E 143 St - St Mary's St,,40.808719,-73.907657,,,1,\n    616N,,E 143 St - St Mary's St,,40.808719,-73.907657,,,0,616\n    616S,,E 143 St - St Mary's St,,40.808719,-73.907657,,,0,616\n    617,,Cypress Av,,40.805368,-73.914042,,,1,\n    617N,,Cypress Av,,40.805368,-73.914042,,,0,617\n    617S,,Cypress Av,,40.805368,-73.914042,,,0,617\n    618,,Brook Av,,40.807566,-73.91924,,,1,\n    618N,,Brook Av,,40.807566,-73.91924,,,0,618\n    618S,,Brook Av,,40.807566,-73.91924,,,0,618\n    619,,3 Av - 138 St,,40.810476,-73.926138,,,1,\n    619N,,3 Av - 138 St,,40.810476,-73.926138,,,0,619\n    619S,,3 Av - 138 St,,40.810476,-73.926138,,,0,619\n    621,,125 St,,40.804138,-73.937594,,,1,\n    621N,,125 St,,40.804138,-73.937594,,,0,621\n    621S,,125 St,,40.804138,-73.937594,,,0,621\n    622,,116 St,,40.798629,-73.941617,,,1,\n    622N,,116 St,,40.798629,-73.941617,,,0,622\n    622S,,116 St,,40.798629,-73.941617,,,0,622\n    623,,110 St,,40.79502,-73.94425,,,1,\n    623N,,110 St,,40.79502,-73.94425,,,0,623\n    623S,,110 St,,40.79502,-73.94425,,,0,623\n    624,,103 St,,40.7906,-73.947478,,,1,\n    624N,,103 St,,40.7906,-73.947478,,,0,624\n    624S,,103 St,,40.7906,-73.947478,,,0,624\n    625,,96 St,,40.785672,-73.95107,,,1,\n    625N,,96 St,,40.785672,-73.95107,,,0,625\n    625S,,96 St,,40.785672,-73.95107,,,0,625\n    626,,86 St,,40.779492,-73.955589,,,1,\n    626N,,86 St,,40.779492,-73.955589,,,0,626\n    626S,,86 St,,40.779492,-73.955589,,,0,626\n    627,,77 St,,40.77362,-73.959874,,,1,\n    627N,,77 St,,40.77362,-73.959874,,,0,627\n    627S,,77 St,,40.77362,-73.959874,,,0,627\n    628,,68 St - Hunter College,,40.768141,-73.96387,,,1,\n    628N,,68 St - Hunter College,,40.768141,-73.96387,,,0,628\n    628S,,68 St - Hunter College,,40.768141,-73.96387,,,0,628\n    629,,59 St,,40.762526,-73.967967,,,1,\n    629N,,59 St,,40.762526,-73.967967,,,0,629\n    629S,,59 St,,40.762526,-73.967967,,,0,629\n    630,,51 St,,40.757107,-73.97192,,,1,\n    630N,,51 St,,40.757107,-73.97192,,,0,630\n    630S,,51 St,,40.757107,-73.97192,,,0,630\n    631,,Grand Central - 42 St,,40.751776,-73.976848,,,1,\n    631N,,Grand Central - 42 St,,40.751776,-73.976848,,,0,631\n    631S,,Grand Central - 42 St,,40.751776,-73.976848,,,0,631\n    632,,33 St,,40.746081,-73.982076,,,1,\n    632N,,33 St,,40.746081,-73.982076,,,0,632\n    632S,,33 St,,40.746081,-73.982076,,,0,632\n    633,,28 St,,40.74307,-73.984264,,,1,\n    633N,,28 St,,40.74307,-73.984264,,,0,633\n    633S,,28 St,,40.74307,-73.984264,,,0,633\n    634,,23 St,,40.739864,-73.986599,,,1,\n    634N,,23 St,,40.739864,-73.986599,,,0,634\n    634S,,23 St,,40.739864,-73.986599,,,0,634\n    635,,14 St - Union Sq,,40.734673,-73.989951,,,1,\n    635N,,14 St - Union Sq,,40.734673,-73.989951,,,0,635\n    635S,,14 St - Union Sq,,40.734673,-73.989951,,,0,635\n    636,,Astor Pl,,40.730054,-73.99107,,,1,\n    636N,,Astor Pl,,40.730054,-73.99107,,,0,636\n    636S,,Astor Pl,,40.730054,-73.99107,,,0,636\n    637,,Bleecker St,,40.725915,-73.994659,,,1,\n    637N,,Bleecker St,,40.725915,-73.994659,,,0,637\n    637S,,Bleecker St,,40.725915,-73.994659,,,0,637\n    638,,Spring St,,40.722301,-73.997141,,,1,\n    638N,,Spring St,,40.722301,-73.997141,,,0,638\n    638S,,Spring St,,40.722301,-73.997141,,,0,638\n    639,,Canal St,,40.718803,-74.000193,,,1,\n    639N,,Canal St,,40.718803,-74.000193,,,0,639\n    639S,,Canal St,,40.718803,-74.000193,,,0,639\n    640,,Brooklyn Bridge - City Hall,,40.713065,-74.004131,,,1,\n    640N,,Brooklyn Bridge - City Hall,,40.713065,-74.004131,,,0,640\n    640S,,Brooklyn Bridge - City Hall,,40.713065,-74.004131,,,0,640\n    701,,Flushing - Main St,,40.7596,-73.83003,,,1,\n    701N,,Flushing - Main St,,40.7596,-73.83003,,,0,701\n    701S,,Flushing - Main St,,40.7596,-73.83003,,,0,701\n    702,,Mets - Willets Point,,40.754622,-73.845625,,,1,\n    702N,,Mets - Willets Point,,40.754622,-73.845625,,,0,702\n    702S,,Mets - Willets Point,,40.754622,-73.845625,,,0,702\n    705,,111 St,,40.75173,-73.855334,,,1,\n    705N,,111 St,,40.75173,-73.855334,,,0,705\n    705S,,111 St,,40.75173,-73.855334,,,0,705\n    706,,103 St - Corona Plaza,,40.749865,-73.8627,,,1,\n    706N,,103 St - Corona Plaza,,40.749865,-73.8627,,,0,706\n    706S,,103 St - Corona Plaza,,40.749865,-73.8627,,,0,706\n    707,,Junction Blvd,,40.749145,-73.869527,,,1,\n    707N,,Junction Blvd,,40.749145,-73.869527,,,0,707\n    707S,,Junction Blvd,,40.749145,-73.869527,,,0,707\n    708,,90 St - Elmhurst Av,,40.748408,-73.876613,,,1,\n    708N,,90 St - Elmhurst Av,,40.748408,-73.876613,,,0,708\n    708S,,90 St - Elmhurst Av,,40.748408,-73.876613,,,0,708\n    709,,82 St - Jackson Hts,,40.747659,-73.883697,,,1,\n    709N,,82 St - Jackson Hts,,40.747659,-73.883697,,,0,709\n    709S,,82 St - Jackson Hts,,40.747659,-73.883697,,,0,709\n    710,,74 St - Broadway,,40.746848,-73.891394,,,1,\n    710N,,74 St - Broadway,,40.746848,-73.891394,,,0,710\n    710S,,74 St - Broadway,,40.746848,-73.891394,,,0,710\n    711,,69 St,,40.746325,-73.896403,,,1,\n    711N,,69 St,,40.746325,-73.896403,,,0,711\n    711S,,69 St,,40.746325,-73.896403,,,0,711\n    712,,Woodside - 61 St,,40.74563,-73.902984,,,1,\n    712N,,Woodside - 61 St,,40.74563,-73.902984,,,0,712\n    712S,,Woodside - 61 St,,40.74563,-73.902984,,,0,712\n    713,,52 St,,40.744149,-73.912549,,,1,\n    713N,,52 St,,40.744149,-73.912549,,,0,713\n    713S,,52 St,,40.744149,-73.912549,,,0,713\n    714,,46 St,,40.743132,-73.918435,,,1,\n    714N,,46 St,,40.743132,-73.918435,,,0,714\n    714S,,46 St,,40.743132,-73.918435,,,0,714\n    715,,40 St,,40.743781,-73.924016,,,1,\n    715N,,40 St,,40.743781,-73.924016,,,0,715\n    715S,,40 St,,40.743781,-73.924016,,,0,715\n    716,,33 St,,40.744587,-73.930997,,,1,\n    716N,,33 St,,40.744587,-73.930997,,,0,716\n    716S,,33 St,,40.744587,-73.930997,,,0,716\n    718,,Queensboro Plaza,,40.750582,-73.940202,,,1,\n    718N,,Queensboro Plaza,,40.750582,-73.940202,,,0,718\n    718S,,Queensboro Plaza,,40.750582,-73.940202,,,0,718\n    719,,Court Sq,,40.747023,-73.945264,,,1,\n    719N,,Court Sq,,40.747023,-73.945264,,,0,719\n    719S,,Court Sq,,40.747023,-73.945264,,,0,719\n    720,,Hunters Point Av,,40.742216,-73.948916,,,1,\n    720N,,Hunters Point Av,,40.742216,-73.948916,,,0,720\n    720S,,Hunters Point Av,,40.742216,-73.948916,,,0,720\n    721,,Vernon Blvd - Jackson Av,,40.742626,-73.953581,,,1,\n    721N,,Vernon Blvd - Jackson Av,,40.742626,-73.953581,,,0,721\n    721S,,Vernon Blvd - Jackson Av,,40.742626,-73.953581,,,0,721\n    723,,Grand Central - 42 St,,40.751431,-73.976041,,,1,\n    723N,,Grand Central - 42 St,,40.751431,-73.976041,,,0,723\n    723S,,Grand Central - 42 St,,40.751431,-73.976041,,,0,723\n    724,,5 Av,,40.753821,-73.981963,,,1,\n    724N,,5 Av,,40.753821,-73.981963,,,0,724\n    724S,,5 Av,,40.753821,-73.981963,,,0,724\n    725,,Times Sq - 42 St,,40.755477,-73.987691,,,1,\n    725N,,Times Sq - 42 St,,40.755477,-73.987691,,,0,725\n    725S,,Times Sq - 42 St,,40.755477,-73.987691,,,0,725\n    726,,34 St - 11 Av,,40.755882,-74.001910,,,1,\n    726N,,34 St - 11 Av,,40.755882,-74.001910,,,0,726\n    726S,,34 St - 11 Av,,40.755882,-74.001910,,,0,726\n    901,,Grand Central - 42 St,,40.752769,-73.979189,,,1,\n    901N,,Grand Central - 42 St,,40.752769,-73.979189,,,0,901\n    901S,,Grand Central - 42 St,,40.752769,-73.979189,,,0,901\n    902,,Times Sq - 42 St,,40.755983,-73.986229,,,1,\n    902N,,Times Sq - 42 St,,40.755983,-73.986229,,,0,902\n    902S,,Times Sq - 42 St,,40.755983,-73.986229,,,0,902\n    A02,,Inwood - 207 St,,40.868072,-73.919899,,,1,\n    A02N,,Inwood - 207 St,,40.868072,-73.919899,,,0,A02\n    A02S,,Inwood - 207 St,,40.868072,-73.919899,,,0,A02\n    A03,,Dyckman St,,40.865491,-73.927271,,,1,\n    A03N,,Dyckman St,,40.865491,-73.927271,,,0,A03\n    A03S,,Dyckman St,,40.865491,-73.927271,,,0,A03\n    A05,,190 St,,40.859022,-73.93418,,,1,\n    A05N,,190 St,,40.859022,-73.93418,,,0,A05\n    A05S,,190 St,,40.859022,-73.93418,,,0,A05\n    A06,,181 St,,40.851695,-73.937969,,,1,\n    A06N,,181 St,,40.851695,-73.937969,,,0,A06\n    A06S,,181 St,,40.851695,-73.937969,,,0,A06\n    A07,,175 St,,40.847391,-73.939704,,,1,\n    A07N,,175 St,,40.847391,-73.939704,,,0,A07\n    A07S,,175 St,,40.847391,-73.939704,,,0,A07\n    A09,,168 St,,40.840719,-73.939561,,,1,\n    A09N,,168 St,,40.840719,-73.939561,,,0,A09\n    A09S,,168 St,,40.840719,-73.939561,,,0,A09\n    A10,,163 St - Amsterdam Av,,40.836013,-73.939892,,,1,\n    A10N,,163 St - Amsterdam Av,,40.836013,-73.939892,,,0,A10\n    A10S,,163 St - Amsterdam Av,,40.836013,-73.939892,,,0,A10\n    A11,,155 St,,40.830518,-73.941514,,,1,\n    A11N,,155 St,,40.830518,-73.941514,,,0,A11\n    A11S,,155 St,,40.830518,-73.941514,,,0,A11\n    A12,,145 St,,40.824783,-73.944216,,,1,\n    A12N,,145 St,,40.824783,-73.944216,,,0,A12\n    A12S,,145 St,,40.824783,-73.944216,,,0,A12\n    A14,,135 St,,40.817894,-73.947649,,,1,\n    A14N,,135 St,,40.817894,-73.947649,,,0,A14\n    A14S,,135 St,,40.817894,-73.947649,,,0,A14\n    A15,,125 St,,40.811109,-73.952343,,,1,\n    A15N,,125 St,,40.811109,-73.952343,,,0,A15\n    A15S,,125 St,,40.811109,-73.952343,,,0,A15\n    A16,,116 St,,40.805085,-73.954882,,,1,\n    A16N,,116 St,,40.805085,-73.954882,,,0,A16\n    A16S,,116 St,,40.805085,-73.954882,,,0,A16\n    A17,,Cathedral Pkwy (110 St),,40.800603,-73.958161,,,1,\n    A17N,,Cathedral Pkwy (110 St),,40.800603,-73.958161,,,0,A17\n    A17S,,Cathedral Pkwy (110 St),,40.800603,-73.958161,,,0,A17\n    A18,,103 St,,40.796092,-73.961454,,,1,\n    A18N,,103 St,,40.796092,-73.961454,,,0,A18\n    A18S,,103 St,,40.796092,-73.961454,,,0,A18\n    A19,,96 St,,40.791642,-73.964696,,,1,\n    A19N,,96 St,,40.791642,-73.964696,,,0,A19\n    A19S,,96 St,,40.791642,-73.964696,,,0,A19\n    A20,,86 St,,40.785868,-73.968916,,,1,\n    A20N,,86 St,,40.785868,-73.968916,,,0,A20\n    A20S,,86 St,,40.785868,-73.968916,,,0,A20\n    A21,,81 St - Museum of Natural History,,40.781433,-73.972143,,,1,\n    A21N,,81 St - Museum of Natural History,,40.781433,-73.972143,,,0,A21\n    A21S,,81 St - Museum of Natural History,,40.781433,-73.972143,,,0,A21\n    A22,,72 St,,40.775594,-73.97641,,,1,\n    A22N,,72 St,,40.775594,-73.97641,,,0,A22\n    A22S,,72 St,,40.775594,-73.97641,,,0,A22\n    A24,,59 St - Columbus Circle,,40.768296,-73.981736,,,1,\n    A24N,,59 St - Columbus Circle,,40.768296,-73.981736,,,0,A24\n    A24S,,59 St - Columbus Circle,,40.768296,-73.981736,,,0,A24\n    A25,,50 St,,40.762456,-73.985984,,,1,\n    A25N,,50 St,,40.762456,-73.985984,,,0,A25\n    A25S,,50 St,,40.762456,-73.985984,,,0,A25\n    A27,,42 St - Port Authority Bus Terminal,,40.757308,-73.989735,,,1,\n    A27N,,42 St - Port Authority Bus Terminal,,40.757308,-73.989735,,,0,A27\n    A27S,,42 St - Port Authority Bus Terminal,,40.757308,-73.989735,,,0,A27\n    A28,,34 St - Penn Station,,40.752287,-73.993391,,,1,\n    A28N,,34 St - Penn Station,,40.752287,-73.993391,,,0,A28\n    A28S,,34 St - Penn Station,,40.752287,-73.993391,,,0,A28\n    A30,,23 St,,40.745906,-73.998041,,,1,\n    A30N,,23 St,,40.745906,-73.998041,,,0,A30\n    A30S,,23 St,,40.745906,-73.998041,,,0,A30\n    A31,,14 St,,40.740893,-74.00169,,,1,\n    A31N,,14 St,,40.740893,-74.00169,,,0,A31\n    A31S,,14 St,,40.740893,-74.00169,,,0,A31\n    A32,,W 4 St,,40.732338,-74.000495,,,1,\n    A32N,,W 4 St,,40.732338,-74.000495,,,0,A32\n    A32S,,W 4 St,,40.732338,-74.000495,,,0,A32\n    A33,,Spring St,,40.726227,-74.003739,,,1,\n    A33N,,Spring St,,40.726227,-74.003739,,,0,A33\n    A33S,,Spring St,,40.726227,-74.003739,,,0,A33\n    A34,,Canal St,,40.720824,-74.005229,,,1,\n    A34N,,Canal St,,40.720824,-74.005229,,,0,A34\n    A34S,,Canal St,,40.720824,-74.005229,,,0,A34\n    A36,,Chambers St,,40.714111,-74.008585,,,1,\n    A36N,,Chambers St,,40.714111,-74.008585,,,0,A36\n    A36S,,Chambers St,,40.714111,-74.008585,,,0,A36\n    A38,,Fulton St,,40.710197,-74.007691,,,1,\n    A38N,,Fulton St,,40.710197,-74.007691,,,0,A38\n    A38S,,Fulton St,,40.710197,-74.007691,,,0,A38\n    A40,,High St,,40.699337,-73.990531,,,1,\n    A40N,,High St,,40.699337,-73.990531,,,0,A40\n    A40S,,High St,,40.699337,-73.990531,,,0,A40\n    A41,,Jay St - MetroTech,,40.692338,-73.987342,,,1,\n    A41N,,Jay St - MetroTech,,40.692338,-73.987342,,,0,A41\n    A41S,,Jay St - MetroTech,,40.692338,-73.987342,,,0,A41\n    A42,,Hoyt - Schermerhorn Sts,,40.688484,-73.985001,,,1,\n    A42N,,Hoyt - Schermerhorn Sts,,40.688484,-73.985001,,,0,A42\n    A42S,,Hoyt - Schermerhorn Sts,,40.688484,-73.985001,,,0,A42\n    A43,,Lafayette Av,,40.686113,-73.973946,,,1,\n    A43N,,Lafayette Av,,40.686113,-73.973946,,,0,A43\n    A43S,,Lafayette Av,,40.686113,-73.973946,,,0,A43\n    A44,,Clinton - Washington Avs,,40.683263,-73.965838,,,1,\n    A44N,,Clinton - Washington Avs,,40.683263,-73.965838,,,0,A44\n    A44S,,Clinton - Washington Avs,,40.683263,-73.965838,,,0,A44\n    A45,,Franklin Av,,40.68138,-73.956848,,,1,\n    A45N,,Franklin Av,,40.68138,-73.956848,,,0,A45\n    A45S,,Franklin Av,,40.68138,-73.956848,,,0,A45\n    A46,,Nostrand Av,,40.680438,-73.950426,,,1,\n    A46N,,Nostrand Av,,40.680438,-73.950426,,,0,A46\n    A46S,,Nostrand Av,,40.680438,-73.950426,,,0,A46\n    A47,,Kingston - Throop Avs,,40.679921,-73.940858,,,1,\n    A47N,,Kingston - Throop Avs,,40.679921,-73.940858,,,0,A47\n    A47S,,Kingston - Throop Avs,,40.679921,-73.940858,,,0,A47\n    A48,,Utica Av,,40.679364,-73.930729,,,1,\n    A48N,,Utica Av,,40.679364,-73.930729,,,0,A48\n    A48S,,Utica Av,,40.679364,-73.930729,,,0,A48\n    A49,,Ralph Av,,40.678822,-73.920786,,,1,\n    A49N,,Ralph Av,,40.678822,-73.920786,,,0,A49\n    A49S,,Ralph Av,,40.678822,-73.920786,,,0,A49\n    A50,,Rockaway Av,,40.67834,-73.911946,,,1,\n    A50N,,Rockaway Av,,40.67834,-73.911946,,,0,A50\n    A50S,,Rockaway Av,,40.67834,-73.911946,,,0,A50\n    A51,,Broadway Jct,,40.678334,-73.905316,,,1,\n    A51N,,Broadway Jct,,40.678334,-73.905316,,,0,A51\n    A51S,,Broadway Jct,,40.678334,-73.905316,,,0,A51\n    A52,,Liberty Av,,40.674542,-73.896548,,,1,\n    A52N,,Liberty Av,,40.674542,-73.896548,,,0,A52\n    A52S,,Liberty Av,,40.674542,-73.896548,,,0,A52\n    A53,,Van Siclen Av,,40.67271,-73.890358,,,1,\n    A53N,,Van Siclen Av,,40.67271,-73.890358,,,0,A53\n    A53S,,Van Siclen Av,,40.67271,-73.890358,,,0,A53\n    A54,,Shepherd Av,,40.67413,-73.88075,,,1,\n    A54N,,Shepherd Av,,40.67413,-73.88075,,,0,A54\n    A54S,,Shepherd Av,,40.67413,-73.88075,,,0,A54\n    A55,,Euclid Av,,40.675377,-73.872106,,,1,\n    A55N,,Euclid Av,,40.675377,-73.872106,,,0,A55\n    A55S,,Euclid Av,,40.675377,-73.872106,,,0,A55\n    A57,,Grant Av,,40.677044,-73.86505,,,1,\n    A57N,,Grant Av,,40.677044,-73.86505,,,0,A57\n    A57S,,Grant Av,,40.677044,-73.86505,,,0,A57\n    A59,,80 St,,40.679371,-73.858992,,,1,\n    A59N,,80 St,,40.679371,-73.858992,,,0,A59\n    A59S,,80 St,,40.679371,-73.858992,,,0,A59\n    A60,,88 St,,40.679843,-73.85147,,,1,\n    A60N,,88 St,,40.679843,-73.85147,,,0,A60\n    A60S,,88 St,,40.679843,-73.85147,,,0,A60\n    A61,,Rockaway Blvd,,40.680429,-73.843853,,,1,\n    A61N,,Rockaway Blvd,,40.680429,-73.843853,,,0,A61\n    A61S,,Rockaway Blvd,,40.680429,-73.843853,,,0,A61\n    A63,,104 St,,40.681711,-73.837683,,,1,\n    A63N,,104 St,,40.681711,-73.837683,,,0,A63\n    A63S,,104 St,,40.681711,-73.837683,,,0,A63\n    A64,,111 St,,40.684331,-73.832163,,,1,\n    A64N,,111 St,,40.684331,-73.832163,,,0,A64\n    A64S,,111 St,,40.684331,-73.832163,,,0,A64\n    A65,,Ozone Park - Lefferts Blvd,,40.685951,-73.825798,,,1,\n    A65N,,Ozone Park - Lefferts Blvd,,40.685951,-73.825798,,,0,A65\n    A65S,,Ozone Park - Lefferts Blvd,,40.685951,-73.825798,,,0,A65\n    B04,,21 St - Queensbridge,,40.754203,-73.942836,,,1,\n    B04N,,21 St - Queensbridge,,40.754203,-73.942836,,,0,B04\n    B04S,,21 St - Queensbridge,,40.754203,-73.942836,,,0,B04\n    B06,,Roosevelt Island,,40.759145,-73.95326,,,1,\n    B06N,,Roosevelt Island,,40.759145,-73.95326,,,0,B06\n    B06S,,Roosevelt Island,,40.759145,-73.95326,,,0,B06\n    B08,,Lexington Av/63 St,,40.764629,-73.966113,,,1,\n    B08N,,Lexington Av/63 St,,40.764629,-73.966113,,,0,B08\n    B08S,,Lexington Av/63 St,,40.764629,-73.966113,,,0,B08\n    B10,,57 St,,40.763972,-73.97745,,,1,\n    B10N,,57 St,,40.763972,-73.97745,,,0,B10\n    B10S,,57 St,,40.763972,-73.97745,,,0,B10\n    B12,,9 Av,,40.646292,-73.994324,,,1,\n    B12N,,9 Av,,40.646292,-73.994324,,,0,B12\n    B12S,,9 Av,,40.646292,-73.994324,,,0,B12\n    B13,,Fort Hamilton Pkwy,,40.640914,-73.994304,,,1,\n    B13N,,Fort Hamilton Pkwy,,40.640914,-73.994304,,,0,B13\n    B13S,,Fort Hamilton Pkwy,,40.640914,-73.994304,,,0,B13\n    B14,,50 St,,40.63626,-73.994791,,,1,\n    B14N,,50 St,,40.63626,-73.994791,,,0,B14\n    B14S,,50 St,,40.63626,-73.994791,,,0,B14\n    B15,,55 St,,40.631435,-73.995476,,,1,\n    B15N,,55 St,,40.631435,-73.995476,,,0,B15\n    B15S,,55 St,,40.631435,-73.995476,,,0,B15\n    B16,,62 St,,40.626472,-73.996895,,,1,\n    B16N,,62 St,,40.626472,-73.996895,,,0,B16\n    B16S,,62 St,,40.626472,-73.996895,,,0,B16\n    B17,,71 St,,40.619589,-73.998864,,,1,\n    B17N,,71 St,,40.619589,-73.998864,,,0,B17\n    B17S,,71 St,,40.619589,-73.998864,,,0,B17\n    B18,,79 St,,40.613501,-74.00061,,,1,\n    B18N,,79 St,,40.613501,-74.00061,,,0,B18\n    B18S,,79 St,,40.613501,-74.00061,,,0,B18\n    B19,,18 Av,,40.607954,-74.001736,,,1,\n    B19N,,18 Av,,40.607954,-74.001736,,,0,B19\n    B19S,,18 Av,,40.607954,-74.001736,,,0,B19\n    B20,,20 Av,,40.604556,-73.998168,,,1,\n    B20N,,20 Av,,40.604556,-73.998168,,,0,B20\n    B20S,,20 Av,,40.604556,-73.998168,,,0,B20\n    B21,,Bay Pkwy,,40.601875,-73.993728,,,1,\n    B21N,,Bay Pkwy,,40.601875,-73.993728,,,0,B21\n    B21S,,Bay Pkwy,,40.601875,-73.993728,,,0,B21\n    B22,,25 Av,,40.597704,-73.986829,,,1,\n    B22N,,25 Av,,40.597704,-73.986829,,,0,B22\n    B22S,,25 Av,,40.597704,-73.986829,,,0,B22\n    B23,,Bay 50 St,,40.588841,-73.983765,,,1,\n    B23N,,Bay 50 St,,40.588841,-73.983765,,,0,B23\n    B23S,,Bay 50 St,,40.588841,-73.983765,,,0,B23\n    D01,,Norwood - 205 St,,40.874811,-73.878855,,,1,\n    D01N,,Norwood - 205 St,,40.874811,-73.878855,,,0,D01\n    D01S,,Norwood - 205 St,,40.874811,-73.878855,,,0,D01\n    D03,,Bedford Park Blvd,,40.873244,-73.887138,,,1,\n    D03N,,Bedford Park Blvd,,40.873244,-73.887138,,,0,D03\n    D03S,,Bedford Park Blvd,,40.873244,-73.887138,,,0,D03\n    D04,,Kingsbridge Rd,,40.866978,-73.893509,,,1,\n    D04N,,Kingsbridge Rd,,40.866978,-73.893509,,,0,D04\n    D04S,,Kingsbridge Rd,,40.866978,-73.893509,,,0,D04\n    D05,,Fordham Rd,,40.861296,-73.897749,,,1,\n    D05N,,Fordham Rd,,40.861296,-73.897749,,,0,D05\n    D05S,,Fordham Rd,,40.861296,-73.897749,,,0,D05\n    D06,,182-183 Sts,,40.856093,-73.900741,,,1,\n    D06N,,182-183 Sts,,40.856093,-73.900741,,,0,D06\n    D06S,,182-183 Sts,,40.856093,-73.900741,,,0,D06\n    D07,,Tremont Av,,40.85041,-73.905227,,,1,\n    D07N,,Tremont Av,,40.85041,-73.905227,,,0,D07\n    D07S,,Tremont Av,,40.85041,-73.905227,,,0,D07\n    D08,,174-175 Sts,,40.8459,-73.910136,,,1,\n    D08N,,174-175 Sts,,40.8459,-73.910136,,,0,D08\n    D08S,,174-175 Sts,,40.8459,-73.910136,,,0,D08\n    D09,,170 St,,40.839306,-73.9134,,,1,\n    D09N,,170 St,,40.839306,-73.9134,,,0,D09\n    D09S,,170 St,,40.839306,-73.9134,,,0,D09\n    D10,,167 St,,40.833771,-73.91844,,,1,\n    D10N,,167 St,,40.833771,-73.91844,,,0,D10\n    D10S,,167 St,,40.833771,-73.91844,,,0,D10\n    D11,,161 St - Yankee Stadium,,40.827905,-73.925651,,,1,\n    D11N,,161 St - Yankee Stadium,,40.827905,-73.925651,,,0,D11\n    D11S,,161 St - Yankee Stadium,,40.827905,-73.925651,,,0,D11\n    D12,,155 St,,40.830135,-73.938209,,,1,\n    D12N,,155 St,,40.830135,-73.938209,,,0,D12\n    D12S,,155 St,,40.830135,-73.938209,,,0,D12\n    D13,,145 St,,40.824783,-73.944216,,,1,\n    D13N,,145 St,,40.824783,-73.944216,,,0,D13\n    D13S,,145 St,,40.824783,-73.944216,,,0,D13\n    D14,,7 Av,,40.762862,-73.981637,,,1,\n    D14N,,7 Av,,40.762862,-73.981637,,,0,D14\n    D14S,,7 Av,,40.762862,-73.981637,,,0,D14\n    D15,,47-50 Sts - Rockefeller Ctr,,40.758663,-73.981329,,,1,\n    D15N,,47-50 Sts - Rockefeller Ctr,,40.758663,-73.981329,,,0,D15\n    D15S,,47-50 Sts - Rockefeller Ctr,,40.758663,-73.981329,,,0,D15\n    D16,,42 St - Bryant Pk,,40.754222,-73.984569,,,1,\n    D16N,,42 St - Bryant Pk,,40.754222,-73.984569,,,0,D16\n    D16S,,42 St - Bryant Pk,,40.754222,-73.984569,,,0,D16\n    D17,,34 St - Herald Sq,,40.749719,-73.987823,,,1,\n    D17N,,34 St - Herald Sq,,40.749719,-73.987823,,,0,D17\n    D17S,,34 St - Herald Sq,,40.749719,-73.987823,,,0,D17\n    D18,,23 St,,40.742878,-73.992821,,,1,\n    D18N,,23 St,,40.742878,-73.992821,,,0,D18\n    D18S,,23 St,,40.742878,-73.992821,,,0,D18\n    D19,,14 St,,40.738228,-73.996209,,,1,\n    D19N,,14 St,,40.738228,-73.996209,,,0,D19\n    D19S,,14 St,,40.738228,-73.996209,,,0,D19\n    D20,,W 4 St,,40.732338,-74.000495,,,1,\n    D20N,,W 4 St,,40.732338,-74.000495,,,0,D20\n    D20S,,W 4 St,,40.732338,-74.000495,,,0,D20\n    D21,,Broadway-Lafayette St,,40.725297,-73.996204,,,1,\n    D21N,,Broadway-Lafayette St,,40.725297,-73.996204,,,0,D21\n    D21S,,Broadway-Lafayette St,,40.725297,-73.996204,,,0,D21\n    D22,,Grand St,,40.718267,-73.993753,,,1,\n    D22N,,Grand St,,40.718267,-73.993753,,,0,D22\n    D22S,,Grand St,,40.718267,-73.993753,,,0,D22\n    D24,,Atlantic Av - Barclays Ctr,,40.68446,-73.97689,,,1,\n    D24N,,Atlantic Av - Barclays Ctr,,40.68446,-73.97689,,,0,D24\n    D24S,,Atlantic Av - Barclays Ctr,,40.68446,-73.97689,,,0,D24\n    D25,,7 Av,,40.67705,-73.972367,,,1,\n    D25N,,7 Av,,40.67705,-73.972367,,,0,D25\n    D25S,,7 Av,,40.67705,-73.972367,,,0,D25\n    D26,,Prospect Park,,40.661614,-73.962246,,,1,\n    D26N,,Prospect Park,,40.661614,-73.962246,,,0,D26\n    D26S,,Prospect Park,,40.661614,-73.962246,,,0,D26\n    D27,,Parkside Av,,40.655292,-73.961495,,,1,\n    D27N,,Parkside Av,,40.655292,-73.961495,,,0,D27\n    D27S,,Parkside Av,,40.655292,-73.961495,,,0,D27\n    D28,,Church Av,,40.650527,-73.962982,,,1,\n    D28N,,Church Av,,40.650527,-73.962982,,,0,D28\n    D28S,,Church Av,,40.650527,-73.962982,,,0,D28\n    D29,,Beverley Rd,,40.644031,-73.964492,,,1,\n    D29N,,Beverley Rd,,40.644031,-73.964492,,,0,D29\n    D29S,,Beverley Rd,,40.644031,-73.964492,,,0,D29\n    D30,,Cortelyou Rd,,40.640927,-73.963891,,,1,\n    D30N,,Cortelyou Rd,,40.640927,-73.963891,,,0,D30\n    D30S,,Cortelyou Rd,,40.640927,-73.963891,,,0,D30\n    D31,,Newkirk Plaza,,40.635082,-73.962793,,,1,\n    D31N,,Newkirk Plaza,,40.635082,-73.962793,,,0,D31\n    D31S,,Newkirk Plaza,,40.635082,-73.962793,,,0,D31\n    D32,,Avenue H,,40.62927,-73.961639,,,1,\n    D32N,,Avenue H,,40.62927,-73.961639,,,0,D32\n    D32S,,Avenue H,,40.62927,-73.961639,,,0,D32\n    D33,,Avenue J,,40.625039,-73.960803,,,1,\n    D33N,,Avenue J,,40.625039,-73.960803,,,0,D33\n    D33S,,Avenue J,,40.625039,-73.960803,,,0,D33\n    D34,,Avenue M,,40.617618,-73.959399,,,1,\n    D34N,,Avenue M,,40.617618,-73.959399,,,0,D34\n    D34S,,Avenue M,,40.617618,-73.959399,,,0,D34\n    D35,,Kings Hwy,,40.60867,-73.957734,,,1,\n    D35N,,Kings Hwy,,40.60867,-73.957734,,,0,D35\n    D35S,,Kings Hwy,,40.60867,-73.957734,,,0,D35\n    D37,,Avenue U,,40.5993,-73.955929,,,1,\n    D37N,,Avenue U,,40.5993,-73.955929,,,0,D37\n    D37S,,Avenue U,,40.5993,-73.955929,,,0,D37\n    D38,,Neck Rd,,40.595246,-73.955161,,,1,\n    D38N,,Neck Rd,,40.595246,-73.955161,,,0,D38\n    D38S,,Neck Rd,,40.595246,-73.955161,,,0,D38\n    D39,,Sheepshead Bay,,40.586896,-73.954155,,,1,\n    D39N,,Sheepshead Bay,,40.586896,-73.954155,,,0,D39\n    D39S,,Sheepshead Bay,,40.586896,-73.954155,,,0,D39\n    D40,,Brighton Beach,,40.577621,-73.961376,,,1,\n    D40N,,Brighton Beach,,40.577621,-73.961376,,,0,D40\n    D40S,,Brighton Beach,,40.577621,-73.961376,,,0,D40\n    D41,,Ocean Pkwy,,40.576312,-73.968501,,,1,\n    D41N,,Ocean Pkwy,,40.576312,-73.968501,,,0,D41\n    D41S,,Ocean Pkwy,,40.576312,-73.968501,,,0,D41\n    D42,,W 8 St - NY Aquarium,,40.576127,-73.975939,,,1,\n    D42N,,W 8 St - NY Aquarium,,40.576127,-73.975939,,,0,D42\n    D42S,,W 8 St - NY Aquarium,,40.576127,-73.975939,,,0,D42\n    D43,,Coney Island - Stillwell Av,,40.577422,-73.981233,,,1,\n    D43N,,Coney Island - Stillwell Av,,40.577422,-73.981233,,,0,D43\n    D43S,,Coney Island - Stillwell Av,,40.577422,-73.981233,,,0,D43\n    E01,,World Trade Center,,40.712582,-74.009781,,,1,\n    E01N,,World Trade Center,,40.712582,-74.009781,,,0,E01\n    E01S,,World Trade Center,,40.712582,-74.009781,,,0,E01\n    F01,,Jamaica - 179 St,,40.712646,-73.783817,,,1,\n    F01N,,Jamaica - 179 St,,40.712646,-73.783817,,,0,F01\n    F01S,,Jamaica - 179 St,,40.712646,-73.783817,,,0,F01\n    F02,,169 St,,40.71047,-73.793604,,,1,\n    F02N,,169 St,,40.71047,-73.793604,,,0,F02\n    F02S,,169 St,,40.71047,-73.793604,,,0,F02\n    F03,,Parsons Blvd,,40.707564,-73.803326,,,1,\n    F03N,,Parsons Blvd,,40.707564,-73.803326,,,0,F03\n    F03S,,Parsons Blvd,,40.707564,-73.803326,,,0,F03\n    F04,,Sutphin Blvd,,40.70546,-73.810708,,,1,\n    F04N,,Sutphin Blvd,,40.70546,-73.810708,,,0,F04\n    F04S,,Sutphin Blvd,,40.70546,-73.810708,,,0,F04\n    F05,,Briarwood - Van Wyck Blvd,,40.709179,-73.820574,,,1,\n    F05N,,Briarwood - Van Wyck Blvd,,40.709179,-73.820574,,,0,F05\n    F05S,,Briarwood - Van Wyck Blvd,,40.709179,-73.820574,,,0,F05\n    F06,,Kew Gardens - Union Tpke,,40.714441,-73.831008,,,1,\n    F06N,,Kew Gardens - Union Tpke,,40.714441,-73.831008,,,0,F06\n    F06S,,Kew Gardens - Union Tpke,,40.714441,-73.831008,,,0,F06\n    F07,,75 Av,,40.718331,-73.837324,,,1,\n    F07N,,75 Av,,40.718331,-73.837324,,,0,F07\n    F07S,,75 Av,,40.718331,-73.837324,,,0,F07\n    F09,,Court Sq,,40.747846,-73.946,,,1,\n    F09N,,Court Sq,,40.747846,-73.946,,,0,F09\n    F09S,,Court Sq,,40.747846,-73.946,,,0,F09\n    F11,,Lexington Av/53 St,,40.757552,-73.969055,,,1,\n    F11N,,Lexington Av/53 St,,40.757552,-73.969055,,,0,F11\n    F11S,,Lexington Av/53 St,,40.757552,-73.969055,,,0,F11\n    F12,,5 Av/53 St,,40.760167,-73.975224,,,1,\n    F12N,,5 Av/53 St,,40.760167,-73.975224,,,0,F12\n    F12S,,5 Av/53 St,,40.760167,-73.975224,,,0,F12\n    F14,,2 Av,,40.723402,-73.989938,,,1,\n    F14N,,2 Av,,40.723402,-73.989938,,,0,F14\n    F14S,,2 Av,,40.723402,-73.989938,,,0,F14\n    F15,,Delancey St,,40.718611,-73.988114,,,1,\n    F15N,,Delancey St,,40.718611,-73.988114,,,0,F15\n    F15S,,Delancey St,,40.718611,-73.988114,,,0,F15\n    F16,,East Broadway,,40.713715,-73.990173,,,1,\n    F16N,,East Broadway,,40.713715,-73.990173,,,0,F16\n    F16S,,East Broadway,,40.713715,-73.990173,,,0,F16\n    F18,,York St,,40.701397,-73.986751,,,1,\n    F18N,,York St,,40.701397,-73.986751,,,0,F18\n    F18S,,York St,,40.701397,-73.986751,,,0,F18\n    F20,,Bergen St,,40.686145,-73.990862,,,1,\n    F20N,,Bergen St,,40.686145,-73.990862,,,0,F20\n    F20S,,Bergen St,,40.686145,-73.990862,,,0,F20\n    F21,,Carroll St,,40.680303,-73.995048,,,1,\n    F21N,,Carroll St,,40.680303,-73.995048,,,0,F21\n    F21S,,Carroll St,,40.680303,-73.995048,,,0,F21\n    F22,,Smith - 9 Sts,,40.67358,-73.995959,,,1,\n    F22N,,Smith - 9 Sts,,40.67358,-73.995959,,,0,F22\n    F22S,,Smith - 9 Sts,,40.67358,-73.995959,,,0,F22\n    F23,,4 Av,,40.670272,-73.989779,,,1,\n    F23N,,4 Av,,40.670272,-73.989779,,,0,F23\n    F23S,,4 Av,,40.670272,-73.989779,,,0,F23\n    F24,,7 Av,,40.666271,-73.980305,,,1,\n    F24N,,7 Av,,40.666271,-73.980305,,,0,F24\n    F24S,,7 Av,,40.666271,-73.980305,,,0,F24\n    F25,,15 St - Prospect Park,,40.660365,-73.979493,,,1,\n    F25N,,15 St - Prospect Park,,40.660365,-73.979493,,,0,F25\n    F25S,,15 St - Prospect Park,,40.660365,-73.979493,,,0,F25\n    F26,,Fort Hamilton Pkwy,,40.650782,-73.975776,,,1,\n    F26N,,Fort Hamilton Pkwy,,40.650782,-73.975776,,,0,F26\n    F26S,,Fort Hamilton Pkwy,,40.650782,-73.975776,,,0,F26\n    F27,,Church Av,,40.644041,-73.979678,,,1,\n    F27N,,Church Av,,40.644041,-73.979678,,,0,F27\n    F27S,,Church Av,,40.644041,-73.979678,,,0,F27\n    F29,,Ditmas Av,,40.636119,-73.978172,,,1,\n    F29N,,Ditmas Av,,40.636119,-73.978172,,,0,F29\n    F29S,,Ditmas Av,,40.636119,-73.978172,,,0,F29\n    F30,,18 Av,,40.629755,-73.976971,,,1,\n    F30N,,18 Av,,40.629755,-73.976971,,,0,F30\n    F30S,,18 Av,,40.629755,-73.976971,,,0,F30\n    F31,,Avenue I,,40.625322,-73.976127,,,1,\n    F31N,,Avenue I,,40.625322,-73.976127,,,0,F31\n    F31S,,Avenue I,,40.625322,-73.976127,,,0,F31\n    F32,,Bay Pkwy,,40.620769,-73.975264,,,1,\n    F32N,,Bay Pkwy,,40.620769,-73.975264,,,0,F32\n    F32S,,Bay Pkwy,,40.620769,-73.975264,,,0,F32\n    F33,,Avenue N,,40.61514,-73.974197,,,1,\n    F33N,,Avenue N,,40.61514,-73.974197,,,0,F33\n    F33S,,Avenue N,,40.61514,-73.974197,,,0,F33\n    F34,,Avenue P,,40.608944,-73.973022,,,1,\n    F34N,,Avenue P,,40.608944,-73.973022,,,0,F34\n    F34S,,Avenue P,,40.608944,-73.973022,,,0,F34\n    F35,,Kings Hwy,,40.603217,-73.972361,,,1,\n    F35N,,Kings Hwy,,40.603217,-73.972361,,,0,F35\n    F35S,,Kings Hwy,,40.603217,-73.972361,,,0,F35\n    F36,,Avenue U,,40.596063,-73.973357,,,1,\n    F36N,,Avenue U,,40.596063,-73.973357,,,0,F36\n    F36S,,Avenue U,,40.596063,-73.973357,,,0,F36\n    F38,,Avenue X,,40.58962,-73.97425,,,1,\n    F38N,,Avenue X,,40.58962,-73.97425,,,0,F38\n    F38S,,Avenue X,,40.58962,-73.97425,,,0,F38\n    F39,,Neptune Av,,40.581011,-73.974574,,,1,\n    F39N,,Neptune Av,,40.581011,-73.974574,,,0,F39\n    F39S,,Neptune Av,,40.581011,-73.974574,,,0,F39\n    G05,,Jamaica Center - Parsons/Archer,,40.702147,-73.801109,,,1,\n    G05N,,Jamaica Center - Parsons/Archer,,40.702147,-73.801109,,,0,G05\n    G05S,,Jamaica Center - Parsons/Archer,,40.702147,-73.801109,,,0,G05\n    G06,,Sutphin Blvd - Archer Av - JFK Airport,,40.700486,-73.807969,,,1,\n    G06N,,Sutphin Blvd - Archer Av - JFK Airport,,40.700486,-73.807969,,,0,G06\n    G06S,,Sutphin Blvd - Archer Av - JFK Airport,,40.700486,-73.807969,,,0,G06\n    G07,,Jamaica - Van Wyck,,40.702566,-73.816859,,,1,\n    G07N,,Jamaica - Van Wyck,,40.702566,-73.816859,,,0,G07\n    G07S,,Jamaica - Van Wyck,,40.702566,-73.816859,,,0,G07\n    G08,,Forest Hills - 71 Av,,40.721691,-73.844521,,,1,\n    G08N,,Forest Hills - 71 Av,,40.721691,-73.844521,,,0,G08\n    G08S,,Forest Hills - 71 Av,,40.721691,-73.844521,,,0,G08\n    G09,,67 Av,,40.726523,-73.852719,,,1,\n    G09N,,67 Av,,40.726523,-73.852719,,,0,G09\n    G09S,,67 Av,,40.726523,-73.852719,,,0,G09\n    G10,,63 Dr - Rego Park,,40.729846,-73.861604,,,1,\n    G10N,,63 Dr - Rego Park,,40.729846,-73.861604,,,0,G10\n    G10S,,63 Dr - Rego Park,,40.729846,-73.861604,,,0,G10\n    G11,,Woodhaven Blvd,,40.733106,-73.869229,,,1,\n    G11N,,Woodhaven Blvd,,40.733106,-73.869229,,,0,G11\n    G11S,,Woodhaven Blvd,,40.733106,-73.869229,,,0,G11\n    G12,,Grand Av - Newtown,,40.737015,-73.877223,,,1,\n    G12N,,Grand Av - Newtown,,40.737015,-73.877223,,,0,G12\n    G12S,,Grand Av - Newtown,,40.737015,-73.877223,,,0,G12\n    G13,,Elmhurst Av,,40.742454,-73.882017,,,1,\n    G13N,,Elmhurst Av,,40.742454,-73.882017,,,0,G13\n    G13S,,Elmhurst Av,,40.742454,-73.882017,,,0,G13\n    G14,,Jackson Hts - Roosevelt Av,,40.746644,-73.891338,,,1,\n    G14N,,Jackson Hts - Roosevelt Av,,40.746644,-73.891338,,,0,G14\n    G14S,,Jackson Hts - Roosevelt Av,,40.746644,-73.891338,,,0,G14\n    G15,,65 St,,40.749669,-73.898453,,,1,\n    G15N,,65 St,,40.749669,-73.898453,,,0,G15\n    G15S,,65 St,,40.749669,-73.898453,,,0,G15\n    G16,,Northern Blvd,,40.752885,-73.906006,,,1,\n    G16N,,Northern Blvd,,40.752885,-73.906006,,,0,G16\n    G16S,,Northern Blvd,,40.752885,-73.906006,,,0,G16\n    G18,,46 St,,40.756312,-73.913333,,,1,\n    G18N,,46 St,,40.756312,-73.913333,,,0,G18\n    G18S,,46 St,,40.756312,-73.913333,,,0,G18\n    G19,,Steinway St,,40.756879,-73.92074,,,1,\n    G19N,,Steinway St,,40.756879,-73.92074,,,0,G19\n    G19S,,Steinway St,,40.756879,-73.92074,,,0,G19\n    G20,,36 St,,40.752039,-73.928781,,,1,\n    G20N,,36 St,,40.752039,-73.928781,,,0,G20\n    G20S,,36 St,,40.752039,-73.928781,,,0,G20\n    G21,,Queens Plaza,,40.748973,-73.937243,,,1,\n    G21N,,Queens Plaza,,40.748973,-73.937243,,,0,G21\n    G21S,,Queens Plaza,,40.748973,-73.937243,,,0,G21\n    G22,,Court Sq,,40.746554,-73.943832,,,1,\n    G22N,,Court Sq,,40.746554,-73.943832,,,0,G22\n    G22S,,Court Sq,,40.746554,-73.943832,,,0,G22\n    G24,,21 St,,40.744065,-73.949724,,,1,\n    G24N,,21 St,,40.744065,-73.949724,,,0,G24\n    G24S,,21 St,,40.744065,-73.949724,,,0,G24\n    G26,,Greenpoint Av,,40.731352,-73.954449,,,1,\n    G26N,,Greenpoint Av,,40.731352,-73.954449,,,0,G26\n    G26S,,Greenpoint Av,,40.731352,-73.954449,,,0,G26\n    G28,,Nassau Av,,40.724635,-73.951277,,,1,\n    G28N,,Nassau Av,,40.724635,-73.951277,,,0,G28\n    G28S,,Nassau Av,,40.724635,-73.951277,,,0,G28\n    G29,,Metropolitan Av,,40.712792,-73.951418,,,1,\n    G29N,,Metropolitan Av,,40.712792,-73.951418,,,0,G29\n    G29S,,Metropolitan Av,,40.712792,-73.951418,,,0,G29\n    G30,,Broadway,,40.706092,-73.950308,,,1,\n    G30N,,Broadway,,40.706092,-73.950308,,,0,G30\n    G30S,,Broadway,,40.706092,-73.950308,,,0,G30\n    G31,,Flushing Av,,40.700377,-73.950234,,,1,\n    G31N,,Flushing Av,,40.700377,-73.950234,,,0,G31\n    G31S,,Flushing Av,,40.700377,-73.950234,,,0,G31\n    G32,,Myrtle - Willoughby Avs,,40.694568,-73.949046,,,1,\n    G32N,,Myrtle - Willoughby Avs,,40.694568,-73.949046,,,0,G32\n    G32S,,Myrtle - Willoughby Avs,,40.694568,-73.949046,,,0,G32\n    G33,,Bedford - Nostrand Avs,,40.689627,-73.953522,,,1,\n    G33N,,Bedford - Nostrand Avs,,40.689627,-73.953522,,,0,G33\n    G33S,,Bedford - Nostrand Avs,,40.689627,-73.953522,,,0,G33\n    G34,,Classon Av,,40.688873,-73.96007,,,1,\n    G34N,,Classon Av,,40.688873,-73.96007,,,0,G34\n    G34S,,Classon Av,,40.688873,-73.96007,,,0,G34\n    G35,,Clinton - Washington Avs,,40.688089,-73.966839,,,1,\n    G35N,,Clinton - Washington Avs,,40.688089,-73.966839,,,0,G35\n    G35S,,Clinton - Washington Avs,,40.688089,-73.966839,,,0,G35\n    G36,,Fulton St,,40.687119,-73.975375,,,1,\n    G36N,,Fulton St,,40.687119,-73.975375,,,0,G36\n    G36S,,Fulton St,,40.687119,-73.975375,,,0,G36\n    H01,,Aqueduct Racetrack,,40.668234,-73.834058,,,1,\n    H01N,,Aqueduct Racetrack,,40.668234,-73.834058,,,0,H01\n    H01S,,Aqueduct Racetrack,,40.668234,-73.834058,,,0,H01\n    H02,,Aqueduct - N Conduit Av,,40.668234,-73.834058,,,1,\n    H02N,,Aqueduct - N Conduit Av,,40.668234,-73.834058,,,0,H02\n    H02S,,Aqueduct - N Conduit Av,,40.668234,-73.834058,,,0,H02\n    H03,,Howard Beach - JFK Airport,,40.660476,-73.830301,,,1,\n    H03N,,Howard Beach - JFK Airport,,40.660476,-73.830301,,,0,H03\n    H03S,,Howard Beach - JFK Airport,,40.660476,-73.830301,,,0,H03\n    H04,,Broad Channel,,40.608382,-73.815925,,,1,\n    H04N,,Broad Channel,,40.608382,-73.815925,,,0,H04\n    H04S,,Broad Channel,,40.608382,-73.815925,,,0,H04\n    H06,,Beach 67 St,,40.590927,-73.796924,,,1,\n    H06N,,Beach 67 St,,40.590927,-73.796924,,,0,H06\n    H06S,,Beach 67 St,,40.590927,-73.796924,,,0,H06\n    H07,,Beach 60 St,,40.592374,-73.788522,,,1,\n    H07N,,Beach 60 St,,40.592374,-73.788522,,,0,H07\n    H07S,,Beach 60 St,,40.592374,-73.788522,,,0,H07\n    H08,,Beach 44 St,,40.592943,-73.776013,,,1,\n    H08N,,Beach 44 St,,40.592943,-73.776013,,,0,H08\n    H08S,,Beach 44 St,,40.592943,-73.776013,,,0,H08\n    H09,,Beach 36 St,,40.595398,-73.768175,,,1,\n    H09N,,Beach 36 St,,40.595398,-73.768175,,,0,H09\n    H09S,,Beach 36 St,,40.595398,-73.768175,,,0,H09\n    H10,,Beach 25 St,,40.600066,-73.761353,,,1,\n    H10N,,Beach 25 St,,40.600066,-73.761353,,,0,H10\n    H10S,,Beach 25 St,,40.600066,-73.761353,,,0,H10\n    H11,,Far Rockaway - Mott Av,,40.603995,-73.755405,,,1,\n    H11N,,Far Rockaway - Mott Av,,40.603995,-73.755405,,,0,H11\n    H11S,,Far Rockaway - Mott Av,,40.603995,-73.755405,,,0,H11\n    H12,,Beach 90 St,,40.588034,-73.813641,,,1,\n    H12N,,Beach 90 St,,40.588034,-73.813641,,,0,H12\n    H12S,,Beach 90 St,,40.588034,-73.813641,,,0,H12\n    H13,,Beach 98 St,,40.585307,-73.820558,,,1,\n    H13N,,Beach 98 St,,40.585307,-73.820558,,,0,H13\n    H13S,,Beach 98 St,,40.585307,-73.820558,,,0,H13\n    H14,,Beach 105 St,,40.583209,-73.827559,,,1,\n    H14N,,Beach 105 St,,40.583209,-73.827559,,,0,H14\n    H14S,,Beach 105 St,,40.583209,-73.827559,,,0,H14\n    H15,,Rockaway Park - Beach 116 St,,40.580903,-73.835592,,,1,\n    H15N,,Rockaway Park - Beach 116 St,,40.580903,-73.835592,,,0,H15\n    H15S,,Rockaway Park - Beach 116 St,,40.580903,-73.835592,,,0,H15\n    J12,,121 St,,40.700492,-73.828294,,,1,\n    J12N,,121 St,,40.700492,-73.828294,,,0,J12\n    J12S,,121 St,,40.700492,-73.828294,,,0,J12\n    J13,,111 St,,40.697418,-73.836345,,,1,\n    J13N,,111 St,,40.697418,-73.836345,,,0,J13\n    J13S,,111 St,,40.697418,-73.836345,,,0,J13\n    J14,,104 St,,40.695178,-73.84433,,,1,\n    J14N,,104 St,,40.695178,-73.84433,,,0,J14\n    J14S,,104 St,,40.695178,-73.84433,,,0,J14\n    J15,,Woodhaven Blvd,,40.693879,-73.851576,,,1,\n    J15N,,Woodhaven Blvd,,40.693879,-73.851576,,,0,J15\n    J15S,,Woodhaven Blvd,,40.693879,-73.851576,,,0,J15\n    J16,,85 St - Forest Pkwy,,40.692435,-73.86001,,,1,\n    J16N,,85 St - Forest Pkwy,,40.692435,-73.86001,,,0,J16\n    J16S,,85 St - Forest Pkwy,,40.692435,-73.86001,,,0,J16\n    J17,,75 St,,40.691324,-73.867139,,,1,\n    J17N,,75 St,,40.691324,-73.867139,,,0,J17\n    J17S,,75 St,,40.691324,-73.867139,,,0,J17\n    J19,,Cypress Hills,,40.689941,-73.87255,,,1,\n    J19N,,Cypress Hills,,40.689941,-73.87255,,,0,J19\n    J19S,,Cypress Hills,,40.689941,-73.87255,,,0,J19\n    J20,,Crescent St,,40.683194,-73.873785,,,1,\n    J20N,,Crescent St,,40.683194,-73.873785,,,0,J20\n    J20S,,Crescent St,,40.683194,-73.873785,,,0,J20\n    J21,,Norwood Av,,40.68141,-73.880039,,,1,\n    J21N,,Norwood Av,,40.68141,-73.880039,,,0,J21\n    J21S,,Norwood Av,,40.68141,-73.880039,,,0,J21\n    J22,,Cleveland St,,40.679947,-73.884639,,,1,\n    J22N,,Cleveland St,,40.679947,-73.884639,,,0,J22\n    J22S,,Cleveland St,,40.679947,-73.884639,,,0,J22\n    J23,,Van Siclen Av,,40.678024,-73.891688,,,1,\n    J23N,,Van Siclen Av,,40.678024,-73.891688,,,0,J23\n    J23S,,Van Siclen Av,,40.678024,-73.891688,,,0,J23\n    J24,,Alabama Av,,40.676992,-73.898654,,,1,\n    J24N,,Alabama Av,,40.676992,-73.898654,,,0,J24\n    J24S,,Alabama Av,,40.676992,-73.898654,,,0,J24\n    J27,,Broadway Jct,,40.679498,-73.904512,,,1,\n    J27N,,Broadway Jct,,40.679498,-73.904512,,,0,J27\n    J27S,,Broadway Jct,,40.679498,-73.904512,,,0,J27\n    J28,,Chauncey St,,40.682893,-73.910456,,,1,\n    J28N,,Chauncey St,,40.682893,-73.910456,,,0,J28\n    J28S,,Chauncey St,,40.682893,-73.910456,,,0,J28\n    J29,,Halsey St,,40.68637,-73.916559,,,1,\n    J29N,,Halsey St,,40.68637,-73.916559,,,0,J29\n    J29S,,Halsey St,,40.68637,-73.916559,,,0,J29\n    J30,,Gates Av,,40.68963,-73.92227,,,1,\n    J30N,,Gates Av,,40.68963,-73.92227,,,0,J30\n    J30S,,Gates Av,,40.68963,-73.92227,,,0,J30\n    J31,,Kosciuszko St,,40.693342,-73.928814,,,1,\n    J31N,,Kosciuszko St,,40.693342,-73.928814,,,0,J31\n    J31S,,Kosciuszko St,,40.693342,-73.928814,,,0,J31\n    L01,,8 Av,,40.739777,-74.002578,,,1,\n    L01N,,8 Av,,40.739777,-74.002578,,,0,L01\n    L01S,,8 Av,,40.739777,-74.002578,,,0,L01\n    L02,,6 Av,,40.737335,-73.996786,,,1,\n    L02N,,6 Av,,40.737335,-73.996786,,,0,L02\n    L02S,,6 Av,,40.737335,-73.996786,,,0,L02\n    L03,,Union Sq - 14 St,,40.734789,-73.99073,,,1,\n    L03N,,Union Sq - 14 St,,40.734789,-73.99073,,,0,L03\n    L03S,,Union Sq - 14 St,,40.734789,-73.99073,,,0,L03\n    L05,,3 Av,,40.732849,-73.986122,,,1,\n    L05N,,3 Av,,40.732849,-73.986122,,,0,L05\n    L05S,,3 Av,,40.732849,-73.986122,,,0,L05\n    L06,,1 Av,,40.730953,-73.981628,,,1,\n    L06N,,1 Av,,40.730953,-73.981628,,,0,L06\n    L06S,,1 Av,,40.730953,-73.981628,,,0,L06\n    L08,,Bedford Av,,40.717304,-73.956872,,,1,\n    L08N,,Bedford Av,,40.717304,-73.956872,,,0,L08\n    L08S,,Bedford Av,,40.717304,-73.956872,,,0,L08\n    L10,,Lorimer St,,40.714063,-73.950275,,,1,\n    L10N,,Lorimer St,,40.714063,-73.950275,,,0,L10\n    L10S,,Lorimer St,,40.714063,-73.950275,,,0,L10\n    L11,,Graham Av,,40.714565,-73.944053,,,1,\n    L11N,,Graham Av,,40.714565,-73.944053,,,0,L11\n    L11S,,Graham Av,,40.714565,-73.944053,,,0,L11\n    L12,,Grand St,,40.711926,-73.94067,,,1,\n    L12N,,Grand St,,40.711926,-73.94067,,,0,L12\n    L12S,,Grand St,,40.711926,-73.94067,,,0,L12\n    L13,,Montrose Av,,40.707739,-73.93985,,,1,\n    L13N,,Montrose Av,,40.707739,-73.93985,,,0,L13\n    L13S,,Montrose Av,,40.707739,-73.93985,,,0,L13\n    L14,,Morgan Av,,40.706152,-73.933147,,,1,\n    L14N,,Morgan Av,,40.706152,-73.933147,,,0,L14\n    L14S,,Morgan Av,,40.706152,-73.933147,,,0,L14\n    L15,,Jefferson St,,40.706607,-73.922913,,,1,\n    L15N,,Jefferson St,,40.706607,-73.922913,,,0,L15\n    L15S,,Jefferson St,,40.706607,-73.922913,,,0,L15\n    L16,,DeKalb Av,,40.703811,-73.918425,,,1,\n    L16N,,DeKalb Av,,40.703811,-73.918425,,,0,L16\n    L16S,,DeKalb Av,,40.703811,-73.918425,,,0,L16\n    L17,,Myrtle - Wyckoff Avs,,40.699814,-73.911586,,,1,\n    L17N,,Myrtle - Wyckoff Avs,,40.699814,-73.911586,,,0,L17\n    L17S,,Myrtle - Wyckoff Avs,,40.699814,-73.911586,,,0,L17\n    L19,,Halsey St,,40.695602,-73.904084,,,1,\n    L19N,,Halsey St,,40.695602,-73.904084,,,0,L19\n    L19S,,Halsey St,,40.695602,-73.904084,,,0,L19\n    L20,,Wilson Av,,40.688764,-73.904046,,,1,\n    L20N,,Wilson Av,,40.688764,-73.904046,,,0,L20\n    L20S,,Wilson Av,,40.688764,-73.904046,,,0,L20\n    L21,,Bushwick Av - Aberdeen St,,40.682829,-73.905249,,,1,\n    L21N,,Bushwick Av - Aberdeen St,,40.682829,-73.905249,,,0,L21\n    L21S,,Bushwick Av - Aberdeen St,,40.682829,-73.905249,,,0,L21\n    L22,,Broadway Jct,,40.678856,-73.90324,,,1,\n    L22N,,Broadway Jct,,40.678856,-73.90324,,,0,L22\n    L22S,,Broadway Jct,,40.678856,-73.90324,,,0,L22\n    L24,,Atlantic Av,,40.675345,-73.903097,,,1,\n    L24N,,Atlantic Av,,40.675345,-73.903097,,,0,L24\n    L24S,,Atlantic Av,,40.675345,-73.903097,,,0,L24\n    L25,,Sutter Av,,40.669367,-73.901975,,,1,\n    L25N,,Sutter Av,,40.669367,-73.901975,,,0,L25\n    L25S,,Sutter Av,,40.669367,-73.901975,,,0,L25\n    L26,,Livonia Av,,40.664038,-73.900571,,,1,\n    L26N,,Livonia Av,,40.664038,-73.900571,,,0,L26\n    L26S,,Livonia Av,,40.664038,-73.900571,,,0,L26\n    L27,,New Lots Av,,40.658733,-73.899232,,,1,\n    L27N,,New Lots Av,,40.658733,-73.899232,,,0,L27\n    L27S,,New Lots Av,,40.658733,-73.899232,,,0,L27\n    L28,,E 105 St,,40.650573,-73.899485,,,1,\n    L28N,,E 105 St,,40.650573,-73.899485,,,0,L28\n    L28S,,E 105 St,,40.650573,-73.899485,,,0,L28\n    L29,,Canarsie - Rockaway Pkwy,,40.646654,-73.90185,,,1,\n    L29N,,Canarsie - Rockaway Pkwy,,40.646654,-73.90185,,,0,L29\n    L29S,,Canarsie - Rockaway Pkwy,,40.646654,-73.90185,,,0,L29\n    M01,,Middle Village - Metropolitan Av,,40.711396,-73.889601,,,1,\n    M01N,,Middle Village - Metropolitan Av,,40.711396,-73.889601,,,0,M01\n    M01S,,Middle Village - Metropolitan Av,,40.711396,-73.889601,,,0,M01\n    M04,,Fresh Pond Rd,,40.706186,-73.895877,,,1,\n    M04N,,Fresh Pond Rd,,40.706186,-73.895877,,,0,M04\n    M04S,,Fresh Pond Rd,,40.706186,-73.895877,,,0,M04\n    M05,,Forest Av,,40.704423,-73.903077,,,1,\n    M05N,,Forest Av,,40.704423,-73.903077,,,0,M05\n    M05S,,Forest Av,,40.704423,-73.903077,,,0,M05\n    M06,,Seneca Av,,40.702762,-73.90774,,,1,\n    M06N,,Seneca Av,,40.702762,-73.90774,,,0,M06\n    M06S,,Seneca Av,,40.702762,-73.90774,,,0,M06\n    M08,,Myrtle - Wyckoff Avs,,40.69943,-73.912385,,,1,\n    M08N,,Myrtle - Wyckoff Avs,,40.69943,-73.912385,,,0,M08\n    M08S,,Myrtle - Wyckoff Avs,,40.69943,-73.912385,,,0,M08\n    M09,,Knickerbocker Av,,40.698664,-73.919711,,,1,\n    M09N,,Knickerbocker Av,,40.698664,-73.919711,,,0,M09\n    M09S,,Knickerbocker Av,,40.698664,-73.919711,,,0,M09\n    M10,,Central Av,,40.697857,-73.927397,,,1,\n    M10N,,Central Av,,40.697857,-73.927397,,,0,M10\n    M10S,,Central Av,,40.697857,-73.927397,,,0,M10\n    M11,,Myrtle Av,,40.697207,-73.935657,,,1,\n    M11N,,Myrtle Av,,40.697207,-73.935657,,,0,M11\n    M11S,,Myrtle Av,,40.697207,-73.935657,,,0,M11\n    M12,,Flushing Av,,40.70026,-73.941126,,,1,\n    M12N,,Flushing Av,,40.70026,-73.941126,,,0,M12\n    M12S,,Flushing Av,,40.70026,-73.941126,,,0,M12\n    M13,,Lorimer St,,40.703869,-73.947408,,,1,\n    M13N,,Lorimer St,,40.703869,-73.947408,,,0,M13\n    M13S,,Lorimer St,,40.703869,-73.947408,,,0,M13\n    M14,,Hewes St,,40.70687,-73.953431,,,1,\n    M14N,,Hewes St,,40.70687,-73.953431,,,0,M14\n    M14S,,Hewes St,,40.70687,-73.953431,,,0,M14\n    M16,,Marcy Av,,40.708359,-73.957757,,,1,\n    M16N,,Marcy Av,,40.708359,-73.957757,,,0,M16\n    M16S,,Marcy Av,,40.708359,-73.957757,,,0,M16\n    M18,,Essex St,,40.718315,-73.987437,,,1,\n    M18N,,Essex St,,40.718315,-73.987437,,,0,M18\n    M18S,,Essex St,,40.718315,-73.987437,,,0,M18\n    M19,,Bowery,,40.72028,-73.993915,,,1,\n    M19N,,Bowery,,40.72028,-73.993915,,,0,M19\n    M19S,,Bowery,,40.72028,-73.993915,,,0,M19\n    M20,,Canal St,,40.718092,-73.999892,,,1,\n    M20N,,Canal St,,40.718092,-73.999892,,,0,M20\n    M20S,,Canal St,,40.718092,-73.999892,,,0,M20\n    M21,,Chambers St,,40.713243,-74.003401,,,1,\n    M21N,,Chambers St,,40.713243,-74.003401,,,0,M21\n    M21S,,Chambers St,,40.713243,-74.003401,,,0,M21\n    M22,,Fulton St,,40.710374,-74.007582,,,1,\n    M22N,,Fulton St,,40.710374,-74.007582,,,0,M22\n    M22S,,Fulton St,,40.710374,-74.007582,,,0,M22\n    M23,,Broad St,,40.706476,-74.011056,,,1,\n    M23N,,Broad St,,40.706476,-74.011056,,,0,M23\n    M23S,,Broad St,,40.706476,-74.011056,,,0,M23\n    N02,,8 Av,,40.635064,-74.011719,,,1,\n    N02N,,8 Av,,40.635064,-74.011719,,,0,N02\n    N02S,,8 Av,,40.635064,-74.011719,,,0,N02\n    N03,,Fort Hamilton Pkwy,,40.631386,-74.005351,,,1,\n    N03N,,Fort Hamilton Pkwy,,40.631386,-74.005351,,,0,N03\n    N03S,,Fort Hamilton Pkwy,,40.631386,-74.005351,,,0,N03\n    N04,,New Utrecht Av,,40.624842,-73.996353,,,1,\n    N04N,,New Utrecht Av,,40.624842,-73.996353,,,0,N04\n    N04S,,New Utrecht Av,,40.624842,-73.996353,,,0,N04\n    N05,,18 Av,,40.620671,-73.990414,,,1,\n    N05N,,18 Av,,40.620671,-73.990414,,,0,N05\n    N05S,,18 Av,,40.620671,-73.990414,,,0,N05\n    N06,,20 Av,,40.61741,-73.985026,,,1,\n    N06N,,20 Av,,40.61741,-73.985026,,,0,N06\n    N06S,,20 Av,,40.61741,-73.985026,,,0,N06\n    N07,,Bay Pkwy,,40.611815,-73.981848,,,1,\n    N07N,,Bay Pkwy,,40.611815,-73.981848,,,0,N07\n    N07S,,Bay Pkwy,,40.611815,-73.981848,,,0,N07\n    N08,,Kings Hwy,,40.603923,-73.980353,,,1,\n    N08N,,Kings Hwy,,40.603923,-73.980353,,,0,N08\n    N08S,,Kings Hwy,,40.603923,-73.980353,,,0,N08\n    N09,,Avenue U,,40.597473,-73.979137,,,1,\n    N09N,,Avenue U,,40.597473,-73.979137,,,0,N09\n    N09S,,Avenue U,,40.597473,-73.979137,,,0,N09\n    N10,,86 St,,40.592721,-73.97823,,,1,\n    N10N,,86 St,,40.592721,-73.97823,,,0,N10\n    N10S,,86 St,,40.592721,-73.97823,,,0,N10\n    Q01,,Canal St,,40.718383,-74.00046,,,1,\n    Q01N,,Canal St,,40.718383,-74.00046,,,0,Q01\n    Q01S,,Canal St,,40.718383,-74.00046,,,0,Q01\n    R01,,Astoria - Ditmars Blvd,,40.775036,-73.912034,,,1,\n    R01N,,Astoria - Ditmars Blvd,,40.775036,-73.912034,,,0,R01\n    R01S,,Astoria - Ditmars Blvd,,40.775036,-73.912034,,,0,R01\n    R03,,Astoria Blvd,,40.770258,-73.917843,,,1,\n    R03N,,Astoria Blvd,,40.770258,-73.917843,,,0,R03\n    R03S,,Astoria Blvd,,40.770258,-73.917843,,,0,R03\n    R04,,30 Av,,40.766779,-73.921479,,,1,\n    R04N,,30 Av,,40.766779,-73.921479,,,0,R04\n    R04S,,30 Av,,40.766779,-73.921479,,,0,R04\n    R05,,Broadway,,40.76182,-73.925508,,,1,\n    R05N,,Broadway,,40.76182,-73.925508,,,0,R05\n    R05S,,Broadway,,40.76182,-73.925508,,,0,R05\n    R06,,36 Av,,40.756804,-73.929575,,,1,\n    R06N,,36 Av,,40.756804,-73.929575,,,0,R06\n    R06S,,36 Av,,40.756804,-73.929575,,,0,R06\n    R08,,39 Av,,40.752882,-73.932755,,,1,\n    R08N,,39 Av,,40.752882,-73.932755,,,0,R08\n    R08S,,39 Av,,40.752882,-73.932755,,,0,R08\n    R09,,Queensboro Plaza,,40.750582,-73.940202,,,1,\n    R09N,,Queensboro Plaza,,40.750582,-73.940202,,,0,R09\n    R09S,,Queensboro Plaza,,40.750582,-73.940202,,,0,R09\n    R11,,Lexington Av/59 St,,40.76266,-73.967258,,,1,\n    R11N,,Lexington Av/59 St,,40.76266,-73.967258,,,0,R11\n    R11S,,Lexington Av/59 St,,40.76266,-73.967258,,,0,R11\n    R13,,5 Av/59 St,,40.764811,-73.973347,,,1,\n    R13N,,5 Av/59 St,,40.764811,-73.973347,,,0,R13\n    R13S,,5 Av/59 St,,40.764811,-73.973347,,,0,R13\n    R14,,57 St - 7 Av,,40.764664,-73.980658,,,1,\n    R14N,,57 St - 7 Av,,40.764664,-73.980658,,,0,R14\n    R14S,,57 St - 7 Av,,40.764664,-73.980658,,,0,R14\n    R15,,49 St,,40.759901,-73.984139,,,1,\n    R15N,,49 St,,40.759901,-73.984139,,,0,R15\n    R15S,,49 St,,40.759901,-73.984139,,,0,R15\n    R16,,Times Sq - 42 St,,40.754672,-73.986754,,,1,\n    R16N,,Times Sq - 42 St,,40.754672,-73.986754,,,0,R16\n    R16S,,Times Sq - 42 St,,40.754672,-73.986754,,,0,R16\n    R17,,34 St - Herald Sq,,40.749567,-73.98795,,,1,\n    R17N,,34 St - Herald Sq,,40.749567,-73.98795,,,0,R17\n    R17S,,34 St - Herald Sq,,40.749567,-73.98795,,,0,R17\n    R18,,28 St,,40.745494,-73.988691,,,1,\n    R18N,,28 St,,40.745494,-73.988691,,,0,R18\n    R18S,,28 St,,40.745494,-73.988691,,,0,R18\n    R19,,23 St,,40.741303,-73.989344,,,1,\n    R19N,,23 St,,40.741303,-73.989344,,,0,R19\n    R19S,,23 St,,40.741303,-73.989344,,,0,R19\n    R20,,14 St - Union Sq,,40.735736,-73.990568,,,1,\n    R20N,,14 St - Union Sq,,40.735736,-73.990568,,,0,R20\n    R20S,,14 St - Union Sq,,40.735736,-73.990568,,,0,R20\n    R21,,8 St - NYU,,40.730328,-73.992629,,,1,\n    R21N,,8 St - NYU,,40.730328,-73.992629,,,0,R21\n    R21S,,8 St - NYU,,40.730328,-73.992629,,,0,R21\n    R22,,Prince St,,40.724329,-73.997702,,,1,\n    R22N,,Prince St,,40.724329,-73.997702,,,0,R22\n    R22S,,Prince St,,40.724329,-73.997702,,,0,R22\n    R23,,Canal St,,40.719527,-74.001775,,,1,\n    R23N,,Canal St,,40.719527,-74.001775,,,0,R23\n    R23S,,Canal St,,40.719527,-74.001775,,,0,R23\n    R24,,City Hall,,40.713282,-74.006978,,,1,\n    R24N,,City Hall,,40.713282,-74.006978,,,0,R24\n    R24S,,City Hall,,40.713282,-74.006978,,,0,R24\n    R25,,Cortlandt St,,40.710668,-74.011029,,,1,\n    R25N,,Cortlandt St,,40.710668,-74.011029,,,0,R25\n    R25S,,Cortlandt St,,40.710668,-74.011029,,,0,R25\n    R26,,Rector St,,40.70722,-74.013342,,,1,\n    R26N,,Rector St,,40.70722,-74.013342,,,0,R26\n    R26S,,Rector St,,40.70722,-74.013342,,,0,R26\n    R27,,Whitehall St,,40.703087,-74.012994,,,1,\n    R27N,,Whitehall St,,40.703087,-74.012994,,,0,R27\n    R27S,,Whitehall St,,40.703087,-74.012994,,,0,R27\n    R28,,Court St,,40.6941,-73.991777,,,1,\n    R28N,,Court St,,40.6941,-73.991777,,,0,R28\n    R28S,,Court St,,40.6941,-73.991777,,,0,R28\n    R29,,Jay St - MetroTech,,40.69218,-73.985942,,,1,\n    R29N,,Jay St - MetroTech,,40.69218,-73.985942,,,0,R29\n    R29S,,Jay St - MetroTech,,40.69218,-73.985942,,,0,R29\n    R30,,DeKalb Av,,40.690635,-73.981824,,,1,\n    R30N,,DeKalb Av,,40.690635,-73.981824,,,0,R30\n    R30S,,DeKalb Av,,40.690635,-73.981824,,,0,R30\n    R31,,Atlantic Av - Barclays Ctr,,40.683666,-73.97881,,,1,\n    R31N,,Atlantic Av - Barclays Ctr,,40.683666,-73.97881,,,0,R31\n    R31S,,Atlantic Av - Barclays Ctr,,40.683666,-73.97881,,,0,R31\n    R32,,Union St,,40.677316,-73.98311,,,1,\n    R32N,,Union St,,40.677316,-73.98311,,,0,R32\n    R32S,,Union St,,40.677316,-73.98311,,,0,R32\n    R33,,9 St,,40.670847,-73.988302,,,1,\n    R33N,,9 St,,40.670847,-73.988302,,,0,R33\n    R33S,,9 St,,40.670847,-73.988302,,,0,R33\n    R34,,Prospect Av,,40.665414,-73.992872,,,1,\n    R34N,,Prospect Av,,40.665414,-73.992872,,,0,R34\n    R34S,,Prospect Av,,40.665414,-73.992872,,,0,R34\n    R35,,25 St,,40.660397,-73.998091,,,1,\n    R35N,,25 St,,40.660397,-73.998091,,,0,R35\n    R35S,,25 St,,40.660397,-73.998091,,,0,R35\n    R36,,36 St,,40.655144,-74.003549,,,1,\n    R36N,,36 St,,40.655144,-74.003549,,,0,R36\n    R36S,,36 St,,40.655144,-74.003549,,,0,R36\n    R39,,45 St,,40.648939,-74.010006,,,1,\n    R39N,,45 St,,40.648939,-74.010006,,,0,R39\n    R39S,,45 St,,40.648939,-74.010006,,,0,R39\n    R40,,53 St,,40.645069,-74.014034,,,1,\n    R40N,,53 St,,40.645069,-74.014034,,,0,R40\n    R40S,,53 St,,40.645069,-74.014034,,,0,R40\n    R41,,59 St,,40.641362,-74.017881,,,1,\n    R41N,,59 St,,40.641362,-74.017881,,,0,R41\n    R41S,,59 St,,40.641362,-74.017881,,,0,R41\n    R42,,Bay Ridge Av,,40.634967,-74.023377,,,1,\n    R42N,,Bay Ridge Av,,40.634967,-74.023377,,,0,R42\n    R42S,,Bay Ridge Av,,40.634967,-74.023377,,,0,R42\n    R43,,77 St,,40.629742,-74.02551,,,1,\n    R43N,,77 St,,40.629742,-74.02551,,,0,R43\n    R43S,,77 St,,40.629742,-74.02551,,,0,R43\n    R44,,86 St,,40.622687,-74.028398,,,1,\n    R44N,,86 St,,40.622687,-74.028398,,,0,R44\n    R44S,,86 St,,40.622687,-74.028398,,,0,R44\n    R45,,Bay Ridge - 95 St,,40.616622,-74.030876,,,1,\n    R45N,,Bay Ridge - 95 St,,40.616622,-74.030876,,,0,R45\n    R45S,,Bay Ridge - 95 St,,40.616622,-74.030876,,,0,R45\n    S01,,Franklin Av,,40.680596,-73.955827,,,1,\n    S01N,,Franklin Av,,40.680596,-73.955827,,,0,S01\n    S01S,,Franklin Av,,40.680596,-73.955827,,,0,S01\n    S03,,Park Pl,,40.674772,-73.957624,,,1,\n    S03N,,Park Pl,,40.674772,-73.957624,,,0,S03\n    S03S,,Park Pl,,40.674772,-73.957624,,,0,S03\n    S04,,Botanic Garden,,40.670343,-73.959245,,,1,\n    S04N,,Botanic Garden,,40.670343,-73.959245,,,0,S04\n    S04S,,Botanic Garden,,40.670343,-73.959245,,,0,S04\n    S09,,Tottenville,,40.512764,-74.251961,,,1,\n    S09N,,Tottenville,,40.512764,-74.251961,,,0,S09\n    S09S,,Tottenville,,40.512764,-74.251961,,,0,S09\n    S10,,Atlantic,,40.515401,-74.245689,,,1,\n    S10N,,Atlantic,,40.515401,-74.245689,,,0,S10\n    S10S,,Atlantic,,40.515401,-74.245689,,,0,S10\n    S12,,Nassau,,40.517812,-74.238373,,,1,\n    S12N,,Nassau,,40.517812,-74.238373,,,0,S12\n    S12S,,Nassau,,40.517812,-74.238373,,,0,S12\n    S13,,Richmond Valley,,40.519631,-74.229141,,,1,\n    S13N,,Richmond Valley,,40.519631,-74.229141,,,0,S13\n    S13S,,Richmond Valley,,40.519631,-74.229141,,,0,S13\n    S14,,Pleasant Plains,,40.52241,-74.217847,,,1,\n    S14N,,Pleasant Plains,,40.52241,-74.217847,,,0,S14\n    S14S,,Pleasant Plains,,40.52241,-74.217847,,,0,S14\n    S15,,Prince's Bay,,40.525507,-74.200064,,,1,\n    S15N,,Prince's Bay,,40.525507,-74.200064,,,0,S15\n    S15S,,Prince's Bay,,40.525507,-74.200064,,,0,S15\n    S16,,Huguenot,,40.533674,-74.191794,,,1,\n    S16N,,Huguenot,,40.533674,-74.191794,,,0,S16\n    S16S,,Huguenot,,40.533674,-74.191794,,,0,S16\n    S17,,Annadale,,40.54046,-74.178217,,,1,\n    S17N,,Annadale,,40.54046,-74.178217,,,0,S17\n    S17S,,Annadale,,40.54046,-74.178217,,,0,S17\n    S18,,Eltingville,,40.544601,-74.16457,,,1,\n    S18N,,Eltingville,,40.544601,-74.16457,,,0,S18\n    S18S,,Eltingville,,40.544601,-74.16457,,,0,S18\n    S19,,Great Kills,,40.551231,-74.151399,,,1,\n    S19N,,Great Kills,,40.551231,-74.151399,,,0,S19\n    S19S,,Great Kills,,40.551231,-74.151399,,,0,S19\n    S20,,Bay Terrace,,40.5564,-74.136907,,,1,\n    S20N,,Bay Terrace,,40.5564,-74.136907,,,0,S20\n    S20S,,Bay Terrace,,40.5564,-74.136907,,,0,S20\n    S21,,Oakwood Heights,,40.56511,-74.12632,,,1,\n    S21N,,Oakwood Heights,,40.56511,-74.12632,,,0,S21\n    S21S,,Oakwood Heights,,40.56511,-74.12632,,,0,S21\n    S22,,New Dorp,,40.57348,-74.11721,,,1,\n    S22N,,New Dorp,,40.57348,-74.11721,,,0,S22\n    S22S,,New Dorp,,40.57348,-74.11721,,,0,S22\n    S23,,Grant City,,40.578965,-74.109704,,,1,\n    S23N,,Grant City,,40.578965,-74.109704,,,0,S23\n    S23S,,Grant City,,40.578965,-74.109704,,,0,S23\n    S24,,Jefferson Av,,40.583591,-74.103338,,,1,\n    S24N,,Jefferson Av,,40.583591,-74.103338,,,0,S24\n    S24S,,Jefferson Av,,40.583591,-74.103338,,,0,S24\n    S25,,Dongan Hills,,40.588849,-74.09609,,,1,\n    S25N,,Dongan Hills,,40.588849,-74.09609,,,0,S25\n    S25S,,Dongan Hills,,40.588849,-74.09609,,,0,S25\n    S26,,Old Town,,40.596612,-74.087368,,,1,\n    S26N,,Old Town,,40.596612,-74.087368,,,0,S26\n    S26S,,Old Town,,40.596612,-74.087368,,,0,S26\n    S27,,Grasmere,,40.603117,-74.084087,,,1,\n    S27N,,Grasmere,,40.603117,-74.084087,,,0,S27\n    S27S,,Grasmere,,40.603117,-74.084087,,,0,S27\n    S28,,Clifton,,40.621319,-74.071402,,,1,\n    S28N,,Clifton,,40.621319,-74.071402,,,0,S28\n    S28S,,Clifton,,40.621319,-74.071402,,,0,S28\n    S29,,Stapleton,,40.627915,-74.075162,,,1,\n    S29N,,Stapleton,,40.627915,-74.075162,,,0,S29\n    S29S,,Stapleton,,40.627915,-74.075162,,,0,S29\n    S30,,Tompkinsville,,40.636949,-74.074835,,,1,\n    S30N,,Tompkinsville,,40.636949,-74.074835,,,0,S30\n    S30S,,Tompkinsville,,40.636949,-74.074835,,,0,S30\n    S31,,St George,,40.643748,-74.073643,,,1,\n    S31N,,St George,,40.643748,-74.073643,,,0,S31\n    S31S,,St George,,40.643748,-74.073643,,,0,S31";
	  return stops;
	};

/***/ },

/***/ 43:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var returnTransfers = exports.returnTransfers = function returnTransfers() {
	  var transfers = "from_stop_id,to_stop_id,transfer_type,min_transfer_time\n    101,101,2,180\n    103,103,2,180\n    104,104,2,180\n    106,106,2,180\n    107,107,2,180\n    108,108,2,180\n    109,109,2,180\n    110,110,2,180\n    111,111,2,180\n    112,112,2,180\n    112,A09,2,180\n    113,113,2,180\n    114,114,2,180\n    115,115,2,180\n    116,116,2,180\n    117,117,2,180\n    118,118,2,180\n    119,119,2,180\n    120,120,2,180\n    121,121,2,180\n    122,122,2,180\n    123,123,2,0\n    124,124,2,180\n    125,125,2,180\n    125,A24,2,180\n    126,126,2,180\n    127,127,2,0\n    127,725,2,180\n    127,902,2,180\n    127,A27,2,300\n    127,R16,2,180\n    128,128,2,300\n    129,129,2,180\n    130,130,2,180\n    131,131,2,180\n    132,132,2,0\n    132,D19,2,300\n    132,L02,2,180\n    133,133,2,180\n    134,134,2,180\n    135,135,2,180\n    136,136,2,180\n    137,137,2,180\n    138,138,2,180\n    139,139,2,180\n    140,140,2,180\n    140,R27,2,120\n    201,201,2,180\n    204,204,2,180\n    205,205,2,180\n    206,206,2,180\n    207,207,2,180\n    208,208,2,180\n    209,209,2,180\n    210,210,2,180\n    211,211,2,180\n    212,212,2,180\n    213,213,2,180\n    214,214,2,180\n    215,215,2,180\n    216,216,2,180\n    217,217,2,180\n    218,218,2,180\n    219,219,2,180\n    220,220,2,180\n    221,221,2,180\n    222,222,2,180\n    222,415,2,180\n    227,227,2,0\n    228,228,2,180\n    228,A36,2,180\n    228,E01,2,180\n    229,229,2,180\n    229,418,2,300\n    229,A38,2,180\n    229,M22,2,300\n    230,230,2,180\n    231,231,2,180\n    232,232,2,180\n    232,423,2,300\n    232,R28,2,180\n    233,233,2,180\n    234,234,2,0\n    235,235,2,300\n    235,D24,2,180\n    235,R31,2,180\n    236,236,2,180\n    237,237,2,180\n    238,238,2,180\n    239,239,2,0\n    239,S04,2,180\n    241,241,2,180\n    242,242,2,180\n    243,243,2,180\n    244,244,2,180\n    245,245,2,180\n    246,246,2,180\n    247,247,2,180\n    248,248,2,180\n    249,249,2,180\n    250,250,2,0\n    251,251,2,180\n    252,252,2,180\n    253,253,2,180\n    254,254,2,180\n    254,L26,2,300\n    255,255,2,180\n    256,256,2,180\n    257,257,2,180\n    301,301,2,180\n    302,302,2,180\n    401,401,2,180\n    402,402,2,180\n    405,405,2,180\n    406,406,2,180\n    407,407,2,180\n    408,408,2,180\n    409,409,2,0\n    410,410,2,180\n    411,411,2,180\n    412,412,2,180\n    413,413,2,180\n    414,414,2,180\n    414,D11,2,180\n    415,222,2,180\n    415,415,2,0\n    416,416,2,180\n    418,229,2,300\n    418,418,2,180\n    418,A38,2,180\n    418,M22,2,300\n    419,419,2,180\n    420,420,2,180\n    423,232,2,300\n    423,423,2,180\n    423,R28,2,180\n    501,501,2,180\n    502,502,2,180\n    503,503,2,180\n    504,504,2,180\n    505,505,2,180\n    601,601,2,180\n    602,602,2,180\n    603,603,2,180\n    604,604,2,180\n    606,606,2,180\n    607,607,2,180\n    608,608,2,0\n    609,609,2,180\n    610,610,2,180\n    611,611,2,180\n    612,612,2,180\n    613,613,2,0\n    614,614,2,180\n    615,615,2,180\n    616,616,2,180\n    617,617,2,180\n    618,618,2,180\n    619,619,2,0\n    621,621,2,180\n    622,622,2,180\n    623,623,2,180\n    624,624,2,180\n    625,625,2,180\n    626,626,2,180\n    627,627,2,180\n    628,628,2,180\n    629,629,2,180\n    629,B08,2,300\n    629,R11,2,180\n    630,630,2,180\n    630,F11,2,180\n    631,631,2,0\n    631,723,2,180\n    631,901,2,180\n    632,632,2,180\n    633,633,2,180\n    634,634,2,180\n    635,635,2,0\n    635,L03,2,180\n    635,R20,2,180\n    636,636,2,180\n    637,637,2,180\n    637,D21,2,180\n    638,638,2,180\n    639,639,2,180\n    639,M20,2,180\n    639,Q01,2,180\n    639,R23,2,180\n    640,640,2,0\n    640,M21,2,180\n    701,701,2,180\n    702,702,2,180\n    705,705,2,180\n    706,706,2,180\n    707,707,2,0\n    708,708,2,180\n    709,709,2,180\n    710,710,2,180\n    710,G14,2,180\n    711,711,2,180\n    712,712,2,0\n    713,713,2,180\n    714,714,2,180\n    715,715,2,180\n    716,716,2,180\n    718,718,2,0\n    718,R09,2,0\n    719,719,2,180\n    719,F09,2,300\n    719,G22,2,180\n    720,720,2,180\n    721,721,2,180\n    723,631,2,180\n    723,723,2,180\n    723,901,2,300\n    724,724,2,180\n    724,D16,2,180\n    725,127,2,180\n    725,725,2,180\n    725,902,2,300\n    725,A27,2,180\n    725,R16,2,180\n    901,631,2,180\n    901,723,2,300\n    901,901,2,180\n    902,127,2,180\n    902,725,2,300\n    902,902,2,180\n    902,A27,2,300\n    902,R16,2,180\n    A02,A02,2,180\n    A03,A03,2,180\n    A05,A05,2,180\n    A06,A06,2,180\n    A07,A07,2,180\n    A09,112,2,180\n    A09,A09,2,0\n    A10,A10,2,180\n    A11,A11,2,180\n    A12,A12,2,0\n    A12,D13,2,180\n    A14,A14,2,180\n    A15,A15,2,0\n    A16,A16,2,180\n    A17,A17,2,180\n    A18,A18,2,180\n    A19,A19,2,180\n    A20,A20,2,180\n    A21,A21,2,180\n    A22,A22,2,180\n    A24,125,2,180\n    A24,A24,2,0\n    A25,A25,2,180\n    A27,127,2,300\n    A27,725,2,180\n    A27,902,2,300\n    A27,A27,2,0\n    A27,R16,2,300\n    A28,A28,2,300\n    A30,A30,2,180\n    A31,A31,2,0\n    A31,L01,2,90\n    A32,A32,2,0\n    A32,D20,2,180\n    A33,A33,2,180\n    A34,A34,2,0\n    A36,228,2,180\n    A36,A36,2,180\n    A36,E01,2,300\n    A38,229,2,180\n    A38,418,2,180\n    A38,A38,2,180\n    A38,M22,2,180\n    A40,A40,2,180\n    A41,A41,2,180\n    A41,R29,2,90\n    A42,A42,2,180\n    A43,A43,2,180\n    A44,A44,2,180\n    A45,A45,2,180\n    A45,S01,2,180\n    A46,A46,2,180\n    A47,A47,2,180\n    A48,A48,2,0\n    A49,A49,2,180\n    A50,A50,2,180\n    A51,A51,2,0\n    A51,J27,2,180\n    A51,L22,2,180\n    A52,A52,2,180\n    A53,A53,2,180\n    A54,A54,2,180\n    A55,A55,2,0\n    A57,A57,2,180\n    A59,A59,2,180\n    A60,A60,2,180\n    A61,A61,2,180\n    A63,A63,2,180\n    A64,A64,2,180\n    A65,A65,2,180\n    B04,B04,2,180\n    B06,B06,2,180\n    B08,629,2,300\n    B08,B08,2,180\n    B08,R11,2,300\n    B10,B10,2,180\n    B12,B12,2,180\n    B13,B13,2,180\n    B14,B14,2,180\n    B15,B15,2,180\n    B16,B16,2,180\n    B16,N04,2,180\n    B17,B17,2,180\n    B18,B18,2,180\n    B19,B19,2,180\n    B20,B20,2,180\n    B21,B21,2,180\n    B22,B22,2,180\n    B23,B23,2,180\n    D01,D01,2,180\n    D03,D03,2,0\n    D04,D04,2,0\n    D05,D05,2,0\n    D06,D06,2,180\n    D07,D07,2,0\n    D08,D08,2,180\n    D09,D09,2,180\n    D10,D10,2,180\n    D11,414,2,180\n    D11,D11,2,180\n    D12,D12,2,180\n    D13,A12,2,180\n    D13,D13,2,0\n    D14,D14,2,180\n    D15,D15,2,300\n    D16,724,2,180\n    D16,D16,2,0\n    D17,D17,2,0\n    D17,R17,2,180\n    D18,D18,2,180\n    D19,132,2,300\n    D19,D19,2,180\n    D19,L02,2,180\n    D20,A32,2,180\n    D20,D20,2,0\n    D21,637,2,180\n    D21,D21,2,0\n    D22,D22,2,180\n    D24,235,2,180\n    D24,D24,2,180\n    D24,R31,2,300\n    D25,D25,2,180\n    D26,D26,2,180\n    D27,D27,2,180\n    D28,D28,2,0\n    D29,D29,2,180\n    D30,D30,2,180\n    D31,D31,2,0\n    D32,D32,2,180\n    D33,D33,2,180\n    D34,D34,2,180\n    D35,D35,2,0\n    D37,D37,2,180\n    D38,D38,2,180\n    D39,D39,2,0\n    D40,D40,2,300\n    D41,D41,2,180\n    D42,D42,2,180\n    D43,D43,2,180\n    E01,228,2,180\n    E01,A36,2,300\n    E01,E01,2,180\n    F01,F01,2,180\n    F02,F02,2,180\n    F03,F03,2,180\n    F04,F04,2,180\n    F06,F06,2,0\n    F07,F07,2,180\n    F09,719,2,300\n    F09,F09,2,180\n    F09,G22,2,180\n    F11,630,2,180\n    F11,F11,2,180\n    F12,F12,2,180\n    F14,F14,2,300\n    F15,F15,2,180\n    F15,M18,2,180\n    F16,F16,2,180\n    F18,F18,2,180\n    F21,F21,2,180\n    F22,F22,2,180\n    F23,F23,2,180\n    F23,R33,2,180\n    F24,F24,2,0\n    F25,F25,2,180\n    F26,F26,2,180\n    F27,F27,2,0\n    F29,F29,2,180\n    F30,F30,2,180\n    F31,F31,2,180\n    F32,F32,2,180\n    F33,F33,2,180\n    F34,F34,2,180\n    F35,F35,2,180\n    F36,F36,2,180\n    F38,F38,2,180\n    F39,F39,2,180\n    G05,G05,2,180\n    G06,G06,2,180\n    G07,G07,2,180\n    G08,G08,2,0\n    G09,G09,2,180\n    G10,G10,2,180\n    G11,G11,2,180\n    G12,G12,2,180\n    G13,G13,2,180\n    G14,710,2,180\n    G14,G14,2,180\n    G15,G15,2,180\n    G16,G16,2,180\n    G18,G18,2,180\n    G19,G19,2,180\n    G20,G20,2,180\n    G21,G21,2,180\n    G22,719,2,180\n    G22,F09,2,180\n    G22,G22,2,180\n    G24,G24,2,180\n    G26,G26,2,180\n    G28,G28,2,180\n    G29,G29,2,180\n    G29,L10,2,180\n    G30,G30,2,180\n    G31,G31,2,180\n    G32,G32,2,180\n    G33,G33,2,180\n    G34,G34,2,180\n    G35,G35,2,180\n    G36,G36,2,180\n    H02,H02,2,180\n    H03,H03,2,180\n    H04,H04,2,180\n    H06,H06,2,180\n    H07,H07,2,180\n    H08,H08,2,180\n    H09,H09,2,180\n    H10,H10,2,180\n    H11,H11,2,180\n    H12,H12,2,180\n    H13,H13,2,180\n    H14,H14,2,180\n    H15,H15,2,180\n    J12,J12,2,180\n    J13,J13,2,180\n    J14,J14,2,180\n    J15,J15,2,180\n    J16,J16,2,180\n    J17,J17,2,180\n    J19,J19,2,180\n    J20,J20,2,180\n    J21,J21,2,180\n    J22,J22,2,180\n    J23,J23,2,180\n    J24,J24,2,180\n    J27,A51,2,180\n    J27,J27,2,0\n    J27,L22,2,180\n    J28,J28,2,180\n    J29,J29,2,180\n    J30,J30,2,180\n    J31,J31,2,180\n    L01,A31,2,90\n    L01,L01,2,180\n    L02,132,2,180\n    L02,D19,2,180\n    L02,L02,2,180\n    L03,635,2,180\n    L03,L03,2,180\n    L03,R20,2,180\n    L05,L05,2,180\n    L06,L06,2,180\n    L08,L08,2,180\n    L10,G29,2,180\n    L10,L10,2,180\n    L11,L11,2,180\n    L12,L12,2,180\n    L13,L13,2,180\n    L14,L14,2,180\n    L15,L15,2,180\n    L16,L16,2,180\n    L17,L17,2,180\n    L17,M08,2,180\n    L19,L19,2,180\n    L20,L20,2,180\n    L21,L21,2,180\n    L22,A51,2,180\n    L22,J27,2,180\n    L22,L22,2,180\n    L24,L24,2,180\n    L25,L25,2,180\n    L26,254,2,300\n    L26,L26,2,180\n    L27,L27,2,180\n    L28,L28,2,180\n    L29,L29,2,180\n    M01,M01,2,180\n    M04,M04,2,180\n    M05,M05,2,180\n    M06,M06,2,180\n    M08,L17,2,180\n    M08,M08,2,180\n    M09,M09,2,180\n    M10,M10,2,180\n    M11,M11,2,0\n    M12,M12,2,180\n    M13,M13,2,180\n    M14,M14,2,180\n    M16,M16,2,0\n    M18,F15,2,180\n    M18,M18,2,180\n    M19,M19,2,180\n    M20,639,2,180\n    M20,M20,2,180\n    M20,Q01,2,180\n    M20,R23,2,300\n    M21,640,2,180\n    M21,M21,2,180\n    M22,229,2,300\n    M22,418,2,300\n    M22,A38,2,180\n    M22,M22,2,180\n    M23,M23,2,180\n    N02,N02,2,180\n    N03,N03,2,180\n    N04,B16,2,180\n    N04,N04,2,180\n    N05,N05,2,180\n    N06,N06,2,180\n    N07,N07,2,180\n    N08,N08,2,180\n    N09,N09,2,180\n    N10,N10,2,180\n    Q01,639,2,180\n    Q01,M20,2,180\n    Q01,Q01,2,180\n    Q01,R23,2,180\n    R01,R01,2,180\n    R03,R03,2,0\n    R04,R04,2,180\n    R05,R05,2,180\n    R06,R06,2,180\n    R08,R08,2,180\n    R09,718,2,0\n    R09,R09,2,180\n    R11,629,2,180\n    R11,B08,2,300\n    R11,R11,2,0\n    R13,R13,2,180\n    R14,R14,2,180\n    R15,R15,2,180\n    R16,127,2,180\n    R16,725,2,180\n    R16,902,2,180\n    R16,A27,2,300\n    R16,R16,2,0\n    R17,D17,2,180\n    R17,R17,2,0\n    R18,R18,2,180\n    R19,R19,2,180\n    R20,635,2,180\n    R20,L03,2,180\n    R20,R20,2,0\n    R21,R21,2,180\n    R22,R22,2,180\n    R23,639,2,180\n    R23,M20,2,300\n    R23,Q01,2,180\n    R23,R23,2,180\n    R24,R24,2,180\n    R26,R26,2,180\n    R27,R27,2,180\n    R27,140,2,120\n    R28,232,2,180\n    R28,423,2,180\n    R28,R28,2,180\n    R29,R29,2,180\n    R29,A41,2,90\n    R30,R30,2,180\n    R31,235,2,180\n    R31,D24,2,300\n    R31,R31,2,0\n    R32,R32,2,180\n    R33,F23,2,180\n    R33,R33,2,180\n    R34,R34,2,180\n    R35,R35,2,180\n    R36,R36,2,0\n    R39,R39,2,180\n    R40,R40,2,180\n    R41,R41,2,0\n    R42,R42,2,180\n    R43,R43,2,180\n    R44,R44,2,180\n    R45,R45,2,180\n    S01,A45,2,180\n    S01,S01,2,180\n    S03,S03,2,180\n    S04,239,2,180\n    S04,S04,2,180";
	  return transfers;
	};

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DataInitializerBART = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bart = __webpack_require__(45);
	
	var BART_API = _interopRequireWildcard(_bart);
	
	var _map = __webpack_require__(3);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataInitializerBART = exports.DataInitializerBART = function () {
	  function DataInitializerBART() {
	    _classCallCheck(this, DataInitializerBART);
	
	    $("#title").text('San Francicso, CA - BART');
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
	
	  _createClass(DataInitializerBART, [{
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

	  return DataInitializerBART;
	}();

/***/ },

/***/ 45:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var fetchStationData = exports.fetchStationData = function fetchStationData(success) {
	  $.ajax({
	    url: 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V',
	    method: 'GET',
	    success: success
	  });
	};
	
	var fetchRoutes = exports.fetchRoutes = function fetchRoutes(success) {
	  $.ajax({
	    url: 'https://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V',
	    method: 'GET',
	    success: success
	  });
	};
	
	var fetchRouteData = exports.fetchRouteData = function fetchRouteData(success, number) {
	  $.ajax({
	    url: 'https://api.bart.gov/api/route.aspx?cmd=routeinfo&route=' + number + '&key=MW9S-E7SL-26DU-VV8V',
	    method: 'GET',
	    success: success
	  });
	};

/***/ }

/******/ });
//# sourceMappingURL=bundle.js.map