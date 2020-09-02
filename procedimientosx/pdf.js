//import { PDFDocument } from 'pdf-lib';
const PDFDocument = require("pdf-lib");

//Salida a fichero .svg en la ruta códigos

 var qr = require('qr-image');  
 var fs = require('fs');

 var code = qr.image('Bienvenido a Quewy', { type: 'png' });  
 var output = fs.createWriteStream('quewy.png');

 code.pipe(output); 
 lolo();


 async function lolo(){


 
// These should be Uint8Arrays or ArrayBuffers
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const jpgImageBytes = "boleta2.jpg";
const pngImageBytes = "quewy.svg" ;

// Create a new PDFDocument
//new PDFDocument(
const pdfDoc = await  PDFDocument.create()
 
// Embed the JPG image bytes and PNG image bytes
const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
const pngImage = await pdfDoc.embedPng(pngImageBytes)
 
// Get the width/height of the JPG image scaled down to 25% of its original size
const jpgDims = jpgImage.scale(0.25)
 
// Get the width/height of the PNG image scaled down to 50% of its original size
const pngDims = pngImage.scale(0.5)
 
// Add a blank page to the document
const page = pdfDoc.addPage()
 
// Draw the JPG image in the center of the page
page.drawImage(jpgImage, {
  x: page.getWidth() / 2 - jpgDims.width / 2,
  y: page.getHeight() / 2 - jpgDims.height / 2,
  width: jpgDims.width,
  height: jpgDims.height,
})
 
// Draw the PNG image near the lower right corner of the JPG image
page.drawImage(pngImage, {
  x: page.getWidth() / 2 - pngDims.width / 2 + 75,
  y: page.getHeight() / 2 - pngDims.height,
  width: pngDims.width,
  height: pngDims.height,
})

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()
 
// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>

 }