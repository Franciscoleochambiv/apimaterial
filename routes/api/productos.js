const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User.js");



const validateTipoInput = require("../../validation/productos.js");
//const validateLoginInput = require("../../validation/login.js");

const Tdocumento = require("../../models/Productos");


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
        descripcion:req.body.descripcion,
        codigo:req.body.codigo,
        imagen:req.body.imagen,
        popular:req.body.popular,
        descripcion:req.body.descripcion,
        categoria:req.body.categoria,
        detalle:req.body.detalle,
        precio:req.body.precio,
        cantidad:req.body.cantidad,
        cantidad2:req.body.cantidad2,
        cantidad3:req.body.cantidad3,
        cantidad4:req.body.cantidad4
    
    
    });
    //addtdoc.save().then(tipo1 => res.json(req.body));

    addtdoc.save().then(tipo1 => res.json(tipo1));
   
    });


router.get("/view", (req, res) => {
  console.log(req.body);
  Tdocumento.find()
    .sort({ date: -1 })
    .then(tdocu => res.json(tdocu))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});



router.delete(
  "/view/:id",
  passport.authenticate("jwt", { session: false }),
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


router.put(
  "/view/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
     

    console.log("datos obtenidos a la api ")
    console.log(req.body.codigo)
    console.log(req.body.descripcion)

    console.log (req.body.codigo)

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
    
    
  }
)


router.get(
  "/view/:id",
  passport.authenticate("jwt", { session: false }),
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





module.exports = router;
