var mongoose = require("mongoose");

var kuruzpSchema  = new mongoose.Schema({
    doc:String,
    kurouzpkodas: String,
    kurouzppav: String,
    kurouzpkortnr: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Kuruzp", kuruzpSchema, 'dataSum');