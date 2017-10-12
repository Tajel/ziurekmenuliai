var mongoose = require("mongoose");

var padSchema  = new mongoose.Schema({
    doc:String,
    padkodas: String,
    padpavadinimas:String
});

module.exports = mongoose.model("Pad", padSchema, 'dataSum');