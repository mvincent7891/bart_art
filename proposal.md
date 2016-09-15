## Transit PathFinder Proposal

### Background

Transit PathFinder is a path-finding algorithm visualizer, similar to [PathFinding.js][pfjs]
[pfjs]https://qiao.github.io/PathFinding.js/visual/. The app will allow a user to select a city and destination and arrival stations. Next, it animates the process of finding the shortest path between the two stations. In the minimally viable product, shortest path will be calculated as the minimal number of nodes between the stations. In future versions, distance between stations as well as real time arrival and departure data will be used to calculate shortest paths.

### Functionality & MVP  

Users will be able to:

- [ ] Select a city
- [ ] Select arrival and departure stations
- [ ] View map of subway system
- [ ] View path finding between selected stations

In addition, this project will include:

- [ ] Interesting animation of subway system at user selection of city
- [ ] An About section describing the features of the app and technologies utilized
- [ ] A production README
- [ ] Real time data streaming from public transit authorities to gather info (station names, lat, lng, line, etc.) about subway systems.

### Wireframes

The app will be a single page consisting of:
- Map to select city
- Dropdown menu to select departure/arrival stations
- Map of subway system
- Links to my personal portfolio and Github account
- Link to About modal describing the app and its technical features

![home][app_home]
[app_home]: ./wireframes/app_home.png

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure
- `HTML5 Canvas` for DOM rendering
- TODO: Research animation libraries for animating
- Webpack to bundle and serve up scripts

Additional scripts:

`main.js`: this script will handle the logic for selecting a city and stations

`initialize.js`: this script will handle the parsing of response from city transit authorities

`map.js`: this script will handle placing stations on the canvas

`animate.js`: this script will handle animations of subway lines when the user selects a city

`solve.js`: this script will handle finding the shortest path between stations

`transit_authority_api.js`: this script will ping city transit authority APIs for subway station data

### Implementation Timeline

**Day 1**:
- Set up file structure, webpack.config.js, etc.
- Subway API
  + Connect to BART API and pull basic station data
  + Parse and map station data
  + Animate subway lines onto canvas
- Build connected graph representing station data

**Day 2**:
- User input
  + Display station list
  + Select departure and arrival station
- Implement path finding algorithm

**Day 3**:
- Animate path finding algorithm on canvas
- Display directions/transfers

**Day 4**:
- Styling
  + Coloring lines
  + Scrolling through stations

### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add consideration of distance to path finding algorithm
- [ ] Add real time data on arrivals and departures to path finding algorithm
- [ ] Add multiple city subway systems
- [ ] Add multiple pathfinding algorithms
