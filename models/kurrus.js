var mongoose = require("mongoose");

var kurrusSchema  = new mongoose.Schema({
    doc:String,
    kurrusis: String,
    kurorusiskodas: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Kurrus", kurrusSchema, 'dataSum');