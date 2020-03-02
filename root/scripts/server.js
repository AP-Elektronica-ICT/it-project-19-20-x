const http = require('http');
const express = require('express');
const app = express();
const request = require('request');
const fetch = require('node-fetch');

app.set('port', process.env.PORT || 1337);

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost/:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
    });


// Fetching all data from GEOJSON, Filtering should be added later on
fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json')
.then(function(response){
    return response.json();
})
.then(function(json){
    console.log(json);
});




