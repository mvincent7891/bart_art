import * as BART_API from './bart.js';

export class DataInitializer {
  constructor () {
    this.stations = {};
    this.routes = {};
    this.routeConfig = {};
    this.dataFetcher = this.dataFetcher.bind(this);
    this.stationParser = this.stationParser.bind(this);
    this.routesParser = this.routesParser.bind(this);
    this.routeParser = this.routeParser.bind(this);
    this.dataFetcher();
  }

  dataFetcher () {
    BART_API.fetchRoutes(this.routesParser);
    BART_API.fetchStationData(this.stationParser);
  }

  stationParser (message) {
    let stations = this.stations;
    $(message).find('station').each((idx, station) => {
      const abbr = $(station).find('abbr').html();
      const name = $(station).find('name').html();
      const lat = $(station).find('gtfs_latitude').html();
      const lng = $(station).find('gtfs_longitude').html();
      const address = $(station).find('address').html();
      const city = $(station).find('city').html();
      const county = $(station).find('county').html();
      const state = $(station).find('state').html();
      const zipcode = $(station).find('zipcode').html();
      const newStation = { abbr, name, lat, lng, address,
                           city, county, state, zipcode };
      stations[abbr] = newStation;
    });
  }

  routesParser (message) {
    let routes = this.routes;
    let routeParser = this.routeParser;
    $(message).find('route').each((idx, route) => {
      const abbr = $(route).find('abbr').html();
      const name = $(route).find('name').html();
      const routeID = $(route).find('routeID').html();
      const number = $(route).find('number').html();
      const color = $(route).find('color').html();
      const newRoute = { abbr, name, routeID, number, color };
      BART_API.fetchRouteData(routeParser, number);
      routes[routeID] = newRoute;
    });
  }

  routeParser (message) {
    const number = $(message).find('number').html();
    const stations = [];
    $(message).find('station').each((idx, station) => {
        stations.push($(station).html());
    });
    this.routeConfig[number] = stations;
    if (Object.keys(this.routeConfig).length ===
        Object.keys(this.routes).length) {
      console.log(this.routeConfig);
    }
  }
}
