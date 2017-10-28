var mongoose = require("mongoose");

var vairSchema  = new mongoose.Schema({
    doc:String,
    padkodas: String,
    ipadkodas: String,
    vairkodas:String,
    vairVardPav:String,
    vairVard:String,
    vairPav:String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   ikainis: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Vairik"
      }
   ]
});

module.exports = mongoose.model("Vair", vairSchema, 'dataSum');    
    
