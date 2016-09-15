import { PathFinder } from './path_finder';

export class ListAnimation {

  constructor (stations, circles, lines, graph) {
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
    setTimeout(() => this.addOnHover(), 3000);
    setTimeout(() => this.startAnimating(), 3000);
    setTimeout(() => {
      this.pathFinder = new PathFinder(this.stations, this.circles,
                                       this.lines, graph);
    }, 2000);
  }

  updateList () {
    let $blankEl;
    for (var i = 0; i < 8; i++) {
      $blankEl = $(`<li>BLANK</li>`);
      $blankEl.attr('class', `blank`);
      $("#list").append($blankEl);
    }
    for (var i = 0; i < 6; i++) {
      $blankEl = $(`<li>BLANK</li>`);
      $blankEl.attr('class', `blank`);
      $("#list").prepend($blankEl);
    }
  }

  startAnimating() {
    setInterval(() => {
      this.clearCanvas();
      this.drawLines();
      this.drawCircles();
    }, 5);
  }

  drawLines () {
    let x1, y1, x2, y2;
    this.lines.forEach(line => {
      [x1, y1, x2, y2] = line;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#676767';
      this.ctx.stroke();
    });
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCircles () {
    let circle;
    Object.keys(this.circles).forEach(id => {
      circle = this.circles[id];
      this.ctx.fillStyle = circle[3];
      this.ctx.beginPath();
      this.ctx.arc(
        circle[0],
        circle[1],
        circle[2],
        0,
        2 * Math.PI,
        false
      );
      this.ctx.fill();
    });
  }

  addOnHover () {
    const stations = this.stations;
    Object.keys(stations).forEach(abbr=> {
      $(`#${abbr}`).mouseover(() => {
        this.circles[abbr][3] = '#00ACC1';
        for (var i = 0; i < 6; i++) {
          setTimeout(() => {
            this.circles[abbr][2] = this.circles[abbr][2] + 1;
          },i * 60);
        }
      });
      $(`#${abbr}`).mouseout(() => {
        this.circles[abbr][3] = '#676767';
        for (var i = 0; i < 7; i++) {
          setTimeout(() => {
            if (this.circles[abbr][2] > 2) {
              this.circles[abbr][2] = this.circles[abbr][2] - 1;
            }
          },i * 60);
        }
      });
    });
  }

}
