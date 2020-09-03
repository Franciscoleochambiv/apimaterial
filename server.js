const express = require('express');
const fs = require("fs");
//const https = require("https");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const morgan =  require("morgan");


const mysql = require('mysql');

const myConnection = require('express-myconnection');



const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const shoping1 = require("./routes/api/shoping1");
const categoria =require("./routes/api/categoria");
const { join } = require('path');



const app = express();
app.use(morgan('dev'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});






/*
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization"
 );
 if (req.method==='OPTIONS'){
   res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
   return res.status(200).json({});
 }
 next();
});

*/






///////////////////////////////////////////////

/*

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
*/


const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : "mongodb+srv://sopadecaracol1:sopadecaracol1@cluster0.twipn.mongodb.net/";

  mongoose.connect(URI, {
    dbName:'mama',
    useNewUrlParser: true,
    useFindAndModify :false,
    useCreateIndex: true,
    autoIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

///////////////////////////////////////////////////////////




// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'mysql-12180-0.cloudclusters.net',
    user: 'fran',
    password: '12345678',
    port: 12180,
    database: 'serapio'
}, 'single'));



/*

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'adryan2.sytes.net',
    user: 'lolo5',
    password: '12345678',
    port: 3306,
    database: 'serapio'
}, 'single'));


*/


/////////////////////////////////////////////////////////



// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport.js')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.use("/api/shoping1", shoping1);

app.use("/api/categoria", categoria);

// Serve static assets if in production





///confioracion  para el https 

/*
const httpsOptions = {
   cert:fs.readFileSync(path.join(__dirname,'ctr','cert1.pem')),
   key:fs.readFileSync(path.join(__dirname,'ctr','privkey1.pem'))
}

const port = 5000;

https.createServer(httpsOptions,app)
  .listen(port,function(){
   console.log(`Server running on port https ${port}`)      
      })

 */     



const port = process.env.PORT || 3001;




app.listen(port, () => console.log(`Server running on port ${port}`));




//app.listen(port, () => console.log(`Server running on port ${port}`));
