$.ajax({
  url: 'https://api.transitfeeds.com/v1/getLocations',
  method: 'GET',
  dataType: 'json',
  data: {key: 'b2490fe7-f10b-493b-a23a-abe5d2f5faad'},
  success: message => console.log(message)
 });
