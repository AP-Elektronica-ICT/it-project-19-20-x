
const express = require('express');
const fetch = require('fetch');
const ejs = require('ejs');

const app = express();
app.get('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1=1&outFields=*&outSR=4326&f=json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // jsonData = JSON.stringify(data);
    app.get('/', (req,res) => {
      res.render('index', {'jsonData': JSON.stringify(data)})
      });
  });


app.listen(app.get('port'), () =>
{
  console.log(`Express Started on http://localhost:${
    app.get('port')}; press Ctrl-c to terminate.`);
});