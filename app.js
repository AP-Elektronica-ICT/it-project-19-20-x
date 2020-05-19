// Webserver Requires
const express = require('express');
const fetch = require('node-fetch');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

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

//load apidata
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

//contact email
app.post('/send-email', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "opdrachtcms.ap@gmail.com",
      pass: "APLabo12"
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: 'Your sender info here',
    to: "opdrachtcms.ap@gmail.com",
    subject: 'New message from contact form',
    text: `${req.body.firstname} (${req.body.lastname}) says: ${req.body.subject}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
  })
})

app.listen(app.get('port'), () => {
  console.log(`Express Started on http://localhost:${
    app.get('port')}; press Ctrl-c to terminate.`);
});