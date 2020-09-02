const rucCtrl = {};

const Ruc = require('../models/Sunat');



rucCtrl.getRuc = async (req, res) => {
  
     console.log("estamos en el raiz");  
     console.log(Ruc)
    const notes = await Ruc.find();
    console.log(notes);
    console.log("likstado");
    res.json(notes);
};





rucCtrl.getRuc1 = async (req, res) => {
    console.log(req.params.id)
    const note = await Ruc.findOne({codigo:req.params.id}, function(err,note) {

        //console.log(note);
         if(err) {
             return console.log(err);
         }
         if(note==null){
                       res.json("nulo");
         }
         else{
            res.json("encontrado");
         }
        })
        res.json(note);

    //const note = await Ruc.findById(req.params.id);
 
}



rucCtrl.createRuc = async (req, res) => {
    try {
        const { username } = req.body;

        const newUser = new Ruc({ username });
        await newUser.save();
        res.json('User created');
    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }
};

rucCtrl.deleteRuc = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json('User deleted');
}

module.exports = rucCtrl;