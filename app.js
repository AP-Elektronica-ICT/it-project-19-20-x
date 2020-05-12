// Webserver Requires
const express = require('express');
const fetch = require('node-fetch');
const ejs = require('ejs');
//Requires  voor Database
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://Lars:APLabo@oefeningenwebont-fdenf.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE = 'IT-Project-X';
const COLLECTION_DATABASE = 'Users';
var mongoose = require('mongoose');

let dataCultuur;
let dataErfgoed;

//API fetch
let jsonData;

const app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


  app.get('/', (req,res) => {
    res.render('index')});
  

// Views voor de andere paginas
// Contact pagina
app.get('/contact', (req,res) => 
{
  res.render('contact')
});
// Login pagina
app.get('/login', (req,res) => 
{
  res.render('login')
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


app.listen(app.get('port'), () =>
{
  console.log(`Express Started on http://localhost:${
    app.get('port')}; press Ctrl-c to terminate.`);
});


// Database Code

mongoose.connect(uri, {useUnifiedTopology: true ,useNewUrlParser: true } );

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

let Schema = mongoose.Schema;

  let UserSchema = new Schema({
    _id: Number,
    userName:  String,
    Password: String,
    Email:   String,
    Favourites: 
      [{ 
        objID: Number
      }],
  });




function CheckUserExsist(givenUserName)
{
  UserSchema.findOne({userName: givenUserName})

}