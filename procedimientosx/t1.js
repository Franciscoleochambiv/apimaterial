const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
  var exec1 = require('child_process').exec;

const exec = util.promisify(exec1);
var qr = require('qr-image');  


//const notesCtrl1 = {};

const Note1 = require('../models/Note');




//var util =require('util')

//var fs = require('fs');

//const fs1=util.promisify(fs.writeFile);
//const sleep=util.promisify(setTimeout);

//const archivo=util.promisify(fs);

module.exports ={

    async taskOne(archivosinfirma,serie,numero,
                  fecha_de_emision,total_letras,
                  rucemisor,proveedor,razonemisor,
                  provincia,ciudad,distrito,diremisor,
                  cliente_numero_de_documento,cliente_denominacion,
                  total_igv,total_gravada,total,tipo_de_comprobante
                  ){

        try{  
         // var f = new Date();
         // horaA=f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate();

          




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
                '<cbc:ID>'+serie+"-"+numero+'</cbc:ID>'+
                '<cbc:IssueDate>'+fecha_de_emision+'</cbc:IssueDate>'+
                '<cbc:DueDate>'+fecha_de_emision+'</cbc:DueDate>'+
                '<cbc:InvoiceTypeCode listID="0101" listAgencyName="PE:SUNAT" listName="Tipo de Documento" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01" name="Tipo de Operacion" listSchemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo51">'+tipo_de_comprobante+'</cbc:InvoiceTypeCode>'+
                '<cbc:Note languageLocaleID="1000">'+total_letras+'</cbc:Note>'+
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
                        '<cbc:ID schemeID="6" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">'+cliente_numero_de_documento+'</cbc:ID>'+
                    '</cac:PartyIdentification>'+
                    '<cac:PartyLegalEntity>'+
                        '<cbc:RegistrationName>'+cliente_denominacion+'</cbc:RegistrationName>'+
                    '</cac:PartyLegalEntity>'+
                    '</cac:Party>'+
                '</cac:AccountingCustomerParty>'+
                '<cac:TaxTotal>'+
                    '<cbc:TaxAmount currencyID="PEN">'+total_igv+'</cbc:TaxAmount>'+
                    '<cac:TaxSubtotal>'+
                    '<cbc:TaxableAmount currencyID="PEN">'+total_gravada+'</cbc:TaxableAmount>'+
                    '<cbc:TaxAmount currencyID="PEN">'+total_igv+'</cbc:TaxAmount>'+
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
                    '<cbc:LineExtensionAmount currencyID="PEN">'+total_gravada+'</cbc:LineExtensionAmount>'+
                    '<cbc:TaxInclusiveAmount currencyID="PEN">'+total+'</cbc:TaxInclusiveAmount>'+
                    '<cbc:AllowanceTotalAmount currencyID="PEN">0.00</cbc:AllowanceTotalAmount>'+
                    '<cbc:ChargeTotalAmount currencyID="PEN">0.00</cbc:ChargeTotalAmount>'+
                    '<cbc:PrepaidAmount currencyID="PEN">0.00</cbc:PrepaidAmount>'+
                    '<cbc:PayableAmount currencyID="PEN">'+total+'</cbc:PayableAmount>'+
                '</cac:LegalMonetaryTotal>';



               fs.writeFileSync(archivosinfirma, plantilla);






           // throw new Error('error lolo');
            //await sleep(4000);
            return 'ONE ';    
        }
        catch(e){ 
            console.log("existe un error");
            console.log(e);
        }

        
    },

    async taskTwo(archivosinfirma,porcentaje_de_igv,items){


        try{

        /*
            [ { id: 1,
                codigo: 'MCN-001',
                unidad: 'niu',
                cantidad: '8',
                precio: '7',
                descripcion: 'MANGUERA DE RADIADOR 3/4',
                total1: 56 },
              { id: 2,
                codigo: 'BCN-002',
                unidad: 'niu',
                cantidad: '8',
                precio: '9',
                descripcion: 'BOCAMASA  3/4',
                total1: 128 } ]
                */
          
            
            var item=0;


            
            for(var atr in items){


                item=item+1; 


                        var plantilla2=
                        '<cac:InvoiceLine>'+
                        '<cbc:ID>'+item.toString()+'</cbc:ID>'+
                        '<cbc:InvoicedQuantity unitCode="'+items[atr].unidad_de_medida+'" unitCodeListID="UN/ECE rec 20" unitCodeListAgencyName="United Nations Economic Commission for Europe">'+items[atr].quantity+'</cbc:InvoicedQuantity>'+
                        '<cbc:LineExtensionAmount currencyID="PEN">'+items[atr].item_tax+'</cbc:LineExtensionAmount>'+
                        '<cac:PricingReference>'+
                            '<cac:AlternativeConditionPrice>'+
                            '<cbc:PriceAmount currencyID="PEN">'+items[atr].unit_price+'</cbc:PriceAmount>'+
                            '<cbc:PriceTypeCode listAgencyName="PE:SUNAT" listName="Tipo de Precio" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16">01</cbc:PriceTypeCode>'+
                            '</cac:AlternativeConditionPrice>'+
                        '</cac:PricingReference>'+
                        '<cac:TaxTotal>'+
                            '<cbc:TaxAmount currencyID="PEN">'+items[atr].tax+'</cbc:TaxAmount>'+
                            '<cac:TaxSubtotal>'+
                            '<cbc:TaxableAmount currencyID="PEN">'+items[atr].item_tax+'</cbc:TaxableAmount>'+
                            '<cbc:TaxAmount currencyID="PEN">'+items[atr].tax+'</cbc:TaxAmount>'+
                            '<cac:TaxCategory>'+
                                '<cbc:Percent>'+porcentaje_de_igv+'</cbc:Percent>'+
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
                            '<cbc:Description>'+items[atr].product_name+'</cbc:Description>'+
                        '</cac:Item>'+
                        '<cac:Price>'+
                            '<cbc:PriceAmount currencyID="PEN">'+items[atr].real_unit_price+'</cbc:PriceAmount>'+
                        '</cac:Price>'+
                        '</cac:InvoiceLine>';

                
                         fs.appendFileSync(archivosinfirma, plantilla2, (err) => {
                        if (err) throw err;
                            console.log('llenado el fro ');
                        });

                    }   





            //await sleep(2000);
            return 'TWO';

        }
        catch(e){
               console.log(e);   
        }

        
    },

    async taskTree(archivosinfirma){

        
        try{
            var plantilla3 ='</Invoice>';
            fs.appendFileSync(archivosinfirma, plantilla3, (err) => {
                if (err) throw err;
                    console.log('llenado el fro ');
                });


                return  "tress"

           


        }
            
        catch(e){
            console.log(e);
        }


        
    } ,       

    async lectura(parameter1){
        try{
             

           //const  firmadozip='10309611131-01-F001-218.zip';
	      // const  firmado='./10309611131-01-F001-2148sf.xml';
           const  archivosinfirma=parameter1;
           
           fs.statSync(archivosinfirma);
           console.log('file or directory exists');

            //await sleep(2000);
            return archivosinfirma;

        }
        catch(e){
               console.log(e);   
        }

        
    },
    async firma(firmadozip,firmado,archivosinfirma){
        try{
             

           //const  firmadozip='10309611131-01-F001-2045.zip';
	       //const  firmado='./10309611131-01-F001-2045.xml';
           //const  archivosinfirma='./10309611131-01-F001-2045sf.xml';

           //var exec = require('child_process').exec, 
           var child; 

           

           var orden2=' xmlsec1 --sign --privkey-pem private_key.pem,certificado.pem --output '+firmado +' '+ archivosinfirma ;
           var orden3 = " && zip "+ firmadozip+ " "+ firmado;

           console.log(orden2+orden3);

       //    child = await exec(orden2);


           const { stdout, stderr } = await exec(orden2+orden3);

                if (stderr) {
                    console.error(`error: ${stderr}`);
                }
                console.log(`Number of files ${stdout}`);
                


           return firmadozip;                                                                                                                                                          ;

        }
        catch(e){
            console.log(e);  

          }
       },


       async leefirma(parameter1){
        try{
             
            const firmadozip=parameter1; 

           const data = fs.readFileSync(firmadozip,{
            encoding:"base64"
           });
           
           let busca=firmadozip.slice(0, -4);
           
           console.log("estamos en la opcion de  busqueda y acturalizacon de data")
           console.log(busca);


        /*
             Note1.findOneAndUpdate(
                {title:busca},
                {xml_zip_base64:data},
                )
                .then(console.log("encontrado"))
                .catch(console.log("error"))    
            
           
      */

             


           
            return data;

        }
        catch(e){
            console.log(e);  

          }
       },


       async envio(parameter1,parameter2){

        try{
             
            const firmadozip=parameter1;
            const data=parameter2; 
            const resultado= "R-"+firmadozip;

            const soap = require('soap');
            const url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
            const options = {
                    forceSoap12Headers: false
                };

            var args = {name: 'value'};


            console.log("entramos  a la funcion de envio ");    
                
                   
            let response =  await  soap.createClientAsync(url, options)
           // console.log(response)
            var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {});

           // console.log(wsSecurity)

            console.log("terminamos de displayat la seguridad")

            response.setSecurity(wsSecurity);

            console.log("establecemos setsecurity")

            let tresultado = await response.sendBillAsync({
                fileName:firmadozip,
                contentFile:data})
             console.log("esperamos el resultado  este es el cdr")  
             
            // console.log(tresultado[0].applicationResponse)



            

            //let seguridad = await response.setSecurityAsync(wsSecurity)

            console.log("resultado de seguridadxxxxxxxxxxxxxxxxxxx")
            //console.log(response)


                
              return (tresultado[0].applicationResponse)
                                                                                                                                                                ;

        }
        catch(e){
            console.log(e);  

          }
       },
       async escribircdr(parameter1,parameter2){
        try{

            let busca=parameter1.slice(0, -4);


            /*

           Note1.findOneAndUpdate(
                {title:busca},
                {cdr_zip_base64:parameter2},
                )
                .then(console.log("encontradocdr"))
                .catch(console.log("errorcdr"))    

      */

             

           const  firmadozipcdr="R-"+parameter1;

           //const archivo=util.promisify(fs);

          const fs_writeFile = util.promisify(fs.writeFile) 



          await fs_writeFile(firmadozipcdr,parameter2 ,{
            encoding:"base64"
           })
	       
          

           
            return firmadozipcdr;

        }
        catch(e){
               console.log(e);   
        }
        
    },


    async leefirmacdr1(parameter1){
        try{
             
            const firmadozip=parameter1; 

           const data = fs.readFileSync(firmadozip,{
            encoding:"base64"
           });
           
           let busca=firmadozip.slice(0, -4);
           
           console.log("estamos en la opcion de  busqueda y acturalizacon de data")
           console.log(busca);


        /*
             Note1.findOneAndUpdate(
                {title:busca},
                {xml_zip_base64:data},
                )
                .then(console.log("encontrado"))
                .catch(console.log("error"))    
            
           
      */

             


           
            return data;

        }
        catch(e){
            console.log(e);  

          }
       },
    
       

       async qrdato(parameter1){
        try{

            
            //const fs_createWriteStream = util.promisify(fs.createWriteStream);
           // const qr_image = util.promisify(qr.image);
            //const qr_pipe = util.promisify(qr.image);



           console.log("estamos generando la imagen ")  

            var code =  qr.image(parameter1, { type: 'png' });  
            var output =  fs.createWriteStream('quewy.png');
            code.pipe(output);             
            return 

        }
        catch(e){
            console.log(e);  

          }
       },







}
