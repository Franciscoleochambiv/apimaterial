const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");
const  Stripe= require("stripe"); 


const nodemailer = require('nodemailer');


const validateTipoInput = require("../../validation/shoping1.js");
//const validateLoginInput = require("../../validation/login.js");

const Tdocumento = require("../../models/Shoping1");
const mysql = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 100,
    host: 'adryan3.sytes.net',
    user: 'pancho1',
    password: '12345678',
    port: 3306,    
    database: 'shopingweb'
});



var pool1  = mysql.createPool({
  connectionLimit : 100,
  host: 'adryan2.sytes.net',
  user: 'pancho',
  password: '12345678',
  port: 3306,    
  database: 'nodetest'
});



var pool2  = mysql.createPool({
  connectionLimit : 100,
  host: 'adryan2.sytes.net',
  user: 'pancho',
  password: '12345678',
  port: 3306,    
  database: 'importacion'
});



function mathRound2 (num, decimales = 2) {
  //Respuesta de Rubén modificada por mí para el caso general y números negativos
  var exponente = Math.pow(10, decimales);
  return (num >= 0 || -1) * Math.round(Math.abs(num) * exponente) / exponente;
}






async function grabacion(cadena){

       //   console.log(cadena4);


       //var cadena5="Insert into DocVentaCabweb(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto,DVC_Nombre,DVC_Direccion,DVC_Telefono,DVC_Descripcion,DVC_Precio,DVC_Cantidad) VALUES ('1','tok_1HRcUSF6gyyMYSrKMishtZev',now(),now(),'5','1','0','CONTADO','web','0','0','1','1','0','0','0','1','francocalle molsd',269.99,228.81,41.18,'franco','calle molsd','','GABIENTE MICRONICS TARTARO - FNT 8005',120,1);Insert into DocVentaCabweb(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto,DVC_Nombre,DVC_Direccion,DVC_Telefono,DVC_Descripcion,DVC_Precio,DVC_Cantidad) VALUES ('1','tok_1HRcUSF6gyyMYSrKMishtZev',now(),now(),'5','1','0','CONTADO','web','0','0','1','1','0','0','0','1','francocalle molsd',269.99,228.81,41.18,'franco','calle molsd','','GAMER MACHINE CONCORDE - MIC C813',150,1);";

       
      


       pool.getConnection((err, conn) => {
         conn.query (cadena, (err, customers) => {  
          if (err) {
            console.log(err);
             // res.json(err);
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






  async function grabacion1(cadena){

    //   console.log(cadena4);


    //var cadena5="Insert into DocVentaCabweb(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto,DVC_Nombre,DVC_Direccion,DVC_Telefono,DVC_Descripcion,DVC_Precio,DVC_Cantidad) VALUES ('1','tok_1HRcUSF6gyyMYSrKMishtZev',now(),now(),'5','1','0','CONTADO','web','0','0','1','1','0','0','0','1','francocalle molsd',269.99,228.81,41.18,'franco','calle molsd','','GABIENTE MICRONICS TARTARO - FNT 8005',120,1);Insert into DocVentaCabweb(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto,DVC_Nombre,DVC_Direccion,DVC_Telefono,DVC_Descripcion,DVC_Precio,DVC_Cantidad) VALUES ('1','tok_1HRcUSF6gyyMYSrKMishtZev',now(),now(),'5','1','0','CONTADO','web','0','0','1','1','0','0','0','1','francocalle molsd',269.99,228.81,41.18,'franco','calle molsd','','GAMER MACHINE CONCORDE - MIC C813',150,1);";
   


    pool1.getConnection((err, conn) => {
      conn.query (cadena, (err, customers) => {  
       if (err) {
         console.log(err);
          // res.json(err);
       }

       console.log(customers)

       // res.json(customers);
       conn.release();

     //  console.log("se ha grando");
       var mensaje="se hya grabado";

           return mensaje;

       
      //await  conn.close();
       //res.render('customers', {
        //   data: customers
       //});
   });

 });

 

}











//var  cadena4   =  await sumacadena(data,idfinal,obser,monto,vventa1,igv,nombre,dire,tele); 

 async function sumacadena(data,idfinal,obser,monto,vventa1,igv,nombre,dire,tele,dni,email){
    
   var descripcion="";
   var pre=0;
   var cant=0;
   var cadena="";
   var cadena3="";

  for(var atr in data){
           
    descripcion ="'"+data[atr].descripcion+"'";
    codigo="'"+data[atr].codigo+"'";

    pre=data[atr].precio;
    cant=data[atr].quantity;

    


     cadena= "Insert into DocVentaCabweb(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto,DVC_Nombre,DVC_Direccion,DVC_Telefono,DVC_Descripcion,DVC_Precio,DVC_Cantidad,DVC_Codigo,DVC_Dni,DVC_Email) VALUES ('1',"+idfinal+",now(),now(),'5','1','0','CONTADO','web','0','0','1','1','0','0','0','1',"+obser+","+monto+","+vventa1+","+igv+","+nombre+","+dire+","+tele+","+descripcion+","+pre+","+cant +","+codigo+","+dni+","+email +");";    

     var  cadena5   =  await grabacion(cadena); 
    
  }

   return cadena;

}





async function sumacabecera(data,idfinal,obser,monto,vventa1,igv,nombre,dire,tele,dni,email,idcliente,age,serie){
    
  var descripcion="";
  var pre=0;
  var cant=0;
  var cadena="";
  var cadena3="";

    cadena= "Insert into DocVentaCab(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto) VALUES ("+serie+","+idfinal+",now(),now(),"+age+","+idcliente +",'0','CONTADO','web','0','0','1','1','0','0','0','1',"+obser+","+monto+","+vventa1+","+igv+");";    
    var  cadena5   =  await grabacion(cadena); 

 for(var atr in data){
          
   descripcion ="'"+data[atr].descripcion+"'";
   codigo="'"+data[atr].codigo+"'";

   pre=data[atr].precio;
   cant=data[atr].quantity;


   //cadena= "Insert into DocVentadET(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto) VALUES ('8',"+idfinal+",now(),now(),'1','1','0','CONTADO','web','0','0','1','1','0','0','0','1',"+obser+","+monto+","+vventa1+","+igv+");";    
    //var  cadena5   =  await grabacion(cadena); 

   


    
   
 }

  return cadena;

}


async function sumadetalle(id,data,idfinal,serie){
    
  var descripcion="";
  var pre=0;
  var cant=0;
  var costo=0;
  var saldo=0;
  var cadena="";
  var cadena3="";



  var tdoc1='1';



    //cadena= "Insert into DocVentaCab(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente,DVC_Observaciones,DVC_Total,DVC_Subtotal,DVC_Impuesto) VALUES ('8',"+idfinal+",now(),now(),'1','1','0','CONTADO','web','0','0','1','1','0','0','0','1',"+obser+","+monto+","+vventa1+","+igv+");";    
    //var  cadena5   =  await grabacion(cadena); 

    console.log("estamos en la opcion de grabacion linea por linea")
    console.log(id)
    console.log(data)

 for(var atr in data){

   idpro="'"+data[atr].id+"'";       
   descripcion ="'"+data[atr].descripcion+"'";
   codigo="'"+data[atr].codigo+"'";


   console.log("item x item ")
   console.log(codigo)

   pre=data[atr].precio;
   cant=data[atr].quantity;

   costo=data[atr].costo;

   totalitem=(mathRound2(pre*cant)).toFixed(2);
   




   cadena= "Insert into DocVentadet(DVC_Id,id,ALM_Id,DVD_Cantidad,DVD_PrecioUnitario,DVD_TotalItem,DVD_Unidad,DVD_ValorVenta,DVD_Descuento,DVD_Item,DVD_U) VALUES ("+id+","+idpro+",'1',"+cant+","+ pre+","+totalitem+","+ "'NIU'"+",0,0,0,'0'"+ ");";    
   var  cadena5   =  await grabacion(cadena); 


   var cadena2="Insert into kardex(codigo,cantidad,tipo,fecha,user,costou,proveedor,descuento_porcentaje,impuesto_porcentaje,serie,numero,fecha_proceso,referencia,referencia1,referencia2,tdoc,Alm_id,Empresa,Alm_Des) values("+codigo+","+cant+","+"'STCO'"+",now()"+",'web',"+costo+","+"1,'0','0',"+serie+","+idfinal+",now(),'1','','',"+ tdoc1+",'1','1'"+",'1'"+ ")";

   console.log(cadena2)
  var rcadena2= await grabacion(cadena2); 

var saldocade="Update existencias set cantidad=cantidad-"+cant+" where codigo="+codigo;

console.log(saldocade)

var rsaldo= await grabacion(saldocade); 

  // console.log(rcadena2[0])



 }

  return cadena;

}
















router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
       console.log(req.body);
      
       const { errors, isValid } = validateTipoInput(req.body);

   if (!isValid) {
      
     console.log(errors)
       return res.status(400).json(errors);
      //.then(res=> res.json());
      //.then(data => console.log(data));
    }

    const addtdoc = new Tdocumento({

      id: req.body.id,
      name: req.body.name,
      category:req.body.category,
      price: req.body.price,
      description: req.body.description,
      popular: req.body.popular,
      imageUrls:req.body.imageUrls
      
      
        
        
        //descripcion:req.body.descripcion,codigo:req.body.codigo
    
    });
    addtdoc.save().then(tipo1 => res.json(tipo1));


   
    });



   
router.get("/view", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);
  Tdocumento.find().sort({_id: -1})
   // .sort({ date: -1 })
    .then(tdocu => res.json(tdocu))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});



///////////////////////////////////////////////////////////////////////////////////////////////////

//EMPEZAMOS A LLAMAR  ALAS RUTINAS DE SHOPING VENTA EN LINEA 

///////////////////////////////////////////////////////////////////////////////////////////////////

/*
router.get("/view2", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);
  req.getConnection((err, conn) => {
    conn.query('select  * FROM tec_blog', (err, customers) => {
        if (err) {
            res.json(err);
        }

        res.json(customers);
        //res.render('customers', {
         //   data: customers
        //});
    });
});  
});



pool.getConnection(function(err, connection){
if(err){
    return cb(err);
}
connection.changeUser({database : "firm1"});
connection.query("SELECT * from history", function(err, data){
    connection.release();
    cb(err, data);
});
});

*/

router.get("/productos", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);




  pool.getConnection((err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {
    conn.query('select articulos.id,articulos.costo,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,articulos.detalle,Categorias.descripcion as categoria,articulos.precio from articulos inner join Categorias on Categorias.Categoria=articulos.grupo order by articulos.descripcion ', (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
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



router.get("/producto", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);
  pool.getConnection((err, conn) => {
    conn.query('select articulos.id,articulos.codigo,articulos.imagen, articulos.descripcion,Categorias.descripcion as category,articulos.detalle,articulos.precio from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo', (err, customers) => {  
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






  router.get("/categorias", (req, res) => {

   // passport.authenticate("jwt", { session: false }),
    console.log(req.body);
    pool.getConnection((err, conn) => {
      conn.query('SELECT * FROM Categorias order by  descripcion', (err, customers) => {

      
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









////////////////////////////////////////////////////////////////////////////////////////////////








router.delete(
  "/view/:id",

 // passport.authenticate("jwt", { session: false }),




 
  (req, res) => {



   // console.log(res)
    Tdocumento.findOne({ _id: req.params.id })
    .then(tiposfile =>
          {
             console.log("encontado") 
            // console.log(req.params.id)
            //res.json({ success: true })
            tiposfile.remove().then(tiposfile => res.json(tiposfile));
            console.log(tiposfile) 
           }
      )
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
)

/*


router.delete(
  "/view/:id",

 // passport.authenticate("jwt", { session: false }),





  (req, res) => {
   // console.log(res)
    Tdocumento.findOne({ _id: req.params.id })
    .then(tiposfile =>
          {
             console.log("encontado") 
            // console.log(req.params.id)
            //res.json({ success: true })
            tiposfile.remove().then(tiposfile => res.json(tiposfile));
            console.log(tiposfile) 
           }
      )
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
)

*/





router.put(
  "/view/:id",


  //passport.authenticate("jwt", { session: false }),


  (req, res) => {
     


    console.log("datos obtenidos a la api ")
   // console.log(req.body.codigo)
  //  console.log(req.body.descripcion)

  
  //
    //console.log (req.body.codigo)

    Tdocumento.findOne({ _id: req.params.id })
    .then(tiposfile =>
          {


             console.log("actualizando el archivos verifica que este llegando la peticions") 
            const myquery = {_id: req.params.id };
            const newvalues = { $set: {
              id: req.body.id,
              name:req.body.name,
              category:req.body.category,
              price:req.body.price,
              description:req.body.description,
              popular:req.body.popular,
              imageUrls:req.body.imageUrls
            
            
            }};
            Tdocumento.updateMany(myquery,newvalues) 
            .then(tiposfile => res.json(tiposfile));
            console.log("resultado del array")
            console.log(tiposfile) 
           }
      )
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
    
    
  }
)





router.get(
  "/view/:id",


  //passport.authenticate("jwt", { session: false }),


  (req, res) => {
   // console.log(res)
    Tdocumento.findOne({ _id: req.params.id })
    .then(tiposfile =>
          {
             console.log("encontado para modificar pancho") 
            // console.log(req.params.id)
            //res.json({ success: true })
             res.json(tiposfile);
            console.log(tiposfile) 
           }
      )
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
)




router.get("/viewcat/:id", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);
  Tdocumento.find({category:{$all:[req.params.id]}}).sort({_id: -1})
  //db.pedidos.find({category:{$all:["Regional"]}})
   // .sort({ date: -1 })
    .then(tdocu => res.json(tdocu))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});




/*

router.get("/viewcat/:id",
 //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req)
   // console.log(res)
    Tdocumento.findOne({ category: req.params.id })
    .then(tiposfile =>
          {
             console.log("viewcat") 
            // console.log(req.params.id)
            //res.json({ success: true })
             res.json(tiposfile);
            console.log(tiposfile) 
           }
      )
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
)

*/

router.post("/card", async (req, res) => {
  const { id, amount } = req.body;
  //const stripe = new Stripe("sk_live_sJMz90XCpVwGtMMcKTenrdQd006T69otUo");
  //sk_test_FWzlqYz4Yk6e9KoGidPDvsN600l1PD7bYv");
  const stripe = new Stripe("sk_test_FWzlqYz4Yk6e9KoGidPDvsN600l1PD7bYv");
  console.log(req.body);

  try {


      const charge = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        source: id,
        description: "Venta Exitosa",
        receipt_email: 'grupo80pr@gmail.com'

      })
  
      var idfinal="'"+req.body.id+"'";
      var obser= "'"+req.body.nom+req.body.dire+req.body.telf+"'";
      var monto =(req.body.amount/100).toFixed(2);    
      monto=(monto*3.5).toFixed(2);    
      var vventa1=(monto/1.18).toFixed(2);    
      var igv=(monto-vventa1).toFixed(2);
      var nombre="'"+req.body.nom+"'";
      var dire="'"+req.body.dire+"'";
      var tele ="'"+req.body.telf+"'";
      var dni ="'"+req.body.dni+"'";
      var email ="'"+req.body.email+"'";

      var  cadena4   =  await sumacadena(req.body.items,idfinal,obser,monto,vventa1,igv,nombre,dire,tele,dni,email);

      var caden="Insert into message(name,message) value ('web'"+","+nombre+")";

      var caedna5= await grabacion1(caden);

      var caden1="Insert into noti(estado) value ('1')";
    
     var caedna6= await grabacion1(caden1);
  
      return (
      res.status(200).json({
        confirm: "EXITO"
      })
      
      
      );


    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message
      });
    }


 
});


router.post("/card1", async (req, res) => {
  const { id,  amount } = req.body;
  console.log(req.body);

  try {

      
      var idfinal="'"+req.body.id+"'";
      var obser= "'"+req.body.nom+req.body.dire+req.body.telf+"'";
      var monto =(req.body.amount/100).toFixed(2);    
      //monto=(monto*3.5).toFixed(2);    
      var vventa1=(monto/1.18).toFixed(2);    
      var igv=(monto-vventa1).toFixed(2);
      var nombre="'"+req.body.nom+"'";
      var dire="'"+req.body.dire+"'";
      var tele ="'"+req.body.telf+"'";
      var dni ="'"+req.body.dni+"'";
      var email ="'"+req.body.email+"'";

      var  cadena4   =  await sumacadena(req.body.items,idfinal,obser,monto,vventa1,igv,nombre,dire,tele,dni,email);

      var caden="Insert into message(name,message) value ('web'"+","+nombre+")";

      var caedna5= await grabacion1(caden);

      var caden1="Insert into noti(estado) value ('1')";
    
      var caedna6= await grabacion1(caden1);
  
      return (
      res.status(200).json({
        confirm: "EXITO"
      })
      
      
      );


    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message
      });
    }


 
});








router.post("/card3", async (req, res) => {
  const { id,  amount } = req.body;
  console.log(req.body);

  try {

      
      var idfinal="'"+req.body.id+"'";
      var idcliente="'"+req.body.idcliente+"'";
      var obser= "'"+req.body.nom+req.body.dire+req.body.telf+"'";
      var monto =(req.body.amount/100).toFixed(2);    
      //monto=(monto*3.5).toFixed(2);    
      var vventa1=(monto/1.18).toFixed(2);    
      var igv=(monto-vventa1).toFixed(2);
      var nombre="'"+req.body.nom+"'";
      var dire="'"+req.body.dire+"'";
      var tele ="'"+req.body.telf+"'";
      var dni ="'"+req.body.dni+"'";
      var email ="'"+req.body.email+"'";
      var serie ="'"+req.body.serie+"'";

      var age ="'"+req.body.age+"'";

      var  cadena4   =  await sumacabecera(req.body.items,idfinal,obser,monto,vventa1,igv,nombre,dire,tele,dni,email,idcliente,age,serie);

    //  var caden="Insert into message(name,message) value ('web'"+","+nombre+")";

    //  var caedna5= await grabacion1(caden);

     // var caden1="Insert into noti(estado) value ('1')";
    
     // var caedna6= await grabacion1(caden1);

    //await esunat(req.body.items,idfinal,obser,monto,vventa1,igv,nombre,dire,tele,dni,email)
  
      return (
      res.status(200).json({
        confirm: "EXITO"
      })
      
      
      );


    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: error.message
      });
    }


 
});




router.get("/numero/", (req, res) => {

  //passport.authenticate("jwt", { session: false }),

  //console.log(req);
//  console.log(req.query)
  

  let codigo=req.query.id;
  //console.log(codigo)
  let serie ="'"+req.query.serie+"'";
  //console.log(serie)

 let cadena="SELECT CR_Numero as Numero from CorrelativoDocumento WHERE TD_ID="+ codigo+" and CR_Serie="+serie+" and Alm_Id='1' and Empresa='1'"
 console.log(cadena)



  

  pool.getConnection((err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {
    conn.query(cadena, (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
        if (err) {
            res.json(err);
        }
       
         console.log(customers)
        res.json(customers);
        conn.release();
        //res.render('customers', {
           //   data: customers
        //});
    });
});  
});


router.post("/idventa", async (req, res) => {
  const { id} = req.body;
  //let id=req.params.id;

  var idfinal="'"+req.body.id+"'";
  var age="'"+req.body.age+"'";
  var serie="'"+req.body.serie+"'";
  
 // passport.authenticate("jwt", { session: false }),


  console.log("esto es lo que sta llegando de datos")
  console.log(req.body);

  try {

  //var cadet ='SELECT DVC_ID from DocVentaCab where TD_ID="1" and DVC_Serie="8" and DVC_Numero='+id+ ' and Alm_Id="1" AND Empresa="1" limit 1 ';
  //var cadena5= await grabacion(cadet);
  
  console.log("terminamos de hace rla consulta")
  //console.log(cadena5);


   pool.getConnection( (err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {
    conn.query('SELECT DVC_ID from DocVentaCab where TD_ID='+age+ ' and DVC_Serie='+serie+' and DVC_Numero='+idfinal+ ' and Alm_Id="1" AND Empresa="1" limit 1 ', async  (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
        if (err) {
            res.json(err);
        }
       // console.log(customer);

       console.log("asdasdasdasdasdasdsa")
       console.log(customers[0].DVC_ID)

       console.log(req.body.items)

       let IDdetalle=customers[0].DVC_ID;

       var  cadena4   =  await sumadetalle(IDdetalle,req.body.items,idfinal,serie);
         res.json(customers);
        conn.release();

    });
});  



  }
  catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
  


});





















router.post("/idaumenta", (req, res) => {
  const { id} = req.body;
  var age="'"+req.body.age+"'";
  let serie="'"+req.body.serie+"'";
  let cadena='update CorrelativoDocumento set CR_Numero='+id+ ' where TD_ID='+age+'  and CR_Serie='+serie+' and Alm_Id="1" AND Empresa="1"  ';

  console.log(cadena)

  pool.getConnection((err, conn) => {
    //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {
      conn.query(cadena, (err, customers) => {
      
  
      //conn.query('select  * FROM tec_blog', (err, customers) => {
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


router.post("/detalle", async (req, res) => {
  const { id,data} = req.body;
  //id
  //items


 // passport.authenticate("jwt", { session: false }),  



  console.log("llefo este valos al apit ")
  console.log(req.body);

  try {
  //  var  cadena4   =  await sumadetalle(req.body.id,req.body.items);
    return (
      res.status(200).json({
        confirm: "EXITO"
      })
      
      
      );


  }

  catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }

});



//SELECT * FROM sunat inner join  ubigeo on sunat.c5=ubigeo.ubigeo




router.get("/sunat/:id",  (req, res) => {

  let codigo=req.params.id;

  //passport.authenticate("jwt", { session: false }),



  console.log(req.body);
  

  pool2.getConnection((err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {

//SELECT * FROM sunat inner join ubigeo on sunat.c5=ubigeo.ubigeo inner join ubdepartamento on ubdepartamento.idDepa=ubigeo.departamento inner join ubprovincia on ubprovincia.idDepa=ubigeo.provincia where ubprovincia.idDepa=ubigeo.departamento and   c1=10309611131 

  conn.query("SELECT * FROM sunat inner join ubigeo on sunat.c5=ubigeo.ubigeo inner join ubdepartamento on ubdepartamento.idDepa=ubigeo.departamento where c1="+codigo, (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
        if (err) {
            res.json(err);
        }
        console.log(customers)

        res.json(customers);
        conn.release();
        //res.render('customers', {
         //   data: customers
        //});
    });
});  
});




router.get("/ventaserie/:id", (req, res) => {


let serie=req.params.id;
let Empresa="1";
let caja1="1";
//let series11="8"


let cadena="";
   if (serie==0){
     cadena="select cab.DVC_ID,cab.DVC_Anulado,cab.DVC_NC,cab.DVC_Serie,cab.DVC_Numero,CONCAT(cab.DVC_Serie,'-',cab.DVC_Numero) as Nserie ,cab.TD_ID,tipo.TD_Descripcion, cab.DVC_Fecha,  DATE_FORMAT(cab.DVC_Fecha,'%Y-%m-%d') as fecha,varios.PVCL_RazonSocial,varios.PVCL_NroDocIdentidad,varios.PVCL_Direccion,cab.DVC_Total from DocVentaCab as cab inner join Tipo_Documento as tipo on cab.TD_ID=tipo.TD_ID inner join cpvarios as varios on cab.PVCL_ID=varios.PVCL_ID  where cab.Alm_Id="+caja1 +"  and Empresa="+Empresa+ "  and cab.TD_ID<>7    order by cab.DVC_ID DESC";

   }
   else{
    cadena="select cab.DVC_ID,cab.DVC_Anulado,cab.DVC_NC,cab.DVC_Serie,cab.DVC_Numero,CONCAT(cab.DVC_Serie,'-',cab.DVC_Numero) as Nserie ,cab.TD_ID,tipo.TD_Descripcion, cab.DVC_Fecha,  DATE_FORMAT(cab.DVC_Fecha,'%Y-%m-%d') as fecha,varios.PVCL_RazonSocial,varios.PVCL_NroDocIdentidad,varios.PVCL_Direccion,cab.DVC_Total from DocVentaCab as cab inner join Tipo_Documento as tipo on cab.TD_ID=tipo.TD_ID inner join cpvarios as varios on cab.PVCL_ID=varios.PVCL_ID  where cab.Alm_Id="+caja1 +" and cab.DVC_Serie="+serie+"  and Empresa="+Empresa+ "  and cab.TD_ID<>7    order by cab.DVC_ID DESC";
     
   }



 

console.log(cadena)
//and DATE_FORMAT(cab.DVC_Fecha,'%Y-%m-%d')>='$fi'  and DATE_FORMAT(cab.DVC_Fecha,'%Y-%m-%d')<='$ff'


pool.getConnection((err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {

//SELECT * FROM sunat inner join ubigeo on sunat.c5=ubigeo.ubigeo inner join ubdepartamento on ubdepartamento.idDepa=ubigeo.departamento inner join ubprovincia on ubprovincia.idDepa=ubigeo.provincia where ubprovincia.idDepa=ubigeo.departamento and   c1=10309611131 

    conn.query(cadena, (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
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





router.get("/cliente/:id", (req, res) => {

  let codigo=req.params.id;

  //passport.authenticate("jwt", { session: false }),



  console.log(req.body);
  

  pool.getConnection((err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {

//SELECT * FROM sunat inner join ubigeo on sunat.c5=ubigeo.ubigeo inner join ubdepartamento on ubdepartamento.idDepa=ubigeo.departamento inner join ubprovincia on ubprovincia.idDepa=ubigeo.provincia where ubprovincia.idDepa=ubigeo.departamento and   c1=10309611131 

    conn.query("SELECT * FROM cpvarios WHERE PVCL_NroDocIdentidad ="+codigo, (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
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







router.get("/codcli", (req, res) => {

  //passport.authenticate("jwt", { session: false }),


  console.log(req.body);

  pool.getConnection((err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {
    conn.query("SELECT MAX(PVCL_Id) AS id FROM cpvarios ", (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
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





router.post("/codcli", async (req, res) => {
  const { id} = req.body;
  //let id=req.params.id;

  var idfinal="'"+req.body.id+"'";
  
 // passport.authenticate("jwt", { session: false }),

 var nombre="'"+req.body.nom+"'";
      var dire="'"+req.body.dire+"'";
      var tele ="'"+req.body.telf+"'";
      var dni ="'"+req.body.dni+"'";
      var email ="'"+req.body.email+"'";



  console.log("esto es lo que sta llegando de datos")
  console.log(req.body);

  try {

  //var cadet ='SELECT DVC_ID from DocVentaCab where TD_ID="1" and DVC_Serie="8" and DVC_Numero='+id+ ' and Alm_Id="1" AND Empresa="1" limit 1 ';
  //var cadena5= await grabacion(cadet);
  
  console.log("terminamos de hace rla consulta")
  //console.log(cadena5);


   pool.getConnection( (err, conn) => {
  //conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {
    
    
    conn.query('SELECT MAX(PVCL_Id) AS id FROM cpvarios', async  (err, customers) => {
    

    //conn.query('select  * FROM tec_blog', (err, customers) => {
        if (err) {
            res.json(err);
        }
       // console.log(customer);

       console.log("asdasdasdasdasdasdsa")
       console.log(customers[0].id)

       //console.log(req.body.items)

       let IDdetalle=parseInt(customers[0].id)+1;

       var cadena="Insert into cpvarios(PVCL_ID,PVCL_Tipo,PVCL_RazonSocial,PVCL_Titular,PVCL_Direccion,PVCL_Direccion2,PVCL_Direccion3,DI_Id,PVCL_NroDocIdentidad,PVCL_Telefono,PVCL_Email,PVCL_FecIngreso,PVCL_Inactivo) Values ("+IDdetalle+",'C',"+nombre+","+nombre+","+dire+","+dire+","+dire+","+"1"+","+dni+","+tele+","+email+",now(),'1'"+")";


       var  cadena4   =  await grabacion(cadena);
       console.log("teminams de grabar ")
         console.log(customers)
         res.json(customers);
        conn.release();

    });
});  



  }
  catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
  


});










router.post("/correo", (req, res) => {

  //passport.authenticate("jwt", { session: false }),

  var ema='"'+req.body.email+'"';
  var xml='"'+req.body.xml+'"';
  var cdr='"'+req.body.cdr+'"';
  var pdf='"'+req.body.pdf+'"';
  var title=req.body.archivot;

  var tipo=req.body.tipo;



  //console.log(xml)
  console.log("valor del cdr7777")

  console.log(tipo)
  if (tipo=="05"){
    cdr='iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC';
  }
  if (tipo=="03"){
    cdr='iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC';
  }


  var razonemisor=req.body.razonemisor;
  var clienteruc=req.body.clienteruc;
  var clientename=req.body.clientename;
  //1@gmail.com

  if  (ema.length>5){

try{

  console.log(req.body);
  // Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
  if (err) {
      console.error('Failed to create a testing account');
      console.error(err);
      return process.exit(1);
  }

  console.log('Credentials obtained, sending message...');

  // NB! Store the account object values somewhere if you want
  // to re-use the same account for future mail deliveries

  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport(
      {
          host: "smtp.gmail.com",
          port: 25,
          //secure: account.smtp.secure,
          auth: {
              user: "grupo90pr@gmail.com",
              pass: "sopadecaracol1"
          },
          logger: true,
          debug: false // include SMTP traffic in the logs
      },
      {
          // default message fields

          // sender info
          from: 'grupo90pr@gmail.com',
          headers: {
              'X-Laziness-level': 1000 // just an example header, no need to use this
          }
      }
  );

  // Message object
  let message;

  if (tipo=="01"){

     message = {
      // Comma separated list of recipients
      //to: 'grupo23pe@yahoo.com',
      to: ema,

      // Subject of the message
      subject: " Envio Automatico de Comprobantes de: "+razonemisor+  Date.now(),

      // plaintext body
      text: 'Hello to myself!',

      // HTML body
      html: `<p><b>Hola</b> `+clientename +`<img src="http://adryan2.sytes.net/shopingweb/ima/pancho.jpg"/></p>
      <p>Tiene Algunos Comprobantes Adjuntos:<br/><img src="cid:nyan@example.com"/></p>`,

      // AMP4EMAIL
      amp: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
            <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        </body>
      </html>`,

      // An array of attachments      
      attachments: [
          // String attachment

          /*
          {
              filename: 'notes.txt',
              content: 'Some notes about this e-mail',
              contentType: 'text/plain' // optional, would be detected from the filename
          },

          // Binary Buffer attachment
          {
              filename: 'image.png',
              content: Buffer.from(
                  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                      '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                      'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                  'base64'
              ),

              //cid: 'note@example.com' // should be as unique as possible
              cid: ema // should be as unique as possible
          },


          */

          // Binary Buffer attachment
          {
            filename: title+'.pdf',
            content: Buffer.from(pdf, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },

          // Binary Buffer attachment
          {
            filename: title+'.zip',
            content: Buffer.from(xml, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },
          {
            filename: 'R-'+title+'.zip',
            content: Buffer.from(cdr, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },




          // File Stream attachment
          {
              filename: 'nyan cat ✔.gif',
              path: __dirname + '/assets/nyan.gif',
              cid: ema // should be as unique as possible
          }
      ],

      list: {
          // List-Help: <mailto:admin@example.com?subject=help>
          help: 'admin@example.com?subject=help',

          // List-Unsubscribe: <http://example.com> (Comment)
          unsubscribe: [
              {
                  url: 'http://example.com/unsubscribe',
                  comment: 'A short note about this url'
              },
              'unsubscribe@example.com'
          ],

          // List-ID: "comment" <example.com>
          id: {
              url: 'mylist.example.com',
              comment: 'This is my awesome list'
          }
      }
  };



   }

  else {  

   message = {
      // Comma separated list of recipients
      //to: 'grupo23pe@yahoo.com',
      to: ema,

      // Subject of the message
      subject: " Envio Automatico de Comprobantes de: "+razonemisor+  Date.now(),

      // plaintext body
      text: 'Hello to myself!',

      // HTML body
      html: `<p><b>Hola</b> `+clientename +`<img src="http://adryan2.sytes.net/shopingweb/ima/pancho.jpg"/></p>
      <p>Tiene Algunos Comprobantes Adjuntos:<br/><img src="cid:nyan@example.com"/></p>`,

      // AMP4EMAIL
      amp: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
            <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        </body>
      </html>`,

      // An array of attachments      
      attachments: [
          // String attachment

          /*
          {
              filename: 'notes.txt',
              content: 'Some notes about this e-mail',
              contentType: 'text/plain' // optional, would be detected from the filename
          },

          // Binary Buffer attachment
          {
              filename: 'image.png',
              content: Buffer.from(
                  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                      '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                      'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                  'base64'
              ),

              //cid: 'note@example.com' // should be as unique as possible
              cid: ema // should be as unique as possible
          },


          */

          // Binary Buffer attachment
          {
            filename: title+'.pdf',
            content: Buffer.from(pdf, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },

          // Binary Buffer attachment
          {
            filename: title+'.zip',
            content: Buffer.from(xml, 'base64' ),

            //cid: 'note@example.com' // should be as unique as possible
            cid: ema // should be as unique as possible
          },
         



          // File Stream attachment
          {
              filename: 'nyan cat ✔.gif',
              path: __dirname + '/assets/nyan.gif',
              cid: ema // should be as unique as possible
          }
      ],

      list: {
          // List-Help: <mailto:admin@example.com?subject=help>
          help: 'admin@example.com?subject=help',

          // List-Unsubscribe: <http://example.com> (Comment)
          unsubscribe: [
              {
                  url: 'http://example.com/unsubscribe',
                  comment: 'A short note about this url'
              },
              'unsubscribe@example.com'
          ],

          // List-ID: "comment" <example.com>
          id: {
              url: 'mylist.example.com',
              comment: 'This is my awesome list'
          }
      }
  };
}









  transporter.sendMail(message, (error, info) => {
      if (error) {
          console.log('Error occurred');
          console.log(error.message);
         //  return process.exit(1);
      }

      console.log('Message sent successfully!');
      console.log(nodemailer.getTestMessageUrl(info));

      // only needed when using pooled connections
      transporter.close();
  });
});


return (
  res.status(200).json({
    confirm: "EXITO"
  })
)

}

catch (error) {
  console.log(error);
  return res.status(400).json({
    message: error.message
  });
}

}
  
});














module.exports = router;
