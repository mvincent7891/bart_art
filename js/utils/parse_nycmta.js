import * as NYC_API from './nycmta.js';
import { SubwayMap } from './map';
import { returnRoutes } from '../../gtfs/routes.js';
import { returnStops } from '../../gtfs/stops.js';
import { returnTransfers } from '../../gtfs/transfers.js';

export class DataInitializerNYC {
  constructor () {
    $("#title").text(`New York City, NY - MTA`);
    this.routes = {};
    this.stations = {};
    this.stationNames = {};
    this.routeConfig = {};
    this.graph = {};
    this.bindFunctions = this.bindFunctions.bind(this);
    this.bindFunctions();
    this.routesParser();
    this.stationParser();
    this.constructGraph();
  }

  bindFunctions () {
    this.stationParser = this.stationParser.bind(this);
    this.routesParser = this.routesParser.bind(this);
    this.routesParser = this.routesParser.bind(this);
  }

  stationParser () {
    let stations = this.stations;
    let $stationEl;
    const rawStopsData = returnStops().split(`\n`);
    const stopsHeaders = rawStopsData[0].split(',');
    rawStopsData.slice(1).forEach(rawStop => {
      const stop = rawStop.split(',');
      const name = stop[2];
      const lat = parseFloat(stop[4]);
      const lng = parseFloat(stop[5]);
      const abbr = stop[9];
      const newStation = { abbr, name, lat, lng };
      if (!stations[abbr]) {
        stations[abbr] = newStation;
        if (!this.stationNames[name]) {
          this.stationNames[name] = newStation;
          $stationEl = $(`<li>${name}</li>`);
          $stationEl.attr('id', `${abbr}`);
          $stationEl.attr('class', `truncate`);
          $("#list").append($stationEl);
        }
      }
    });
  }

  routesParser (message) {
    let routes = this.routes;
    let routeParser = this.routeParser;
    const rawRoutesData = returnRoutes().split(`\n`);
    const routesHeaders = rawRoutesData[0].split(',');
    rawRoutesData.slice(1).forEach(rawRoute => {
      const route = rawRoute.split(',');
      const routeID = route[0].slice(1);
      const abbr = route[2];
      const name = route[3];
      const newRoute = { abbr, name, routeID };
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

  routeParser (message) {

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

  constructGraph () {
    let graph = this.graph;
    Object.keys(this.stations).forEach(abbr => {
      graph[abbr] = [];
    });
    const rawTransferData = returnTransfers().split(`\n`);
    const transferHeaders = rawTransferData[0].split(',');
    rawTransferData.slice(1).forEach((rawTransfer, idx) => {
      const transfer = rawTransfer.split(',');
      const stop1 = transfer[0].slice(4);
      const stop2 = transfer[1];
      let stop3;
      if (rawTransferData[idx + 2]) {
        const transfer2 = rawTransferData[idx + 2].split(',');
        stop3 = transfer2[0].slice(4);
      } else {
        stop3 = stop1;
      }
      if ((stop1[0] === stop3[0]) && !(stop1 === stop3)) {
        graph[stop1].push(stop3);
        graph[stop3].push(stop1);
      } else if (!(stop1 === stop2)) {
        graph[stop1].push(stop2);
      }
    });
    const map = new SubwayMap(graph, this.stations);
  }
}
