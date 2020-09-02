const notesCtrl = {};

const Note = require('../models/Note');
const Items = require('../models/Items');


var data = require('/home/lolo/Descargas/mern-crud-2019-master/backend/firma1.js');
var data1 = require('/home/lolo/Descargas/mern-crud-2019-master/backend/comprimir.js');


//const Persona = '/home/lolo/Descargas/mern-crud-2019-master/backend/Persona';
//var Persona =require('/home/lolo/Descargas/mern-crud-2019-master/backend/Persona.js');


notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

notesCtrl.createNote = async (req, res) => {
    const { title,rucemisor, content, date, author,cliente_numero_de_documento,operacion,tipo_de_comprobante,serie,
        numero,sunat_transaction,cliente_tipo_de_documento,cliente_denominacion,cliente_direccion,cliente_email,cliente_email_1,
        cliente_email_2,fecha_de_emision,fecha_de_vencimiento,moneda,tipo_de_cambio,porcentaje_de_igv,descuento_global,total_descuento,
        total_anticipo,total_gravada,total_inafecta,total_exonerada,total_igv,total_gratuita,total_otros_cargos,total,percepcion_tipo,
        percepcion_base_imponible,total_percepcion,total_incluido_percepcion,detraccion,observaciones,documento_que_se_modifica_tipo,
        documento_que_se_modifica_serie,documento_que_se_modifica_numero,tipo_de_nota_de_credito,tipo_de_nota_de_debito,enviar_automaticamente_a_la_sunat,
        enviar_automaticamente_al_cliente,codigo_unico,condiciones_de_pago,medio_de_pago,placa_vehiculo,orden_compra_servicio,
        tabla_personalizada_codigo,formato_de_pdf,total_letras    

    } = req.body;

    


    const newNote = new Note({
        title:title,
        rucemisor:rucemisor,
        content:content,
        date:date,
        total_letras:total_letras,
        author:author,
        cliente_numero_de_documento:cliente_numero_de_documento,
        idope:operacion,
    tipo_de_comprobante:tipo_de_comprobante,
    serie:serie,
    numero:numero,
    sunat_transaction:sunat_transaction,
    cliente_tipo_de_documento:cliente_tipo_de_documento,
    cliente_denominacion:cliente_denominacion,
    cliente_direccion:cliente_direccion,
    cliente_email:cliente_email,
    cliente_email_1:cliente_email_1,
    cliente_email_2:cliente_email_2,
    fecha_de_emision:fecha_de_emision,
    fecha_de_vencimiento:fecha_de_vencimiento,
    moneda:moneda,
    tipo_de_cambio:tipo_de_cambio,
    porcentaje_de_igv:porcentaje_de_igv,
    descuento_global:descuento_global,
    total_descuento:total_descuento,
    total_anticipo:total_anticipo,
    total_gravada:total_gravada,
    total_inafecta:total_inafecta,
    total_exonerada:total_exonerada,
    total_igv:total_igv,
    total_gratuita:total_gratuita,
    total_otros_cargos:total_otros_cargos,
    total:total,
    percepcion_tipo:percepcion_tipo,
    percepcion_base_imponible:percepcion_base_imponible,
    total_percepcion:total_percepcion,
    total_incluido_percepcion:total_incluido_percepcion,
    detraccion:detraccion,
    observaciones:observaciones,
    documento_que_se_modifica_tipo:documento_que_se_modifica_tipo,
    documento_que_se_modifica_serie:documento_que_se_modifica_serie,
    documento_que_se_modifica_numero:documento_que_se_modifica_numero,
    tipo_de_nota_de_credito:tipo_de_nota_de_credito,
    tipo_de_nota_de_debito:tipo_de_nota_de_debito,
    enviar_automaticamente_a_la_sunat:enviar_automaticamente_a_la_sunat,
    enviar_automaticamente_al_cliente:enviar_automaticamente_al_cliente,
    codigo_unico:codigo_unico,
    condiciones_de_pago:condiciones_de_pago,
    medio_de_pago:medio_de_pago,
    placa_vehiculo:placa_vehiculo,
    orden_compra_servicio:orden_compra_servicio,
    tabla_personalizada_codigo:tabla_personalizada_codigo,
    formato_de_pdf:formato_de_pdf,

        
    });
   // console.log(newNote);
    await newNote.save();
  //

    //console.log("iasdasdasdasdasdasd");

    //console.log(req.body.operacion);



    for(var atr in req.body.items){
         const newItem = new Items({
                            idnotes:req.body.operacion,
                            codigo:req.body.items[atr].codigo,
                            unidad_de_medida:req.body.items[atr].unidad_de_medida,                           
                            descripcion:req.body.items[atr].descripcion,
                            cantidad:req.body.items[atr].cantidad,
                            valor_unitario:req.body.items[atr].valor_unitario,
                            precio_unitario:req.body.items[atr].precio_unitario,
                            igv_item:req.body.items[atr].igv_item,
                            descuento:req.body.items[atr].descuento,
                            subtotal:req.body.items[atr].subtotal,
                            tipo_de_igv:req.body.items[atr].tipo_de_igv,
                            igv:req.body.items[atr].igv_item,
                            total:req.body.items[atr].total,
                            anticipo_regularizacion:req.body.items[atr].anticipo_regularizacion,
                            anticipo_documento_serie:req.body.items[atr].anticipo_documento_serie,
                            anticipo_documento_numero:req.body.items[atr].anticipo_documento_numero,

         });
        // console.log(newItem);
         await newItem.save();

        
          //  console.log("granado lineas ");    
        //codigo:req.body.items[atr].codigo

   }


   data.firma1(req.body);



    //console.log(req.body);
   // console.log("datos recibidos del phsdfsdfsdfsdfsdfsdfsdp");

    
    

    var envia=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".zip";
    var envia1=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero;

    console.log(envia);


    data1.comprimir(envia1);
    
    


    var fs = require('fs');






    fs.writeFile(newNote.title,newNote.content ,{
        encoding:"base64"
    }, function(err) {
        if(err) {
            return console.log(err);
        }
               



        var data = fs.readFileSync("/home/lolo/Descargas/mern-crud-2019-master/backend/"+envia,{
            encoding:"base64"
        });
        console.log("he leido el archivo cpontenido del zip"); 
       console.log(data);
       
       var resultado= "R-"+envia;


       var soap = require('soap');
       var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
       var options = {
            forceSoap12Headers: false
        };

        soap.createClient(url, options, function (err, client) {
            var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {});
            client.setSecurity(wsSecurity);
            client.sendBill({
                fileName:envia,
                contentFile:data
            },(err, res) => {
                if(err){
                    console.error(err);
                    console.log("tenemos que reiniciar el api");

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


       var soap = require('soap');
       var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
       var options = {
            forceSoap12Headers: false
        };

        soap.createClient(url, options, function (err, client) {
            var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {})
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

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
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


















module.exports = notesCtrl;