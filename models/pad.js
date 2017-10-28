var mongoose = require("mongoose");

var padSchema  = new mongoose.Schema({
    doc:String,
    padkodas: String,
    padpavadinimas:String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Pad", padSchema, 'dataSum');