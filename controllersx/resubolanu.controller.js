const resbolCtrl = {};

//const Note = require('../models/Note');
const Itemsbolanu = require('../models/Itemsbolanu');
const Resbolanu = require('../models/Resbolanu');

//const { createInvoice } = require("../createInvoice.js");



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


resbolCtrl.getNotes = async (req, res) => {
  
    const notes = await Resbolanu.find();
    console.log("likstado");
    res.json(notes);
};




resbolCtrl.createNote = async (req, res) => {
    const { title,rucemisor, content, date, author ,serie,numero,ticket,fecha_de_emision,
    } = req.body; 

   // console.log(req)

    


    const newNote = new Resbolanu({
        title:title,    
        rucemisor:rucemisor,
        content:content,
        date:date,
        author:author,
        serie:serie,
        numero:numero,
        ticket:ticket,
        razonemisor:razonemisor,
        provincia:provincia,
        ciudad:ciudad,
        distrito:distrito,
        diremisor:diremisor,
        fecharchivo:fecharchivo,
        content:"",
        cdr:"",
        xml:"",
        error:"0",
        fecha_de_emision:fecha_de_emision
        
    });

    await newNote.save();

    //const invoice=req.body;

    
  
    for(var atr in req.body.items){
         const newItem = new Itemsbolanu({                           
                            title:req.body.title,
                            //data.items[atr].dvc_numero
                            dvc_numero:req.body.items[atr].dvc_numero,
                            dvc_serie:req.body.items[atr].dvc_serie,
                            condition:req.body.items[atr].condition,
                            td_id:req.body.items[atr].td_id,
                            total:req.body.items[atr].total,
                            total_tax:req.body.items[atr].tax_total,
                            grand_total:req.body.items[atr].grand_total,                            
                           

                            
         });
        // console.log(newItem);
         await newItem.save();
       
   }; //cierra el for de los items

 






    
    const data=req.body;
    //var envia=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".zip";
    //var envia1=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".xml";

    //console.log(envia);


     var fs = require('fs');

      var f = new Date();
      horaA=f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate();

                var item=0;
               // var rucemisor="10309611131";
                var proveedor="lolo";
                var razonemisor=req.body.author;
                var provincia=req.body.provincia;
                var ciudad=req.body.ciudad;
                var distrito=req.body.distrito;
                var diremisor=req.body.diremisor;

                var fecharchivo=req.body.fecharchivo;

                var plantilla33 ='</VoidedDocuments>';


                //20455968268-01-F001-2089.zip

                var nombrearchivo=rucemisor+"-RA-"+fecharchivo+"-"+req.body.numero;
                var archivosinfirma=nombrearchivo+"sf"+".xml";
                var firmado=nombrearchivo+".xml";
                var firmadozip=nombrearchivo+".zip";
                var nticket=nombrearchivo+".txt";
                var pdf=nombrearchivo+".pdf";


            


                var plantilla1='<?xml version="1.0" encoding="UTF-8"?>'+
                '<VoidedDocuments xmlns="urn:sunat:names:specification:ubl:peru:schema:xsd:VoidedDocuments-1" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:sac="urn:sunat:names:specification:ubl:peru:schema:xsd:SunatAggregateComponents-1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'+
                  '<ext:UBLExtensions>'+
                    '<ext:UBLExtension>'+
                      '<ext:ExtensionContent>'+
                        '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">'+
                         '<SignedInfo>'+
                            '<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>'+
                            '<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>'+
                            '<Reference URI="">'+
                            '<Transforms>'+
                               '<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />'+
                            '</Transforms>'+
                            '<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>'+
                            '<DigestValue></DigestValue>'+
                            '</Reference>'+
                         '</SignedInfo>'+
                         '<SignatureValue/>'+
                        '<KeyInfo>'+
                        '<X509Data>'+
                        '<X509SubjectName/>'+
                        '<X509Certificate/>'+
                        '</X509Data>'+
                        '</KeyInfo>'+
                      '</Signature>'+
                      '</ext:ExtensionContent>'+
                    '</ext:UBLExtension>'+
                  '</ext:UBLExtensions>'+
                  '<cbc:UBLVersionID>2.0</cbc:UBLVersionID>'+
                  '<cbc:CustomizationID>1.0</cbc:CustomizationID>'+
                  '<cbc:ID>'+data.idnumero+'</cbc:ID>'+
                  '<cbc:ReferenceDate>'+data.fecha_de_emision+'</cbc:ReferenceDate>'+
                  '<cbc:IssueDate>'+data.fecha_de_emision+'</cbc:IssueDate>'+
                  '<cac:Signature>'+
                    '<cbc:ID>'+rucemisor+'</cbc:ID>'+
                    '<cac:SignatoryParty>'+
                      '<cac:PartyIdentification>'+
                        '<cbc:ID>'+rucemisor+'</cbc:ID>'+
                      '</cac:PartyIdentification>'+
                      '<cac:PartyName>'+
                        '<cbc:Name>'+razonemisor+'</cbc:Name>'+
                      '</cac:PartyName>'+
                    '</cac:SignatoryParty>'+
                    '<cac:DigitalSignatureAttachment>'+
                      '<cac:ExternalReference>'+
                        '<cbc:URI>'+rucemisor+'</cbc:URI>'+
                      '</cac:ExternalReference>'+
                    '</cac:DigitalSignatureAttachment>'+
                  '</cac:Signature>'+
                  '<cac:AccountingSupplierParty>'+
                    '<cbc:CustomerAssignedAccountID>'+rucemisor+'</cbc:CustomerAssignedAccountID>'+
                    '<cbc:AdditionalAccountID>6</cbc:AdditionalAccountID>'+
                    '<cac:Party>'+
                      '<cac:PartyLegalEntity>'+
                        '<cbc:RegistrationName>'+razonemisor+'</cbc:RegistrationName>'+
                      '</cac:PartyLegalEntity>'+
                    '</cac:Party>'+
                  '</cac:AccountingSupplierParty>';



                fs.writeFileSync(archivosinfirma, plantilla1,(err) => {
                    if (err) throw err;
                           console.log('llenado de plantilla1 ');
                    });






                for(var atr in data.items){


                item=item+1;


               


                //$tipo=str_pad($TD_ID, 2, "0", STR_PAD_LEFT);  
                
                tipo="0"+data.items[atr].td_id;

                //$serie="B".str_pad($DVC_Serie,3, "0", STR_PAD_LEFT);
               // serie=data.items[atr].dvc_serie;
               
                //serie=seri1t.padStart(3,"0"); 

                nrobol=data.items[atr].dvc_serie+"-"+data.items[atr].dvc_numero;
                totalitem=data.items[atr].grand_total;
                valorventa=data.items[atr].total;
                igv=data.items[atr].total_tax;
                condition=data.items[atr].condition;


               
                    dni=data.items[atr].cf1;                
                    td='6';
   
   
              

                var plantilla22='<sac:SummaryDocumentsLine>'+
                    '<cbc:LineID>'+item.toString()+'</cbc:LineID>'+
                    '<cbc:DocumentTypeCode>'+tipo+'</cbc:DocumentTypeCode>'+
                    '<cbc:ID>'+nrobol+'</cbc:ID>'+
                    '<cac:AccountingCustomerParty>'+
                        '<cbc:CustomerAssignedAccountID>'+ dni +'</cbc:CustomerAssignedAccountID>'+
                        '<cbc:AdditionalAccountID>'+td+'</cbc:AdditionalAccountID>'+
                    '</cac:AccountingCustomerParty>'+
                    '<cac:Status>'+
                       '<cbc:ConditionCode>'+condition+'</cbc:ConditionCode>'+
                    '</cac:Status>'+
                    '<sac:TotalAmount currencyID="PEN">'+totalitem+'</sac:TotalAmount>'+
                    '<sac:BillingPayment>'+
                       '<cbc:PaidAmount currencyID="PEN">'+valorventa+'</cbc:PaidAmount>'+
                       '<cbc:InstructionID>01</cbc:InstructionID>'+
                    '</sac:BillingPayment>'+
                    '<cac:TaxTotal>'+
                        '<cbc:TaxAmount currencyID="PEN">'+igv+'</cbc:TaxAmount>'+
                        '<cac:TaxSubtotal>'+
                            '<cbc:TaxAmount currencyID="PEN">'+igv+'</cbc:TaxAmount>'+
                             '<cac:TaxCategory>'+
                               '<cac:TaxScheme>'+
                                   '<cbc:ID>1000</cbc:ID>'+
                                   '<cbc:Name>IGV</cbc:Name>'+
                                   '<cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>'+
                               '</cac:TaxScheme>'+
                             '</cac:TaxCategory>'+
                          '</cac:TaxSubtotal>'+
                    '</cac:TaxTotal>'+
                '</sac:SummaryDocumentsLine>';











                


                //console.log(item);
                /// console.log(data.items[atr].codigo);
                // console.log(data.items[atr].unidad_de_medida);
                
                fs.appendFile(archivosinfirma, plantilla22, (err) => {
                if (err) throw err;
                       console.log('llenado el fro items sin anu ');
                });


                } //fin del for


                for(var atr in data.itemsAnu){


                    item=item+1;
    
    
                   
    
                    //$tipo=str_pad($TD_ID, 2, "0", STR_PAD_LEFT);  

                    tipo="0"+data.itemsAnu[atr].td_id;
                    
                    //tipo=data.items[atr].td_id.padStart(2,"0");
    
                    //$serie="B".str_pad($DVC_Serie,3, "0", STR_PAD_LEFT);
                   // serie=data.items[atr].dvc_serie;
                   
                    //serie=seri1t.padStart(3,"0"); 

                    nrobol=data.itemsAnu[atr].dvc_serie+"-"+data.itemsAnu[atr].dvc_numero;

                    var nserie=data.itemsAnu[atr].dvc_serie;
                    var nnumero=data.itemsAnu[atr].dvc_numero;
    
                    //nrobol=serie+"-"+data.itemsAnu[atr].dvc_numero;
                    totalitem=data.itemsAnu[atr].grand_total;
                    valorventa=data.itemsAnu[atr].total;
                    igv=data.itemsAnu[atr].total_tax;
                    condition=data.itemsAnu[atr].condition;
    
    
                 
                        dni=data.itemsAnu[atr].cf1;                
                        td='6';
       
       
                  
    
    
                    


                   var  plantilla24='<sac:VoidedDocumentsLine>'+
                        '<cbc:LineID>'+item.toString()+'</cbc:LineID>'+
                        '<cbc:DocumentTypeCode>'+tipo+'</cbc:DocumentTypeCode>'+
                        '<sac:DocumentSerialID>'+nserie+'</sac:DocumentSerialID>'+
                        '<sac:DocumentNumberID>'+nnumero+'</sac:DocumentNumberID>'+
                        '<sac:VoidReasonDescription>Anulacion de la operacion</sac:VoidReasonDescription>'+
                        '</sac:VoidedDocumentsLine>';

    
    
    
    
    
    
                    
    
    
                    //console.log(item);
                    /// console.log(data.items[atr].codigo);
                    // console.log(data.items[atr].unidad_de_medida);
                    
                    fs.appendFile(archivosinfirma, plantilla24, (err) => {
                    if (err) throw err;
                           console.log('llenado el fro  anulados');
                    });
    
    
                    } //fin del for anulados











                //final del for


                fs.appendFile(archivosinfirma, plantilla33, (err) => {
                if (err) throw err;
                console.log("llenado de plantilla 33 cierre de archivo");
               

                var exec = require('child_process').exec, child;          
                var orden2=' xmlsec1 --sign --privkey-pem private_key.pem,certificado.pem --output '+firmado +' '+ archivosinfirma ;
                var orden3 = " && zip "+ firmadozip+ " "+ firmado;

                console.log(orden2);

                child = exec(orden2+orden3, 
                // Pasamos los parámetros error, stdout la salida 
                // que mostrara el comando
                function (error, stdout, stderr) {


                    if (err){
                        console.log("error firmando el archivo anulacion");
                        console.log(err);

                    }
                    if (stderr){
                        console.log("error firmando el archivo  stderr anulacion");
                        console.log(stderr);
                    }
                    else{

                        console.log("si asdasdasdasdasdasdasd")
                    
                    // Imprimimos en pantalla con console.log
                     console.log(stdout);

                     console.log("firmando completado");

                     console.log("enviamos el archivo");

                     var data = fs.readFileSync(firmadozip,{
                        encoding:"base64"
                    },(err) => {
                        if(err){
                            console.error(err)
                        }
                        else{
                              //aqui el codigo una vez que este firmado realizar
                              console.log("procedimiento para el envio aqui debe ir "); 
                        }

                      }
                    
                    );
                    
                   // console.log(data);

                    var resultado= "RA-"+nticket;

                    resulcli=resultado;



             


                    var soap = require('soap');
                    var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
                    var options = {
                            forceSoap12Headers: false
                        };


                          soap.createClient(url, options, function (err, client) {
                            var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {})
                            console.log(wsSecurity);

                            if (err){
                                console.log("errrrrrrrr");
                                console.log(err)

                                console.log(client)
                            }

                           if (client==undefined){
                                    console.log("no colgar"); 
                                    res.json("0");  
                           }
                         // console.log()
                          
                           else{ 

                            client.setSecurity(wsSecurity);
                            client.sendSummary({
                              fileName:firmadozip,
                              contentFile:data
                          },(err, res) => {
                              if(err){
                                  console.log("aqui mostramos el error enviado por la sunar al no recibir bien el archivo");

                                  var mo= Resbolanu.findOne({title:title},function callback(error,a){
                                      if (error !==null){

                                       console.log("error "); 
                                      }
                                      else {
                                          if (a==null){
                                               
                                              res.json("0");
                                              

                                          }
                                          else{


                                         
                                      console.log("mostramos el resultado de a")   
                                      console.log(a);
                                       var idmodifica=a._id;
                                       console.log(idmodifica);
                                       //console.log(res.applicationResponse);

                                        var contenido = err;
                                        console.log("ponemos el contenido del error en una varable");
                                        console.log(contenido);
                                         var actualizalo= Resbolanu.findByIdAndUpdate(idmodifica, {
                                           error:contenido

                                       },function callback(error,b){
                                           if (error !==null){
                                               console.log(error);
                                           }
                                           else{

                                               console.log("modificado");
                                           }
                                       });

                                         
                                      }//else de null
                                         
                                      
                                      } //else



                                  } );



                                  console.error(err);
                              }else{
                                  console.log("se ha enviado a la sunar y esta es la respuesta ");
                      
                                        //ticket=[res.applicationResponse];
                                       // console.log(ticket[0]);

                                       fs.writeFile(resultado,res.ticket ,{
                                          // encoding:"base64"
                                       },
                                        function(err) {
                                          if(err) {
                                              return console.log(err);
                                          }
                      
                                          console.log("Se ha Generado la Resopuesta de la sunat!");

                                          
                                         // resulcli={"xml_zip_base64":res.applicationResponse}

                                          console.log("hemos terminado");
                                          //Note.findOne({title:req.params.idope}
/*
                                          Users.find({ 
                                              tel:7862627420
                                            }, function callback(error, a) {
                                            
                                            // aquí si exite a
                                            console.log(a)
                                            if (error !== null) {
                      console.log("error ");
                  console.log('exec error: ' + error);
                  }
                                            })
                                            
                                            const { title, content, duration, date, author } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
      duration,
      author
  });
                                            */

                                         var mo= Resbolanu.findOne({title:title},function callback(error,a){
                                             if (error !==null){

                                              console.log("error "); 
                                             }
                                             else {
                                             console.log(a);

                                             if (a==null){
                                                 console.log("valode a es nulo ")

                                             }
                                             else{

                                              var idmodifica=a._id;
                                              console.log(idmodifica);
                                              console.log(res.ticket);

                                               var contenido = res.ticket;
                                               console.log("ponemos el contenido en una varable");
                                               console.log(contenido);
                                                var actualiza= Resbolanu.findByIdAndUpdate(idmodifica, {
                                                  content:contenido,
                                                  xml:data,
                                                  cdr:"0"

                                              },function callback(error,b){
                                                  if (error !==null){
                                                      console.log(error);
                                                  }
                                                  else{

                                                      console.log("modificado adicionado el numero de ticket");
                                                  }
                                              });

                                                
                                             
                                            } //else null a  
                                             
                                             } //elsecondiicon
                                         } );
                                          //console.log(mo.title);

                                          








                                         // localhost:4001/api/notes

                                         // console.log(resulcli);

                                          

                                        
                                           //callback(resulcli);
                                      });
                                                           
                                   console.log("que erespuest es esta"); 
                                  console.log(res);
                      
                                  //console.log(Object.values(res));
                      
                              }

     
                          }); //cierra sendbill





                          console.log("envciamos el nombre del archivo para la consulta con la otyra api");
                          console.log(title); 
            
                          res.json(title);


                           }

                            



                        }    ///termino el soap
                        
                        
                        );   //cierra soapcreate 


                                             
                    // controlamos el error
                    if (error !== null) {
                        console.log("error ");
                    console.log('exec error: ' + error);
                    }

                } //else del std error
 
                });  //din del cierre del firmado de archivo
                
                
                //res.json("hola");
              

            });


  /// aqui la funcion para enviar el archivo 






  ///

