const fs = require("fs");
const util = require("util");


const writeFile = util.promisify(fs.writeFile);
  var exec1 = require('child_process').exec;
  const sleep=util.promisify(setTimeout);

const exec = util.promisify(exec1);

module.exports ={

async escribirdata(parameter1,parameter2){
    try{
  
        //let busca=parameter1;
  
      // const  ="R-"+parameter1;
  
       //const archivo=util.promisify(fs);
  
      const fs_writeFile = util.promisify(fs.writeFile) 
  
  
  
      await fs_writeFile(parameter1,parameter2)
     
      
  
       
        return parameter1;
  
    }
    catch(e){
           console.log(e);   
    }
    
  },
  async lectura(parameter1){
    try{
      await sleep(4000); 
         

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

    
}

}