
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shopi1Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  popular: {
    type: Boolean,
    required: true
  },
  imageUrls:{
      type:Array,
      required: true
      
  }
   
});

module.exports = User = mongoose.model("pedidos", Shopi1Schema);
