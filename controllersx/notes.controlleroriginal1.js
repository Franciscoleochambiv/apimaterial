const notesCtrl = {};

const Note = require('../models/Note');
const Items = require('../models/Items');

const { createInvoice } = require("../createInvoice.js");


notesCtrl.getNotes = async (req, res) => {
  
    const notes = await Note.find();
    console.log("likstado");
    res.json(notes);
};

notesCtrl.createNote = async (req, res) => {
    const { 
            title:title,
            content:content,
            author:author,
            date:date,    
            
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
            tipo_de_comprobante
    } = req.body; 

    


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
            total_igv:total_igv,
            total_gravada:total_gravada,
            total:total,
            tipo_de_comprobante:tipo_de_comprobante,
            error:"0",

        
    });

  

    await newNote.save();

    const invoice=req.body;
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






    
    const data=req.body;

    var envia=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".zip";
    var envia1=req.body.rucemisor+"-"+req.body.tipo_de_comprobante+"-"+req.body.serie+"-"+req.body.numero+".xml";

    console.log(envia);


    //data1.comprimir(envia1);
    
    


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

                var plantilla3 ='</Invoice>';


                //20455968268-01-F001-2089.zip

                var nombrearchivo=rucemisor+"-"+data.tipo_de_comprobante+"-"+data.serie+"-"+data.numero;
                var archivosinfirma=nombrearchivo+"sf"+".xml";
                var firmado=nombrearchivo+".xml";
                var firmadozip=nombrearchivo+".zip";
                var pdf=nombrearchivo+".pdf";



                createInvoice(invoice, pdf);

                var plantilla='<?xml version="1.0" encoding="UTF-8"?>'+
                '<Invoice xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ccts="urn:un:unece:uncefact:documentation:2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2" xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">'+
                '<ext:UBLExtensions>'+
                    '<ext:UBLExtension>'+
                    '<ext:ExtensionContent>'+ 
                    '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">'+
                        '<SignedInfo>'+
                            '<CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>'+
                            '<SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>'+
                            '<Reference URI="">'+
                            '<Transforms>'+
                            '<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />'+
                            '</Transforms>'+
                            '<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>'+
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
                '<cbc:UBLVersionID>2.1</cbc:UBLVersionID>'+
                '<cbc:CustomizationID>2.0</cbc:CustomizationID>'+
                '<cbc:ID>'+data.serie+"-"+data.numero+'</cbc:ID>'+
                '<cbc:IssueDate>'+data.fecha_de_emision+'</cbc:IssueDate>'+
                '<cbc:DueDate>'+data.fecha_de_emision+'</cbc:DueDate>'+
                '<cbc:InvoiceTypeCode listID="0101" listAgencyName="PE:SUNAT" listName="Tipo de Documento" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01" name="Tipo de Operacion" listSchemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo51">'+data.tipo_de_comprobante+'</cbc:InvoiceTypeCode>'+
                '<cbc:Note languageLocaleID="1000">'+data.total_letras+'</cbc:Note>'+
                '<cbc:DocumentCurrencyCode listID="ISO 4217 Alpha" listAgencyName="United Nations Economic Commission for Europe" listName="Currency">PEN</cbc:DocumentCurrencyCode>'+
                '<cac:Signature>'+
                    '<cbc:ID>'+rucemisor+'</cbc:ID>'+
                    '<cbc:Note>'+proveedor+'</cbc:Note>'+
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
                    '<cac:Party>'+
                    '<cac:PartyIdentification>'+
                        '<cbc:ID schemeID="6" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">'+rucemisor+'</cbc:ID>'+
                    '</cac:PartyIdentification>'+
                    '<cac:PartyName>'+
                    '<cbc:Name>'+razonemisor+'</cbc:Name>'+
                    '</cac:PartyName>'+
                    '<cac:PartyLegalEntity>'+
                        '<cbc:RegistrationName>'+razonemisor+'</cbc:RegistrationName>'+
                        '<cac:RegistrationAddress>'+
                        '<cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI">040110</cbc:ID>'+
                        '<cbc:AddressTypeCode listAgencyName="PE:SUNAT" listName="Establecimientos anexos">0001</cbc:AddressTypeCode>'+
                        '<cbc:CityName>'+provincia+'</cbc:CityName>'+
                        '<cbc:CountrySubentity>'+ciudad+'</cbc:CountrySubentity>'+
                        '<cbc:District>'+distrito+'</cbc:District>'+
                        '<cac:AddressLine>'+
                            '<cbc:Line>'+diremisor+'</cbc:Line>'+
                        '</cac:AddressLine>'+
                        '<cac:Country>'+
                            '<cbc:IdentificationCode listID="ISO 3166-1" listAgencyName="United Nations Economic Commission for Europe" listName="Country">PE</cbc:IdentificationCode>'+
                        '</cac:Country>'+
                        '</cac:RegistrationAddress>'+
                    '</cac:PartyLegalEntity>'+
                    '</cac:Party>'+
                '</cac:AccountingSupplierParty>'+
                '<cac:AccountingCustomerParty>'+
                    '<cac:Party>'+
                    '<cac:PartyIdentification>'+
                        '<cbc:ID schemeID="6" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">'+data.cliente_numero_de_documento+'</cbc:ID>'+
                    '</cac:PartyIdentification>'+
                    '<cac:PartyLegalEntity>'+
                        '<cbc:RegistrationName>'+data.cliente_denominacion+'</cbc:RegistrationName>'+
                    '</cac:PartyLegalEntity>'+
                    '</cac:Party>'+
                '</cac:AccountingCustomerParty>'+
                '<cac:TaxTotal>'+
                    '<cbc:TaxAmount currencyID="PEN">'+data.total_igv+'</cbc:TaxAmount>'+
                    '<cac:TaxSubtotal>'+
                    '<cbc:TaxableAmount currencyID="PEN">'+data.total_gravada+'</cbc:TaxableAmount>'+
                    '<cbc:TaxAmount currencyID="PEN">'+data.total_igv+'</cbc:TaxAmount>'+
                    '<cac:TaxCategory>'+
                        '<cac:TaxScheme>'+
                        '<cbc:ID schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05">1000</cbc:ID>'+
                        '<cbc:Name>IGV</cbc:Name>'+
                        '<cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>'+
                        '</cac:TaxScheme>'+
                    '</cac:TaxCategory>'+
                    '</cac:TaxSubtotal>'+
                '</cac:TaxTotal>'+
                '<cac:LegalMonetaryTotal>'+
                    '<cbc:LineExtensionAmount currencyID="PEN">'+data.total_gravada+'</cbc:LineExtensionAmount>'+
                    '<cbc:TaxInclusiveAmount currencyID="PEN">'+data.total+'</cbc:TaxInclusiveAmount>'+
                    '<cbc:AllowanceTotalAmount currencyID="PEN">0.00</cbc:AllowanceTotalAmount>'+
                    '<cbc:ChargeTotalAmount currencyID="PEN">0.00</cbc:ChargeTotalAmount>'+
                    '<cbc:PrepaidAmount currencyID="PEN">0.00</cbc:PrepaidAmount>'+
                    '<cbc:PayableAmount currencyID="PEN">'+data.total+'</cbc:PayableAmount>'+
                '</cac:LegalMonetaryTotal>';



                fs.writeFileSync(archivosinfirma, plantilla);


                for(var atr in data.items){


                item=item+1;


                var plantilla2=
                '<cac:InvoiceLine>'+
                '<cbc:ID>'+item.toString()+'</cbc:ID>'+
                '<cbc:InvoicedQuantity unitCode="'+data.items[atr].unidad_de_medida+'" unitCodeListID="UN/ECE rec 20" unitCodeListAgencyName="United Nations Economic Commission for Europe">'+data.items[atr].quantity+'</cbc:InvoicedQuantity>'+
                '<cbc:LineExtensionAmount currencyID="PEN">'+data.items[atr].item_tax+'</cbc:LineExtensionAmount>'+
                '<cac:PricingReference>'+
                    '<cac:AlternativeConditionPrice>'+
                    '<cbc:PriceAmount currencyID="PEN">'+data.items[atr].unit_price+'</cbc:PriceAmount>'+
                    '<cbc:PriceTypeCode listAgencyName="PE:SUNAT" listName="Tipo de Precio" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16">01</cbc:PriceTypeCode>'+
                    '</cac:AlternativeConditionPrice>'+
                '</cac:PricingReference>'+
                '<cac:TaxTotal>'+
                    '<cbc:TaxAmount currencyID="PEN">'+data.items[atr].tax+'</cbc:TaxAmount>'+
                    '<cac:TaxSubtotal>'+
                    '<cbc:TaxableAmount currencyID="PEN">'+data.items[atr].item_tax+'</cbc:TaxableAmount>'+
                    '<cbc:TaxAmount currencyID="PEN">'+data.items[atr].tax+'</cbc:TaxAmount>'+
                    '<cac:TaxCategory>'+
                        '<cbc:Percent>'+data.porcentaje_de_igv+'</cbc:Percent>'+
                        '<cbc:TaxExemptionReasonCode listAgencyName="PE:SUNAT" listName="Afectacion del IGV" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07">10</cbc:TaxExemptionReasonCode>'+
                        '<cac:TaxScheme>'+
                        '<cbc:ID schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05">1000</cbc:ID>'+
                        '<cbc:Name>IGV</cbc:Name>'+
                        '<cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>'+
                        '</cac:TaxScheme>'+
                    '</cac:TaxCategory>'+
                    '</cac:TaxSubtotal>'+
                '</cac:TaxTotal>'+
                '<cac:Item>'+
                    '<cbc:Description>'+data.items[atr].product_name+'</cbc:Description>'+
                '</cac:Item>'+
                '<cac:Price>'+
                    '<cbc:PriceAmount currencyID="PEN">'+data.items[atr].real_unit_price+'</cbc:PriceAmount>'+
                '</cac:Price>'+
                '</cac:InvoiceLine>';


                


                //console.log(item);
                /// console.log(data.items[atr].codigo);
                // console.log(data.items[atr].unidad_de_medida);
                
                fs.appendFile(archivosinfirma, plantilla2, (err) => {
                if (err) throw err;
                       console.log('llenado el fro ');
                });


                }
                //final del for


                fs.appendFile(archivosinfirma, plantilla3, (err) => {
                if (err) throw err;
               

                var exec = require('child_process').exec, child;          
                var orden2=' xmlsec1 --sign --privkey-pem private_key.pem,certificado.pem --output '+firmado +' '+ archivosinfirma ;
                var orden3 = " && zip "+ firmadozip+ " "+ firmado;

                console.log(orden2);

                child = exec(orden2+orden3, 
                // Pasamos los parámetros error, stdout la salida 
                // que mostrara el comando
                function (error, stdout, stderr) {


                    if (err){
                        console.log("error firmando el archivo");
                        console.log(err);

                    }
                    if (stderr){
                        console.log("error firmando el archivo  stderr");
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

                    var resultado= "R-"+firmadozip;

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
                            client.sendBill({
                              fileName:firmadozip,
                              contentFile:data
                          },(err, res) => {
                              if(err){
                                  console.log("aqui mostramos el error enviado por la sunar al no recibir bien el archivo");

                                  var mo= Note.findOne({title:title},function callback(error,a){
                                      if (error !==null){

                                       console.log("error "); 
                                      }
                                      else {
                                          if (a==null){
                                               
                                              res.json("0");
                                              

                                          }
                                          else{


                                         

                                      //console.log(a);
                                       var idmodifica=a._id;
                                       console.log(idmodifica);
                                       //console.log(res.applicationResponse);

                                        var contenido = err;
                                        console.log("ponemos el contenido del error en una varable");
                                        console.log(contenido);
                                         var actualizalo= Note.findByIdAndUpdate(idmodifica, {
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
                      
                      
                                       fs.writeFile(resultado,res.applicationResponse ,{
                                           encoding:"base64"
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

                                         var mo= Note.findOne({title:title},function callback(error,a){
                                             if (error !==null){

                                              console.log("error "); 
                                             }
                                             else {
                                             console.log(a);
                                              var idmodifica=a._id;
                                              console.log(idmodifica);
                                              console.log(res.applicationResponse);

                                               var contenido = res.applicationResponse;
                                               console.log("ponemos el contenido en una varable");
                                               console.log(contenido);
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

                                                
                                             
                                                
                                             
                                             }
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

                 

                }
            }//cierre deñ eslse si todo esta bien
             
                
                ); //cierra la funciomn  del archvi firmado le child 

                
                
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