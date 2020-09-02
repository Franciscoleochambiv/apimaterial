const notesCtrl = {};

const Note = require('../models/Note');
const Items = require('../models/Items');


const { main }= require("../procedimientos/index.js");







notesCtrl.getNotes = async (req, res) => {
  
    const notes = await Note.find();
    console.log("likstado");
    res.json(notes);
};





notesCtrl.createNote = async (req, res) => {
    const { 
            title,
            content,
            author,
            date,            
            serie,
            numero,
            fecha_de_emision,
            total_letras,
            rucemisor,
            proveedor,
            razonemisor,
            provincia,
            ciudad,
            distrito,
            diremisor,
            cliente_numero_de_documento,
            cliente_denominacion,
            cliente_direccion,
            total_igv,
            total_gravada,
            total,
            tipo_de_comprobante,
            pdf_zip_base64,
            xml_zip_base64,
            cdr_zip_base64,
            aceptada_por_sunat,
            sunat_soap_error,
            sunat_responsecode,            
            items
    } = req.body; 
    
   // console.log(req.body.items);


   //si existe en numeor enviado elilinarlo
   //y grabar el nuevo con o sin respuesta


    


    
    

   const invoice=req.body;

   


    const  firmadozip=title+'.zip';
    const  firmadoori=title+'.xml';
    const  archivosinfirma=title+'sf.xml';
    const  archivosinfirma1=title+'sf.xml';
    var porcentaje_de_igv="18.00";
    var pdf=title+".pdf";

   // createInvoice(invoice, pdf);




    
/*
      var  serie="F001";
      var  numero="21481";
      var  fecha_de_emision="2020-04-11";
      var  total_letras="son ciento dieciocho /100 soles";
      var  rucemisor="20455772011";
      var  proveedor="lolo";
      var  razonemisor="Accesortios Sf Ssystem SA";
      var  provincia="arequipa";
      var  ciudad="Arequipa";
      var  distrito="Cerro Colorado";
      var  diremisor="Av Garcilazo de la Vega 806";
      var  cliente_numero_de_documento="10309611131";
      var  cliente_denominacion="FRANCISCO LEO CHAMBI VILCA";
      var  total_igv="18.00";
      var  total_gravada="100.00";
      var  total="118.00";
      var tipo_de_comprobante="01";

      var porcentaje_de_igv="18.00";  
*/

   


   var  soso= await main(
    firmadozip,
    firmadoori,
    archivosinfirma,
    archivosinfirma1,
    serie,
    numero,
    fecha_de_emision,
    total_letras,
    rucemisor,
    proveedor,
    razonemisor,
    provincia,
    ciudad,
    distrito,
    diremisor,
    cliente_numero_de_documento,
    cliente_denominacion,
    total_igv,
    total_gravada,
    total,
    tipo_de_comprobante,
    porcentaje_de_igv,
    items
   );
   //console.log("valores devueltos por el procedimiento")
   let xml=soso[0];
  //console.log(soso[0]);
  //console.log("valores devueltos por el procedimiento CDR")
  //console.log(soso[1]);
  let cdr=soso[1];
  if (xml==undefined){
    xml="";
}
  if (cdr==undefined){
      cdr="";
  }

  





  const newNote = new Note({
    title:title,
    content:content,
    author:author,
    date:date,    
    serie:serie,
    numero:numero,
    fecha_de_emision:fecha_de_emision,
    total_letras:total_letras,
    rucemisor:rucemisor,
    proveedor:proveedor,
    razonemisor:razonemisor,
    provincia:provincia,
    ciudad:ciudad,
    distrito:distrito,
    diremisor:diremisor,
    cliente_numero_de_documento:cliente_numero_de_documento,
    cliente_denominacion:cliente_denominacion,
    cliente_direccion:cliente_direccion,
    total_igv:total_igv,
    total_gravada:total_gravada,
    total:total,
    tipo_de_comprobante:tipo_de_comprobante,
    error:"0",
    pdf_zip_base64:pdf_zip_base64,
    xml_zip_base64:xml,
    cdr_zip_base64:cdr,
    aceptada_por_sunat:aceptada_por_sunat,
    sunat_soap_error:sunat_soap_error,
    sunat_responsecode:sunat_responsecode,                    
    items:items,


});


   await newNote.save()
    
    
   .then(tipo1 => res.json(tipo1))
   
   //.then(res.json({ soso: "Error en el  Archivo  ya existe" }))
   
   .catch(err => res.status(404).json({ nota: "Error en el  Archivo  ya existe" }));

  
   //llenar los archivos para reemplazar emn la tabla


   //async (req, res) => {
   
    //const notes
    /*
       await Note.findOne({title:title})
                .then(tipo1 => res.json("asdasdas"))   
                .catch(err => res.status(404).json({ nota: "Archivo Encontrado" }));
               // console.log("luiego de grabar tenemos que buscar el archuivo") 
               */
  // }
                

    



        //await sleep(2000);
    




//   var actualiza= Note.findByIdAndUpdate(idmodifica, {
//    content:contenido


  // res.json("aqui hay que enviar el resutlado");






    /*
    const invoice=req.body; 
    for(var atr in req.body.items){
         const newItem = new Items({
                            idnotes:req.body.sale_id,
                            codigo:req.body.items[atr].product_code,
                            unidad_de_medida:req.body.items[atr].unidad_de_medida,                           
                            descripcion:req.body.items[atr].product_name,
                            cantidad:req.body.items[atr].quantity,
                            valor_unitario:req.body.items[atr].real_unit_price,
                            precio_unitario:req.body.items[atr].unit_price,
                            igv_item:req.body.items[atr].tax,
                            descuento:req.body.items[atr].descuento,
                            subtotal:req.body.items[atr].item_tax,
                            tipo_de_igv:req.body.items[atr].tipo_de_igv,
                            igv:req.body.items[atr].tax,
                            total:req.body.items[atr].subtotal,
                            anticipo_regularizacion:req.body.items[atr].anticipo_regularizacion,
                            anticipo_documento_serie:req.body.items[atr].anticipo_documento_serie,
                            anticipo_documento_numero:req.body.items[atr].anticipo_documento_numero,

         });
        // console.log(newItem);
         await newItem.save();

       
   }; //cierra el for de los items


*/



    
   // const data=req.body;

    //var envia=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".zip";
    //var envia1=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".xml";

    //console.log(envia);




    
  // getNotes();

    
};


