var mongoose = require("mongoose");

var trikainiaiSchema = new mongoose.Schema({
   doc:String,
   idarbrus:String,
   idarbvnt:String,
   trikain:String,
   autoid:String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Autoik", trikainiaiSchema, 'dataSum');