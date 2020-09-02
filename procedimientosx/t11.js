
const fs = require("fs");
const util = require("util");

//const fs_readFile = util.promisify(fs.readFile);
  

module.exports ={

async lectura(firmadozip){
    try{
       
       const fs_readFile = util.promisify(fs.readFile);

     const leido=  await fs_readFile(firmadozip ,{
        encoding:"base64"
       })
     return leido;

    }
    catch(e){
           console.log(e);   
    }
 
  }
}