/////////////////////////////////////////


notesCtrl.createNote1 = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({
        title:title,
        content:content,
        date:date,
        author:author
    });
    console.log(newNote);
    await newNote.save();

            
    var fs = require('fs');

    fs.writeFile(newNote.title,newNote.content ,{
        encoding:"base64"
    }, function(err) {
        if(err) {
            return console.log(err);
        }
               


        var data = fs.readFileSync(newNote.title,{
            encoding:"base64"
        });
        console.log("he leido el archivo"); 
       console.log(data);
       
       var resultado= "R-"+newNote.title;


       var soap = require('strong-soap');
       var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
       var options = {
            forceSoap12Headers: false
        };

        soap.createClient(url, options, function (err, client) {
            var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {})
            console.log(wsSecurity);
            client.setSecurity(wsSecurity);
            client.sendBill({
                fileName:newNote.title,
                contentFile:data
            },(err, res) => {
                if(err){
                    console.error(err);
                }else{
                    console.log("esta es la respuesat ");
        
        
                         fs.writeFile(resultado,res.applicationResponse ,{
                             encoding:"base64"
                         },
                          function(err) {
                            if(err) {
                                return console.log(err);
                            }
        
                            console.log("The file was saved!");

                            //notes/ubicar/
                            //const note = await Note.findOne({title:req.params.idope});

                          
                                
                            



                        }); 
                
                 
                    console.log(res);
        
                    //console.log(Object.values(res));
        
                }
            }); //cierra sendbill
        });

        console.log("archivo guardado");
    }
    );

    
    



    

    
    res.json('New Note added');


    
};






////////////////////////////////////////////////




notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

