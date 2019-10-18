const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

// database
const sequelize = require('./config/database');

const app = express();
// handlebars
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// index router
app.get('/',(req,res)=> res.render('index',{layout:'landing'}));
// testing db
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successful.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', (req,res)=> res.send('dasdada'))

// Gig routes 
app.use('/gigs', require('./routes/gigs'));
   
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server start here ${PORT}`)); 