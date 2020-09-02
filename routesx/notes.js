const { Router } = require('express');
const router = Router();

const { getNotes, createNote, getNote, getNoteope,deleteNote, updateNote ,deleNota } = require('../controllers/notes.controller');


//const lolo = require('/home/lolo/Descargas/mern-crud-2019-master/backend/envio.js');

router.route('/')
    .get(getNotes)
    .post(createNote);



    router.route('/inicio')
    //.get(lolo);
   .post(createNote);

//    .get((req,res)=>res.json({message:'peticion GET '}))
 //   .post((req,res)=>res.json({message:'PTEICION POST'}));
    //.post(createNote);

    router.route('/ubicar/:idope') 
    .get(getNoteope) 

    
    router.route('/borrar/:idope') 
    //.get(getNoteope)
    .get(deleNota)  
    //.put(updateNote); 


router.route('/:id')                    
    .get(getNote)
    .delete(deleteNote)
    .put(updateNote);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

module.exports = router;


