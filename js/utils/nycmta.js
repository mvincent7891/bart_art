$.ajax({
  url: 'https://api.transitfeeds.com/v1/getLocations',
  method: 'GET',
  dataType: 'json',
  data: {key: 'b2490fe7-f10b-493b-a23a-abe5d2f5faad'},
  success: message => console.log(message)
 });

$.ajax({
  url: 'http://datamine.mta.info/mta_esi.php?key=b1c77cb8e5ce4374eb955f1b6372144d&feed_id=1',
  method: 'GET',
  dataType: 'json',
  corssDomain: true,
  success: message => console.log(message)
});

const setHeader = (xhr) => {
  xhr.addHeader("Access-Control-Allow-Origin", "*");
};

var xhr = new XMLHttpRequest();
xhr.open('get', 'http://datamine.mta.info/mta_esi.php?key=b1c77cb8e5ce4374eb955f1b6372144d&feed_id=1', false);
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.send();
