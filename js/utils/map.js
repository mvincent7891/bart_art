import { ListAnimation } from './animate_list';

export class SubwayMap {

  constructor (graph, stations) {
    this.graph = graph;
    this.stations = stations;
    this.interval = Math.floor(1000 / Object.keys(this.stations).length);
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
    // this.maxY = parseInt(this.canvas.height) - 40;
    // this.maxX = parseInt(this.canvas.width) - 40;
    this.maxY = 600;
    this.maxX = 500;
    this.extractCoordLimits();
    this.mapStations();
    const hover = new ListAnimation(this.stations, this.stationCircles,
                                    this.stationLines, graph);
  }

  mapStations() {
    let x, y, a, b, x2, y2, c, d;
    const graphArray = Object.keys(this.graph);
    const graph = this.graph;
    let firstStation = graphArray[0];
    // To choose random starting station (causes error sometimes):
    // let firstStation = graphArray[Math.floor(Math.random() * graphArray.length)];
    let stationsToDraw = [[firstStation, undefined]];
    let stationsDrawn = [];
    let i = -1;
    let station;
    while (stationsToDraw.length > 0) {
      station = stationsToDraw[0][0];
      i += 1;
      x = this.stations[station].lng;
      y = this.stations[station].lat;
      [a, b] = this.mapCoords(x,y);
      if (stationsToDraw[0][1]) {
        x2 = this.stations[stationsToDraw[0][1]].lng;
        y2 = this.stations[stationsToDraw[0][1]].lat;
        [c, d] = this.mapCoords(x2,y2);
        this.drawLine(a, b, c, d, i);
      }
      this.mapCircle(a, b, i, station);
      this.stationCircles[station] = [a + 20, b + 20, 2, '#474747'];
      stationsDrawn.push(stationsToDraw[0][0]);
      graph[station].forEach(newStation => {
        if (stationsDrawn.indexOf(newStation) === -1) {
          stationsToDraw.push([newStation, station]);
        }
      });
      stationsToDraw = stationsToDraw.slice(1);
    }
  }

  drawLine (x1, y1, x2, y2, i) {
    this.stationLines.push([x1 + 20, y1 + 20, x2 + 20, y2 + 20]);
    setTimeout(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(x1 + 20, y1 + 20);
      this.ctx.lineTo(x2 + 20, y2 + 20);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#474747';
      this.ctx.stroke();
    }, (this.interval * i));
  }

  mapCircle (x, y, i) {
    setTimeout(() => {
      this.ctx.fillStyle = "#474747";
      this.ctx.beginPath();
      this.ctx.arc(
        x + 20,
        y + 20,
        2,
        0,
        2 * Math.PI,
        false
      );
      this.ctx.fill();
    }, ((this.interval * i)) );
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
