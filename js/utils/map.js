
export class SubwayMap {

  constructor (graph, stations) {
    this.graph = graph;
    this.stations = stations;
    this.extractCoordLimits = this.extractCoordLimits.bind(this);
    this.canvas = document.getElementsByTagName("canvas")[0];
    console.log(this.canvas);
    this.minX = 0;
    this.minY = 0;
    this.maxY = parseInt(this.canvas.height);
    this.maxX = parseInt(this.canvas.width);
    this.extractCoordLimits();
  }

  extractCoordLimits () {
    // Pull minimum and maximum lat/lng for normalizing map on canvas
    const stations = this.stations;
    const stationNames = Object.keys(this.stations);
    const firstStation = stations[stationNames[0]];
    this.minLat = firstStation.lat;
    this.maxLat = firstStation.lat;
    this.minLng = firstStation.lng;
    this.maxLng = firstStation.lng;
    let newStation;
    stationNames.forEach(name => {
      newStation = stations[name];
      if (newStation.lat > this.maxLat) {
        this.maxLat = newStation.lat;
      } else if (newStation.lat < this.minLat) {
        this.minLat = newStation.lat;
      }
      if (newStation.lng > this.maxLng) {
        this.maxLng = newStation.lng;
      } else if (newStation.lng < this.minLng) {
        this.minLng = newStation.lng;
      }
    });
    this.mapCoords(this.maxLng, this.maxLat);
    this.mapCoords(this.minLng, this.minLat);
  }

  mapCoords(lng, lat) {
    // Pass in (lat, lng); return (x, y) coords for canvas element
    const lngRange = this.maxLng - this.minLng;
    const latRange = this.maxLat - this.minLat;
    const xCoord = Math.floor(this.maxX * (lng - this.minLng) / lngRange);
    const yCoord = Math.floor(this.maxY * (lat - this.minLat) / latRange);

    return(xCoord, yCoord);

  }

}
