const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://Lars:<APLabo>@oefeningenwebont-fdenf.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE = 'IT-Project-X';
const COLLECTION_DATABASE = 'Users';
var mongoose = require('mongoose');


mongoose.connect(uri, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});




function CheckUserExsist()
{

}