/*
  var fs = require('fs');
  /*
  var resulzip = fs.readFileSync(resultado,{
    encoding:"base64"
 });
    
 console.log("enviamos el zip a php");
 //console.log(resulzip);


console.log(resulcli);


 resulcli = {
    "operacion"				: "generar_comprobante",
    "tipo_de_comprobante"               :"01",
    "serie"                             : "FFF1",
    "numero"				: "1",
    "sunat_transaction"			: "1",
    "cliente_tipo_de_documento"		: "6",
    "cliente_numero_de_documento"	: "20600695771",
    "aceptada_por_sunat" :"si",
    "sunat_responsecode":"",
    "sunat_soap_error":"",
    "pdf_zip_base64":"",
    "xml_zip_base64":"",
    "codigo_hash":""


 }
  
    
  */



    
};


/////////////////////////////////////////

////////////////////////////////////////////////




resbolCtrl.getNote = async (req, res) => {
    const note = await Resbolanu.findById(req.params.id);
    res.json(note);
}





resbolCtrl.getNoteope = async (req, res) => {
    const note1 = await Resbolanu.findOne({title:req.params.idope}, function(err,note) {

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
                  var nxml=req.params.idope;
                  nxml=nxml.slice(0, -3)+"zip";
                  var dataxml = fs.readFileSync(nxml,{
                    encoding:"base64"
                },(err, res) => {
                    if(err){
                        console.error(err)
                    }
                  });

                                  
                var  data1={
                    _id:note._id,
                    rucemisor:note.rucemisor,
                    content:note.content,
                    date:note.date,
                   
                    autor:note.author,
                    /*
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
                    */
                   // pdf_zip_base64:datapdf,
                    xml_zip_base64:dataxml,
                    cdr_zip_base64:note.content,
                    txt_zip_base64:note.content,
                                
                    
                    title:note.title
                } 
                res.json(data1);
            }

        }


        console.log("The file was loking");
    }
);




    

    
}












