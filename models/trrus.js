var mongoose = require("mongoose");

var trrusSchema  = new mongoose.Schema({
    doc:String,
    trrus: String,
    trruskodas: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Trrus", trrusSchema, 'dataSum');