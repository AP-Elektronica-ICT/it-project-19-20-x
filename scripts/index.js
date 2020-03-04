let mymap = L.map('map').setView([42.35, -71.08], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibGVjdG9yd291dGVyIiwiYSI6ImNrM29pY2dqdTFlc24zbW5tcjZ0bHcyMmYifQ.J3VURMKB4XSNnXz-iqubsQ'
}).addTo(mymap);
