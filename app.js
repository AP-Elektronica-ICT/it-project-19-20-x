// Webserver Requires
const express = require('express');
const fetch = require('node-fetch');
const ejs = require('ejs');
//Requires  voor Database
const {
  MongoClient
} = require('mongodb');
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


app.get('/', (req, res) => {
  res.render('index')
});


// Views voor de andere paginas
// Contact pagina
app.get('/contact', (req, res) => {
  res.render('contact')
});
// Login pagina
app.get('/login', (req, res) => {
  res.render('login')
});

async function apistart() {
  const erfUrl = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/293/query?where=1=1&outFields=*&outSR=4326&f=json";
  const erfResponse = await fetch(erfUrl);
  const erfjson = await erfResponse.json();

  const culurl = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const culresponse = await fetch(culurl);
  const culjson = await culresponse.json();

  //erfgoed data
  app.get('/jsonerfgoed', async (req, res) => {
    res.json(erfjson);
  });

  //cultuur data
  app.get('/jsoncultuur', async (req, res) => {
    res.json(culjson);
  });
}

apistart();

app.listen(app.get('port'), () => {
  console.log(`Express Started on http://localhost:${
    app.get('port')}; press Ctrl-c to terminate.`);
});

// Database Code
/*
app.post('/signup', function (req,res,next)
{
  let user =
  {
    Name: req.body.name,
       Email: req.body.email,
       Pass: req.body.pass,
  };

  var UserReg = mongoose.model('UserReg', UserSchema);
   UserReg.create(user, function(err, newUser) {
      if(err) return next(err);
      req.session.user = email;
      return res.send('Logged In!');
   });

});

mongoose.connect(uri, {useUnifiedTopology: true ,useNewUrlParser: true } );

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

let Schema = mongoose.Schema;

// Schema
let UserRegSchema = mongoose.Schema
({
  Name: String,
  Email: String,
  Pass: String,
  Num: Number,
  Favourites: 
      [{ 
        objID: Number
      }]
});

// Model
let UserReg = mongoose.model('UserReg', UserRegSchema);

// Add in collection
let UserAdd = new UserReg({
  Name: req.body.name,
  Email: req.body.email,
  Password: req.body.pass,
});

// Save
UserAdd.save(function (err, fluffy) {
  if (err) return console.error(err);
});

function CheckUserExsist(givenUserName)
{
  UserSchema.findOne({userName: givenUserName})

}

*/