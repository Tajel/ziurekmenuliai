var mongoose = require("mongoose");

var vairikSchema  = new mongoose.Schema({
    doc:String,
    idarbrus:String,
    idarbvnt:String,
    vairikain:String,
    vairid:String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Vairik", vairikSchema, 'dataSum');    
    
