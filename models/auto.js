var mongoose = require("mongoose");

var transportSchema = new mongoose.Schema({
   doc:String,
   marke: String,
   modelis: String,
   valstnr: String,
   id: String,
   inventnr:String,
   atsaking:String,
   baze:String,
   drcivil:String,
   drkasko:String,
   euro:String,
   gammetai:Number,
   kurrusis:String,
   ikurrusis:String,
   padkodas:String,
   ipadkodas:String,
   vairVardPav:String,
   ipagvair:String,
   trkateg:String,
   itrkateg:String,
   trrus:String,
   itrrus:String,
   trtipas:String,
   itrtipas:String,
   vinjet:String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Auto", transportSchema, 'dataSum');