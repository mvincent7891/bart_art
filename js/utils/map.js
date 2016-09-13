
export class SubwayMap {

  constructor (graph, stations) {
    this.graph = graph;
    this.stations = stations;
    this.extractCoordLimits = this.extractCoordLimits.bind(this);
    this.mapStations = this.mapStations.bind(this);
    this.mapCircle = this.mapCircle.bind(this);
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.ctx = this.canvas.getContext("2d");
    this.minX = 0;
    this.minY = 0;
    this.maxY = parseInt(this.canvas.height) - 40;
    this.maxX = parseInt(this.canvas.width) - 40;
    this.extractCoordLimits();
    this.mapStations();
  }

  mapStations() {
    let x, y, coords, a, b;
    const graphArray = Object.keys(this.graph);
    const graph = this.graph;
    let stationsToDraw = [graphArray[0]];
    let stationsDrawn = [];
    let i = -1;
    let station;
    while (stationsToDraw.length > 0) {
      station = stationsToDraw[0];
      i += 1;
      x = this.stations[station].lng;
      y = this.stations[station].lat;
      [a, b] = this.mapCoords(x,y);
      this.mapCircle(a, b, i);
      stationsDrawn.push(stationsToDraw[0]);
      graph[station].forEach(newStation => {
        if (stationsDrawn.indexOf(newStation) === -1) {
          stationsToDraw.push(newStation);
        }
      });
      stationsToDraw = stationsToDraw.slice(1);
    }
  }

  mapCircle (x, y, i) {
    setTimeout(() => {
      this.ctx.fillStyle = "#44a3ec";
      this.ctx.beginPath();
      this.ctx.arc(
        x + 20,
        y + 20,
        3,
        0,
        2 * Math.PI,
        false
      );
      this.ctx.fill();
    },10*i)
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
  }

  mapCoords(lng, lat) {
    // Pass in (lat, lng); return (x, y) coords for canvas element
    const lngRange = this.maxLng - this.minLng;
    const latRange = this.maxLat - this.minLat;
    const xCoord = Math.floor(this.maxX * (lng - this.minLng) / lngRange);
    const yCoord = Math.floor(this.maxY * (lat - this.minLat) / latRange);

    return([xCoord, this.maxY - yCoord]);

  }

}
