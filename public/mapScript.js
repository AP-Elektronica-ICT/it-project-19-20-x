var map = L.map('map').setView([51.2171918, 4.4212529], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
}).addTo(map);

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
  marker.bindPopup("<br>" + erfjson.features[index].attributes.gemeente + "<br>" +  "<b>" + erfjson.features[index].attributes.naam + "</b>" + "<br>" + erfjson.features[index].attributes.straat + " " + erfjson.features[index].attributes.huisnr + "<br>" + erfjson.features[index].attributes.postcode  + "<br>" + `<button onclick="getRoute(${erflong}, ${erflat})">Route</button>`)
}

//cultuurlocaties
const culurl = '/jsoncultuur';
const res = await fetch(culurl);
const culjson = await res.json();
for(let index=0; index< culjson.features.length; index++){

  const cullong = culjson.features[index].geometry.y;
  const cullat = culjson.features[index].geometry.x;
  const marker = L.marker([cullong,cullat],{icon: greenIcon}).addTo(map);
  marker.bindPopup("<br>" + culjson.features[index].attributes.gemeente + "<br>" +  "<b>" + culjson.features[index].attributes.naam + "</b>" + "<br>" + culjson.features[index].attributes.straat + " " + culjson.features[index].attributes.huisnr + "<br>" + culjson.features[index].attributes.postcode  + "<br>"  + `<button onclick="getRoute(${cullong}, ${cullat})">Route</button>`)
}
}

getjson();

<<<<<<< HEAD
      const response = await fetch(url);
      const json_Data = await response.json();
      for (let index = 0; index < json_Data.features.length; index++) {
         const long = json_Data.features[index].geometry.y;
         const lat = json_Data.features[index].geometry.x;
       const marker = L.marker([long,lat],{icon: greenIcon}).addTo(map);
    }//myLayer.bindPopup(feature.attributes.naam);
      
<<<<<<< HEAD
  }
 
=======
  }
=======
>>>>>>> aa5b7373852cea623914229b394a42cc62be2ccb

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
<<<<<<< HEAD
>>>>>>> b3a03d2e0745e2c0cc422f10f524ebfe67d1c833
 
=======
>>>>>>> aa5b7373852cea623914229b394a42cc62be2ccb
  
  function getRoute(destlong, destlat) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        showRoute(position, destlong, destlat);
    });
    } else { 
      x.innerHTML = "Geolocatie wordt niet ondersteund door de browser.";
    }
  }

  function showRoute(position, destlong, destlat) {
    if (typeof routeControl !== 'undefined') {
      routeControl.getPlan().setWaypoints([]);
    }
      // maakt de route
      routeControl = L.Routing.control({
          waypoints: [
              L.latLng(position.coords.latitude, position.coords.longitude),
              L.latLng(destlong, destlat)
          ],
          routeWhileDragging: true,
          router: L.Routing.graphHopper('b314e5a1-08b9-400a-9cce-9f2976229a8a')
      }).addTo(map);
  }


  
 
  
  // Toon functies voor locaties zullen hier komen
 
  /*
  function erfgooedLocaties(data)
  {
      L.geoJSON(data ,{onEachFeatures: function (feature, layer) {
          layer.bindPopup(feature.attributes.naam);
      }}).addTo(map);
  }
  */