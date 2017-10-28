var mongoose = require("mongoose");

var trtipSchema  = new mongoose.Schema({
    doc:String,
    trtipas: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Trtip", trtipSchema, 'dataSum');