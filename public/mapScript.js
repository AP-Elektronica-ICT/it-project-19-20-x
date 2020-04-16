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

// maakt de route
L.Routing.control({
    waypoints: [
        L.latLng(51.13, 4.25),
        L.latLng(51.230444, 4.415316)
    ],
    routeWhileDragging: true,
    router: L.Routing.graphHopper('b314e5a1-08b9-400a-9cce-9f2976229a8a')
}).addTo(map);

  async function getJSON_Data()
  {

      const url = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json";
      

      const response = await fetch(url);
      const json_Data = await response.json();
      for (let index = 0; index < json_Data.features.length; index++) {
         const long = json_Data.features[index].geometry.y;
         const lat = json_Data.features[index].geometry.x;
       const marker = L.marker([long,lat],{icon: greenIcon}).addTo(map);
       marker.bindPopup("<br>" + json_Data.features[index].attributes.gemeente + "<br>" +  "<b>" + json_Data.features[index].attributes.naam + "</b>" + "<br>" + json_Data.features[index].attributes.straat + " " + json_Data.features[index].attributes.huisnr + "<br>" + json_Data.features[index].attributes.postcode)
    }

    const erfUrl = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/293/query?where=1%3D1&outFields=*&outSR=4326&f=json";

       const res = await fetch(erfUrl);
       const json = await res.json();

       for(let index = 0; index < json.features.length; index++)
       {
          const corLong= json.features[index].geometry.y;
          const corLat = json.features[index].geometry.x;
          const marker = L.marker([corLong,corLat], {icon: Icon}).addTo(map);
          marker.bindPopup("<br>" + json.features[index].attributes.gemeente + "<br>" +  "<b>" + json.features[index].attributes.naam + "</b>" + "<br>" + json.features[index].attributes.straat + " " + json.features[index].attributes.huisnr + "<br>" + json.features[index].attributes.postcode)
       }
      
  }

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
 
  function getRoute(long, lat) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showRoute);
    } else { 
      x.innerHTML = "Geolocatie wordt niet ondersteund door de browser.";
    }
  }

  function showRoute(position, long, lat) {
      // maakt de route
      L.Routing.control({
          waypoints: [
              L.latLng(position.coords.latitude, position.coords.longitude),
              L.latLng(50.85045, 4.34878)
          ],
          routeWhileDragging: true,
          router: L.Routing.graphHopper('b314e5a1-08b9-400a-9cce-9f2976229a8a')
      }).addTo(map);
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