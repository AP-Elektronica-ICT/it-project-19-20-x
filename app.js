const express = require('express');
const fetch = require('node-fetch');
const ejs = require('ejs');

//API fetch
let jsonData;

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

async function JSON_Data()
{
  // Cultuurlocaties
  fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    cultuurData = JSON.stringify(data);
    app.get('/', (req,res) => {
      res.render('index', {'jsonData': JSON.stringify(data)})
      });
  });

  //Erfgoedlocaties
  fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/293/query?where=1%3D1&outFields=*&outSR=4326&f=json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    erfgoedData = JSON.stringify(data);
    app.get('/', (req,res) => {
      res.render('index', {'jsonData': JSON.stringify(data)})
      });
  });
}



app.listen(app.get('port'), () => 
{
  console.log(`Express Started on http://localhost:${
    app.get('port')}; press Ctrl-c to terminate.`);
    JSON_Data();
});


// Cultuurlocatie Link
// https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json

// Erfgoedlocatie link
//https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/293/query?where=1%3D1&outFields=*&outSR=4326&f=json





/*
fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1=1&outFields=*&outSR=4326&f=json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    jsonData = JSON.stringify(data);
    console.log(jsonData);
    app.get('/', (req,res) => {
      res.render('index', {'jsonData': JSON.stringify(data)})
      });
  });

*/