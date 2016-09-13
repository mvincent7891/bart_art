$.ajax({
  url: 'https://api.transitfeeds.com/v1/getLocations',
  method: 'GET',
  dataType: 'json',
  data: {key: 'b2490fe7-f10b-493b-a23a-abe5d2f5faad'},
  success: message => console.log(message)
 });

$.ajax({
  url: 'http://datamine.mta.info/mta_esi.php?key=<b1c77cb8e5ce4374eb955f1b6372144d>&feed_id=1',
  method: 'GET',
  dataType: 'json',
  data: {key: 'b1c77cb8e5ce4374eb955f1b6372144d'},
  success: message => console.log(message)
});
