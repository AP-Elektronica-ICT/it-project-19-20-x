var map = L.map('map').setView([51.2171918, 4.4212529], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
}).addTo(map);

// for(var k in jsonData) {
//     console.log(jsonData.features[k].geometry.x);
// }
//console.log(jsonData.features[0].geometry.X);

async function getJSON_Data()
{
    const url ="/JSONdata";
    const response = await fetch(url);
    const json_Data = await response.json();
    return json_Data;
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
function Locaties(data)
{
    L.geoJSON(cultuurLocatieData,{onEachFeatures: function (feature, layer) {
        layer.bindPopup(feature[0].attributes.naam);
        L.marker([features[0].geometry.x, features[0].geometry.y]);
    }}).addTo(map);
}
/*
function erfgooedLocaties(data)
{
    L.geoJSON(data ,{onEachFeatures: function (feature, layer) {
        layer.bindPopup(feature.attributes.naam);
    }}).addTo(map);
}
*/
