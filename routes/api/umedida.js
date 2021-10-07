const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");
//const 

const mysql = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 100,
    host: 'adryan3.sytes.net',
    user: 'pancho1',
    password: '12345678',
    port: 3306,    
    database: 'chaquilla'
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



//llamadas a  mysql

router.get("/viewsql", (req, res) => {
  // passport.authenticate("jwt", { session: false }),
   console.log(req.body);
   pool.getConnection((err, conn) => {
     conn.query('SELECT UM_ID as codigo,UM_Descripcion as descripcion FROM UnidadesMedida order by UM_ID DESC', (err, customers) => {
         if (err) {
             res.json(err);
         }
 
         res.json(customers);
         conn.release();
         //res.render('customers', {
          //   data: customers
         //});
     });
   });  
 });



 router.post("/addumedidasql", async (req, res) => {
  //const { id,  amount } = req.body;
  console.log(req.body);
  try {

      var codigo="'"+req.body.codigo+"'";
      var descripcion= "'"+req.body.descripcion+"'";
      
      var caden="Insert into UnidadesMedida(UM_ID,UM_Descripcion) value ("+codigo+","+descripcion+")";
      //"call insertaCategoria("+descripcion+");"
      //"Insert into Categorias(Categoria,descripcion) value ("+codigo+","+descripcion+")";
      var cadena5= await grabacion(caden);
      console.log("cadena 5")

      console.log(cadena5)
  
      return (
      res.json(req.body)      
      );

    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message
      });
    }
 
});



router.delete(
  "/viewsql/:id",
  //passport.authenticate("jwt", { session: false }),
 async  (req, res) => {
   // console.log(res)
   var id=req.params.id;

   var caden="DELETE FROM UnidadesMedida WHERE UM_ID ="+id;
   var caedna5= await grabacion(caden);
   return (
    res.json(req.body)      
    );



  }
)


router.put(
  "/viewsql/:id",
 // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
     

    console.log("datos obtenidos a la api ")
    //console.log(req.body.id)
    console.log(req.body.codigo)
    console.log(req.body.descripcion)

    console.log (req.body.codigo)
   // id=req.body.id;
    codigo=req.body.codigo;
    descripcion="'"+req.body.descripcion+"'";

    var caden="UPDATE  UnidadesMedida SET UM_Descripcion="+descripcion+" "+ " WHERE UM_ID ="+codigo;

    console.log(caden);
    var caedna5= await grabacion(caden);
    return (
     res.json(req.body)      
     );



/*
    Tdocumento.findOne({ _id: req.params.id })
    .then(tiposfile =>
          {


             console.log("actualizando el archivos verifica que este llegando la peticions") 
           const myquery = {_id: req.params.id };
           const newvalues = { $set: {codigo: req.body.codigo,descripcion:req.body.descripcion}};
            Tdocumento.updateMany(myquery,newvalues) 
            .then(tiposfile => res.json(tiposfile));
            console.log("resultado del array")
            console.log(tiposfile) 
           }
      )
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));

    */
    
    
  }
)






module.exports = router;
