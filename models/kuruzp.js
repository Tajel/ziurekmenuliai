var mongoose = require("mongoose");

var kuruzpSchema  = new mongoose.Schema({
    doc:String,
    kurouzpkodas: String,
    kurouzppav: String,
    kurouzpkortnr: String
});

module.exports = mongoose.model("Kuruzp", kuruzpSchema, 'dataSum');