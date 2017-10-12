var mongoose = require("mongoose");

var trrusSchema  = new mongoose.Schema({
    doc:String,
    trrus: String,
    trruskodas: String,
    
});

module.exports = mongoose.model("Trrus", trrusSchema, 'dataSum');