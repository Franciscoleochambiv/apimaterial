const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const crypto = require('crypto');


// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 100,
    host: 'adryan2.sytes.net',
    user: 'pancho',
    password: '12345678',
    port: 3306,    
    database: 'shopingweb'
});



async function grabacion(cadena){
  pool.getConnection((err, conn) => {
    conn.query (cadena, (err, customers) => {  
     if (err) {
       console.log(err);
        // res.json(err);
        return 1;
     }

     console.log(customers)

     // res.json(customers);
     conn.release();

   //  console.log("se ha grando");
     var mensaje="se hya grabado";

         return customers;

     
    //await  conn.close();
     //res.render('customers', {
      //   data: customers
     //});
 });

});

}



// Load User model
const User = require('../../models/User');

// @route GET api/users/test
// @desc  Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'Users works!'}));

// @route POST api/users/register
// @desc  Register
// @access Public



router.post('/register', async ( req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
 try {
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find if such email exists
    
      var name="'"+req.body.name+"'";
      var email="'"+req.body.email+"'"; 
      var serie="'"+req.body.serie+"'";
      var password="'"+req.body.password+"'";
      var bodega="'1'";
      var nivel="'1'";

			var npass="'"+crypto.createHash('md5').update(password).digest("hex")+"'";

			console.log(password);
			console.log(npass);



      var caden="Insert into usuarios(nombre,clave,password,bodega,nivel,Serie) value("+email+","+email+","+npass+","+bodega+","+nivel+","+serie+")";

//			console.log(caden);

      //"call insertaCategoria("+descripcion+");"
      //"Insert into Categorias(Categoria,descripcion) value ("+codigo+","+descripcion+")";


      var cadena5= await grabacion(caden);

      return (
      res.json(req.body)      
      );


}catch (error) {
    
      console.log(error);
}



});



// @route POST api/users/login
// @desc  Login User / Returning JWT Token
// @access Public
router.post('/login', async (req, res) => {


  
  passport.authenticate('jwt', { session: false }),
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;



  var npass="'"+crypto.createHash('md5').update(password).digest("hex")+"'";

    	console.log(npass);
     var cadena="'"+"select from usuarios  where nombre='"+email+"' and password="+npass+"'";
     console.log(cadena);



   pool.getConnection((err, conn) => {
       conn.query(cadena,(err,customer)=>{
			  if (err) {
				     res.json(err);
				}
				console.log(customer);
				res.json(customer);
				conn.release();
 
  			 });

     });
  });	


// @route GET api/users/current
// @desc  Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      serie: req.user.serie,
    });
  }
);

module.exports = router;
