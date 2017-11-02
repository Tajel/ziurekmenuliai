var mongoose = require("mongoose");

var trkellaptSchema = new mongoose.Schema({
    doc: String,
    auto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auto"
    }]
});

module.exports = mongoose.model("Autokellap", trkellaptSchema, "kellap");