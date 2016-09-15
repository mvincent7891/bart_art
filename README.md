<a name="top_of_page"></a>

# Transit PathFinder: JS App for Visualizing BFS

[Transit PathFinder Live][live_app]
[live_app]: https://mvincent7891.github.io/bart_art/

![welcome][bart_art]
[bart_art]: ./assets/bartart.gif

## Overview

Transit PathFinder is a JS app intended to aid in visualizing search algorithms, similar to [PathFinding.js][pfjs_link]. Instead of using a maze as a connected graph, Transit PathFinder uses data pulled from the NYC MTA and San Francisco BART APIs. The app utilizes jQuery for DOM manipulation and pure HTML5 Canvas and CSS for animation and styling.

[pfjs_link]: https://qiao.github.io/PathFinding.js/visual/

## Usage

![welcome][welcome_image]
[welcome_image]: ./assets/welcome.png

First, simply select a city (currently New York or San Francisco). Next, choose origin and destination stations. The app will animate a search algorithm (currently BFS) traversing the transit map. After the target station is located, the optimal route (fewest nodes) will be traced from origin to destination.

## Technical Features

### Transit APIs

Subway locations and routes are pulled from metropolitan transit authorities (NYC MTA and BART) via ajax requests. This functionality will allow for easier integration when extending the app to take arrival and departure times as well as delays into account when finding an optimal route. Once the API responses are parsed, the same mapping and path finding algorithms handle each city's data.

```javascript
export const fetchRouteData = (success, number) => {
  $.ajax({
    url: `https://api.bart.gov/api/route.aspx?cmd=routeinfo&route=${number}&key=MW9S-E7SL-26DU-VV8V`,
    method: 'GET',
    success
  });
};
```

### Building a Connected Graph

Unfortunately, transit authorities do not serve up their data as a connected graph. However, once routes and stations are parsed out of the API response, it is straightforward to build the graph. First, route neighbors are added as connected nodes. Additionally, for NYC data, transfers extend the graph to include edges between nodes on separate routes.

```javascript
Object.keys(routeConfig).forEach(routeId => {
  const route = routeConfig[routeId];
  route.slice(0,(route.length - 1)).forEach((station, index) => {
    if (!graph[route[index]].includes(route[index + 1])) {
      graph[route[index]].push(route[index + 1]);
    }
  });
});
```

## Design
Stylistically, Transit PathFinder employs a minimalist design, with plenty of white space, primarily black and white color scheme, and a few highlights. This style is achieved with pure CSS and HTML5 Canvas.

## Future Directions
The next step for TPF will incorporate distances between stations instead of simple node count when determining optimal routes. The logic will be a bit more complicated: when choosing between children
