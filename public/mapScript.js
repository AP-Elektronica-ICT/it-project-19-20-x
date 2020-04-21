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







async function getjson(){

//erfgoed locaties
const erfurl = '/jsonerfgoed';
const response = await fetch(erfurl);
const erfjson = await response.json();
for(let index=0; index< erfjson.features.length; index++){

  const erflong = erfjson.features[index].geometry.y;
  const erflat = erfjson.features[index].geometry.x;
  const marker = L.marker([erflong,erflat],{icon: Icon}).addTo(map);
  marker.bindPopup("<br>" + erfjson.features[index].attributes.gemeente + "<br>" +  "<b>" + erfjson.features[index].attributes.naam + "</b>" + "<br>" + erfjson.features[index].attributes.straat + " " + erfjson.features[index].attributes.huisnr + "<br>" + erfjson.features[index].attributes.postcode)
}

//cultuurlocaties
const culurl = '/jsoncultuur';
const res = await fetch(culurl);
const culjson = await res.json();
for(let index=0; index< culjson.features.length; index++){

  const cullong = culjson.features[index].geometry.y;
  const cullat = culjson.features[index].geometry.x;
  const marker = L.marker([cullong,cullat],{icon: greenIcon}).addTo(map);
  marker.bindPopup("<br>" + culjson.features[index].attributes.gemeente + "<br>" +  "<b>" + culjson.features[index].attributes.naam + "</b>" + "<br>" + culjson.features[index].attributes.straat + " " + culjson.features[index].attributes.huisnr + "<br>" + culjson.features[index].attributes.postcode)
}
}
getjson();







  let x = document.getElementById("locatie");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocatie wordt niet ondersteund door de browser.";
    }
  }
  
  function showPosition(position) 
  {
    console.log(position.coords.longitude, position.coords.latitude);
    L.marker([position.coords.latitude,position.coords.longitude],{icon: Icon}).addTo(map);
  }
 
  
  getJSON_Data().then(data => 
    {
        const cultuurLocatieData = data[0].features;
        const erfgoodLocatieData = data[1].features;
        console.log("test");
        //Functies om locaties te tonen op roepen
        Locaties(cultuurLocatieData);
        Locaties(erfgoodLocatieData);
    })
  
 
  
  // Toon functies voor locaties zullen hier komen
 
  /*
  function erfgooedLocaties(data)
  {
      L.geoJSON(data ,{onEachFeatures: function (feature, layer) {
          layer.bindPopup(feature.attributes.naam);
      }}).addTo(map);
  }
  */