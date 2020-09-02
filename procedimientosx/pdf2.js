const { PDFDocument, StandardFonts  } = require('pdf-lib');
const fs = require('fs');

run().catch(err => console.log(err));



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



async function run(  
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
 porcentaje_de_igv)
 {
  // Create a new document and add a new page
  const doc = await PDFDocument.create();
  const page = doc.addPage([595 , 842]); //a4

  //const page = doc.addPage([297 , 421]); 
                             

  const timesRomanFont = await doc.embedFont(StandardFonts.TimesRoman)

page.setFont(timesRomanFont)

//page.drawText('The Life of an Egg', { x: 60, y: 500, size: 50 });
//page.drawText('An Epic Tale of Woe', { x: 125, y: 460, size: 25 });



doc.setTitle('🥚 The Life of an Egg 🍳');
doc.setAuthor('Humpty Dumpty');
doc.setSubject('📘 An Epic Tale of Woe 📖');
doc.setKeywords(['eggs', 'wall', 'fall', 'king', 'horses', 'men']);
doc.setProducer('PDF App 9000 🤖');
doc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)');
doc.setCreationDate(new Date('2018-06-24T01:58:37.228Z'));
doc.setModificationDate(new Date('2019-12-21T07:00:11.000Z'));


let imgfondo = fs.readFileSync('./boleta2.jpg');

let lolo="daeqeq";


page.drawText(lolo, { x: 60, y: 500, size: 12 });
page.drawText('razonemisor', { x: 125, y: 460, size: 12 });







  // Load the image and store it as a Node.js buffer in memory
  let img = fs.readFileSync('./quewy.png');
  img = await doc.embedPng(img);

  // Draw the image on the center of the page
  const { width, height } = img.scale(0.5);
  page.drawImage(img, {
    x:380, 
    //page.getWidth() / 2 - width / 2,
    y: 150,
    width: 100,
    height:100,
    //page.getHeight() / 2 - height / 2
  });

  imgfondo = await doc.embedJpg(imgfondo);
  const jpgDims = imgfondo.scale(0.80)
/*
  page.drawImage(imgfondo, {
    x:100, 
    //page.getWidth() / 2 - jpgDims.width / 2,
    y: 1,
    //page.getHeight() / 2 - jpgDims.height / 2 + 170,
    width:300,
    //jpgDims.width,
    height:300,
    // jpgDims.height,
  })
/*
page.drawImage(imgfondo, {
    x: page.getWidth() / 2- width / 2,
    y: page.getHeight() / 2 - height / 2 + 250,
    
  })

*/


//page.drawText(razonemisor, { x: 125, y: 460, size: 12 });




  // Write the PDF to a file
  fs.writeFileSync('./test.pdf', await doc.save());
}