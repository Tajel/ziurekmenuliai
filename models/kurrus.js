var mongoose = require("mongoose");

var kurrusSchema  = new mongoose.Schema({
    doc:String,
    kurrusis: String,
    kurorusiskodas: String
});

module.exports = mongoose.model("Kurrus", kurrusSchema, 'dataSum');