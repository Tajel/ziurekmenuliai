var mongoose = require("mongoose");

var objSchema  = new mongoose.Schema({
    doc:String,
    dvVadasPav:String,
    objkodas:String,
    objpav:String
});

module.exports = mongoose.model("Obj", objSchema, 'dataSum');