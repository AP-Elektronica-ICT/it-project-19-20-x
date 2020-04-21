const express = require('express');
const fetch = require('node-fetch');
const ejs = require('ejs');

let dataCultuur;
let dataErfgoed;

//API fetch
let jsonData;

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

async function JSON_Data()
{
  // Cultuurlocaties
  const responseCultuur = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json');
  dataCultuur = await responseCultuur.json();
  dataCultuur = JSON.stringify(dataCultuur);

  //Erfgoedlocaties
  const responseErfgoed = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/293/query?where=1%3D1&outFields=*&outSR=4326&f=json');
  dataErfgoed = await responseErfgoed.json();
  dataErfgoed = JSON.stringify(dataErfgoed);

  return [dataCultuur, dataErfgoed];
}

app.get('/', (req,res) => {
  res.render('index', {'jsonData': dataCultuur, 'jsonData2': dataErfgoed})

      //return [dataCultuur, dataErfgoed];

});

app.get('/contact', (req,res) => 
{
  res.render('contact')
});






//erfgoed data
app.get('/jsonerfgoed', async (req,res) => {
const erfUrl = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/293/query?where=1=1&outFields=*&outSR=4326&f=json";
const fetchResponse = await fetch(erfUrl);
const json = await fetchResponse.json();
res.json(json);

});

//cultuur data
app.get('/jsoncultuur', async (req,res) => {
  const url = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const response = await fetch(url);
  const json = await response.json();
  res.json(json);
  
  });















// Proxy om data naar mapScript te sturen
app.get("/JSONdata", (request, response) =>
{
  JSON_Data().then(dataCultuur =>
  {
    response.json(data);
  });
});



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
 // Cultuurlocaties
 const responeCultuur = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json')
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
 const responeErfgoed = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/293/query?where=1%3D1&outFields=*&outSR=4326&f=json')
 .then((response) => {
   return response.json();
 })
 .then((data) => {
   erfgoedData = JSON.stringify(data);
   app.get('/', (req,res) => {
     res.render('index', {'jsonData': JSON.stringify(data)})
     });
 });

 */
