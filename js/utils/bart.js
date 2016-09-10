export const fetchStationData = success => {
  $.ajax({
    url: 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V',
    method: 'GET',
    success
  });
};

export const fetchRouteData = success => {
  $.ajax({
    url: 'http://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V',
    method: 'GET',
    success
  });
};
