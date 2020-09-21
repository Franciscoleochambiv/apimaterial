const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdSchema = new Schema({
 
  imagen: {
    type: String,
    
  },
  popular: {
    type: Number,
    
  },
  descripcion: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  detalle: {
    type: String,
    
  },
  precio: {
    type: Number,
    
  },
  cantidad: {
    type: Number,    
  },
  cantidad2: {
    type: Number,
    
  },
  cantidad3: {
    type: Number,
    
  },
  cantidad4: {
    type: Number,
    
  }
 
});

module.exports = User = mongoose.model("productos", ProdSchema);
