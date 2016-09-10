import * as BART_API from './bart.js';

const stationParser = message => {
  const stations = {};
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
  // console.log(stations);
};

const routeParser = message => {
  const routes = {};
  $(message).find('route').each((idx, route) => {
    const abbr = $(route).find('abbr').html();
    const name = $(route).find('name').html();
    const routeID = $(route).find('routeID').html();
    const number = $(route).find('number').html();
    const color = $(route).find('color').html();
    const newRoute = { abbr, name, routeID, number, color };
    routes[routeID] = newRoute;
  });
  console.log(routes);
};

export const initializeData = () => {
  BART_API.fetchRouteData(routeParser);
  BART_API.fetchStationData(stationParser);
};
