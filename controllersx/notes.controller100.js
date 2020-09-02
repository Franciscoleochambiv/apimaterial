const notesCtrl = {};

const Note = require('../models/Note');
const Items = require('../models/Items');

const { createInvoice } = require("../createInvoice.js");

const { Invoice } = require("../Invoice.js");

//var resulcli;
/*
const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111
    },
    items: [
      {
        item: "TC 100",
        description: "Toner Cartridge",
        quantity: 2,
        amount: 6000
      },
      {
        item: "USB_EXT",
        description: "USB Cable Extender",
        quantity: 1,
        amount: 2000
      }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234
  };
  */


//var data = require('/home/lolo/Descargas/mern-crud-2019-master/backend/firma1.js');
//var data1 = require('/home/lolo/Descargas/mern-crud-2019-master/backend/comprimir.js');


//const Persona = '/home/lolo/Descargas/mern-crud-2019-master/backend/Persona';
//var Persona =require('/home/lolo/Descargas/mern-crud-2019-master/backend/Persona.js');


notesCtrl.getNotes = async (req, res) => {
  
    const notes = await Note.find();
    console.log("likstado");
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
    await newNote.save();
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
         await newItem.save();    
      }; //cierra el for de los items


    const invoice1=req.body;
    const data=req.body;

    var envia=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".zip";
    var envia1=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".xml";

    console.log(envia);


    var nombrearchivo=rucemisor+"-"+data.tipo_de_comprobante+"-"+data.serie+"-"+data.numero;
    var archivosinfirma=nombrearchivo+"sf"+".xml";
    var firmado=nombrearchivo+".xml";
    var firmadozip=nombrearchivo+".zip";
    var pdf=nombrearchivo+".pdf";



    createInvoice(invoice1, pdf);
    

     
   // createInvoice(invoice1, pdf);
    Invoice(data);


         
}



notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

notesCtrl.getNoteope = async (req, res) => {


    const note = await Note.findOne({title:req.params.idope}, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was loking");
    }
);
   

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


    console.log("he leido el archivo pancho"); 
   // console.log(data);

    console.log("he leido el archivo xmlfiramdo"); 
    console.log(dataxml);
    
    
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
        cdr_zip_base64:data,

        
        
        title:note.title
    } 
    


    

    res.json(data1);
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






module.exports = notesCtrl;