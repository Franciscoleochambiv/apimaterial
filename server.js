const express = require('express');
const fs = require("fs");
//const https = require("https");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const morgan =  require("morgan");


const https = require("https");


const mysql = require('mysql');

const myConnection = require('express-myconnection');



const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const shoping1 = require("./routes/api/shoping1");

const categoria =require("./routes/api/categoria");
const tipo =require("./routes/api/tipo");

const serie =require("./routes/api/serie");

const umedida =require("./routes/api/umedida");
const linea =require("./routes/api/linea");
const almacen =require("./routes/api/almacen");
const clientes =require("./routes/api/clientes");
const articulos =require("./routes/api/articulos");

const productos =require("./routes/api/productos");


const upload =require("./routes/api/upload");

const { join } = require('path');
//const Productos = require('./models/Productos');



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
//    : "mongodb+srv://sopadecaracol1:sopadecaracol1@cluster0.twipn.mongodb.net/";
//     : "mongodb://164.90.141.25/";
      : "mongodb+srv://sopadecaracol1:sopadecaracol1@cluster0.cnmg4.mongodb.net/";

  mongoose.connect(URI, {
    dbName:'ventapos',
    useNewUrlParser: true,
    useFindAndModify :false,
    useCreateIndex: true,
    autoIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

///////////////////////////////////////////////////////////



//saatabases
// middlewares

app.use(morgan('dev'));


/*
app.use(myConnection(mysql, {
//    host: 'mysql-12180-0.cloudclusters.net',
    host: 'adryan2.sytes.net',
    user: 'pancho',
    password: '12345678',
   // port: 12180,
    port: 3306,    
    database: 'shopingweb'
}, 'single'));

*/

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
app.use("/api/tipo", tipo);

app.use("/api/serie", serie);


app.use("/api/umedida", umedida);
app.use("/api/linea", linea);
app.use("/api/almacen", almacen);

app.use("/api/clientes", clientes);
app.use("/api/articulos", articulos);


app.use("/api/upload", upload);

app.use("/api/productos", productos);

// Serve static assets if in production





///confioracion  para el https 


const httpsOptions = {
   cert:fs.readFileSync(path.join(__dirname,'ctr','cert2.pem')),
   key:fs.readFileSync(path.join(__dirname,'ctr','privkey2.pem'))
}

const port = process.env.PORT || 7001;

/*

https.createServer(httpsOptions,app)
  .listen(port,function(){
   console.log(`Server running on port https ${port}`)      
      })

      





const port = process.env.PORT || 3001;



*/
app.listen(port, () => console.log(`Server running on port ${port}`));



//app.listen(port, () => console.log(`Server running on port ${port}`));
