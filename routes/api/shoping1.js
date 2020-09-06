const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");
const  Stripe= require("stripe"); 


const validateTipoInput = require("../../validation/shoping1.js");
//const validateLoginInput = require("../../validation/login.js");

const Tdocumento = require("../../models/Shoping1");




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
*/

router.get("/productos", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);
  req.getConnection((err, conn) => {
  conn.query('select articulos.id,articulos.codigo,articulos.imagen, true as popular,articulos.descripcion,Categorias.descripcion as categoria,articulos.detalle,articulos.precio,existencias.cantidad,existencias.cantidad2,existencias.cantidad3,existencias.cantidad4 from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo order by articulos.descripcion', (err, customers) => {
    //conn.query('select  * FROM tec_blog', (err, customers) => {
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



router.get("/producto", (req, res) => {

  passport.authenticate("jwt", { session: false }),
  console.log(req.body);
  req.getConnection((err, conn) => {
    conn.query('select articulos.id,articulos.codigo,articulos.imagen, articulos.descripcion,Categorias.descripcion as category,articulos.detalle,articulos.precio from articulos inner join Categorias on Categorias.Categoria=articulos.grupo inner join existencias on existencias.codigo=articulos.codigo', (err, customers) => {  
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






  router.get("/categorias", (req, res) => {

    passport.authenticate("jwt", { session: false }),
    console.log(req.body);
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM Categorias order by  descripcion', (err, customers) => {

      
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
  const stripe = new Stripe("sk_live_sJMz90XCpVwGtMMcKTenrdQd006T69otUo");
  //sk_test_FWzlqYz4Yk6e9KoGidPDvsN600l1PD7bYv");
  console.log(req.body);
  console.log("mointaq a pagar ")
  console.log(req.body.amount)




  try {


    //stripe.charges.create
/*
    
      const payment = await stripe.paymentIntents.create({
        amount:"1000000",
        currency: "USD",
        description: "Delicious empanadas",
        payment_method: "card",
        confirm: true
      });
*/
      const charge = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        source: id,
        description: "Venta Exitosa",
        receipt_email: 'grupo80pr@gmail.com'
       // customer:req.body.customer,
       // destination:req.body.dire

      })
  
      console.log(charge);
  
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


module.exports = router;
