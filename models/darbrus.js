var mongoose = require("mongoose");

var darbrusSchema  = new mongoose.Schema({
    doc:String,
    darbrus: String,
    vnt:String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Darbrus", darbrusSchema, 'dataSum');