notesCtrl.getNoteope = async (req, res) => {
    const note1 = await Note.findOne({title:req.params.idope}, function(err,note) {

       //console.log(note);
        if(err) {
            return console.log(err);
        }
        if(note==null){
                      res.json("nulo");
        }
        else{
                                
            if (note.content=="za"){
                console.log(note);
                res.json("0");
            
            }
            else{
            
               
            
                var fs = require('fs');
            
            
            /*
                var data = fs.readFileSync("R-"+req.params.idope,{
                    encoding:"base64"
                },(err, res) => {
                    if(err){
                        console.error(err)
                    }
                  });
                    
            
                  */
            
                  var nxml=req.params.idope;
                  nxml=nxml.slice(0, -3)+"zip";
                  var dataxml = fs.readFileSync(nxml,{
                    encoding:"base64"
                },(err, res) => {
                    if(err){
                        console.error(err)
                    }
                  });
            
                  var npdf=req.params.idope;
                  npdf=npdf.slice(0, -3)+"pdf";
                  var datapdf = fs.readFileSync(npdf,{
                    encoding:"base64"
                },(err, res) => {
                    if(err){
                        console.error(err)
                    }
                  });  
            
            
                //console.log("he leido el archivo pancho"); 
               // console.log(data);
            
               // console.log("he leido el archivo xmlfiramdo"); 
               // console.log(dataxml);
                
                
                var  data1={
                    _id:note._id,
                    rucemisor:note.rucemisor,
                    content:note.content,
                    date:note.date,
                    total_letras:note.total_letras,
                    autor:note.author,
                    cliente_numero_de_documento:note.cliente_numero_de_documento,
                    idope:note.idope,
                    tipo_de_comprobante:note.tipo_de_comprobante,
                    serie:note.serie,
                    numero:note.numero,
                    sunat_transaction:note.sunat_transaction,
                    cliente_tipo_de_documento:note.cliente_tipo_de_documento,
                    cliente_denominacion:note.cliente_denominacion,
                    cliente_direccion:note.cliente_direccion,
                    cliente_email:note.cliente_email,
                    cliente_email_1:note.cliente_email_1,
                    cliente_email_2:note.cliente_email_2,
                    fecha_de_emision:note.fecha_de_emision,
                    fecha_de_vencimiento:note.fecha_de_vencimiento,
                    moneda:note.moneda,
                    tipo_de_cambio:note.tipo_de_cambio,
                    porcentaje_de_igv:note.porcentaje_de_igv,
                    descuento_global:note.descuento_global,
                    total_descuento:note.total_descuento,
                    total_anticipo:note.total_anticipo,
                    total_gravada:note.total_gravada, 
                    total_inafecta:note.total_inafecta,
                    total_exonerada:note.total_exonerada,
                    total_igv:note.total_igv,
                    total_gratuita:note.total_gratuita,
                    total_otros_cargos:note.total_otros_cargos,
                    total:note.total,
                    percepcion_tipo:note.percepcion_tipo,
                    percepcion_base_imponible:note.percepcion_base_imponible,
                    total_percepcion:note.total_percepcion,
                    total_incluido_percepcion:note.total_incluido_percepcion,
                    detraccion:note.detraccion,
                    observaciones:note.observaciones,
                    documento_que_se_modifica_tipo:note.documento_que_se_modifica_tipo,
                    documento_que_se_modifica_serie:note.documento_que_se_modifica_serie,
                    documento_que_se_modifica_numero:note.documento_que_se_modifica_numero,
                    tipo_de_nota_de_credito:note.tipo_de_nota_de_credito,
                    tipo_de_nota_de_debito:note.tipo_de_nota_de_debito,
                    enviar_automaticamente_a_la_sunat:note.enviar_automaticamente_a_la_sunat,
                    enviar_automaticamente_al_cliente:note.enviar_automaticamente_al_cliente,
                    codigo_unico:note.codigo_unico,
                    condiciones_de_pago:note.condiciones_de_pago,
                    medio_de_pago:note.medio_de_pago,
                    placa_vehiculo:note.placa_vehiculo,
                    orden_compra_servicio:note.orden_compra_servicio,
                    tabla_personalizada_codigo:note.tabla_personalizada_codigo,
                    formato_de_pdf:note.formato_de_pdf,
                    createdAt:note.createdAt,
                    updatedAt:note.updatedAt,
            
                    tipo_de_comprobante:note.cliente_tipo_de_documento,
                    pdf_zip_base64:datapdf,
                    xml_zip_base64:dataxml,
                    cdr_zip_base64:note.content,
                    error:note.error,
            
                    
                    
                    title:note.title
                } 
                res.json(data1);
            }

        }


        console.log("The file was loking");
    }
);




    

    
}



//


notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)


    console.log("entrando a la funcion de borrado");
    res.json('Note Deleted');
}




notesCtrl.updateNote = async (req, res) => {
    const { title, content, duration, date, author } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        content,
        duration,
        author
    });
    res.json('Note Updated');
}

/*

var actualiza= Note.findByIdAndUpdate(idmodifica, {
    content:contenido

},function callback(error,b){
    if (error !==null){
        console.log(error);
    }
    else{

        console.log("modificado");
    }
});

*/

notesCtrl.deleNota = async (req, res) => {
    const note = await Note.findOne({title:req.params.idope}, function(err,borrado) {
        if(err) {
            return console.log(err);
        }
           console.log(borrado);
           if (borrado==null){
               console.log("valor nulo");
           }

           else{
            borrado.remove(err=>{
                if (err){
                     console.log("error" );
                         
                }

                console.log("Borrado activo");
                
                
            })
        } 
            
        
    }
);
console.log("esta boirrado");
res.json("1");

}


         
 

      
      







module.exports = notesCtrl;