resbolCtrl.getNoteopeConsul300 = async (req, res) => {
    const note1 = await Resbolanu.findOne({title:req.params.idope}, function(err,note) {

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





                                var soap = require('soap');
                                var fs = require('fs');
                                var http = require('http');
                                var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
                                var options = {
                                    forceSoap12Headers: false
                                };
                                var archivo =req.params.idope;
                                 var nuevo="RC-"+archivo.slice(0, -3)+"txt";
                                 var archivozip ="RR-"+req.params.idope;
                                //var archivo="RC-"+req.params.idope;

                                data=(note.content).trim();

                                //var data = fs.readFileSync(nuevo,{
                                    
                               // });

                               // data=(data.toString()).trim();

                               // data="1579518880208";


                                console.log("empezamos a consultar el ticket");
                                console.log(data);



                                soap.createClient(url, options, function (err, client) {

                                    var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {})




                                client.setSecurity(wsSecurity);
                                client.getStatus({
                                        ticket:data
                                        
                                    },(err, res) => {
                                        if(err){
                                            console.error(err);
                                        }else{
                                            console.log("esta es la respuesat ");
                                    

                                                fs.writeFile("E-20455968268-01-F001-2089.txt",res.status.statusCode ,{
                                                    
                                                },
                                                function(err) {
                                                    if(err) {
                                                        return console.log(err);
                                                    }

                                                    console.log("The file was saved!");
                                                }); 

                                                fs.writeFile(archivozip,res.status.content ,{
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

                        }//elsecontentza

                    } //else nulll      

                });//cierrra note1 
                res.json("0");
      }      
               





resbolCtrl.getNoteopeConsul = async (req, res) => {
    const note1 = await Resbolanu.findOne({title:req.params.idope}, function(err,note) {

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

                 contecdr=(note.cdr).trim();

                if (contecdr=="0"){

                

                  console.log(note.content); 
                  var title= req.params.idope;
                  var nticket=(note.content).trim();
                  var resultado="RR"+req.params.idope

                  var fs = require('fs');        

                  var nxml=req.params.idope;

                  nxml=nxml.slice(0, -3)+"zip";
                  var dataxml = fs.readFileSync(nxml,{
                    encoding:"base64"
                },(err, res) => {
                    if(err){
                        console.error(err)
                    }
                  });

                  var  data1={
                    _id:note._id,
                    rucemisor:note.rucemisor,
                    content:note.content,
                    date:note.date,   
                    autor:note.author,
                    txt_zip_base64:note.content,
                    xml_zip_base64:dataxml,
                    title:note.title,
                    cdr:note.cdr   
                



                }



                var soap = require('soap');
                var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
                var options = {
                        forceSoap12Headers: false
                    };


                      soap.createClient(url, options, function (err, client) {
                        var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {})
                        console.log(wsSecurity);

                        if (err){
                            console.log("errrrrrrrr");
                            console.log(err)

                            console.log(client)
                        }

                       if (client==undefined){
                                console.log("no colgar"); 
                                res.json("0");  
                       }
                     // console.log()
                      
                       else{ 

                        
                        client.setSecurity(wsSecurity);
                        client.getStatus({
                          ticket:nticket,
                          
                      },(err, res) => {
                          if(err){
                              console.log("aqui mostramos el error enviado por la sunar al no recibir bien el archivo");

                               var mo= Resbolanu.findOne({title:title},function callback(error,a){
                                  if (error !==null){

                                   console.log("error "); 
                                  }
                                  else {
                                      if (a==null){
                                           
                                          res.json("0");
                                          

                                      }
                                      else{


                                     
                                  console.log("mostramos el resultado de a")   
                                  console.log(a);
                                   var idmodifica=a._id;
                                   console.log(idmodifica);
                                   //console.log(res.applicationResponse);

                                    var contenido = err;
                                    console.log("ponemos el contenido del error en una varable");
                                    console.log(contenido);
                                     var actualizalo= Resbolanu.findByIdAndUpdate(idmodifica, {
                                       error:contenido

                                   },function callback(error,b){
                                       if (error !==null){
                                           console.log(error);
                                       }
                                       else{

                                           console.log("modificado");
                                       }
                                   });

                                     
                                  }//else de null
                                     
                                  
                                  } //else



                              } );



                              console.error(err);
                          }else{
                              console.log("se ha enviado a la sunar y esta es la respuesta ");
                  
                                    //ticket=[res.applicationResponse];
                                   // console.log(ticket[0]);

                                   fs.writeFile(resultado,res.status.content ,{
                                       encoding:"base64"
                                   },
                                    function(err) {
                                      if(err) {
                                          return console.log(err);
                                      }
                  
                                      console.log("Se ha Generado la Resopuesta de la sunat!");

                                      


                                      console.log("hemos terminado");

                                     var mo= Resbolanu.findOne({title:title},function callback(error,a){
                                         if (error !==null){

                                          console.log("error "); 
                                         }
                                         else {
                                         console.log(a);

                                         if (a==null){
                                             console.log("valode a es nulo ")

                                         }
                                         else{

                                          var idmodifica=a._id;
                                          console.log(idmodifica);
                                          console.log(res.status.content);

                                           var contenido = res.status.content;
                                           var mensaje=res.status.statusCode;
                                           console.log("ponemos el contenido en una varable");
                                           console.log(contenido);
                                            var actualiza= Resbolanu.findByIdAndUpdate(idmodifica, {
                                              cdr:contenido,
                                              estado:mensaje

                                          },function callback(error,b){
                                              if (error !==null){
                                                  console.log(error);
                                              }
                                              else{

                                                  console.log("modificado adicionado el cdr de respuesta sunat");
                                              }
                                          });

                                            
                                         
                                        } //else null a  
                                         
                                         } //elsecondiicon
                                     } );
                                      
                                  });
                                                       
                               console.log("que erespuest es esta"); 
                              console.log(res);
                  
                              
                  
                          }

 
                      }); //cierra sendbill


                      console.log("envciamos el nombre del archivo para la consulta con la otyra api");
                      console.log(title); 
        
                     // res.json(title);


                       }

                        



                    }    ///termino el soap
                    
                    
                    );   //cierra soapcreate 



                                  
                
                res.json(data1);



                }//todo lo anterior se ejecuta si en el cdr de respuesta se encuentra sin ningun valor caso
                 //contrario noi se ejecuta nada
                else{

                  res.json(note);

                } 
               

            } //else   para salir si content es diferente de za

        }


        console.log("Archivo Localizado");
    }
);




    

    
}









//


resbolCtrl.deleteNote = async (req, res) => {
    await Resbolanu.findByIdAndDelete(req.params.id)


    console.log("entrando a la funcion de borrado resbolanu");
    res.json('Note Deleted');
}




resbolCtrl.updateNote = async (req, res) => {
    const { title, content, duration, date, author } = req.body;
    await Resbolanu.findByIdAndUpdate(req.params.id, {
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

resbolCtrl.deleNota = async (req, res) => {
    const note = await Resbolanu.findOne({title:req.params.idope}, function(err,borrado) {
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

                console.log("Borrado activo resbolanu");
                
                
            })
        } 
            
        
    }
);
console.log("esta boirrado resbolanu");
res.json("1");

}






module.exports = resbolCtrl;