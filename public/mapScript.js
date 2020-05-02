var map = L.map('map').setView([51.2171918, 4.4212529], 10);
var markers = new Array();

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

async function getjson(e){
  e.preventDefault();

  let list = document.getElementById("listSidenav");
  let filterData = new FormData(document.getElementById("filterForm"));
  
  //remove all markers
  for(i=0;i<markers.length;i++) {
    map.removeLayer(markers[i]);
    }  

  //remove everything from list
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }

  //erfgoed locaties
  const erfurl = '/jsonerfgoed';
  const response = await fetch(erfurl);
  const erfjson = await response.json();
  
  for(let index=0; index< erfjson.features.length; index++){
    if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == "all" && filterData.get("straatnaam") == "") {
      addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
    }
    else{
      if (filterData.get("Categorieën") == erfjson.features[index].attributes.categorie && filterData.get("postcodes") == "all" && filterData.get("straatnaam") == "") {
        addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == erfjson.features[index].attributes.postcode && filterData.get("straatnaam") == "") {
        addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == erfjson.features[index].attributes.categorie && filterData.get("postcodes") == erfjson.features[index].attributes.postcode && filterData.get("straatnaam") == "") {
        addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == erfjson.features[index].attributes.categorie && filterData.get("postcodes") == erfjson.features[index].attributes.postcode && filterData.get("straatnaam").toUpperCase()  == erfjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == "all" && filterData.get("straatnaam").toUpperCase()  == erfjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == erfjson.features[index].attributes.postcode && filterData.get("straatnaam").toUpperCase()  == erfjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == erfjson.features[index].attributes.categorie && filterData.get("postcodes") == "all" && filterData.get("straatnaam").toUpperCase()  == erfjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(erfjson.features[index].geometry.y, erfjson.features[index].geometry.x, erfjson.features[index].attributes.naam, erfjson.features[index].attributes.straat, erfjson.features[index].attributes.huisnr, erfjson.features[index].attributes.gemeente, erfjson.features[index].attributes.postcode, erfjson.features[index].attributes.email, erfjson.features[index].attributes.telefoon, erfjson.features[index].attributes.link);
      }
    }

  }

  // cultuurlocaties
  const culurl = '/jsoncultuur';
  const res = await fetch(culurl);
  const culjson = await res.json();

  for(let index=0; index< culjson.features.length; index++){
    if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == "all" && filterData.get("straatnaam") == "") {
      addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
    }
    else{
      if (filterData.get("Categorieën") == culjson.features[index].attributes.categorie && filterData.get("postcodes") == "all" && filterData.get("straatnaam") == "") {
        addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == culjson.features[index].attributes.postcode && filterData.get("straatnaam") == "") {
        addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == culjson.features[index].attributes.categorie && filterData.get("postcodes") == culjson.features[index].attributes.postcode && filterData.get("straatnaam") == "") {
        addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == culjson.features[index].attributes.categorie && filterData.get("postcodes") == culjson.features[index].attributes.postcode && filterData.get("straatnaam").toUpperCase()  == culjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == "all" && filterData.get("straatnaam").toUpperCase() == culjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == "all" && filterData.get("postcodes") == culjson.features[index].attributes.postcode && filterData.get("straatnaam").toUpperCase()  == culjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
      }
      else if (filterData.get("Categorieën") == culjson.features[index].attributes.categorie && filterData.get("postcodes") == "all" && filterData.get("straatnaam").toUpperCase()  == culjson.features[index].attributes.straat.toUpperCase() ) {
        addlocation(culjson.features[index].geometry.y, culjson.features[index].geometry.x, culjson.features[index].attributes.naam, culjson.features[index].attributes.straat, culjson.features[index].attributes.huisnr, culjson.features[index].attributes.gemeente, culjson.features[index].attributes.postcode, culjson.features[index].attributes.email, culjson.features[index].attributes.telefoon, culjson.features[index].attributes.link);
      }
    }
  }
}

function addlocation(long, lat, naam, straat, huisnr, gemeente, postcode, email, telefoon, link) {
          //markers
          let list = document.getElementById("listSidenav");
          const marker = L.marker([long,lat],{icon: Icon}).addTo(map);
          marker.bindPopup("<br>" + gemeente + "<br>" +  "<b>" + naam + "</b>" + "<br>" + straat + " " + huisnr + "<br>" + postcode  + "<br>"  + `<button onclick="getRoute(${long}, ${lat})">Route</button>`)
          markers.push(marker);

          //lijst
          let listItem = document.createElement("li");
          let itemList = document.createElement("ul");
          let itemTitel = document.createElement("li");
          let itemContent =  document.createElement("li");
          itemTitel.innerHTML = "<b>" + naam + "</b>";
          itemContent.innerHTML = "locatie: "+ straat + " " + huisnr + "<br>" + postcode + " " + gemeente;
          if(email != undefined) {
            itemContent.innerHTML += `<br> e-mail: <a href = "mailto: ${email}">${email}</a>`;
          }
          if(telefoon != undefined) {
            itemContent.innerHTML += "<br> tel: " + telefoon 
          }
          if(link != undefined) {
            itemContent.innerHTML += `<br> link: <a href="${link}">${link}</a>`;
          }
          itemContent.innerHTML += `<br> <button onclick="getRoute(${long}, ${lat})">Route</button>`;

          itemList.appendChild(itemTitel);
          itemList.appendChild(itemContent);
          listItem.appendChild(itemList);
          list.appendChild(listItem);
}


window.addEventListener("load", getjson);
document.getElementById("filterForm").addEventListener("submit", getjson);


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