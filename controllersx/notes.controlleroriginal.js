const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

notesCtrl.createNote = async (req, res) => {
    const { title, content, date, author} = req.body;
    const newNote = new Note({
        title:title,
        content:content,
        date:date,
        author:author
    });
    console.log("datos recibidos del php");
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


       var soap = require('soap');
       var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
       var options = {
            forceSoap12Headers: false
        };

        soap.createClient(url, options, function (err, client) {
            var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {})
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


       var soap = require('soap');
       var url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
       var options = {
            forceSoap12Headers: false
        };

        soap.createClient(url, options, function (err, client) {
            var wsSecurity = new soap.WSSecurity("20455968268FRANCO12", "FRANCISCO", {})
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

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
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