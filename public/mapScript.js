var map = L.map('map').setView([51.2171918, 4.4212529], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
}).addTo(map);
  // for(var k in jsonData) {
  //     console.log(jsonData.features[k].geometry.x);
  // }
  //console.log(jsonData.features[0].geometry.X);

  var greenIcon = L.icon({
    iconUrl: 'icon.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});
var Icon = L.icon({
    iconUrl: 'icon1.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

  async function getJSON_Data()
  {

      const url = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json";
      

      const response = await fetch(url);
      const json_Data = await response.json();
      for (let index = 0; index < json_Data.features.length; index++) {
         const long = json_Data.features[index].geometry.y;
         const lat = json_Data.features[index].geometry.x;
       const marker = L.marker([long,lat],{icon: greenIcon}).addTo(map);
    }//myLayer.bindPopup(feature.attributes.naam);
      
  }

  /*
  function erfgooedLocaties(data)
  {
      L.geoJSON(data ,{onEachFeatures: function (feature, layer) {
          layer.bindPopup(feature.attributes.naam);
      }}).addTo(map);
  }
  */
  