

export class PathFinder {
  constructor (stations, circles, lines, graph) {
    this.circles = circles;
    this.stations = stations;
    this.graph = graph;

    this.bindFunctions = this.bindFunctions.bind(this);
    this.bindFunctions();

    this.solving = false;
    this.initialInstructions();
    this.addOnClick();
    this.destination = undefined;
    this.origin = undefined;
    this.size = 3;
    this.interval = Math.floor(3000 / Object.keys(this.stations).length);
  }

  bindFunctions () {
    this.initialInstructions = this.initialInstructions.bind(this);
    this.addClickAnywhere = this.addClickAnywhere.bind(this);
    this.clearPathFinder = this.clearPathFinder.bind(this);
    this.highlightTrace = this.highlightTrace.bind(this);
    this.selectStation = this.selectStation.bind(this);
    this.startSolving = this.startSolving.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.addOnClick = this.addOnClick.bind(this);
    this.addCircle = this.addCircle.bind(this);
  }

  initialInstructions() {
    $("#instructions").text(`Select origin...`);
  }

  addOnClick () {
    const stations = this.stations;
    Object.keys(stations).forEach(abbr=> {
      $(`#${abbr}`).on('click', () => {
        if (!this.solving && (this.stations[abbr] !== this.destination)) {
          this.selectStation(abbr);
          $(`#${abbr}`).attr('class', 'selected');
        }
      });
    });
  }

  selectStation (abbr) {
    const x = this.circles[abbr][0];
    const y = this.circles[abbr][1];

    if (this.origin) {
      // set arrival and start alorithm
      this.destination = this.stations[abbr];
      this.solving = true;
      this.circles['destination'] = [x, y, 6, '#EC407A'];
      $("#instructions").text(`Searching...`);
      $("#route").text(`${this.origin.name} to ${this.destination.name}`);
      this.startSolving();
    } else {
      this.origin = this.stations[abbr];
      this.origin['abbr'] = abbr;
      this.circles['origin'] = [x, y, 6, '#FFC107'];
      $("#instructions").text(`Select destination...`);
    }
  }

  startSolving () {
    let unvisited = [];
    let visited = [];
    let x, y;
    let trace = {};
    unvisited.push(this.origin['abbr']);
    let nextStation;
    let i = 0;
    while (nextStation !== this.destination.abbr) {
      i += 1;
      nextStation = unvisited[0];
      visited.push(unvisited[0]);
      unvisited.shift();

      this.graph[nextStation].forEach(newStation => {
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

  clearSearch (j, trace) {
    setTimeout(() => {
      for (var i = 0; i <= j; i++) {
        delete this.circles[`zz-${i}`];
      }
      this.highlightTrace(trace, j);
    }, (j * this.interval + 500));
  }

  clearTrace (j, trace) {
    for (var i = 0; i <= j; i++) {
      if (this.circles[`zz-${i}`]) {
        delete this.circles[`zz-${i}`];
      }
    }
    $("#instructions").text(`Select origin...`);
  }

  highlightTrace(trace, length) {
    const dest = this.destination.abbr;
    const origin = this.origin.abbr;
    $("#instructions").text(`Tracing optimal route...`);
    let nextStation = dest;
    let x, y;
    let i = 0;
    while (nextStation !== origin) {
      i += 1;
      x = this.circles[nextStation][0];
      y = this.circles[nextStation][1];
      this.addCircle(x, y, this.size, '#FFC107', (length - i));
      nextStation = trace[nextStation];
    }
    i += 1;
    x = this.circles[nextStation][0];
    y = this.circles[nextStation][1];
    this.addCircle(x, y, this.size, '#FFC107', (length - i));
    this.addClickAnywhere(length, trace);

  }

  addClickAnywhere (length, trace) {
    setTimeout(() => {
      $("#instructions").text(`Click anywhere...`);
    }, length * this.interval);
    $("#route").text('');
    $('body').on('click', () => {
      $('body').off();
      this.clearPathFinder();
      this.clearTrace(length, trace);
    });
  }

  addCircle (x, y, r, color, i) {
    setTimeout(() => {
      this.circles[`zz-${i}`] = [x, y, r, color];
    }, i * this.interval);
  }

  clearPathFinder() {
    this.circles['destination'] = [0, 0, 0, '#EC407A'];
    this.circles['origin'] = [0, 0, 0, '#FFC107'];
    this.destination = undefined;
    this.origin = undefined;
    this.solving = false;
    Object.keys(this.stations).forEach(abbr=> {
      $(`#${abbr}`).removeClass('selected');
    });
  }


}
