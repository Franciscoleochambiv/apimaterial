const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");
//const 

const {escribirdata,lectura }= require('./t1back.js');


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








router.get("/sunat/:id", async  (req, res) => {
  let codigo=req.params.id;
  console.log(req.body);

   const request = require('request').defaults({jar: true});
   const cheerio = require('cheerio');
   const clean   = str => str.replace(/\s+/g, ' ');
   const urlCode = 'http://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/captcha?accion=random';
   const urlPost = 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias';
   const datos={};
   const data3={}

   const ruc = codigo;
    request(urlCode, async (err, response, code)=> {
    const formData = {
      nroRuc:ruc, 
      accion:'consPorRuc', 
      numRnd: code
    };
   request.post({url:urlPost, form: formData}, async (err, response, body)=>{ 
      if (!err && response.statusCode == 200) {
        const $ = cheerio.load(body);
        
        const $table = $(".form-table").eq(2);
        //response.json($table);
        $table.find('tr').each((i, el)=>{
          const a = $(el).find('td[colspan=1]');
          const b = $(el).find('td[colspan=3]');
       ///   console.log(clean(a.text()),'...', clean(b.text()));

       //   console.log("nos muestra el");

        //  console.log(clean(a.text()));

          data3[clean(a.text())]  = clean(b.text());    

          Object.assign(datos,data3);


          //data=[clean(a.text())]
        });



     const valor2=await escribirdata(codigo+".txt",JSON.stringify(datos));

        console.log(datos)
      //response.json(datos);


       // return ;
      }
      console.log('error fetch ruc');
    });
    

   

    //console.log(info.datos)



  });

  const valor3=await lectura(codigo+".txt");
  console.log(valor3)

  
  res.json(datos)

  
});





router.get("/viewsql", (req, res) => {
  // passport.authenticate("jwt", { session: false }),
   console.log(req.body);
   pool.getConnection((err, conn) => {
     conn.query('SELECT PVCL_Id as codigo,PVCL_RazonSocial as descripcion,PVCL_Tipo,PVCL_Titular,PVCL_Direccion,PVCL_Direccion2,PVCL_Direccion3,DI_Id,PVCL_NroDocIdentidad,PVCL_Telefono,PVCL_Email,PVCL_FecIngreso,PVCL_LineaCredito,PVCL_Descuento from cpvarios order by PVCL_Id DESC', (err, customers) => {
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



 router.post("/addclientesql", async (req, res) => {
  //const { id,  amount } = req.body;
  console.log(req.body);
  try {


      var codigo="'"+req.body.codigo+"'";
      var descripcion= "'"+req.body.descripcion+"'";

      var PVCL_Tipo="'"+req.body.tipo+"'";
     
      var PVCL_Titular="'"+req.body.titular+"'";
      var PVCL_Direccion="'"+req.body.direccion+"'";
      var PVCL_Direccion2="'"+req.body.direccion2+"'";
      var PVCL_Direccion3="'"+req.body.direccion3+"'";
      var DI_Id="'"+req.body.tipodoc+"'";
      var PVCL_NroDocIdentidad="'"+req.body.ndoc+"'";
      var PVCL_Telefono="'"+req.body.telefono+"'";
      var PVCL_Email="'"+req.body.email+"'";
      var PVCL_FecIngreso="'"+req.body.fecha+"'";

      
      var caden="Insert into cpvarios(PVCL_Id,PVCL_RazonSocial,PVCL_Tipo,PVCL_Titular,PVCl_Direccion,PVCl_Direccion2,PVCL_Direccion3,DI_Id,PVCL_NroDocIdentidad,PVCL_Telefono,PVCL_Email,PVCL_FecIngreso ) values ("+codigo+","+descripcion+","+PVCL_Tipo+","+PVCL_Titular+","+PVCL_Direccion+","+PVCL_Direccion2+","+PVCL_Direccion3+","+DI_Id+","+PVCL_NroDocIdentidad+","+PVCL_Telefono+","+PVCL_Email+","+PVCL_FecIngreso+")";
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

   var caden="DELETE FROM cpvarios WHERE PVCL_Id ="+id;
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

    var PVCL_Tipo="'"+req.body.tipodoc+"'";
   
    var PVCL_Titular="'"+req.body.titular+"'";
    var PVCL_Direccion="'"+req.body.direccion+"'";
    var PVCL_Direccion2="'"+req.body.direccion2+"'";
    var PVCL_Direccion3="'"+req.body.direccion3+"'";
    var DI_Id="'"+req.body.DI_Id+"'";
    var PVCL_NroDocIdentidad="'"+req.body.nidentidad+"'";
    var PVCL_Email="'"+req.body.email+"'";
    var PVCL_Telefono="'"+req.body.telefono+"'";    
    var PVCL_FecIngreso="'"+req.body.fechaingreso+"'";

///    var caden="UPDATE  almacenes SET AL_Descripcion="+descripcion+","+"empresa="+empresa+","+"direccion="+direccion+","+"provincia="+provincia+","+"ciudad="+ciudad+","+"distrito="+distrito+","+"tel="+tel+"  WHERE AL_Id ="+codigo;
     var caden="UPDATE cpvarios SET PVCL_RazonSocial= "+descripcion+","+"PVCL_Tipo="+PVCL_Tipo+","+"PVCL_Titular="+PVCL_Titular+","+"PVCL_Direccion="+PVCL_Direccion+","+"PVCL_Direccion2="+PVCL_Direccion2+","+"PVCL_direccion3="+PVCL_Direccion3+","+"DI_Id="+DI_Id+","+"PVCL_NroDocIdentidad="+PVCL_NroDocIdentidad+","+"PVCL_Email="+PVCL_Email+","+"PVCL_Telefono="+PVCL_Telefono+","+"PVCL_FecIngreso=now() "+"  WHERE PVCL_Id ="+codigo;




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
