const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");


const mysql = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 100,
    host: 'adryan3.sytes.net',
    user: 'pancho1',
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



//llamadas a  mysql

router.get("/viewsql", (req, res) => {
  // passport.authenticate("jwt", { session: false }),
   console.log(req.body);
   pool.getConnection((err, conn) => {
     conn.query('SELECT  id,codigo, descripcion,costo,precio,proveedor,linea,grupo,imagen,codigostock,fecha_cad,precio1,precio2,stockm,UM_ID,detalle from articulos order by id DESC', (err, customers) => {
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



 router.post("/addarticulosql", async (req, res) => {
  //const { id,  amount } = req.body;
  console.log(req.body);
  try {


      var codigo="'"+req.body.codigo+"'";
      var descripcion= "'"+req.body.descripcion+"'";

      var costo="'"+req.body.costo+"'";
     
      var precio="'"+req.body.precio+"'";
      var proveedor="'"+req.body.proveedor+"'";
      var linea="'"+req.body.linea+"'";
      var grupo="'"+req.body.grupo+"'";
      var imagen="'"+req.body.imagen+"'";
      var codigostock="'"+req.body.codigostock+"'";
      var fecha_cad="'"+req.body.fecha_cad+"'";
      var precio1="'"+req.body.precio1+"'";
      var precio2="'"+req.body.precio2+"'";
      var stockm="'"+req.body.stockm+"'";
      var UM_ID="'"+req.body.UM_ID+"'";
      var detalle="'"+req.body.detalle+"'";

      
      var caden="Insert into articulos(codigo,descripcion,costo,precio,proveedor,linea,grupo,imagen,codigostock,fecha_cad,precio1,precio2,stockm,UM_ID,detalle) values ("+codigo+","+descripcion+","+costo+","+precio+","+proveedor+","+linea+","+grupo+","+imagen+","+codigostock+","+fecha_cad+","+precio1+","+precio2+","+stockm+","+UM_ID+","+detalle+")";
      //"call insertaCategoria("+descripcion+");"
      //"Insert into Categorias(Categoria,descripcion) value ("+codigo+","+descripcion+")";
      var caden2="insert into existencias(codigo,cantidad,cantidad2,cantidad3,cantidad4) values ("+codigo+",'0','0','0','0')";
      var caden3="insert into existencias1(codigo,cantidad) values ("+codigo+",'0')";   

      var cadena5= await grabacion(caden);
      var cadena6= await grabacion(caden2);
      var cadena7= await grabacion(caden3);



      console.log("cadena 5")

      console.log(caden)
  
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
   var id="'"+req.params.id+"'";

   var caden="DELETE FROM articulos WHERE codigo ="+id;
   var caden1="DELETE FROM existencias WHERE codigo ="+id;
   var caden2="DELETE FROM existencias1 WHERE codigo ="+id;
   
   var caedna5= await grabacion(caden);
   var caedna6= await grabacion(caden1);
   var caedna7= await grabacion(caden2);

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
/*

    codigo: 2198, 
    descripcion: "POLICLINICO FRAY MARTIN DE PORRAS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA", 
    tipodoc: "C", 
    titular: "POLICLINICO FRAY MARTIN DE PORRAS SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA",
    direccion: "- - - Paucarpata AREQUIPA", 
    direccion2: "- - - Paucarpata AREQUIPA", 
    direccion3: "- - - Paucarpata AREQUIPA", 
    DI_Id: 1, 
    nidentidad: "20602781381",
     email: "poolmij@gmail.com",

*/
    console.log (req.body.codigo)


    
    console.log(req.body);

   // id=req.body.id;
    codigo=req.body.codigo;

    var codigo="'"+req.body.codigo+"'";
    var descripcion= "'"+req.body.descripcion+"'";

    var costo="'"+req.body.costo+"'";
     
    var precio="'"+req.body.precio+"'";
    var proveedor="'"+req.body.proveedor+"'";
    var linea="'"+req.body.linea+"'";
    var grupo="'"+req.body.grupo+"'";
    var imagen="'"+req.body.imagen+"'";
    var codigostock="'"+req.body.codigostock+"'";
    var fecha_cad="'"+req.body.fecha_cad+"'";
    var precio1="'"+req.body.precio1+"'";
    var precio2="'"+req.body.precio2+"'";
    var stockm="'"+req.body.stockm+"'";
    var UM_ID="'"+req.body.UM_ID+"'";
    var detalle="'"+req.body.detalle+"'";


///    var caden="UPDATE  almacenes SET AL_Descripcion="+descripcion+","+"empresa="+empresa+","+"direccion="+direccion+","+"provincia="+provincia+","+"ciudad="+ciudad+","+"distrito="+distrito+","+"tel="+tel+"  WHERE AL_Id ="+codigo;
     var caden="UPDATE articulos SET descripcion= "+descripcion+","+"costo="+costo+","+"precio="+precio+","+"proveedor="+proveedor+","+"linea="+linea+","+"grupo="+grupo+","+"imagen="+imagen+","+"codigostock="+codigostock+","+"fecha_cad="+fecha_cad+","+"precio1="+precio1+","+"precio2="+precio2+","+"stockm="+stockm+","+"UM_ID="+UM_ID+","+"detalle="+detalle +"  WHERE codigo="+codigo;




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
