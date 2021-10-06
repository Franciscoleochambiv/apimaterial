const multer = require('multer')
const path =require('path')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'../upload'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
 module.exports=storage 
  //var upload = multer({ storage: storage })
  
