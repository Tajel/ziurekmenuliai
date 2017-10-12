var mongoose = require("mongoose");

var vairSchema  = new mongoose.Schema({
    doc:String,
    padkodas: String,
    ipadkodas: String,
    vairkodas:String,
    vairVardPav:String,
    vairVard:String,
    vairPav:String
});

module.exports = mongoose.model("Vair", vairSchema, 'dataSum');    
    
