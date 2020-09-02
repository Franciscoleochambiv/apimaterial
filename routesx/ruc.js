const { Router } = require('express');
const router = Router();

const { getRuc, createRuc, getRuc1, deleteRuc } = require('../controllers/ruc.controller');


//const lolo = require('/home/lolo/Descargas/mern-crud-2019-master/backend/envio.js');

router.route('/')
    .get(getRuc)
    .post(createRuc);



    router.route('/inicio')
    //.get(lolo);
   .post(createRuc);

//    .get((req,res)=>res.json({message:'peticion GET '}))
 //   .post((req,res)=>res.json({message:'PTEICION POST'}));
    //.post(createNote);

    router.route('/ubicar/:id') 
    .get(getRuc1) 

    router.route('/consulta/:id') 
    .get(getRuc1) 
    

    
    router.route('/borrar/:id') 
    //.get(getNoteope)
    .get(deleteRuc)  
    //.put(updateNote); 


router.route('/:id')                    
    .get(getRuc)
    .delete(deleteRuc)
    //.put(updateNote);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

module.exports = router;


