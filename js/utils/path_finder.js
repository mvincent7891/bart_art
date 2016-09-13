

export class PathFinder {
  constructor (stations, circles, lines, graph) {
    console.log(circles);
    console.log(stations);
    this.circles = circles;
    this.stations = stations;
    this.initialInstructions = this.initialInstructions.bind(this);
    this.addOnClick = this.addOnClick.bind(this);
    this.selectStation = this.selectStation.bind(this);
    this.clearPathFinder = this.clearPathFinder.bind(this);
    this.solving = false;
    this.initialInstructions();
    this.addOnClick();
    this.destination = undefined;
    this.origin = undefined;
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

    if (this.destination) {
      // set arrival and start alorithm
      this.origin = this.stations[abbr];
      this.solving = true;
      this.circles['destination'] = [x, y, 6, '#EC407A'];
      $("#instructions").text(`Solving...`);
      $("#route").text(`${this.origin.name} to ${this.destination.name}`);
      setTimeout(() => this.clearPathFinder(), 2000);
    } else {
      this.destination = this.stations[abbr];
      this.circles['origin'] = [x, y, 6, '#FFC107'];
      $("#instructions").text(`Select destination...`);
    }
  }

  clearPathFinder() {
    this.circles['destination'] = [0, 0, 0, '#EC407A'];
    this.circles['origin'] = [0, 0, 0, '#FFC107'];
    $("#instructions").text(`Select origin...`);
    $("#route").text(``);
    this.destination = undefined;
    this.origin = undefined;
    this.solving = false;
    Object.keys(this.stations).forEach(abbr=> {
      $(`#${abbr}`).removeClass('selected');
    });
  }


}
