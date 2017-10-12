var mongoose = require("mongoose");

var vairSchema = new mongoose.Schema({
    doc:String,
    vard:String,
    pav:String,
    pilnas:String,
    ipadkodas:String,
    author: {
        id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Vair", vairSchema, 'dataSum'); 