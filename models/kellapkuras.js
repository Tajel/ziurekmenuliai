var mongoose = require("mongoose");

var kellapkurasSchema = new mongoose.Schema({
    doc:String,
    ikurorusis: String,
    ikurouzpkodas: String,
    kiekiskur: String,
    datekur: String,
    author: {
        id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
        username: String
    }
});

module.exports = mongoose.model("Kellapkuras", kellapkurasSchema, "kellap");