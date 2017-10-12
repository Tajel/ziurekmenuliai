var mongoose = require("mongoose");

var trtipSchema  = new mongoose.Schema({
    doc:String,
    trtipas: String
});

module.exports = mongoose.model("Trtip", trtipSchema, 'dataSum');