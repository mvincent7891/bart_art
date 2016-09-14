
export const transitFeed = () => {
  $.ajax({
    url: 'https://api.transitfeeds.com/v1/getLocations',
    method: 'GET',
    dataType: 'json',
    data: {key: 'b2490fe7-f10b-493b-a23a-abe5d2f5faad'},
    success: message => console.log(message)
  });
};

export const fetchStationData = success => {
  $.ajax({
    url: 'http://datamine.mta.info/mta_esi.php?key=b1c77cb8e5ce4374eb955f1b6372144d&feed_id=1',
    method: 'GET',
    dataType: 'json',
    success
  });
};
//
// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//
//     // Check if the XMLHttpRequest object has a "withCredentials" property.
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);
//
//   } else if (typeof XDomainRequest != "undefined") {
//
//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//
//   } else {
//
//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;
//
//   }
//   return xhr;
// }
//
// export const fetchStationDataXML = success => {
//   // This is a sample server that supports CORS.
//   var url = 'http://datamine.mta.info/mta_esi.php?key=b1c77cb8e5ce4374eb955f1b6372144d&feed_id=1';
//
//   var xhr = createCORSRequest('GET', url);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }
//
//   // Response handlers.
//   xhr.onload = function() {
//     var text = xhr.responseText;
//     alert('Response from CORS request to ' + url + ': ' + text);
//   };
//
//   xhr.onerror = function() {
//     alert('Woops, there was an error making the request.');
//   };
//   xhr.send();
// };
