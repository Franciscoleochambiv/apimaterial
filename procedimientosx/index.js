const {taskOne,taskTwo,taskTree,lectura,firma,leefirma,envio,escribircdr,leefirmacdr1,qrdato}= require('./t1.js');
const Note1 = require('../models/Note');
const { createInvoice } = require("../createInvoice");

async function main(
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
  )
  {
    try{

      /*     
          var items= [
               {unidad_de_medida:"NIU",
               item_tax:"100.00",
               quantity:"1",
               unit_price:"118.00",
               tax:"18.00",                
               product_name:"cALABAZA SASA",
               real_unit_price:"100.00"
               }

           ];
      */

        //const  firmadozip='10309611131-01-F001-2045.zip';
	       //const  firmado='./10309611131-01-F001-2045.xml';
           //const  archivosinfirma='./10309611131-01-F001-2045sf.xml';



        console.time('tiempo');
        const valor1=await taskOne(archivosinfirma,serie,numero,
            fecha_de_emision,total_letras,
            rucemisor,proveedor,razonemisor,
            provincia,ciudad,distrito,diremisor,
            cliente_numero_de_documento,cliente_denominacion,
            total_igv,total_gravada,total,tipo_de_comprobante
            );
        console.log("terminamos la funcion 1 ",valor1);




        const valor2=await taskTwo(archivosinfirma1,porcentaje_de_igv,items);

        console.log("terminamos la funcion 2",valor2);


        const valor21= await taskTree(archivosinfirma1);

        console.log("terminamos la funcion 3",valor21)

        console.timeEnd('tiempo');

        

        const valor3=await lectura(archivosinfirma);        
        console.log("valor 3",valor3);



        if (valor3==undefined){
            console.log("no se puede firmar elk arcjhivo porque no exiuste");
        }
        else{
          console.log(" valor 3 esta correto");  


          const firmado = await firma(firmadozip,firmadoori,archivosinfirma); 


          console.log("firmado",firmado);
          
          const leidofirma = await leefirma(firmado); 

          
          const enviar = await envio(firmado,leidofirma);

          let busca=firmadozip.slice(0, -4);

          console.log(busca);







       



          console.log("envio ha recibido este parametro",enviar); 
          if(enviar===undefined){
              console.log("ha ocurrido un error y el archivo no se genero")
          }
          else{


           // const imp = await imprimir(firmado);




            const escrito = await escribircdr(firmado,enviar);

            //devolver el archivo xml
            //devolcer wl archivo cdr
            //devolver pdf


            


            console.log("fin del procesimiento",escrito); 
            if(escrito===undefined){
                console.log("ha ocurrido un error en el cdr")
            }
            else{

              
                 
                //devolver el cdr

                
            }

  


          }

          

        }


        var res=serie.substring(0, 1);
        var tdocu="";
        var codcli="";
        if (res=="F"){
            tdocu="01";
            codcli="6";
            
        }
        if (res=="B"){
            tdocu="03";
            codcli="1";

        }
        if (res=="P"){
            tdocu="03";
            codcli="1";
        }

        const textoqr=rucemisor+"|"+tdocu+"|"+serie+"|"+numero+"|"+total_igv+"|"+total+"|"+fecha_de_emision+"|"+codcli+"|"+cliente_numero_de_documento;





        const generarqr = await qrdato(textoqr);

        console.log(textoqr);


        const invoice={
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
        };

        let archivo=firmadozip.slice(0, -4);

        var pdf=archivo+".pdf";


       const pdf1 =  createInvoice(invoice, pdf);




        const leidofirmazip = await leefirma(firmadozip);
        const leidofirmacdrzip = await leefirmacdr1("R-"+firmadozip);
 
         
        var data = [leidofirmazip,leidofirmacdrzip ];
        return data

      
       

    }


    catch(e){
        console.log(e);
    }
    
}

module.exports = {
    main
  };

//main();
